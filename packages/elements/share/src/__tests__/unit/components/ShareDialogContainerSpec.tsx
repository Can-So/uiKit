import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { utils } from '@atlaskit/util-service-support';
import {
  ShareDialogContainer,
  Props,
  State,
} from '../../../components/ShareDialogContainer';
import { ShareDialogWithTrigger } from '../../../components/ShareDialogWithTrigger';
import * as InvitationsCapabilitiesExports from '../../../api/InvitationsCapabilitiesResource';
import * as ShareServiceExports from '../../../clients/ShareServiceClient';
import { Client } from '../../../types';

let wrapper: ShallowWrapper<Props, State, ShareDialogContainer>;
let mockOriginTracing: any;
let mockOriginTracingFactory: any;
let mockRequestService: any;
let mockInvitationCapabilitiesResource: any;
let mockShareServiceClient: any;
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
const mockGetCapabilities = jest.fn().mockResolvedValue(mockCapabilities);
const mockShare = jest.fn().mockResolvedValue({});
const mockClient = {
  getCapabilities: mockGetCapabilities,
  share: mockShare,
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
  mockInvitationCapabilitiesResource = jest
    .spyOn(InvitationsCapabilitiesExports, 'InvitationsCapabilitiesResource')
    .mockImplementation(() => ({
      getCapabilities: mockGetCapabilities,
    }));
  mockShareServiceClient = jest
    .spyOn(ShareServiceExports, 'ShareServiceClient')
    .mockImplementation(() => ({
      share: mockShare,
    }));
  wrapper = shallow(
    <ShareDialogContainer
      client={mockClient}
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
  (wrapper as any) = null;
  mockRequestService.mockRestore();
  mockInvitationCapabilitiesResource.mockRestore();
  mockShareServiceClient.mockRestore();
});

describe('ShareDialogContainer', () => {
  it('should render', () => {
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
    expect(mockClient.getCapabilities).toHaveBeenCalledTimes(1);
    expect(wrapper.state().capabilities).toEqual(mockCapabilities);
  });

  it('should call props.originTracingFactory if shareLink prop is updated', () => {
    mockOriginTracingFactory.mockReset();
    wrapper.setProps({ shareLink: 'new-share-link' });
    expect(wrapper.state().prevShareLink).toEqual('new-share-link');
    expect(mockOriginTracingFactory).toHaveBeenCalledTimes(3);
  });

  it('should have default this.client if props.client is not given', () => {
    const newWrapper = shallow<ShareDialogContainer>(
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

    // @ts-ignore: accessing private variable for testing purpose
    const client: Client = newWrapper.instance().client;
    expect(client.getCapabilities).toEqual(mockGetCapabilities);
    expect(client.share).toEqual(mockShare);
  });

  describe('handleCopyLink', () => {
    it('should send analytics', () => {
      const mockAttributes = {};
      const spiedToAnalyticsAttributes = jest
        .fn()
        .mockReturnValue(mockAttributes);
      (wrapper.instance().state as any).copyLinkOrigin = {
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
    it('should call share function from this.client', () => {
      (wrapper.instance() as any).client.share = jest
        .fn()
        .mockResolvedValue({});
      const mockShare = (wrapper.instance() as any).client.share;
      wrapper.instance().forceUpdate();
      const mockDialogContentState = {
        users: mockUsers,
        comment: mockComment,
      };
      wrapper.instance().handleSubmitShare(mockDialogContentState as any);
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
      (wrapper.instance() as any).client.share = jest
        .fn()
        .mockResolvedValue(mockShareResponse);
      wrapper.instance().forceUpdate();
      const mockDialogContentState = {
        users: mockUsers,
        comment: mockComment,
      };
      const result = await wrapper
        .instance()
        .handleSubmitShare(mockDialogContentState as any);
      expect(mockOriginTracingFactory).toHaveBeenCalledTimes(2);
      expect(result).toEqual(mockShareResponse);
    });

    it('should return a Promise Rejection if share is failed', async () => {
      (wrapper.instance() as any).client.share = jest
        .fn()
        .mockRejectedValue('error');
      wrapper.instance().forceUpdate();
      const mockDialogContentState = {
        users: mockUsers,
        comment: mockComment,
      };
      try {
        await wrapper
          .instance()
          .handleSubmitShare(mockDialogContentState as any);
      } catch (err) {
        expect(err).toEqual('error');
      }
    });
  });
});
