import * as React from 'react';
import { mount } from 'enzyme';
import { calculatePosition } from '../../../../ui/Popup/utils';

describe('@atlaskit/editor-common popup utils', () => {
  let offset;
  let stickToBottom;
  let wrapper;
  let root;
  let popup;
  let target;

  beforeEach(() => {
    offset = [0, 0];
    stickToBottom = false;
    wrapper = mount(
      <div id="root">
        <span id="popup">OPA</span>
        <figure id="target" />
      </div>,
    );

    root = wrapper.find('#root').getDOMNode();
    popup = wrapper.find('#popup').getDOMNode();
    target = wrapper.find('#target').getDOMNode();

    root.getBoundingClientRect = () => ({
      top: 2,
      left: 3,
      right: 5,
      height: 7,
      width: 11,
    });

    popup.getBoundingClientRect = () => ({
      top: 13,
      left: 17,
      right: 19,
      height: 23,
      width: 29,
    });

    target.getBoundingClientRect = () => ({
      top: 31,
      left: 37,
      right: 41,
      height: 47,
      width: 53,
    });

    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      get() {
        return root;
      },
    });
  });

  it('should calculatePosition for top and left placement', () => {
    const placement = ['top', 'left'] as [string, string];
    const calc = calculatePosition({
      placement,
      target,
      popup,
      offset,
      stickToBottom,
    });

    expect(calc).toEqual({
      bottom: -22,
      left: 34,
    });
  });

  it('should calculatePosition for bottom and left placement', () => {
    const placement = ['bottom', 'left'] as [string, string];
    const calc = calculatePosition({
      placement,
      target,
      popup,
      offset,
      stickToBottom,
    });

    expect(calc).toEqual({
      top: 76,
      left: 34,
    });
  });

  it('should calculatePosition for bottom and center placement', () => {
    const placement = ['bottom', 'center'] as [string, string];
    const calc = calculatePosition({
      placement,
      target,
      popup,
      offset,
      stickToBottom,
    });

    expect(calc).toEqual({
      top: 76,
      left: 61,
    });
  });

  it('should calculatePosition for bottom and right placement', () => {
    const placement = ['bottom', 'right'] as [string, string];
    const calc = calculatePosition({
      placement,
      target,
      popup,
      offset,
      stickToBottom,
    });

    expect(calc).toEqual({
      top: 76,
      right: -36,
    });
  });
});
