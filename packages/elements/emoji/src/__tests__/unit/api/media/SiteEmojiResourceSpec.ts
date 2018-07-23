jest.mock('@atlaskit/media-core');
import { ContextFactory, FileState } from '@atlaskit/media-core';
import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock/src/client';
import * as sinon from 'sinon';
import { waitUntil } from '@atlaskit/util-common-test';

import SiteEmojiResource, {
  EmojiProgress,
  EmojiProgessCallback,
  EmojiUploadResponse,
  mediaProportionOfProgress,
} from '../../../../api/media/SiteEmojiResource';
import TokenManager from '../../../../api/media/TokenManager';
import {
  EmojiDescription,
  EmojiServiceResponse,
  EmojiUpload,
  ImageRepresentation,
} from '../../../../types';
import { toEmojiId } from '../../../../type-helpers';

import {
  atlassianServiceEmojis,
  defaultMediaApiToken,
  fetchSiteEmojiUrl,
  missingMediaEmoji,
  missingMediaEmojiId,
  missingMediaServiceEmoji,
  siteServiceConfig,
  loadedMediaEmoji,
} from '../../_test-data';
import { Observable } from 'rxjs/Observable';

class TestSiteEmojiResource extends SiteEmojiResource {
  constructor(tokenManager: TokenManager) {
    super(siteServiceConfig, defaultMediaApiToken());
    this.tokenManager = tokenManager;
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

    const setup = () => {
      const uploadFile = jest.fn().mockReturnValue(
        new Observable(observer => {
          setImmediate(() => {
            // We need it due rxjs sync unsubscription
            observer.next({
              id: '123',
              name: 'some-name',
              size: 1,
              status: 'processing',
            });
          });
        }),
      );

      (ContextFactory as any).create = () => {
        return {
          uploadFile,
        };
      };

      return { uploadFile };
    };

    it('successful upload', () => {
      const { uploadFile } = setup();
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);

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
          expect(emoji).toEqual({
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

          expect(uploadFile).toHaveBeenCalledTimes(1);
          expect(uploadFile).toBeCalledWith({
            collection: 'emoji-collection',
            content: 'data:cheese',
            name: 'cheese.png',
          });

          const uploadEmojiCalls = fetchMock.calls('emoji-upload');
          expect(uploadEmojiCalls).toHaveLength(1);
          const uploadRequest = uploadEmojiCalls[0][0];
          return uploadRequest.json().then(json => {
            const { shortName, name, width, height } = upload;
            expect(json).toEqual({
              shortName,
              name,
              width,
              height,
              fileId: '123',
            });
          });
        });

      return uploadPromise;
    });

