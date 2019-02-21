import { OptionData } from '@atlaskit/user-picker';
import { utils } from '@atlaskit/util-service-support';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import * as InvitationsCapabilitiesExports from '../../../api/InvitationsCapabilitiesResource';
import * as ShareServiceExports from '../../../clients/ShareServiceClient';
import {
  Props,
  ShareDialogContainer,
  State,
} from '../../../components/ShareDialogContainer';
import { ShareDialogWithTrigger } from '../../../components/ShareDialogWithTrigger';
import { Client, OriginTracing } from '../../../types';

let wrapper: ShallowWrapper<Props, State, ShareDialogContainer>;
let mockOriginTracing: OriginTracing;
let mockOriginTracingFactory: jest.Mock;
let mockRequestService: jest.Mock;
let mockInvitationCapabilitiesResource: jest.Mock;
let mockShareServiceClient: jest.Mock;
const mockCloudId = 'cloudId';
const mockProductId = 'productId';
const mockShareAri = 'ari';
const mockShareLink = 'share-link';
const mockShareTitle = 'Share Title';
const mockButtonStyle = 'icon-with-text' as 'icon-with-text';
const mockCopyLink = 'copy-link';
const mockFormatCopyLink = jest.fn().mockReturnValue(mockCopyLink);
const mockShouldShowCommentField = true;
const mockShouldCloseOnEscapePress = true;
const mockUsers: OptionData[] = [
  { type: 'user', id: 'id', name: 'User 1' },
  { type: 'email', id: 'mock@email.com', name: 'mock@email.com' },
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
    id: 'id',
    addToUrl: jest.fn(),
    toAnalyticsAttributes: jest.fn(),
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
      buttonStyle={mockButtonStyle}
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
  mockRequestService.mockRestore();
  mockInvitationCapabilitiesResource.mockRestore();
  mockShareServiceClient.mockRestore();
});

describe('ShareDialogContainer', () => {
  it('should render', () => {
    const shareDialogWithTrigger = wrapper.find(ShareDialogWithTrigger);
    expect(shareDialogWithTrigger).toHaveLength(1);
    expect(mockFormatCopyLink).toHaveBeenCalled();
    expect(shareDialogWithTrigger.prop('buttonStyle')).toEqual(mockButtonStyle);
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
    expect(mockOriginTracingFactory).toHaveBeenCalledTimes(2);
    expect(mockClient.getCapabilities).toHaveBeenCalledTimes(1);
    expect(wrapper.state().capabilities).toEqual(mockCapabilities);
  });

  it('should call props.originTracingFactory if shareLink prop is updated', () => {
    mockOriginTracingFactory.mockReset();
    wrapper.setProps({ shareLink: 'new-share-link' });
    expect(wrapper.state().prevShareLink).toEqual('new-share-link');
    expect(mockOriginTracingFactory).toHaveBeenCalledTimes(2);
  });

  it('should have default this.client if props.client is not given', () => {
    const newWrapper: ShallowWrapper<
      Props,
      State,
      ShareDialogContainer
    > = shallow<ShareDialogContainer>(
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
      wrapper.setState({
        copyLinkOrigin: mockOriginTracing,
      });
      wrapper.instance().forceUpdate();
      wrapper.instance().handleCopyLink();
      expect(mockOriginTracing.toAnalyticsAttributes).toHaveBeenCalledTimes(1);
      expect(mockOriginTracing.toAnalyticsAttributes).toHaveBeenCalledWith({
        hasGeneratedId: true,
      });
      // TODO: complete when analytic is sent
    });
  });

  describe('handleSubmitShare', () => {
    it('should call share function from this.client', () => {
      const mockDialogContentState = {
        users: mockUsers,
        comment: mockComment,
      };
      wrapper.instance().handleSubmitShare(mockDialogContentState);
      wrapper.instance().forceUpdate();
      expect(mockShare).toHaveBeenCalledTimes(1);
      expect(mockShare).toHaveBeenCalledWith(
        {
          ari: mockShareAri,
          link: mockShareLink,
          title: mockShareTitle,
        },
        [{ type: 'user', id: 'id' }, { type: 'user', email: 'mock@email.com' }],
        {
          productId: mockProductId,
          atlOriginId: wrapper.state().shareOrigin!.id,
        },
        mockComment,
      );
    });

    it('should update shareActionCount and Origin Ids from the state if share is successful', async () => {
      mockOriginTracingFactory.mockReset();

      const mockShareResponse = {};
      mockShare.mockResolvedValueOnce(mockShareResponse);
      const mockDialogContentState = {
        users: mockUsers,
        comment: mockComment,
      };
      const result = await wrapper
        .instance()
        .handleSubmitShare(mockDialogContentState as any);
      expect(mockOriginTracingFactory).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockShareResponse);
    });

    it('should return a Promise Rejection if share is failed', async () => {
      mockShare.mockRejectedValueOnce('error');
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
