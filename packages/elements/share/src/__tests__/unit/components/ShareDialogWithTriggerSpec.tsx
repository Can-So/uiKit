import InlineDialog from '@atlaskit/inline-dialog';
import { shallowWithIntl } from '@atlaskit/editor-test-helpers';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../../../i18n';
import { ShareButton } from '../../../components/ShareButton';
import {
  defaultShareContentState,
  Props,
  ShareDialogWithTrigger,
  State,
} from '../../../components/ShareDialogWithTrigger';
import { ShareData, ShareForm } from '../../../components/ShareForm';

jest.mock('popper.js', () => {
  // @ts-ignore: jest does not have type for requireActual
  const PopperJS = jest.requireActual('popper.js');

  return class Popper {
    static placements = PopperJS.placements;

    constructor() {
      return {
        destroy: () => {},
        scheduleUpdate: () => {},
      };
    }
  };
});

let wrapper: ShallowWrapper<Props, State, ShareDialogWithTrigger>;
let mockOnShareSubmit: jest.Mock;
const mockLoadOptions = () => [];

beforeEach(() => {
  wrapper = shallow<ShareDialogWithTrigger>(
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
      expect(wrapper.state().isDialogOpen).toBe(false);
    });

    it('should be passed into isOpen prop InlineDialog and isSelected props in ShareButton', () => {
      let { isDialogOpen } = wrapper.state();
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
      const mountWrapper = mount<ShareDialogWithTrigger>(
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

  describe('buttonStyle prop', () => {
    it('should render no text in the share button if the value is "icon-only"', () => {
      const newWrapper = shallowWithIntl<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger
          buttonStyle="icon-only"
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
      const newWrapper = shallowWithIntl<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger
          buttonStyle="icon-with-text"
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
      const spiedRenderer = jest.fn();
      wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          loadUserOptions={mockLoadOptions}
          onShareSubmit={mockOnShareSubmit}
        >
          {spiedRenderer}
        </ShareDialogWithTrigger>,
      );
      const wrapperState = wrapper.state();
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
      let isDisabled = false;
      wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          isDisabled={isDisabled}
          loadUserOptions={mockLoadOptions}
          onShareSubmit={mockOnShareSubmit}
        />,
      );
      let shareButtonProps = wrapper.find(ShareButton).props();
      expect(shareButtonProps.isDisabled).toEqual(isDisabled);

      wrapper.setProps({ isDisabled: !isDisabled });

      shareButtonProps = wrapper.find(ShareButton).props();
      expect(shareButtonProps.isDisabled).toEqual(!isDisabled);
    });
  });

  describe('handleOpenDialog', () => {
    it('should set the isDialogOpen state to true', () => {
      expect(wrapper.state().isDialogOpen).toEqual(false);
      wrapper.find(ShareButton).simulate('click');
      expect(wrapper.state().isDialogOpen).toEqual(true);
    });

    it.skip('should send an analytic event', () => {});
  });

  describe('handleCloseDialog', () => {
    it('should set the isDialogOpen state to false', () => {
      wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          loadUserOptions={mockLoadOptions}
          onShareSubmit={mockOnShareSubmit}
        />,
      );
      wrapper.setState({ isDialogOpen: true });
      expect(wrapper.state().isDialogOpen).toEqual(true);
      wrapper
        .find(InlineDialog)
        .simulate('close', { isOpen: false, event: { type: 'submit' } });
      expect(wrapper.state().isDialogOpen).toEqual(false);
    });

    it.skip('should send an analytic event', () => {});

    it('should be trigger when the InlineDialog is closed', () => {
      const escapeKeyDownEvent = {
        target: document,
        type: 'keydown',
        key: 'Escape',
      };

      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      wrapper.setState({ isDialogOpen: true });
      expect(wrapper.state().isDialogOpen).toEqual(true);
      wrapper
        .find(InlineDialog)
        .simulate('close', { isOpen: false, event: escapeKeyDownEvent });
      expect(wrapper.state().isDialogOpen).toEqual(false);
    });
  });

  describe('handleShareSubmit', () => {
    it('should call onSubmit props with an object of users and comment as an argument', () => {
      const mockOnSubmit = jest.fn().mockResolvedValue({});
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

      const mockState: State = {
        isDialogOpen: true,
        isSharing: false,
        ignoreIntermediateState: false,
        defaultValue: defaultShareContentState,
      };
      wrapper = shallow<ShareDialogWithTrigger>(
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
      const mockOnSubmit = jest.fn().mockReturnValue(Promise.resolve());
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          onShareSubmit={mockOnSubmit}
        />,
      );

      const Content: React.StatelessComponent<{}> = () =>
        wrapper.find(InlineDialog).prop('content');
      const content = shallow(<Content />);

      expect(content.find(ShareForm)).toHaveLength(1);
      const shareData = {};
      content.find(ShareForm).simulate('shareClick', shareData);

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith(shareData);

      expect(wrapper.state('isDialogOpen')).toBeFalsy();
    });
  });
});
