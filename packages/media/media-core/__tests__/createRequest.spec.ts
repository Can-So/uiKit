import * as sinon from 'sinon';

import createRequest from '../src/services/util/createRequest';
import { AuthProvider } from '../src/auth';
import * as UtilsModule from '../src/utils';

describe('createRequest()', () => {
  const token = 'ABC';
  const serviceHost = 'http://example.com';
  let authProvider: AuthProvider;
  let mockServer: sinon.SinonFakeServer;

  beforeEach(() => {
    mockServer = sinon.fakeServer.create();
    mockServer.autoRespond = true;
  });

  afterEach(() => {
    mockServer.restore();
  });

  describe('with clientId/token auth method', () => {
    const clientId = '1234';

    beforeEach(() => {
      authProvider = jest.fn(() =>
        Promise.resolve({
          token: token,
          clientId: clientId,
        }),
      );
    });

    it('should send the client ID and auth token in header fields by default', () => {
      const request = createRequest({
        config: {
          serviceHost,
          authProvider,
        },
      });

      mockServer.respondWith('GET', 'http://example.com/some-api/links', '{}');

      return request({ url: '/some-api/links' }).then(() => {
        expect(authProvider).toHaveBeenCalled();
        expect(mockServer.requests).toHaveLength(1);
        expect(mockServer.requests[0].requestHeaders['X-Client-Id']).toBe(
          clientId,
        );
        expect(mockServer.requests[0].requestHeaders['Authorization']).toBe(
          `Bearer ${token}`,
        );
      });
    });

    it('should send auth arguments using queryParams when preventPreflight is true', () => {
      const request = createRequest({
        config: {
          serviceHost,
          authProvider,
        },
        preventPreflight: true,
      });

      mockServer.respondWith(
        'GET',
        `http://example.com/some-api/links?token=${token}&client=${clientId}`,
        '{}',
      );

      return request({ url: '/some-api/links' }).then(() => {
        expect(authProvider).toHaveBeenCalled();
        expect(
          mockServer.requests[0].requestHeaders['X-Client-Id'],
        ).toBeUndefined();
        expect(
          mockServer.requests[0].requestHeaders['Authorization'],
        ).toBeUndefined();
      });
    });
  });

  describe('with asapIssuer/token auth method', () => {
    const asapIssuer = 'some-issuer';

    beforeEach(() => {
      authProvider = jest.fn(() => Promise.resolve({ token, asapIssuer }));
    });

    it('should send the asap issuer and auth token in header fields by default', () => {
      const request = createRequest({
        config: {
          serviceHost,
          authProvider,
        },
      });

      mockServer.respondWith('GET', `http://example.com/some-api/links`, '{}');

      return request({ url: '/some-api/links' }).then(() => {
        expect(authProvider).toHaveBeenCalled();
        expect(mockServer.requests[0].requestHeaders['X-Issuer']).toBe(
          asapIssuer,
        );
        expect(mockServer.requests[0].requestHeaders['Authorization']).toBe(
          `Bearer ${token}`,
        );
      });
    });

    it('should send auth arguments using queryParams when preventPreflight is true', () => {
      const request = createRequest({
        config: {
          serviceHost,
          authProvider,
        },
        preventPreflight: true,
      });

      mockServer.respondWith(
        'GET',
        `http://example.com/some-api/links?token=${token}&issuer=${asapIssuer}`,
        '{}',
      );

      return request({ url: '/some-api/links' }).then(() => {
        expect(authProvider).toHaveBeenCalled();
        expect(
          mockServer.requests[0].requestHeaders['X-Issuer'],
        ).toBeUndefined();
        expect(
          mockServer.requests[0].requestHeaders['Authorization'],
        ).toBeUndefined();
      });
    });
  });

  describe('with responseType === image', () => {
    let checkWebpSupportSpy: jest.SpyInstance<any>;
    const clientId = '1234';

    beforeEach(() => {
      authProvider = jest.fn(() =>
        Promise.resolve({
          token: token,
          clientId: clientId,
        }),
      );
      checkWebpSupportSpy = jest.spyOn(UtilsModule, 'checkWebpSupport');
    });

    afterEach(() => {
      checkWebpSupportSpy.mockRestore();
    });

    describe('when webp support is enabled', () => {
      beforeEach(() => {
        checkWebpSupportSpy.mockReturnValue(Promise.resolve(true));
      });

      it('should add webp headers', () => {
        const request = createRequest({
          config: {
            serviceHost,
            authProvider,
          },
          preventPreflight: true,
        });

        mockServer.respondWith(
          'GET',
          `http://example.com/some-api/links?token=${token}&client=${clientId}`,
          '{}',
        );

        return request({ url: '/some-api/links', responseType: 'image' }).then(
          () => {
            expect(mockServer.requests[0].requestHeaders['accept']).toBe(
              'image/webp,image/*,*/*;q=0.8',
            );
          },
        );
      });
    });

    describe('when webp support is disabled', () => {
      beforeEach(() => {
        checkWebpSupportSpy.mockReturnValue(Promise.resolve(false));
      });

      it('should not add webp headers', () => {
        const request = createRequest({
          config: {
            serviceHost,
            authProvider,
          },
          preventPreflight: false,
        });

        mockServer.respondWith(
          'GET',
          `http://example.com/some-api/links`,
          '{}',
        );

        return request({ url: '/some-api/links', responseType: 'image' }).then(
          () => {
            expect(mockServer.requests[0].requestHeaders['accept']).toBe(
              'image/*,*/*;q=0.8',
            );
          },
        );
      });
    });
  });
});
