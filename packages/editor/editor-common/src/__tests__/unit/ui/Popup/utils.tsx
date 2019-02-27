import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import {
  calculatePosition,
  getVerticalPlacement,
  getHorizontalPlacement,
} from '../../../../ui/Popup/utils';

describe('@atlaskit/editor-common popup utils', () => {
  let offset: number[];
  let stick: boolean;
  let wrapper: ReactWrapper;
  let root: Element;
  let popup: HTMLElement;
  let target: HTMLElement;

  beforeEach(() => {
    offset = [0, 0];
    stick = false;
    wrapper = mount(
      <div id="root">
        <span id="popup">OPA</span>
        <figure id="target" />
      </div>,
    );

    root = wrapper.find('#root').getDOMNode();
    popup = wrapper.find('#popup').getDOMNode() as HTMLElement;
    target = wrapper.find('#target').getDOMNode() as HTMLElement;

    root.getBoundingClientRect = () =>
      ({
        top: 2,
        left: 3,
        right: 5,
        height: 7,
        width: 11,
      } as ClientRect);

    popup.getBoundingClientRect = () =>
      ({
        top: 13,
        left: 17,
        right: 19,
        height: 23,
        width: 29,
      } as ClientRect);

    target.getBoundingClientRect = () =>
      ({
        top: 31,
        left: 37,
        right: 41,
        height: 47,
        width: 53,
      } as ClientRect);

    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      get() {
        return root;
      },
    });
  });

  it('should calculatePosition for start and right placement', () => {
    const placement = ['start', 'left'] as [string, string];
    const calc = calculatePosition({
      placement,
      target,
      popup,
      offset,
      stick,
    });

    expect(calc).toEqual({
      top: 29,
      left: 34,
    });
  });

  it('should calculatePosition for start and end placement', () => {
    const placement = ['start', 'end'] as [string, string];
    const calc = calculatePosition({
      placement,
      target,
      popup,
      offset,
      stick,
    });

    expect(calc).toEqual({
      top: 29,
      right: 34,
    });
  });

  it('should calculatePosition for top and left placement', () => {
    const placement = ['top', 'left'] as [string, string];
    const calc = calculatePosition({
      placement,
      target,
      popup,
      offset,
      stick,
    });

    expect(calc).toEqual({
      bottom: -22,
      left: 34,
    });
  });

  it('should force position when forcePlacement Y is sent', () => {
    const calc = getVerticalPlacement(target, popup, 32, 'bottom-left', true);

    expect(calc).toEqual('bottom-left');
  });

  it('should force position when forcePlacement X is sent', () => {
    const calc = getHorizontalPlacement(target, popup, 32, 'top-right', true);

    expect(calc).toEqual('top-right');
  });

  it('should calculatePosition for bottom and left placement', () => {
    const placement = ['bottom', 'left'] as [string, string];
    const calc = calculatePosition({
      placement,
      target,
      popup,
      offset,
      stick,
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
      stick,
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
      stick,
    });

    expect(calc).toEqual({
      top: 76,
      right: -36,
    });
  });
});
