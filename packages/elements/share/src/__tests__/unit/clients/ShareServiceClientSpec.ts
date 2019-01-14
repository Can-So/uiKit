import { utils } from '@atlaskit/util-service-support';
import {
  ShareServiceClientImpl,
  ShareServiceClient,
  SHARE_SERVICE_URL,
  SHARE_PATH,
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
    shareToAtlassianAccountHoldersOriginId: 'atlOrigin1',
    shareToNewUsersOriginId: 'atlOrigin2',
  };
  let mockComment: 'comment';

  beforeEach(() => {
    requestSpy = jest.spyOn(utils, 'requestService');
    shareServiceClient = new ShareServiceClientImpl();
  });

  afterEach(() => {
    requestSpy.mockRestore();
  });

  describe('share', () => {
    it('should call requestService with serviceConfig and options object', async () => {
      await shareServiceClient.share(
        mockContent,
        mockRecipients,
        mockMetaData,
        mockComment,
      );
      expect(requestSpy).toBeCalledTimes(1);
      const callArgs = requestSpy.mock.calls[0];
      expect(callArgs[0]).toMatchObject({
        url: SHARE_SERVICE_URL,
      });
      expect(callArgs[1]).toMatchObject({
        path: SHARE_PATH,
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

    it('should return the error instance if the requestService throws an error', async () => {
      const mockError = new Error('Bad Request');
      requestSpy.mockRejectedValue(mockError);
      const result = await shareServiceClient.share(
        mockContent,
        mockRecipients,
        mockMetaData,
        mockComment,
      );
      expect(result).toEqual(mockError);
    });

    it('should return the resolved value by the requestService', async () => {
      const mockResponse = {
        contentAri: 'contentAri',
        statuses: [
          {
            shareId: 'shareId1',
            recipient: {
              id: 'id',
            },
            status: 'PENDING_INVITE',
          },
          {
            shareId: 'shareId2',
            recipient: {
              email: 'email',
            },
            status: 'INVITED',
          },
        ],
        metadata: {
          ...mockMetaData,
          numberOfSharesToAtlassianAccountHolders: 1,
          numberOfSharesToNewUsers: 0,
        },
      };
      requestSpy.mockResolvedValue(mockResponse);
      const result = await shareServiceClient.share(
        mockContent,
        mockRecipients,
        mockMetaData,
        mockComment,
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
