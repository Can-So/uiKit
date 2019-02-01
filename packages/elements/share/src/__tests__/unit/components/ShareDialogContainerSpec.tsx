import * as React from 'react';
import { shallow } from 'enzyme';
import { utils } from '@atlaskit/util-service-support';
import { ShareDialogContainer } from '../../../components/ShareDialogContainer';
import { ShareDialogWithTrigger } from '../../../components/ShareDialogWithTrigger';

let wrapper;
let mockOriginTracing;
let mockOriginTracingFactory;
let mockRequestService;
const mockCloudId = 'cloudId';
const mockProductId = 'productId';
const mockShareAri = 'ari';
const mockShareLink = 'share-link';
const mockShareTitle = 'Share Title';
const mockCopyLink = 'copy-link';
const mockFormatCopyLink = jest.fn().mockReturnValue(mockCopyLink);
const mockShouldShowCommentField = true;
const mockShouldCloseOnEscapePress = true;
const mockUsers = [
  { type: 'user', id: 'id' },
  { type: 'user', email: 'mock@email.com' },
];
const mockComment = {
  format: 'plain_text' as 'plain_text',
  value: 'comment',
};
const mockLoadUserOptions = () => [];
const mockCapabilities = {
  directInvite: {
    mode: 'NONE' as 'NONE',
    permittedResources: [],
  },
  invitePendingApproval: {
    mode: 'NONE' as 'NONE',
    permittedResources: [],
  },
};

beforeEach(() => {
  mockOriginTracing = {
    addToUrl: jest.fn(),
    toAnalyticsEvent: jest.fn(),
  };
  mockOriginTracingFactory = jest.fn().mockReturnValue(mockOriginTracing);
  mockRequestService = jest
    .spyOn(utils, 'requestService')
    .mockResolvedValue(mockCapabilities);
  wrapper = shallow(
    <ShareDialogContainer
      cloudId={mockCloudId}
      loadUserOptions={mockLoadUserOptions}
      originTracingFactory={mockOriginTracingFactory}
      productId={mockProductId}
      shareAri={mockShareAri}
      shareLink={mockShareLink}
      shareTitle={mockShareTitle}
      formatCopyLink={mockFormatCopyLink}
      shouldShowCommentField={mockShouldShowCommentField}
      shouldCloseOnEscapePress={mockShouldCloseOnEscapePress}
    />,
  );
});

afterEach(() => {
  mockRequestService.mockRestore();
});

describe('ShareDialogContainer', () => {
  it('should render', () => {
    expect(wrapper.state().capabilities).toEqual(mockCapabilities);
    const shareDialogWithTrigger = wrapper.find(ShareDialogWithTrigger);
    expect(shareDialogWithTrigger).toHaveLength(1);
    expect(mockFormatCopyLink).toHaveBeenCalled();
    expect(shareDialogWithTrigger.prop('copyLink')).toEqual(mockCopyLink);
    expect(shareDialogWithTrigger.prop('loadUserOptions')).toEqual(
      mockLoadUserOptions,
    );
    expect(shareDialogWithTrigger.prop('onLinkCopy')).toBe(
      wrapper.instance().handleCopyLink,
    );
    expect(shareDialogWithTrigger.prop('shouldShowCommentField')).toEqual(
      mockShouldShowCommentField,
    );
    expect(shareDialogWithTrigger.prop('shouldCloseOnEscapePress')).toEqual(
      mockShouldCloseOnEscapePress,
    );
    expect(shareDialogWithTrigger.prop('capabilities')).toEqual(
      wrapper.state().capabilities,
    );
    expect(mockOriginTracingFactory).toHaveBeenCalledTimes(3);
  });

  it('should call props.originTracingFactory if shareLink prop is updated', () => {
    mockOriginTracingFactory.mockReset();
    wrapper.setProps({ shareLink: 'new-share-link' });
    expect(wrapper.state().prevShareLink).toEqual('new-share-link');
    expect(mockOriginTracingFactory).toHaveBeenCalledTimes(3);
  });

  describe('handleCopyLink', () => {
    it('should send analytics', () => {
      const mockAttributes = {};
      const spiedToAnalyticsAttributes = jest
        .fn()
        .mockReturnValue(mockAttributes);
      wrapper.instance().state.copyLinkOrigin = {
        toAnalyticsAttributes: spiedToAnalyticsAttributes,
      };
      wrapper.instance().forceUpdate();
      wrapper.instance().handleCopyLink();
      expect(spiedToAnalyticsAttributes).toHaveBeenCalledTimes(1);
      expect(spiedToAnalyticsAttributes.mock.calls[0][0]).toEqual({
        hasGeneratedId: true,
      });

      // TODO: complete when analytic is sent
    });
  });

  describe('handleSubmitShare', () => {
    it('should call share function from the shareServiceClient', () => {
      wrapper.instance().shareServiceClient.share = jest
        .fn()
        .mockResolvedValue({});
      const mockShare = wrapper.instance().shareServiceClient.share;
      wrapper.instance().forceUpdate();
      const mockDialogContentState = {
        users: mockUsers,
        comment: mockComment,
      };
      wrapper.instance().handleSubmitShare(mockDialogContentState);
      expect(mockShare).toHaveBeenCalledTimes(1);
      expect(mockShare.mock.calls[0][0]).toEqual({
        ari: mockShareAri,
        link: mockShareLink,
        title: mockShareTitle,
      });
      expect(mockShare.mock.calls[0][1]).toEqual(mockUsers);
      expect(mockShare.mock.calls[0][2]).toEqual({
        productId: mockProductId,
        tracking: {
          toAtlassianAccountHolders: {
            atlOriginId: wrapper.state().shareToAtlassianAccuntHoldersOrigin!
              .id,
          },
          toNewUsers: {
            atlOriginId: wrapper.state().shareToNewUsersOrigin!.id,
          },
        },
      });
      expect(mockShare.mock.calls[0][3]).toEqual(mockComment);
    });

    it('should update shareActionCount and Origin Ids from the state if share is successful', async () => {
      mockOriginTracingFactory.mockReset();

      const mockShareResponse = {};
      wrapper.instance().shareServiceClient.share = jest
        .fn()
        .mockResolvedValue(mockShareResponse);
      wrapper.instance().forceUpdate();
      const mockDialogContentState = {
        users: mockUsers,
        comment: mockComment,
      };
      const result = await wrapper
        .instance()
        .handleSubmitShare(mockDialogContentState);
      expect(mockOriginTracingFactory).toHaveBeenCalledTimes(2);
      expect(result).toEqual(mockShareResponse);
    });

    it('should return a Promise Rejection if share is failed', async () => {
      wrapper.instance().shareServiceClient.share = jest
        .fn()
        .mockRejectedValue('error');
      wrapper.instance().forceUpdate();
      const mockDialogContentState = {
        users: mockUsers,
        comment: mockComment,
      };
      try {
        await wrapper.instance().handleSubmitShare(mockDialogContentState);
      } catch (err) {
        expect(err).toEqual('error');
      }
    });
  });
});
