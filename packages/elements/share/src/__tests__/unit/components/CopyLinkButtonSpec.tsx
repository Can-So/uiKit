import * as React from 'react';
import { mount } from 'enzyme';
import Button from '@atlaskit/button';
import InlineDialog from '@atlaskit/inline-dialog';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import {
  CopyLinkButton,
  MessageContainer,
  HiddenInput,
} from '../../../components/CopyLinkButton';

describe('CopyLinkButton', () => {
  let originalExecCommand;
  let mockLink = 'link';
  const spiedExecCommand = jest.fn();

  beforeAll(() => {
    originalExecCommand = document.execCommand;
    document.execCommand = spiedExecCommand;
  });

  afterEach(() => {
    spiedExecCommand.mockReset();
  });

  afterAll(() => {
    document.execCommand = originalExecCommand;
  });

  it('should render', () => {
    const wrapper = mount<CopyLinkButton>(<CopyLinkButton link={mockLink} />);

    const inlineDialog = wrapper.find(InlineDialog);
    expect(inlineDialog.length).toEqual(1);
    expect(inlineDialog.prop('placement')).toEqual('top-start');

    const button = wrapper.find(Button);
    expect(button.length).toEqual(1);
    expect(button.prop('appearance')).toEqual('subtle-link');

    const hiddenInput = wrapper.find(HiddenInput);
    expect(hiddenInput.length).toEqual(1);
    expect(hiddenInput.prop('text')).toEqual(mockLink);

    // @ts-ignore accessing private property just for testing purpose
    expect(
      wrapper.instance().inputRef.current instanceof HTMLInputElement,
    ).toBe(true);
  });

  describe('shouldShowCopiedMessage state', () => {
    it('should render the copied to clip board message, and dismiss the message when click outside the Inline Dialog', () => {
      const eventMap: { click: Function } = { click: () => {} };
      window.addEventListener = jest.fn((event, cb) => (eventMap[event] = cb));

      const wrapper = mount<CopyLinkButton>(<CopyLinkButton link={mockLink} />);
      wrapper.setState({
        shouldShowCopiedMessage: true,
      });
      expect(wrapper.find(CheckCircleIcon).length).toEqual(1);
      expect(wrapper.find(MessageContainer).length).toEqual(1);

      const spiedHandleDimissCopiedMessage = jest.spyOn(
        wrapper.instance(),
        'handleDismissCopiedMessage',
      );
      wrapper.instance().forceUpdate();

      const clickEventOutsideMessageContainer = {
        target: document.createElement('div'),
        type: 'click',
      };
      eventMap.click(clickEventOutsideMessageContainer);

      wrapper.update();

      expect(spiedHandleDimissCopiedMessage).toHaveBeenCalledTimes(1);
      expect(wrapper.find(CheckCircleIcon).length).toEqual(0);
      expect(wrapper.find(MessageContainer).length).toEqual(0);
    });
  });

  describe('handleClick', () => {
    it('should copy the text from the HiddenInput', () => {
      const wrapper = mount<CopyLinkButton>(<CopyLinkButton link={mockLink} />);
      // @ts-ignore accessing private property just for testing purpose
      const spiedInputSelect = jest.spyOn(
        wrapper.instance().inputRef.current,
        'select',
      );
      wrapper.instance().handleClick();
      expect(spiedInputSelect).toHaveBeenCalledTimes(1);
      expect(spiedExecCommand).toHaveBeenCalledTimes(1);
      expect(wrapper.state().shouldShowCopiedMessage).toBe(true);
    });
  });
});
