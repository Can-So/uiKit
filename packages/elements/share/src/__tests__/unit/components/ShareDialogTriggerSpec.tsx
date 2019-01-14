import * as React from 'react';
import { mount, shallow } from 'enzyme';
import InlineDialog from '@atlaskit/inline-dialog';
import {
  ShareButton,
  Props as ShareButtonProps,
} from '../../../components/ShareButton';
import { ShareForm } from '../../../components/ShareForm';
import {
  ShareDialogTrigger,
  defaultDialogContentState,
} from '../../../components/ShareDialogTrigger';

describe('ShareDialogTrigger', () => {
  describe('default', () => {
    it('should render', () => {
      const wrapper = shallow<ShareDialogTrigger>(<ShareDialogTrigger />);
      expect(wrapper.find(InlineDialog).length).toBe(1);
      // TODO: where to get type InlineDialogProps?
      expect(wrapper.find<any>(InlineDialog).props().isOpen).toBe(false);
      expect(wrapper.find(ShareForm).length).toBe(0);
      expect(wrapper.find(ShareButton).length).toBe(1);
    });
  });

  describe('isDialogOpen state', () => {
    it('should be false by default', () => {
      const wrapper = shallow<ShareDialogTrigger>(<ShareDialogTrigger />);
      expect(wrapper.state().isDialogOpen).toBe(false);
    });

    it('should be passed into isOpen prop InlineDialog and isSelected and isDisabled props in ShareButton', () => {
      const wrapper = shallow<ShareDialogTrigger>(<ShareDialogTrigger />);
      let { isDialogOpen } = wrapper.state();
      // TODO: where to get type InlineDialogProps?
      let inlineDialogProps = wrapper.find<any>(InlineDialog).props();
      let shareButtonProps: ShareButtonProps = wrapper
        .find(ShareButton)
        .props();
      expect(isDialogOpen).toEqual(false);
      expect(inlineDialogProps.isOpen).toEqual(isDialogOpen);
      expect(shareButtonProps.isSelected).toEqual(isDialogOpen);
      expect(shareButtonProps.isDisabled).toEqual(isDialogOpen);

      wrapper.setState({ isDialogOpen: !isDialogOpen });

      inlineDialogProps = wrapper.find(InlineDialog).props();
      shareButtonProps = wrapper.find(ShareButton).props();
      expect(inlineDialogProps.isOpen).toEqual(!isDialogOpen);
      expect(shareButtonProps.isSelected).toEqual(!isDialogOpen);
      expect(shareButtonProps.isDisabled).toEqual(!isDialogOpen);
    });

    it('should render ShareForm if isDialogOpen is true', () => {
      const wrapper = mount<ShareDialogTrigger>(<ShareDialogTrigger />);
      wrapper.setState({ isDialogOpen: true });
      expect(wrapper.find(ShareForm).length).toBe(1);
    });
  });

  describe('isStateValidWithCapabilities', () => {
    it('should be updated only if isDialogOpen state is true, capabilities and validateStateWithCapabilities props are given', () => {
      const mockCapabilities = {};
      const mockIsStateValidWithCapabilities = false;
      const spiedValidateStateWithCapabilities = jest.fn(
        () => mockIsStateValidWithCapabilities,
      );
      let wrapper = shallow<ShareDialogTrigger>(
        <ShareDialogTrigger
          capabilities={mockCapabilities}
          validateStateWithCapabilities={spiedValidateStateWithCapabilities}
        />,
      );
      expect(spiedValidateStateWithCapabilities).not.toHaveBeenCalled();

      wrapper = shallow<ShareDialogTrigger>(
        <ShareDialogTrigger
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

    it('should be passed into ShareForm as shouldCapabilitiesWarningShow props', () => {
      const wrapper = mount<ShareDialogTrigger>(<ShareDialogTrigger />);
      wrapper.setState({
        isDialogOpen: true,
        isStateValidWithCapabilities: !wrapper.state()
          .isStateValidWithCapabilities,
      });
      let shareFormProps = wrapper.find(ShareForm).props();
      expect(shareFormProps.shouldCapabilitiesWarningShow).toEqual(
        wrapper.state().isStateValidWithCapabilities,
      );
    });
  });

  describe('children prop', () => {
    it('should render a ShareButton if children prop is not given', () => {
      const wrapper = shallow<ShareDialogTrigger>(<ShareDialogTrigger />);
      expect(wrapper.find(ShareButton).length).toBe(1);
    });

    it('should be called with the this.handleOpenDialog function as argument if given', () => {
      const spiedRenderer = jest.fn();
      const wrapper = shallow<ShareDialogTrigger>(
        <ShareDialogTrigger>{spiedRenderer}</ShareDialogTrigger>,
      );
      expect(spiedRenderer).toHaveBeenCalledTimes(1);
      expect(spiedRenderer.mock.calls[0][0]).toBe(
        wrapper.instance().handleOpenDialog,
      );
    });
  });

  describe('isDisabled prop', () => {
    it('should be passed into ShareButton', () => {
      let isDisabled = false;
      const wrapper = shallow<ShareDialogTrigger>(
        <ShareDialogTrigger isDisabled={isDisabled} />,
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

  describe('handleOpenDialog', () => {
    it('should set the isDialogOpen state to true', () => {
      const wrapper = shallow<ShareDialogTrigger>(<ShareDialogTrigger />);
      expect(wrapper.state().isDialogOpen).toEqual(false);
      // @ts-ignore
      wrapper.instance().handleOpenDialog();
      expect(wrapper.state().isDialogOpen).toEqual(true);
    });

    it.skip('should send an analytic event', () => {});

    it('should be triggered when ShareButton is clicked', () => {
      const wrapper = shallow<ShareDialogTrigger>(<ShareDialogTrigger />);
      const instance = wrapper.instance();
      const spiedHandleOpenDialog = jest.spyOn(instance, 'handleOpenDialog');
      instance.forceUpdate();
      wrapper.find(ShareButton).simulate('click');
      expect(spiedHandleOpenDialog).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleCloseDialog', () => {
    const eventMap: { click: Function | null } = { click: null };

    beforeAll(() => {
      // prepare for the addEventListener mock
      window.addEventListener = jest.fn((event, cb) => (eventMap[event] = cb));
    });

    afterAll(() => {
      // clear the mock
      // TODO: how to extend to addEventListener type with { mockClear: Function }?
      // @ts-ignore
      window.addEventListener.mockClear();
    });

    it('should set the isDialogOpen state to false', () => {
      const wrapper = shallow<ShareDialogTrigger>(<ShareDialogTrigger />);
      wrapper.setState({ isDialogOpen: true });
      expect(wrapper.state().isDialogOpen).toEqual(true);
      wrapper
        .instance()
        .handleCloseDialog({ isOpen: false, event: { type: 'click' } });
      expect(wrapper.state().isDialogOpen).toEqual(false);
    });

    it.skip('should send an analytic event', () => {});

    it('should be trigger when the InlineDialog is closed', () => {
      // prepare for the addEventListener stub
      const eventMap: { click: Function | null } = { click: null };
      window.addEventListener = jest.fn((event, cb) => (eventMap[event] = cb));

      // mount the component, and display the InlineDialog
      const wrapper = mount<ShareDialogTrigger>(<ShareDialogTrigger />);
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
    });
  });

  describe('handleShareUsersChange', () => {
    it('should update the users state with the first parameter', () => {
      const wrapper = shallow<ShareDialogTrigger>(<ShareDialogTrigger />);
      const mockUsers = [{}, {}, {}];
      wrapper.instance().handleShareUsersChange(mockUsers);
      expect(wrapper.state().users).toEqual(mockUsers);
    });

    it('should call onUsersChange prop if it is given', () => {
      const spiedOnUsersChange = jest.fn();
      const wrapper = shallow<ShareDialogTrigger>(
        <ShareDialogTrigger onUsersChange={spiedOnUsersChange} />,
      );
      wrapper.instance().handleShareUsersChange([{}]);
      expect(spiedOnUsersChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleShareCommentChange', () => {
    it('should update the users state with the first parameter', () => {
      const wrapper = shallow<ShareDialogTrigger>(<ShareDialogTrigger />);
      const mockComment = 'comment';
      wrapper.instance().handleShareCommentChange(mockComment);
      expect(wrapper.state().comment).toEqual(mockComment);
    });

    it('should call onCommentChange prop if it is given', () => {
      const spiedOnCommentChange = jest.fn();
      const wrapper = shallow<ShareDialogTrigger>(
        <ShareDialogTrigger onCommentChange={spiedOnCommentChange} />,
      );
      wrapper.instance().handleShareCommentChange('comment');
      expect(spiedOnCommentChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleShareSubmit', () => {
    it('should call onSubmit props with an object of users and comment as an argument', () => {
      const mockOnSubmit = jest.fn().mockResolvedValue({});
      const mockState = { users: [{}, {}, {}], comment: 'comment' };
      const mockSubmitEvent = {
        target: document.createElement('form'),
        type: 'submit',
      };
      const wrapper = shallow<ShareDialogTrigger>(
        <ShareDialogTrigger onSubmit={mockOnSubmit} />,
      );
      wrapper.setState(mockState);
      wrapper.instance().handleShareSubmit(mockSubmitEvent);
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit.mock.calls[0][0]).toEqual(mockState);
    });

    it('should only call this.handleCloseDialog if onSubmit resolves a value', async () => {
      const mockOnSubmit = jest
        .fn()
        .mockRejectedValueOnce(new Error('rejected'))
        .mockResolvedValue({});
      const mockSubmitEvent = {
        target: document.createElement('form'),
        type: 'submit',
      };
      const wrapper = shallow<ShareDialogTrigger>(
        <ShareDialogTrigger onSubmit={mockOnSubmit} />,
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

    it('should call clearDialogContentState if there is an ESC key pressed or a form submission', async () => {
      const mockOnSubmit = jest.fn().mockResolvedValue({});
      const mockSubmitEvent = {
        target: document.createElement('form'),
        type: 'submit',
      };
      const mockEscKeyPressEvent = {
        type: 'keyPress',
      };
      const wrapper = shallow<ShareDialogTrigger>(
        <ShareDialogTrigger onSubmit={mockOnSubmit} />,
      );
      const spiedClearDialogContentState = jest.spyOn(
        wrapper.instance(),
        'clearDialogContentState',
      );

      await wrapper.instance().handleShareSubmit(mockSubmitEvent);
      expect(spiedClearDialogContentState).toHaveBeenCalledTimes(1);

      await wrapper.instance().handleShareSubmit(mockEscKeyPressEvent);
      expect(spiedClearDialogContentState).toHaveBeenCalledTimes(2);
    });
  });

  describe('clearDialogContentState', () => {
    it('should set the defaultDialogContentState', () => {
      const wrapper = shallow<ShareDialogTrigger>(<ShareDialogTrigger />);
      const newState = {
        isDialogOpen: true,
        users: [{}, {}, {}],
        comment: 'comment',
      };
      wrapper.setState(newState);
      wrapper.instance().clearDialogContentState();

      const state = wrapper.state();
      expect(state.isDialogOpen).toEqual(newState.isDialogOpen);
      expect(state.users).toEqual(defaultDialogContentState.users);
      expect(state.comment).toEqual(defaultDialogContentState.comment);
    });
  });
});
