import * as React from 'react';
import { shallow } from 'enzyme';
import { utils } from '@atlaskit/util-service-support';
import { ShareDialogContainer } from '../../../components/ShareDialogContainer';
import { ShareDialogWithTrigger } from '../../../components/ShareDialogWithTrigger';

let wrapper;
let mockRequestService;
const mockCloudId = 'cloudId';
const mockProductId = 'productId';
const mockShareLink = 'share-link';
const mockShareTitle = 'Share Title';
const mockResourceType = 'site';
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
const mockAri = 'ari';
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
  mockRequestService = jest
    .spyOn(utils, 'requestService')
    .mockResolvedValue(mockCapabilities);
  wrapper = shallow(
    <ShareDialogContainer
      cloudId={mockCloudId}
      loadUserOptions={mockLoadUserOptions}
      productId={mockProductId}
      shareLink={mockShareLink}
      shareTitle={mockShareTitle}
      resourceType={mockResourceType}
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
  });

  it('should update origin tracing ids if shareLink prop is updated', () => {
    const prevState = wrapper.state();
    wrapper.setProps({ shareLink: 'new-share-link' });

    const newState = wrapper.state();
    expect(newState.prevShareLink).toEqual('new-share-link');
    expect(newState.copyLinkOrigin).not.toEqual(prevState.copyLinkOrigin);
    expect(newState.shareToAtlassianAccuntHoldersOrigin).not.toEqual(
      prevState.shareToAtlassianAccuntHoldersOrigin,
    );
    expect(newState.shareToNewUsersOrigin).not.toEqual(
      prevState.shareToNewUsersOrigin,
    );
  });

  describe('parseAri', () => {
    it('should parse an ari with the parameters correctly', () => {
      const jiraAndConfluenceProductIds = [
        'jira',
        'jira-core',
        'jira-software',
        'jira-servicedesk',
        'jira-incident-manager',
        'confluence',
      ];
      jiraAndConfluenceProductIds.forEach((productId: string) => {
        const siteAri = wrapper
          .instance()
          .parseAri(productId, mockCloudId, 'site');
        expect(siteAri).toEqual(`ari:cloud:${productId}::site/${mockCloudId}`);

        const resourceAri = wrapper
          .instance()
          .parseAri(productId, mockCloudId, 'anyResource', 'anyResourceId');
        expect(resourceAri).toEqual(
          `ari:cloud:${productId}:${mockCloudId}:anyResource/anyResourceId`,
        );
      });

      const otherProductIds = [
        'platform',
        'media',
        'identity',
        'ecosystem',
        'bitbucket',
        'trello',
        'platform-services',
        'teams',
      ];
      otherProductIds.forEach((productId: string) => {
        const resourceAri = wrapper
          .instance()
          .parseAri(productId, mockCloudId, 'anyResource', 'anyResourceId');
        expect(resourceAri).toEqual(
          `ari:cloud:${productId}::anyResource/anyResourceId`,
        );
      });
    });
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
      wrapper.instance().parseAri = jest.fn().mockReturnValue(mockAri);
      wrapper.instance().forceUpdate();
      const mockDialogContentState = {
        users: mockUsers,
        comment: mockComment,
      };
      wrapper.instance().handleSubmitShare(mockDialogContentState);
      expect(mockShare).toHaveBeenCalledTimes(1);
      expect(mockShare.mock.calls[0][0]).toEqual({
        ari: mockAri,
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
      const mockShareResponse = {};
      wrapper.instance().shareServiceClient.share = jest
        .fn()
        .mockResolvedValue(mockShareResponse);
      wrapper.instance().forceUpdate();
      const mockDialogContentState = {
        users: mockUsers,
        comment: mockComment,
      };
      const prevState = wrapper.state();
      const result = await wrapper
        .instance()
        .handleSubmitShare(mockDialogContentState);
      expect(
        wrapper.state().shareToAtlassianAccuntHoldersOrigin!.id,
      ).not.toEqual(prevState.shareToAtlassianAccuntHoldersOrigin!.id);
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
