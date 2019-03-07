// This works only by calling before importing InlineDialog
import mockPopper from '../_mockPopper';
mockPopper();

import InlineDialog from '@atlaskit/inline-dialog';
import { mountWithIntl, shallowWithIntl } from '@atlaskit/editor-test-helpers';
import { shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { messages } from '../../../i18n';
import {
  ShareButton,
  Props as ShareButtonProps,
} from '../../../components/ShareButton';
import {
  defaultShareContentState,
  Props,
  ShareDialogWithTrigger,
  State,
} from '../../../components/ShareDialogWithTrigger';
import { ShareData, ShareForm } from '../../../components/ShareForm';

let wrapper: ShallowWrapper<Props & InjectedIntlProps>;
let mockOnShareSubmit: jest.Mock;
const mockLoadOptions = () => [];

beforeEach(() => {
  wrapper = shallowWithIntl<Props>(
    <ShareDialogWithTrigger
      copyLink="copyLink"
      loadUserOptions={mockLoadOptions}
      onShareSubmit={mockOnShareSubmit}
    />,
  );
});

beforeAll(() => {
  mockOnShareSubmit = jest.fn();
});

describe('ShareDialogWithTrigger', () => {
  describe('default', () => {
    it('should render', () => {
      expect(wrapper.find(InlineDialog).length).toBe(1);
      expect(wrapper.find(InlineDialog).prop('isOpen')).toBe(false);
      expect(wrapper.find(ShareForm).length).toBe(0);
      expect(wrapper.find(ShareButton).length).toBe(1);
    });
  });

  describe('isDialogOpen state', () => {
    it('should be false by default', () => {
      expect((wrapper.state() as State).isDialogOpen).toBe(false);
    });

    it('should be passed into isOpen prop InlineDialog and isSelected props in ShareButton', () => {
      let { isDialogOpen }: Partial<State> = wrapper.state();
      expect(isDialogOpen).toEqual(false);
      expect(wrapper.find(InlineDialog).prop('isOpen')).toEqual(isDialogOpen);
      expect(wrapper.find(ShareButton).prop('isSelected')).toEqual(
        isDialogOpen,
      );

      (wrapper as any).setState({ isDialogOpen: !isDialogOpen });

      expect(wrapper.find(InlineDialog).prop('isOpen')).toEqual(!isDialogOpen);
      expect(wrapper.find(ShareButton).prop('isSelected')).toEqual(
        !isDialogOpen,
      );
    });

    it('should render ShareForm if isDialogOpen is true', () => {
      const mountWrapper: ReactWrapper<
        Props & InjectedIntlProps,
        State,
        any
      > = mountWithIntl<Props, State>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          loadUserOptions={mockLoadOptions}
          onShareSubmit={mockOnShareSubmit}
        />,
      );
      mountWrapper.setState({ isDialogOpen: true });
      expect(mountWrapper.find(ShareForm).length).toBe(1);
    });
  });

  describe('triggerButtonAppearance prop', () => {
    it('should pass to the value into ShareButton as appearance, and have a default value of "subtle"', () => {
      const newWrapper: ShallowWrapper<
        Props & InjectedIntlProps
      > = shallowWithIntl<Props>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          loadUserOptions={mockLoadOptions}
          onShareSubmit={mockOnShareSubmit}
        />,
      );
      expect(
        newWrapper
          .find(InlineDialog)
          .find(ShareButton)
          .prop('appearance'),
      ).toEqual('subtle');

      const mockAppearance = 'primary';
      newWrapper.setProps({ triggerButtonAppearance: mockAppearance });
      expect(
        newWrapper
          .find(InlineDialog)
          .find(ShareButton)
          .prop('appearance'),
      ).toEqual(mockAppearance);
    });
  });

  describe('triggerButtonStyle prop', () => {
    it('should render no text in the share button if the value is "icon-only"', () => {
      const newWrapper: ShallowWrapper<
        Props & InjectedIntlProps
      > = shallowWithIntl<Props>(
        <ShareDialogWithTrigger
          triggerButtonStyle="icon-only"
          copyLink="copyLink"
          loadUserOptions={mockLoadOptions}
          onShareSubmit={mockOnShareSubmit}
        />,
      );
      newWrapper.setState({ isDialogOpen: true });
      expect(
        newWrapper
          .find(InlineDialog)
          .find(ShareButton)
          .prop('text'),
      ).toBeNull();
    });

    it('should render text in the share button if the value is "icon-with-text"', () => {
      const newWrapper: ShallowWrapper<
        Props & InjectedIntlProps
      > = shallowWithIntl<Props>(
        <ShareDialogWithTrigger
          triggerButtonStyle="icon-with-text"
          copyLink="copyLink"
          loadUserOptions={mockLoadOptions}
          onShareSubmit={mockOnShareSubmit}
        />,
      );

      newWrapper.setState({ isDialogOpen: true });
      expect(
        newWrapper
          .find(InlineDialog)
          .find(ShareButton)
          .prop('text'),
      ).toEqual(<FormattedMessage {...messages.shareTriggerButtonText} />);
    });
  });

  describe('children prop', () => {
    it('should render a ShareButton if children prop is not given', () => {
      expect(wrapper.find(ShareButton).length).toBe(1);
    });

    it('should be called with the this.handleOpenDialog function as argument if given', () => {
      const spiedRenderer: jest.Mock = jest.fn();
      wrapper = shallowWithIntl<Props>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          loadUserOptions={mockLoadOptions}
          onShareSubmit={mockOnShareSubmit}
        >
          {spiedRenderer}
        </ShareDialogWithTrigger>,
      );
      const wrapperState: State = wrapper.state() as State;
      expect(spiedRenderer).toHaveBeenCalledTimes(1);
      expect(spiedRenderer).toHaveBeenCalledWith(
        expect.objectContaining({
          onClick: expect.any(Function),
          loading: wrapperState.isSharing,
          error: wrapperState.shareError,
        }),
      );
    });
  });

  describe('isDisabled prop', () => {
    it('should be passed into ShareButton', () => {
      let isDisabled: boolean = false;
      wrapper = shallowWithIntl<Props>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          isDisabled={isDisabled}
          loadUserOptions={mockLoadOptions}
          onShareSubmit={mockOnShareSubmit}
        />,
      );
      let shareButtonProps: ShareButtonProps = wrapper
        .find(ShareButton)
        .props();
      expect(shareButtonProps.isDisabled).toEqual(isDisabled);

      wrapper.setProps({ isDisabled: !isDisabled });

      shareButtonProps = wrapper.find(ShareButton).props();
      expect(shareButtonProps.isDisabled).toEqual(!isDisabled);
    });
  });

  describe('shareFormTitle prop', () => {
    it('should be passed to the ShareForm', () => {
      const wrapper: ShallowWrapper<
        Props & InjectedIntlProps
      > = shallowWithIntl<Props>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          loadUserOptions={mockLoadOptions}
          onShareSubmit={mockOnShareSubmit}
          shareFormTitle="Share this page"
        />,
      );
      wrapper.setState({ isDialogOpen: true });

      const ShareFormProps = shallow(wrapper
        .find(InlineDialog)
        .prop('content') as any)
        .find(ShareForm)
        .props();
      expect(ShareFormProps.title).toEqual('Share this page');
    });
  });

  describe('handleOpenDialog', () => {
    it('should set the isDialogOpen state to true', () => {
      expect((wrapper.state() as State).isDialogOpen).toEqual(false);
      wrapper.find(ShareButton).simulate('click');
      expect((wrapper.state() as State).isDialogOpen).toEqual(true);
    });

    it.skip('should send an analytic event', () => {});
  });

  describe('handleCloseDialog', () => {
    it('should set the isDialogOpen state to false', () => {
      wrapper = shallowWithIntl<Props>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          loadUserOptions={mockLoadOptions}
          onShareSubmit={mockOnShareSubmit}
        />,
      );
      wrapper.setState({ isDialogOpen: true });
      expect((wrapper.state() as State).isDialogOpen).toEqual(true);
      wrapper
        .find(InlineDialog)
        .simulate('close', { isOpen: false, event: { type: 'submit' } });
      expect((wrapper.state() as State).isDialogOpen).toEqual(false);
    });

    it.skip('should send an analytic event', () => {});

    it('should be trigger when the InlineDialog is closed', () => {
      const escapeKeyDownEvent: Partial<KeyboardEvent> = {
        target: document,
        type: 'keydown',
        key: 'Escape',
      };
      const wrapper: ShallowWrapper<
        Props & InjectedIntlProps
      > = shallowWithIntl<Props>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      wrapper.setState({ isDialogOpen: true });
      expect((wrapper.state() as State).isDialogOpen).toEqual(true);
      wrapper
        .find(InlineDialog)
        .simulate('close', { isOpen: false, event: escapeKeyDownEvent });
      expect((wrapper.state() as State).isDialogOpen).toEqual(false);
    });
  });

  describe('handleShareSubmit', () => {
    it('should call onSubmit props with an object of users and comment as an argument', () => {
      const mockOnSubmit: jest.Mock = jest.fn().mockResolvedValue({});
      const values: ShareData = {
        users: [
          { type: 'user', id: 'id', name: 'name' },
          { type: 'email', id: 'email', name: 'email' },
        ],
        comment: {
          format: 'plain_text',
          value: 'comment',
        },
      };
      const mockState: Partial<State> = {
        isDialogOpen: true,
        isSharing: false,
        ignoreIntermediateState: false,
        defaultValue: defaultShareContentState,
      };
      wrapper = shallowWithIntl<Props>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          onShareSubmit={mockOnSubmit}
          loadUserOptions={mockLoadOptions}
        />,
      );
      wrapper.setState(mockState);

      shallow(wrapper.find(InlineDialog).prop('content') as any)
        .find(ShareForm)
        .simulate('shareClick', values);
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith(values);
    });

    it('should close inline dialog when onSubmit resolves a value', () => {
      const mockOnSubmit: jest.Mock = jest
        .fn()
        .mockReturnValue(Promise.resolve());
      const wrapper: ShallowWrapper<
        Props & InjectedIntlProps
      > = shallowWithIntl<Props>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          onShareSubmit={mockOnSubmit}
        />,
      );

      const Content: React.StatelessComponent<{}> = () =>
        wrapper.find(InlineDialog).prop('content');
      const content: ShallowWrapper<{}> = shallow(<Content />);

      expect(content.find(ShareForm)).toHaveLength(1);
      const shareData: {} = {};
      content.find(ShareForm).simulate('shareClick', shareData);

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith(shareData);

      expect(wrapper.state('isDialogOpen')).toBeFalsy();
    });
  });
});
