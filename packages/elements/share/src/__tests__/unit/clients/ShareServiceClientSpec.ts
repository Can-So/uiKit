import { utils } from '@atlaskit/util-service-support';
import {
  ShareServiceClientImpl,
  ShareServiceClient,
  DEFAULT_SHARE_SERVICE_URL,
  DEFAULT_SHARE_PATH,
} from '../../../clients/ShareServiceClient';

describe('ShareServiceClientImpl', () => {
  let requestSpy;
  let shareServiceClient: ShareServiceClient;
  let mockContent = {
    link: 'link',
    ari: 'ari',
    title: 'title',
  };
  let mockRecipients = [{ id: 'id' }, { email: 'email' }];
  let mockMetaData = {
    productId: 'confluence',
    toAtlassianAccountHolders: {
      atlOriginId: 'atlOrigin1',
    },
    toNewUsers: {
      atlOriginId: 'atlOrigin2',
    },
  };
  let mockComment = 'comment';

  beforeEach(() => {
    requestSpy = jest.spyOn(utils, 'requestService').mockResolvedValue({});
    shareServiceClient = new ShareServiceClientImpl();
  });

  afterEach(() => {
    requestSpy.mockRestore();
  });

  describe('share', () => {
    it('should call requestService with default serviceConfig and options object', async () => {
      await shareServiceClient.share(
        mockContent,
        mockRecipients,
        mockMetaData,
        mockComment,
      );
      expect(requestSpy).toBeCalledTimes(1);
      const callArgs = requestSpy.mock.calls[0];
      expect(callArgs[0]).toMatchObject({
        url: DEFAULT_SHARE_SERVICE_URL,
      });
      expect(callArgs[1]).toMatchObject({
        path: DEFAULT_SHARE_PATH,
        requestInit: {
          method: 'post',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            content: mockContent,
            recipients: mockRecipients,
            metadata: mockMetaData,
            comment: mockComment,
          }),
        },
      });
    });

    it('should call requestService with configurable serviceConfig', async () => {
      const mockServiceConfig = {
        url: 'customurl',
      };
      shareServiceClient = new ShareServiceClientImpl(mockServiceConfig);
      await shareServiceClient.share(
        mockContent,
        mockRecipients,
        mockMetaData,
        mockComment,
      );
      expect(requestSpy).toBeCalledTimes(1);
      const callArgs = requestSpy.mock.calls[0];
      expect(callArgs[0]).toMatchObject(mockServiceConfig);
    });
  });
});
