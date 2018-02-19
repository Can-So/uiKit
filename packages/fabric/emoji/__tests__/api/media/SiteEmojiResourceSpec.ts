import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock/src/client';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { waitUntil } from '@atlaskit/util-common-test';

import SiteEmojiResource, {
  EmojiProgress,
  EmojiProgessCallback,
  EmojiUploadResponse,
  mediaProportionOfProgress,
} from '../../../src/api/media/SiteEmojiResource';
import TokenManager from '../../../src/api/media/TokenManager';
import {
  EmojiDescription,
  EmojiServiceResponse,
  EmojiUpload,
} from '../../../src/types';
import { toEmojiId } from '../../../src/type-helpers';
import {
  MediaUploadStatusUpdate,
  MediaUploadEnd,
  MediaUploadError,
} from '../../../src/api/media/media-types';

import {
  atlassianServiceEmojis,
  defaultMediaApiToken,
  fetchSiteEmojiUrl,
  missingMediaEmoji,
  missingMediaEmojiId,
  missingMediaServiceEmoji,
  siteServiceConfig,
} from '../../../src/support/test-data';

interface MediaCallback {
  (result: any): void;
}

interface MediaUpload {
  dataURL: string;
  filename: string;
}

/**
 * Basic mock implementation of a MediaPicker
 */
class MockMediaPicker {
  private eventHandlers: Map<string, MediaCallback> = new Map();
  private uploads: MediaUpload[] = [];

  on(event: string, callback: (result: any) => void) {
    this.eventHandlers.set(event, callback);
    return this;
  }

  event(event, result: any) {
    const callback = this.eventHandlers.get(event);
    if (callback) {
      callback(result);
    }
  }

  upload(dataURL: string, filename: string) {
    this.uploads.push({ dataURL, filename });
  }

  getUploads() {
    return this.uploads;
  }
}

class TestSiteEmojiResource extends SiteEmojiResource {
  private mockMediaPicker?: MockMediaPicker;

  constructor(tokenManager: TokenManager, mockMediaPicker?: MockMediaPicker) {
    super(siteServiceConfig, defaultMediaApiToken());
    this.tokenManager = tokenManager;
    this.mockMediaPicker = mockMediaPicker;
  }

  protected createMediaPicker(type, mpConfig) {
    return this.mockMediaPicker;
  }
}

