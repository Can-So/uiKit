import { utils } from '@atlaskit/util-service-support';
import {
  IdentityClientImpl,
  IdentityClient,
  INVITATIONS_CAPABILITIES_PATH,
  ID_PUBLIC_FACADE_URL,
} from '../../../clients/IdentityClient';

const mockCloudId = 'mockCloudId';

describe('IdentityClientImpl', () => {
  let requestSpy;
  let identityClient: IdentityClient;

  beforeEach(() => {
    requestSpy = jest.spyOn(utils, 'requestService');
    identityClient = new IdentityClientImpl(mockCloudId);
  });

  afterEach(() => {
    requestSpy.mockRestore();
  });

  describe('getInvitationsCapabilities', () => {
    it('should call requestService with the this.serviceConfig and options object with properties path and queryParams object', async () => {
      await identityClient.getInvitationsCapabilities();
      expect(requestSpy).toBeCalledTimes(1);
      expect(requestSpy.mock.calls[0][0]).toMatchObject({
        url: ID_PUBLIC_FACADE_URL,
      });
      expect(requestSpy.mock.calls[0][1]).toMatchObject({
        path: INVITATIONS_CAPABILITIES_PATH,
        queryParams: {
          resource: `ari:cloud:platform::site/${mockCloudId}`,
        },
      });
    });

    it('should return an error instance if requestService throws an error', async () => {
      const mockError = new Error('Bad Request');
      requestSpy.mockRejectedValue(mockError);
      const result = await identityClient.getInvitationsCapabilities();
      expect(result).toEqual(mockError);
    });

    it('should return the value if requestService resolves a value', async () => {
      const mockResult = {};
      requestSpy.mockResolvedValue(mockResult);
      const result = await identityClient.getInvitationsCapabilities();
      expect(result).toEqual(mockResult);
    });
  });
});
