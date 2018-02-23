import 'whatwg-fetch';
import fetchMock = require('fetch-mock');
import { stringify } from 'query-string';

import { MediaStore } from '../src/';
import {
  MediaUpload,
  MediaChunksProbe,
  MediaFile,
  MediaCollection,
  MediaCollectionItems,
} from '../src/models/media';

describe('MediaStore', () => {
  const apiUrl = 'http://some-host';

  afterEach(() => fetchMock.restore());

  describe('given auth provider resolves', () => {
    const clientId = 'some-client-id';
    const token = 'some-token';
    const auth = { clientId, token };
    const authProvider = () => Promise.resolve(auth);
    const mediaStore = new MediaStore({
      apiUrl,
      authProvider,
    });

    describe('createUpload', () => {
      it('should POST to /upload endpoint with correct options', () => {
        const createUpTo = 1;
        const data: MediaUpload[] = [
          { id: 'some-upload-id', created: 123, expires: 456 },
        ];

        fetchMock.mock(`begin:${apiUrl}/upload`, {
          body: {
            data,
          },
          status: 201,
        });

        return mediaStore.createUpload(createUpTo).then(response => {
          expect(response).toEqual({ data });
          expect(fetchMock.lastUrl()).toEqual(
            `${apiUrl}/upload?createUpTo=${createUpTo}`,
          );
          expect(fetchMock.lastOptions()).toEqual({
            method: 'POST',
            headers: {
              'X-Client-Id': clientId,
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
            body: undefined,
          });
        });
      });
    });

    describe('uploadChunk', () => {
      it('should PUT to /chunk/:etag endpoint with correct options', () => {
        const etag = 'some-etag';
        const blob = new Blob(['some-blob']);

        fetchMock.mock(`begin:${apiUrl}/chunk`, {
          status: 201,
        });

        return mediaStore.uploadChunk(etag, blob).then(() => {
          expect(fetchMock.lastUrl()).toEqual(`${apiUrl}/chunk/${etag}`);
          expect(fetchMock.lastOptions()).toEqual({
            method: 'PUT',
            headers: {
              'X-Client-Id': clientId,
              Authorization: `Bearer ${token}`,
            },
            body: blob,
          });
        });
      });
    });

    describe('probeChunks', () => {
      it('should POST to /chunk/probe endpoint with correct options', () => {
        const etag = 'some-etag';
        const chunks = [etag];
        const data: MediaChunksProbe = {
          results: {
            [etag]: {
              exists: true,
            },
          },
        };

        fetchMock.mock(`begin:${apiUrl}/chunk/probe`, {
          body: {
            data,
          },
          status: 200,
        });

        return mediaStore.probeChunks(chunks).then(response => {
          expect(response).toEqual({ data });
          expect(fetchMock.lastUrl()).toEqual(`${apiUrl}/chunk/probe`);
          expect(fetchMock.lastOptions()).toEqual({
            method: 'POST',
            headers: {
              'X-Client-Id': clientId,
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chunks }),
          });
        });
      });
    });

    describe('createFileFromUpload', () => {
      it('should POST to /file/upload endpoint with correct options', () => {
        const body = {
          uploadId: 'some-upload-id',
          name: 'some-name',
          mimeType: 'application/pdf',
          conditions: {
            hash: 'sha1:da39a3ee5e6b4b0d3255bfef95601890afd80709',
            size: 42,
          },
        };
        const params = {
          collection: 'some-collection',
          occurrenceKey: 'some-occurrence-key',
          expireAfter: 123,
          replaceFileId: 'some-replace-file-id',
          skipConversions: true,
        };
        const data: MediaFile = {
          id: 'faee2a3a-f37d-11e4-aae2-3c15c2c70ce6',
          mediaType: 'document',
          mimeType: 'application/pdf',
          name: 'example document.pdf',
          processingStatus: 'pending',
          size: 231392,
          artifacts: {},
        };

        fetchMock.mock(`begin:${apiUrl}/file/upload`, {
          body: {
            data,
          },
          status: 201,
        });

        return mediaStore.createFileFromUpload(body, params).then(response => {
          expect(response).toEqual({ data });
          expect(fetchMock.lastUrl()).toEqual(
            `${apiUrl}/file/upload?${stringify(params)}`,
          );
          expect(fetchMock.lastOptions()).toEqual({
            method: 'POST',
            headers: {
              'X-Client-Id': clientId,
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
        });
      });
    });

    describe('appendChunksToUpload', () => {
      it('should PUT to /upload/{uploadId}/chunks endpoint with correct options', () => {
        const uploadId = '29c49470-adac-4b16-82ec-301340c7b16a';
        const body = {
          chunks: [
            '0675a983536736a69f835438bcf8629e044f190d-4096',
            'e6295a0966535d295582670afeeb14059969d359-209',
          ],
          hash: 'sha1:b0edf951dd0c86f80d989e20b9dc3060c53d66a6',
          offset: 0,
        };

        fetchMock.mock(`begin:${apiUrl}/upload`, {
          status: 200,
        });

        return mediaStore.appendChunksToUpload(uploadId, body).then(() => {
          expect(fetchMock.lastUrl()).toEqual(
            `${apiUrl}/upload/${uploadId}/chunks`,
          );
          expect(fetchMock.lastOptions()).toEqual({
            method: 'PUT',
            headers: {
              'X-Client-Id': clientId,
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
        });
      });
    });

    describe('createCollection', () => {
      it('should POST to /collection endpoint with correct options', () => {
        const collectionName = 'some-collection-name';
        const data: MediaCollection = {
          name: collectionName,
          createdAt: Date.now(),
        };

        fetchMock.mock(`begin:${apiUrl}/collection`, {
          body: {
            data,
          },
          status: 201,
        });

        return mediaStore.createCollection(collectionName).then(response => {
          expect(response).toEqual({ data });
          expect(fetchMock.lastUrl()).toEqual(`${apiUrl}/collection`);
          expect(fetchMock.lastOptions()).toEqual({
            method: 'POST',
            headers: {
              'X-Client-Id': clientId,
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({ name: collectionName }),
          });
        });
      });
    });

    describe('getCollection', () => {
      it('should GET to /collection/{collectionName} endpoint with correct options', () => {
        const collectionName = 'some-collection-name';
        const data: MediaCollection = {
          name: collectionName,
          createdAt: Date.now(),
        };

        fetchMock.mock(`begin:${apiUrl}/collection/${collectionName}`, {
          body: {
            data,
          },
          status: 201,
        });

        return mediaStore.getCollection(collectionName).then(response => {
          expect(response).toEqual({ data });
          expect(fetchMock.lastUrl()).toEqual(
            `${apiUrl}/collection/${collectionName}?client=${clientId}&token=${token}`,
          );
          expect(fetchMock.lastOptions()).toEqual({
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          });
        });
      });
    });

    describe('getCollectionItems', () => {
      it('should GET to /collection/{collectionName} endpoint with correct options', () => {
        const collectionName = 'some-collection-name';
        const data: MediaCollectionItems = {
          nextInclusiveStartKey: '121',
          contents: [],
        };

        fetchMock.mock(`begin:${apiUrl}/collection/${collectionName}`, {
          body: {
            data,
          },
          status: 201,
        });

        return mediaStore
          .getCollectionItems(collectionName, {
            limit: 10,
            details: 'full',
            inclusiveStartKey: 'some-inclusive-start-key',
            sortDirection: 'desc',
          })
          .then(response => {
            expect(response).toEqual({ data });
            expect(fetchMock.lastUrl()).toEqual(
              `${apiUrl}/collection/some-collection-name/items?client=${clientId}&details=full&inclusiveStartKey=some-inclusive-start-key&limit=10&sortDirection=desc&token=${token}`,
            );
            expect(fetchMock.lastOptions()).toEqual({
              method: 'GET',
              headers: {
                Accept: 'application/json',
              },
            });
          });
      });
    });
  });

  describe('given auth provider rejects', () => {
    const error = new Error('some-error');
    const authProvider = () => Promise.reject(error);

    describe('request', () => {
      it('should reject with some error', () => {
        const mediaStore = new MediaStore({
          apiUrl,
          authProvider,
        });

        return expect(mediaStore.request('/some-path')).rejects.toEqual(error);
      });
    });
  });
});