describe('SiteEmojiResource', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('#uploadEmoji', () => {
    const upload: EmojiUpload = {
      name: 'Cheese',
      shortName: ':cheese:',
      filename: 'cheese.png',
      dataURL: 'data:cheese',
      width: 20,
      height: 30,
    };

    const mediaUploadEnd: MediaUploadEnd = {
      file: {
        id: 'abc-123',
        name: upload.name,
        size: 12345,
        creationDate: Date.now(),
        type: 'blah',
      },
      public: {
        id: 'abc-123',
        processingStatus: 'whatever',
      },
    };

    const serviceResponse: EmojiUploadResponse = {
      emojis: [
        {
          id: 'emoji-id-234',
          shortName: upload.shortName,
          name: upload.name,
          fallback: upload.shortName,
          order: -1,
          type: 'SITE',
          category: 'CUSTOM',
          representation: {
            imagePath: 'http://media/123.png',
            width: 20,
            height: 30,
          },
          altRepresentations: {
            XHDPI: {
              imagePath: 'http://media/456.png',
              width: 40,
              height: 60,
            },
          },
          searchable: true,
        },
      ],
    };

    it('successful upload', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const siteEmojiResource = new TestSiteEmojiResource(
        tokenManagerStub,
        mockMediaPicker,
      );

      fetchMock.post({
        matcher: siteServiceConfig.url,
        response: {
          body: serviceResponse,
        },
        name: 'emoji-upload',
      });

      tokenManagerStub.getToken.returns(
        Promise.resolve(defaultMediaApiToken()),
      );

      const uploadPromise = siteEmojiResource
        .uploadEmoji(upload)
        .then(emoji => {
          const {
            altRepresentations,
            ...serviceEmoji
          } = serviceResponse.emojis[0];
          expect(emoji).to.deep.equal({
            ...serviceEmoji,
            representation: {
              mediaPath: 'http://media/123.png',
              width: 20,
              height: 30,
            },
            altRepresentation: {
              mediaPath: 'http://media/456.png',
              width: 40,
              height: 60,
            },
          });

          const mediaUploads = mockMediaPicker.getUploads();
          expect(mediaUploads.length, '1 media upload').to.equal(1);
          expect(mediaUploads[0], 'upload params').to.deep.equal({
            dataURL: upload.dataURL,
            filename: upload.filename,
          });

          const uploadEmojiCalls = fetchMock.calls('emoji-upload');
          expect(
            uploadEmojiCalls.length,
            'Emoji service upload emoji called',
          ).to.equal(1);
          const uploadRequest = uploadEmojiCalls[0][0];
          return uploadRequest.json().then(json => {
            const { shortName, name, width, height } = upload;
            expect(json, 'Emoji service upload request').to.deep.equal({
              shortName,
              name,
              width,
              height,
              fileId: mediaUploadEnd.file.id,
            });
          });
        });

      // simulate MediaAPI done - after getToken resolved
      setTimeout(() => {
        mockMediaPicker.event('upload-end', mediaUploadEnd);
      }, 0);

      return uploadPromise;
    });

    it('upload error to media', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const siteEmojiResource = new TestSiteEmojiResource(
        tokenManagerStub,
        mockMediaPicker,
      );

      fetchMock.post({
        matcher: siteServiceConfig.url,
        response: {
          body: serviceResponse,
        },
        name: 'emoji-upload',
      });

      tokenManagerStub.getToken.returns(
        Promise.resolve(defaultMediaApiToken()),
      );

      const uploadPromise = siteEmojiResource
        .uploadEmoji(upload)
        .catch(error => {
          const mediaUploads = mockMediaPicker.getUploads();
          expect(mediaUploads.length, '1 media upload').to.equal(1);
          expect(mediaUploads[0], 'upload params').to.deep.equal({
            dataURL: upload.dataURL,
            filename: upload.filename,
          });

          const uploadEmojiCalls = fetchMock.calls('emoji-upload');
          expect(
            uploadEmojiCalls.length,
            'Emoji service upload emoji called',
          ).to.equal(0);
          expect(error, 'Error message').to.equal('oh crap');
        });

      // simulate MediaAPI done - after getToken resolved
      setTimeout(() => {
        const error: MediaUploadError = {
          file: mediaUploadEnd.file,
          error: 'oh crap',
        };
        mockMediaPicker.event('upload-error', error);
      }, 0);

      return uploadPromise;
    });

    it('upload error to emoji service', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const siteEmojiResource = new TestSiteEmojiResource(
        tokenManagerStub,
        mockMediaPicker,
      );

      fetchMock.post({
        matcher: siteServiceConfig.url,
        response: 400,
        name: 'emoji-upload',
      });

      tokenManagerStub.getToken.returns(
        Promise.resolve(defaultMediaApiToken()),
      );

      const uploadPromise = siteEmojiResource
        .uploadEmoji(upload)
        .catch(error => {
          const mediaUploads = mockMediaPicker.getUploads();
          expect(mediaUploads.length, '1 media upload').to.equal(1);
          expect(mediaUploads[0], 'upload params').to.deep.equal({
            dataURL: upload.dataURL,
            filename: upload.filename,
          });

          const uploadEmojiCalls = fetchMock.calls('emoji-upload');
          expect(
            uploadEmojiCalls.length,
            'Emoji service upload emoji called',
          ).to.equal(1);
          const uploadRequest = uploadEmojiCalls[0][0];

          expect(error, 'Error message').to.equal('Bad Request');

          return uploadRequest.json().then(json => {
            const { shortName, name, width, height } = upload;
            expect(json, 'Emoji service upload request').to.deep.equal({
              shortName,
              name,
              width,
              height,
              fileId: mediaUploadEnd.file.id,
            });
          });
        });

      // simulate MediaAPI done - after getToken resolved
      setTimeout(() => {
        mockMediaPicker.event('upload-end', mediaUploadEnd);
      }, 0);

      return uploadPromise;
    });

    it('media progress events', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const siteEmojiResource = new TestSiteEmojiResource(
        tokenManagerStub,
        mockMediaPicker,
      );

      tokenManagerStub.getToken.returns(
        Promise.resolve(defaultMediaApiToken()),
      );

      let progress: EmojiProgress;
      const progressCallback: EmojiProgessCallback = progressUpdate => {
        progress = progressUpdate;
      };

      siteEmojiResource.uploadEmoji(upload, progressCallback);

      const portion = 0.5;

      const donePromise = waitUntil(() => progress).then(() => {
        expect(
          progress.percent < portion,
          'progress percent less than media portion',
        ).to.equal(true);
        expect(progress.percent, 'progress percent').to.equal(
          portion * mediaProportionOfProgress,
        );
      });

      // simulate MediaAPI done - after getToken resolved
      setTimeout(() => {
        const mediaProgress: MediaUploadStatusUpdate = {
          file: mediaUploadEnd.file,
          progress: {
            absolute: 5042,
            portion,
            max: 10666,
            overallTime: 1002,
            expectedFinishTime: 2000,
            timeLeft: 998,
          },
        };
        mockMediaPicker.event('upload-status-update', mediaProgress);
      }, 0);

      return donePromise;
    });
  });

  describe('#prepareForUpload', () => {
    it('prepareForUpload initiates request for new token from server', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const getTokenStub = tokenManagerStub.getToken;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);
      siteEmojiResource.prepareForUpload();
      expect(getTokenStub.called, 'getToken called').to.equal(true);
    });
  });

  describe('#deleteEmoji', () => {
    it('Deleting an emoji calls the site emoji service', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);

      fetchMock.delete({
        matcher: `${siteServiceConfig.url}/${missingMediaEmoji.id}`,
        response: '204',
        name: 'delete-site-emoji',
      });

      return siteEmojiResource.deleteEmoji(missingMediaEmoji).then(response => {
        expect(response, 'Response OK').to.equal(true);
        const deleteEmojiCalls = fetchMock.calls('delete-site-emoji');
        expect(
          deleteEmojiCalls.length,
          'Delete site emoji from emoji service called',
        ).to.equal(1);
      });
    });
  });

  describe('#findEmoji', () => {
    it('Emoji found', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const siteEmojiResource = new TestSiteEmojiResource(
        tokenManagerStub,
        mockMediaPicker,
      );

      const serviceResponse: EmojiServiceResponse = {
        emojis: [missingMediaServiceEmoji],
        meta: {
          mediaApiToken: defaultMediaApiToken(),
        },
      };

      fetchMock.post({
        matcher: `begin:${fetchSiteEmojiUrl(missingMediaEmojiId)}`,
        response: {
          body: serviceResponse,
        },
        name: 'fetch-site-emoji',
      });

      return siteEmojiResource.findEmoji(missingMediaEmojiId).then(emoji => {
        expect(emoji, 'Emoji defined').to.not.equal(undefined);
        expect(emoji).to.deep.equal(missingMediaEmoji);
        const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
        expect(
          fetchSiteEmojiCalls.length,
          'Fetch site emoji from emoji service called',
        ).to.equal(1);
      });
    });

    it('Emoji not found', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const siteEmojiResource = new TestSiteEmojiResource(
        tokenManagerStub,
        mockMediaPicker,
      );

      const serviceResponse: EmojiServiceResponse = {
        emojis: [],
        meta: {
          mediaApiToken: defaultMediaApiToken(),
        },
      };

      fetchMock.post({
        matcher: `begin:${fetchSiteEmojiUrl(missingMediaEmojiId)}`,
        response: {
          body: serviceResponse,
        },
        name: 'fetch-site-emoji',
      });

      return siteEmojiResource.findEmoji(missingMediaEmojiId).then(emoji => {
        expect(emoji, 'Emoji undefined').to.equal(undefined);
        const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
        expect(
          fetchSiteEmojiCalls.length,
          'Fetch site emoji from emoji service called',
        ).to.equal(1);
      });
    });

    it('Returns emojis of non-site type', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const siteEmojiResource = new TestSiteEmojiResource(
        tokenManagerStub,
        mockMediaPicker,
      );
      const atlassianEmoji = atlassianServiceEmojis.emojis[0];
      const atlassianId = toEmojiId(atlassianEmoji as EmojiDescription);

      const serviceResponse: EmojiServiceResponse = {
        emojis: [atlassianEmoji],
        meta: {
          mediaApiToken: defaultMediaApiToken(),
        },
      };

      fetchMock.post({
        matcher: `begin:${fetchSiteEmojiUrl(atlassianId)}`,
        response: {
          body: serviceResponse,
        },
        name: 'fetch-site-emoji',
      });

      return siteEmojiResource.findEmoji(atlassianId).then(emoji => {
        expect(emoji!.shortName).to.equal(atlassianEmoji.shortName);
        const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
        expect(
          fetchSiteEmojiCalls.length,
          'Fetch site emoji from emoji service called',
        ).to.equal(1);
      });
    });

    it('Request error', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const mockMediaPicker = new MockMediaPicker();
      const siteEmojiResource = new TestSiteEmojiResource(
        tokenManagerStub,
        mockMediaPicker,
      );

      fetchMock.post({
        matcher: `begin:${fetchSiteEmojiUrl(missingMediaEmojiId)}`,
        response: 403,
        name: 'fetch-site-emoji',
      });

      return siteEmojiResource.findEmoji(missingMediaEmojiId).then(emoji => {
        expect(emoji, 'Emoji undefined').to.equal(undefined);
        const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
        expect(
          fetchSiteEmojiCalls.length,
          'Fetch site emoji from emoji service called',
        ).to.equal(1);
      });
    });
  });
});
