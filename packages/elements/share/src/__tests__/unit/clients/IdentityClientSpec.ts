import { utils } from '@atlaskit/util-service-support';
import {
  IdentityClientImpl,
  IdentityClient,
  DEFAULT_INVITATIONS_CAPABILITIES_PATH,
  DEFAULT_ID_PUBLIC_FACADE_URL,
} from '../../../clients/IdentityClient';

const mockCloudId = 'mockCloudId';

describe('IdentityClientImpl', () => {
  let requestSpy;
  let identityClient: IdentityClient;

  beforeEach(() => {
    requestSpy = jest.spyOn(utils, 'requestService').mockResolvedValue({});
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
        url: DEFAULT_ID_PUBLIC_FACADE_URL,
      });
      expect(requestSpy.mock.calls[0][1]).toMatchObject({
        path: DEFAULT_INVITATIONS_CAPABILITIES_PATH,
        queryParams: {
          resource: `ari:cloud:platform::site/${mockCloudId}`,
        },
      });
    });

    it('should support calling requestService with configurable serviceConfig', async () => {
      const mockServiceConfig = {
        url: 'mockUrl',
      };
      identityClient = new IdentityClientImpl(mockCloudId, mockServiceConfig);
      await identityClient.getInvitationsCapabilities();
      expect(requestSpy).toBeCalledTimes(1);
      expect(requestSpy.mock.calls[0][0]).toMatchObject({
        url: mockServiceConfig.url,
      });
    });
  });
});