    it('upload error to media', () => {
      const uploadFile = jest.fn().mockReturnValue(
        new Observable(observer => {
          observer.error('upload_fail');
        }),
      );

      (ContextFactory as any).create = () => ({ uploadFile });

      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);

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
          expect(uploadFile).toHaveBeenCalledTimes(1);
          expect(uploadFile).toBeCalledWith({
            collection: 'emoji-collection',
            content: 'data:cheese',
            name: 'cheese.png',
          });

          const uploadEmojiCalls = fetchMock.calls('emoji-upload');
          expect(uploadEmojiCalls).toHaveLength(0);
          expect(error).toEqual('upload_fail');
        });

      return uploadPromise;
    });

    it('upload error to emoji service', () => {
      const { uploadFile } = setup();
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);

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
          expect(uploadFile).toHaveBeenCalledTimes(1);
          expect(uploadFile).toBeCalledWith({
            collection: 'emoji-collection',
            content: 'data:cheese',
            name: 'cheese.png',
          });

          const uploadEmojiCalls = fetchMock.calls('emoji-upload');
          expect(uploadEmojiCalls).toHaveLength(1);
          const uploadRequest = uploadEmojiCalls[0][0];

          expect(error).toEqual('Bad Request');

          return uploadRequest.json().then(json => {
            const { shortName, name, width, height } = upload;
            expect(json).toEqual({
              shortName,
              name,
              width,
              height,
              fileId: '123',
            });
          });
        });

      return uploadPromise;
    });

    it('media progress events', () => {
      const uploadFile = jest.fn().mockReturnValue(
        new Observable<FileState>(observer => {
          observer.next({
            id: '123',
            name: 'some-name',
            size: 1,
            status: 'uploading',
            progress: 0.5,
            mediaType: 'image',
          });
        }),
      );

      (ContextFactory as any).create = () => ({ uploadFile });
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);

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
        expect(progress.percent < portion).toBeTruthy();
        expect(progress.percent).toEqual(portion * mediaProportionOfProgress);
      });

      return donePromise;
    });
  });

  describe('#prepareForUpload', () => {
    it('prepareForUpload initiates request for new token from server', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const getTokenStub = tokenManagerStub.getToken;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);
      siteEmojiResource.prepareForUpload();
      expect(getTokenStub.called).toBeTruthy();
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

      return siteEmojiResource.deleteEmoji(missingMediaEmoji).then(() => {
        const deleteEmojiCalls = fetchMock.calls('delete-site-emoji');
        expect(deleteEmojiCalls.length).toEqual(1);
      });
    });

    it('Delete works for emoji with mediaRepresentation', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);

      fetchMock.delete({
        matcher: `${siteServiceConfig.url}/${missingMediaEmoji.id}`,
        response: '204',
        name: 'delete-site-emoji',
      });

      return siteEmojiResource.deleteEmoji(missingMediaEmoji).then(response => {
        expect(response).toBeTruthy();
      });
    });

    it('Deleting an emoji works for CUSTOM emoji with dataURL imgPath', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);

      fetchMock.delete({
        matcher: `${siteServiceConfig.url}/${loadedMediaEmoji.id}`,
        response: '204',
        name: 'delete-site-emoji',
      });

      return siteEmojiResource.deleteEmoji(loadedMediaEmoji).then(response => {
        expect(response).toBeTruthy();
      });
    });

    it('Deleting a custom emoji fails for non-CUSTOM category', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);
      const emoji = {
        ...loadedMediaEmoji,
        category: 'PEOPLE',
      };

      fetchMock.delete({
        matcher: `${siteServiceConfig.url}/${emoji.id}`,
        response: '204',
        name: 'delete-site-emoji',
      });

      return siteEmojiResource
        .deleteEmoji(emoji)
        .catch(status => expect(status).toEqual(false));
    });

    it('Deleting a loaded emoji fails for non-dataURL imgPath', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);
      const rep = loadedMediaEmoji.representation as ImageRepresentation;
      const emoji = {
        ...loadedMediaEmoji,
        representation: {
          imagePath: 'https://path-to-image.png',
          height: rep.height,
          width: rep.width,
        },
      };

      fetchMock.delete({
        matcher: `${siteServiceConfig.url}/${emoji.id}`,
        response: '204',
        name: 'delete-site-emoji',
      });

      return siteEmojiResource
        .deleteEmoji(emoji)
        .catch(status => expect(status).toEqual(false));
    });
  });

  describe('#findEmoji', () => {
    it('Emoji found', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);

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
        expect(emoji).not.toEqual(undefined);
        expect(emoji).toEqual(missingMediaEmoji);
        const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
        expect(fetchSiteEmojiCalls).toHaveLength(1);
      });
    });

    it('Emoji not found', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);

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
        expect(emoji).toEqual(undefined);
        const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
        expect(fetchSiteEmojiCalls).toHaveLength(1);
      });
    });

    it('Returns emojis of non-site type', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);
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
        expect(emoji!.shortName).toEqual(atlassianEmoji.shortName);
        const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
        expect(fetchSiteEmojiCalls).toHaveLength(1);
      });
    });

    it('Request error', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const siteEmojiResource = new TestSiteEmojiResource(tokenManagerStub);

      fetchMock.post({
        matcher: `begin:${fetchSiteEmojiUrl(missingMediaEmojiId)}`,
        response: 403,
        name: 'fetch-site-emoji',
      });

      return siteEmojiResource.findEmoji(missingMediaEmojiId).then(emoji => {
        expect(emoji).toEqual(undefined);
        const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
        expect(fetchSiteEmojiCalls).toHaveLength(1);
      });
    });
  });
});
