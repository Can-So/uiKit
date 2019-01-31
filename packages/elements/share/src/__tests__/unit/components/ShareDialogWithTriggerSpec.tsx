import * as React from 'react';
import { mount, shallow } from 'enzyme';
import InlineDialog from '@atlaskit/inline-dialog';
import { createMockEvent } from '../_testUtils';
import { ShareButton } from '../../../components/ShareButton';
import { ShareForm } from '../../../components/ShareForm';
import {
  ShareDialogWithTrigger,
  defaultDialogContentState,
} from '../../../components/ShareDialogWithTrigger';

describe('ShareDialogWithTrigger', () => {
  describe('default', () => {
    it('should render', () => {
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      expect(wrapper.find(InlineDialog).length).toBe(1);
      expect(wrapper.find(InlineDialog).prop('isOpen')).toBe(false);
      expect(wrapper.find(ShareForm).length).toBe(0);
      expect(wrapper.find(ShareButton).length).toBe(1);
    });
  });

  describe('isDialogOpen state', () => {
    it('should be false by default', () => {
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      expect(wrapper.state().isDialogOpen).toBe(false);
    });

    it('should be passed into isOpen prop InlineDialog and isSelected props in ShareButton', () => {
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      let { isDialogOpen } = wrapper.state();
      expect(isDialogOpen).toEqual(false);
      expect(wrapper.find(InlineDialog).prop('isOpen')).toEqual(isDialogOpen);
      expect(wrapper.find(ShareButton).prop('isSelected')).toEqual(
        isDialogOpen,
      );

      wrapper.setState({ isDialogOpen: !isDialogOpen });

      expect(wrapper.find(InlineDialog).prop('isOpen')).toEqual(!isDialogOpen);
      expect(wrapper.find(ShareButton).prop('isSelected')).toEqual(
        !isDialogOpen,
      );
    });

    it('should render ShareForm if isDialogOpen is true', () => {
      const wrapper = mount<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      wrapper.setState({ isDialogOpen: true });
      expect(wrapper.find(ShareForm).length).toBe(1);
    });
  });

  describe('isStateValidWithCapabilities', () => {
    it('should be updated only if isDialogOpen state is true, capabilities and validateStateWithCapabilities props are given', () => {
      const mockCapabilities = {
        directInvite: {
          mode: 'ANYONE' as 'ANYONE',
          permittedResources: ['mockAri'],
        },
        invitePendingApproval: {
          mode: 'ANYONE' as 'ANYONE',
          permittedResources: ['mockAri'],
        },
      };
      const mockIsStateValidWithCapabilities = false;
      const spiedValidateStateWithCapabilities = jest.fn(
        () => mockIsStateValidWithCapabilities,
      );
      let wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          capabilities={mockCapabilities}
          validateStateWithCapabilities={spiedValidateStateWithCapabilities}
        />,
      );
      expect(spiedValidateStateWithCapabilities).not.toHaveBeenCalled();

      wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          validateStateWithCapabilities={spiedValidateStateWithCapabilities}
        />,
      );
      wrapper.setState({ isDialogOpen: true });
      expect(spiedValidateStateWithCapabilities).not.toHaveBeenCalled();

      const latestStateSnapshot = wrapper.state();
      wrapper.setProps({ capabilities: mockCapabilities });
      expect(spiedValidateStateWithCapabilities).toHaveBeenCalledTimes(1);
      expect(spiedValidateStateWithCapabilities.mock.calls[0][0]).toEqual(
        latestStateSnapshot,
      );
      expect(spiedValidateStateWithCapabilities.mock.calls[0][1]).toEqual(
        mockCapabilities,
      );

      expect(wrapper.state().isStateValidWithCapabilities).toEqual(
        mockIsStateValidWithCapabilities,
      );
    });

    it('should be passed into ShareForm as shouldShowCapabilitiesInfoMessage props', () => {
      const wrapper = mount<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      wrapper.setState({
        isDialogOpen: true,
        isStateValidWithCapabilities: !wrapper.state()
          .isStateValidWithCapabilities,
      });
      let shareFormProps = wrapper.find(ShareForm).props();
      expect(shareFormProps.shouldShowCapabilitiesInfoMessage).toEqual(
        !wrapper.state().isStateValidWithCapabilities,
      );
    });
  });

  describe('children prop', () => {
    it('should render a ShareButton if children prop is not given', () => {
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      expect(wrapper.find(ShareButton).length).toBe(1);
    });

    it('should be called with the this.handleOpenDialog function as argument if given', () => {
      const spiedRenderer = jest.fn();
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink">
          {spiedRenderer}
        </ShareDialogWithTrigger>,
      );
      const wrapperState = wrapper.state();
      expect(spiedRenderer).toHaveBeenCalledTimes(1);
      expect(spiedRenderer.mock.calls[0][0]).toBe(
        wrapper.instance().handleOpenDialog,
      );
      expect(spiedRenderer.mock.calls[0][1]).toMatchObject({
        loading: wrapperState.isSharing,
        error: wrapperState.shareError,
      });
    });
  });

  describe('isDisabled prop', () => {
    it('should be passed into ShareButton', () => {
      let isDisabled = false;
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" isDisabled={isDisabled} />,
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
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      expect(wrapper.state().isDialogOpen).toEqual(false);
      // @ts-ignore
      wrapper.instance().handleOpenDialog();
      expect(wrapper.state().isDialogOpen).toEqual(true);
    });

    it.skip('should send an analytic event', () => {});

    it('should be triggered when ShareButton is clicked', () => {
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      const instance = wrapper.instance();
      const spiedHandleOpenDialog = jest.spyOn(instance, 'handleOpenDialog');
      instance.forceUpdate();
      wrapper.find(ShareButton).simulate('click');
      expect(spiedHandleOpenDialog).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleCloseDialog', () => {
    const eventMap: { click: Function | null; keydown: Function | null } = {
      click: null,
      keydown: null,
    };

    beforeAll(() => {
      // prepare for the addEventListener mock
      window.addEventListener = jest.fn((event, cb) => (eventMap[event] = cb));
      document.addEventListener = jest.fn(
        (event, cb) => (eventMap[event] = cb),
      );
    });

    afterAll(() => {
      // clear the mock
      // TODO: how to extend to addEventListener type with { mockClear: Function }?
      // @ts-ignore
      window.addEventListener.mockClear();
      // @ts-ignore
      document.addEventListener.mockClear();
    });

    it('should set the isDialogOpen state to false', () => {
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      wrapper.setState({ isDialogOpen: true });
      expect(wrapper.state().isDialogOpen).toEqual(true);
      wrapper
        .instance()
        .handleCloseDialog({ isOpen: false, event: { type: 'click' } });
      expect(wrapper.state().isDialogOpen).toEqual(false);
    });

    it.skip('should send an analytic event', () => {});

    it('should be trigger when the InlineDialog is closed', () => {
      // mount the component, and display the InlineDialog
      const wrapper = mount<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      wrapper.setState({ isDialogOpen: true });
      const instance = wrapper.instance();
      const spiedHandleCloseDialog = jest.spyOn(instance, 'handleCloseDialog');
      instance.forceUpdate();

      // simulate the event from the stub
      const clickEventOutsideComponent = {
        target: document.createElement('div'),
        type: 'click',
      };
      eventMap.click!(clickEventOutsideComponent);

      // check if the spied function is called
      expect(spiedHandleCloseDialog).toHaveBeenCalledTimes(1);

      spiedHandleCloseDialog.mockReset();

      wrapper.setState({ isDialogOpen: true });

      const spiedStopImmediatePropagation = jest.fn();
      const escapeKeyDownEvent = {
        target: document,
        type: 'keydown',
        key: 'Escape',
        stopImmediatePropagation: spiedStopImmediatePropagation,
      };

      eventMap.keydown!(escapeKeyDownEvent);
      expect(spiedHandleCloseDialog).toHaveBeenCalledTimes(1);
      expect(spiedStopImmediatePropagation).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleShareUsersChange', () => {
    it('should update the users state with the first parameter', () => {
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      const mockUsers = [
        { type: 'user' as 'user', id: 'id' },
        { email: 'email' },
      ];
      wrapper.instance().handleShareUsersChange(mockUsers);
      expect(wrapper.state().users).toEqual(mockUsers);
    });

    it('should call onUsersChange prop if it is given', () => {
      const spiedOnUsersChange = jest.fn();
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger
          copyLink="copyLink"
          onUsersChange={spiedOnUsersChange}
        />,
      );
      wrapper.instance().handleShareUsersChange([]);
      expect(spiedOnUsersChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleShareSubmit', () => {
    it('should call onSubmit props with an object of users and comment as an argument', () => {
      const mockOnSubmit = jest.fn().mockResolvedValue({});
      const mockState = {
        isDialogOpen: true,
        users: [{ type: 'user' as 'user', id: 'id' }, { email: 'email' }],
        comment: {
          format: 'plain_text' as 'plain_text',
          value: 'comment',
        },
        isStateValidWithCapabilities: true,
      };
      const mockSubmitEvent = createMockEvent('submit', {
        target: document.createElement('form'),
      });
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" onSubmit={mockOnSubmit} />,
      );
      wrapper.setState(mockState);
      wrapper.instance().handleShareSubmit(mockSubmitEvent);
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit.mock.calls[0][0]).toEqual({
        users: mockState.users,
        comment: mockState.comment,
      });
    });

    it('should only call this.handleCloseDialog if onSubmit resolves a value', async () => {
      const mockOnSubmit = jest
        .fn()
        .mockRejectedValueOnce(new Error('rejected'))
        .mockResolvedValue({});
      const mockSubmitEvent = createMockEvent('submit', {
        target: document.createElement('form'),
      });
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" onSubmit={mockOnSubmit} />,
      );
      const spiedHandleCloseDialog = jest.spyOn(
        wrapper.instance(),
        'handleCloseDialog',
      );
      wrapper.instance().forceUpdate();

      await wrapper.instance().handleShareSubmit(mockSubmitEvent);
      expect(spiedHandleCloseDialog).not.toHaveBeenCalled();

      await wrapper.instance().handleShareSubmit(mockSubmitEvent);
      expect(spiedHandleCloseDialog).toHaveBeenCalledTimes(1);
      expect(spiedHandleCloseDialog.mock.calls[0][0].isOpen).toBe(false);
      expect(spiedHandleCloseDialog.mock.calls[0][0].event).toEqual(
        mockSubmitEvent,
      );
    });

    it('should call clearDialogContentState if there is an ESC key pressed down or a form submission', async () => {
      const mockOnSubmit = jest.fn().mockResolvedValue({});
      const mockSubmitEvent = createMockEvent('submit', {
        target: document.createElement('form'),
      });
      const mockEscKeyDownEvent = createMockEvent('keydown', {
        key: 'Escape',
      });
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" onSubmit={mockOnSubmit} />,
      );
      const spiedClearDialogContentState = jest.spyOn(
        wrapper.instance(),
        'clearDialogContentState',
      );

      await wrapper.instance().handleShareSubmit(mockSubmitEvent);
      expect(spiedClearDialogContentState).toHaveBeenCalledTimes(1);

      await wrapper.instance().handleShareSubmit(mockEscKeyDownEvent);
      expect(spiedClearDialogContentState).toHaveBeenCalledTimes(2);
    });
  });

  describe('clearDialogContentState', () => {
    it('should set the defaultDialogContentState', () => {
      const wrapper = shallow<ShareDialogWithTrigger>(
        <ShareDialogWithTrigger copyLink="copyLink" />,
      );
      const newInitState = {
        isDialogOpen: true,
        users: [{ type: 'user' as 'user', id: 'id' }, { email: 'email' }],
        comment: {
          format: 'plain_text' as 'plain_text',
          value: 'comment',
        },
        isStateValidWithCapabilities: true,
      };
      wrapper.setState(newInitState);
      wrapper.instance().clearDialogContentState();

      const state = wrapper.state();
      expect(state.isDialogOpen).toEqual(newInitState.isDialogOpen);
      expect(state.users).toEqual(defaultDialogContentState.users);
      expect(state.comment).toEqual(defaultDialogContentState.comment);
      expect(state.isStateValidWithCapabilities).toEqual(
        newInitState.isStateValidWithCapabilities,
      );
    });
  });
});
