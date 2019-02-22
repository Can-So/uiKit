import { waitUntil } from '@atlaskit/util-common-test';
import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import * as fetchMock from 'fetch-mock/src/client';
import 'whatwg-fetch';
import MediaImageLoader from '../../../../api/media/MediaImageLoader';
import TokenManager from '../../../../api/media/TokenManager';
import {
  blobResponse,
  createTokenManager,
  defaultMediaApiToken,
  mediaBaseUrl,
  mediaEmojiImagePath,
} from '../../_test-data';

const testConcurrentDownloadLimit = 2;

const createMediaImageLoader = (tokenManager?: TokenManager) => {
  const tm = tokenManager || createTokenManager();
  return new MediaImageLoader(tm, {
    concurrentDownloadLimit: testConcurrentDownloadLimit,
  });
};

const isDataURL = (dataURL: string) => dataURL.indexOf('data:') === 0;
/**
 * Skipping all tests since they have stopped working since the jest 23 upgrade
 * TODO: JEST-23
 */
describe.skip('MediaImageLoader', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('#loadMediaImage', () => {
    it('image loaded when queue empty', () => {
      const mediaImageLoader = createMediaImageLoader();
      const blob = new Blob();
      fetchMock.mock({
        matcher: `begin:${mediaEmojiImagePath}`,
        response: blobResponse(blob),
        name: 'media-emoji',
      });
      return mediaImageLoader
        .loadMediaImage(mediaEmojiImagePath)
        .then(dataURL => {
          expect(isDataURL(dataURL)).toEqual(true);

          // Confirm headers
          const token = defaultMediaApiToken();
          const calls = fetchMock.calls('media-emoji');
          expect(calls.length).toEqual(1);
          const headers = calls[0][1].headers;
          expect(headers['Authorization']).toEqual(`Bearer ${token.jwt}`);
          expect(headers['X-Client-Id']).toEqual(token.clientId);
          expect(headers['Accept'].indexOf('image/')).toEqual(0);
        });
    });

    it('load same url only once', () => {
      const mediaImageLoader = createMediaImageLoader();
      const blob = new Blob();
      fetchMock.mock({
        matcher: `begin:${mediaEmojiImagePath}`,
        response: blobResponse(blob),
        name: 'media-emoji',
      });

      return Promise.all([
        mediaImageLoader.loadMediaImage(mediaEmojiImagePath),
        mediaImageLoader.loadMediaImage(mediaEmojiImagePath),
      ]).then(() => {
        expect(fetchMock.calls('media-emoji').length).toEqual(1);
      });
    });

    it('image loaded when another item loading', () => {
      const mediaImageLoader = createMediaImageLoader();
      const mediaImage2 = `${mediaBaseUrl}/image2.png`;
      const blob = new Blob();
      let resolve1: (value: any | PromiseLike<any>) => void;
      fetchMock
        .mock({
          matcher: `begin:${mediaEmojiImagePath}`,
          response: new Promise(resolve => {
            resolve1 = resolve;
          }),
          name: 'media-emoji-1',
        })
        .mock({
          matcher: `begin:${mediaImage2}`,
          response: blobResponse(blob),
          name: 'media-emoji-2',
        });
      const p1 = mediaImageLoader.loadMediaImage(mediaEmojiImagePath);
      return mediaImageLoader.loadMediaImage(mediaImage2).then(dataURL2 => {
        // mediaImage2 should be loaded even though first image is still loading
        expect(isDataURL(dataURL2)).toEqual(true);
        expect(fetchMock.called('media-emoji-1'));
        expect(fetchMock.called('media-emoji-2'));
        const p1a = p1.then(dataURL1 => {
          expect(isDataURL(dataURL1)).toEqual(true);
        });
        resolve1(blobResponse(blob));
        return p1a;
      });
    });

    it('maximum concurrent emoji loading, queuing', () => {
      const mediaImageLoader = createMediaImageLoader();
      const blob = new Blob();
      let resolvers: Function[] = [];
      fetchMock.mock({
        matcher: `begin:${mediaEmojiImagePath}`,
        response: () =>
          new Promise(resolve => {
            resolvers.push(resolve);
          }),
        name: 'media-emoji',
      });
      const p = [
        mediaImageLoader.loadMediaImage(`${mediaEmojiImagePath}0`),
        mediaImageLoader.loadMediaImage(`${mediaEmojiImagePath}1`),
        mediaImageLoader.loadMediaImage(`${mediaEmojiImagePath}2`),
      ];

      return waitUntil(
        () =>
          mediaImageLoader.getActiveDownloads() === 2 &&
          mediaImageLoader.getQueueSize() === 1 &&
          fetchMock.calls('media-emoji').length === 2,
      )
        .then(() => {
          expect(fetchMock.calls('media-emoji').length).toEqual(2);
          expect(mediaImageLoader.getActiveDownloads()).toEqual(2);
          expect(mediaImageLoader.getQueueSize()).toEqual(1);
          // Complete first download
          resolvers[0](blobResponse(blob));
          return waitUntil(
            () =>
              mediaImageLoader.getQueueSize() === 0 &&
              fetchMock.calls('media-emoji').length === 3,
          );
        })
        .then(() => p[0])
        .then((dataURL0: string) => {
          expect(isDataURL(dataURL0)).toEqual(true);
          expect(dataURL0.indexOf('data:')).toEqual(0);

          expect(fetchMock.calls('media-emoji').length).toEqual(3);
          expect(mediaImageLoader.getActiveDownloads()).toEqual(2);
          expect(mediaImageLoader.getQueueSize()).toEqual(0);

          resolvers[1](blobResponse(blob));
          resolvers[2](blobResponse(blob));
          return Promise.all(p);
        })
        .then((dataURLs: string[]) => {
          dataURLs.forEach(dataURL => {
            expect(isDataURL(dataURL)).toEqual(true);
          });
          expect(mediaImageLoader.getActiveDownloads()).toEqual(0);
          expect(mediaImageLoader.getQueueSize()).toEqual(0);
        });
    });

    it('image Promise rejection when image load fails', done => {
      const mediaImageLoader = createMediaImageLoader();
      fetchMock.mock({
        matcher: `begin:${mediaEmojiImagePath}`,
        response: 404,
        name: 'media-emoji',
      });

      mediaImageLoader
        .loadMediaImage(mediaEmojiImagePath)
        .then(() => done.fail('Promise should be rejected.'))
        .catch(() => {
          expect(true).toEqual(true);
          done();
        });
    });

    it('image Promise resolves when image load fails with 403 first time', () => {
      const mediaImageLoader = createMediaImageLoader();
      const blob = new Blob();
      fetchMock
        .mock({
          matcher: `begin:${mediaEmojiImagePath}`,
          response: 403,
          name: 'media-emoji-403',
          repeat: 1,
        })
        .mock({
          matcher: `begin:${mediaEmojiImagePath}`,
          response: blobResponse(blob),
          name: 'media-emoji',
        });
      return mediaImageLoader
        .loadMediaImage(mediaEmojiImagePath)
        .then(dataURL => {
          expect(isDataURL(dataURL)).toEqual(true);
          expect(fetchMock.calls('media-emoji-403').length).toEqual(1);
          expect(fetchMock.calls('media-emoji').length).toEqual(1);
        });
    });

    it('image Promise rejection when image load fails with 403 twice', done => {
      const mediaImageLoader = createMediaImageLoader();
      fetchMock.mock({
        matcher: `begin:${mediaEmojiImagePath}`,
        response: 403,
        name: 'media-emoji',
      });
      mediaImageLoader
        .loadMediaImage(mediaEmojiImagePath)
        .then(() => done.fail('Promise should be rejected.'))
        .catch(() => {
          expect(fetchMock.calls('media-emoji').length).toEqual(2);
          done();
        });
    });

    it('image Promise rejection when token load fails', done => {
      const tokenError = 'get token failure';
      const tokenManager = createTokenManager(Promise.reject(tokenError));
      const mediaImageLoader = createMediaImageLoader(tokenManager);
      mediaImageLoader
        .loadMediaImage(mediaEmojiImagePath)
        .then(() => done.fail('Promise should be rejected.'))
        .catch(err => {
          expect(err).toEqual(tokenError);
          done();
        });
    });
  });
});
