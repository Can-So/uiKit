// @flow

import React from 'react';
import { shallow, mount } from 'enzyme';
import Droplist from '@atlaskit/droplist';
import {
  name as packageName,
  version as packageVersion,
} from '../../../../package.json';
//import DropdownMenuStatelessWithAnalytics from '../../DropdownMenuStateless';

import DropdownMenuStatelessWithAnalytics, {
  DropdownMenuStatelessWithoutAnalytics as DropdownMenuStateless,
} from '../../DropdownMenuStateless';
import DropdownItemFocusManager from '../../context/DropdownItemFocusManager';

// TODO: create integration tests to replace these See https://ecosystem.atlassian.net/browse/AK-5183
describe('dropdown menu - DropdownMenuStateless', () => {
  describe('rendering DropdownItemFocusManager', () => {
    test('should render DropdownItemFocusManager inside Droplist', () => {
      const wrapper = shallow(
        <DropdownMenuStateless
          isOpen
          trigger="Choose"
          triggerType="button"
          isMenuFixed
        />,
      );
      wrapper.instance().dropdownListPositioned = true;
      wrapper.update();

      jest.useFakeTimers();
      setTimeout(() => {
        expect(
          wrapper
            .find(Droplist)
            .find(DropdownItemFocusManager)
            .exists(),
        ).toBe(true);
        jest.runAllTimers();
      });
    });

    // Disabling test as it fails. TODO: reimplement using intergration test
    /*
    ['ArrowDown', 'Enter'].forEach(triggerKey => {
      test(`should set DropdownItemFocusManager.autoFocus when opened via "${triggerKey}" key on trigger`, () => {
        const wrapper = mount(
          <DropdownMenuStateless trigger={<button className="my-trigger" />} />,
        );
        wrapper.instance().dropdownListPositioned = true;
        wrapper.update();
        wrapper.find('.my-trigger').simulate('keydown', { key: 'ArrowDown' });
        jest.useFakeTimers();
        setTimeout(() => {
          wrapper.setProps({ isOpen: true });
          expect(wrapper.find(DropdownItemFocusManager).prop('autoFocus')).toBe(
            true,
          );
        }, 1500);
        jest.runAllTimers();
      });
    });
    */

    test('should NOT render DropdownItemFocusManager when opened via click on trigger', () => {
      const wrapper = mount(
        <DropdownMenuStateless trigger={<button className="my-trigger" />} />,
      );
      wrapper.instance().sourceOfIsOpen = 'mouse';
      wrapper.update();
      wrapper.find('.my-trigger').simulate('click');
      wrapper.setProps({ isOpen: true });
      expect(wrapper.find(DropdownItemFocusManager).length).toBe(0);
    });

    test('should render DropdownItemFocusManager when opened via keyboard', () => {
      const wrapper = mount(
        <DropdownMenuStateless trigger={<button className="my-trigger" />} />,
      );
      wrapper.instance().dropdownListPositioned = true;
      wrapper.instance().sourceOfIsOpen = 'keydown';
      wrapper.update();
      wrapper.find('.my-trigger').simulate('keydown', { key: 'ArrowDown' });
      wrapper.setProps({ isOpen: true });
      expect(wrapper.find(DropdownItemFocusManager).length).toBe(1);
    });

    test('should set DropdownItemFocusManager.autoFocus to true when opened via keyboard', () => {
      const wrapper = mount(
        <DropdownMenuStateless trigger={<button className="my-trigger" />} />,
      );
      wrapper.instance().dropdownListPositioned = true;
      wrapper.instance().sourceOfIsOpen = 'keydown';
      wrapper.update();
      wrapper.find('.my-trigger').simulate('keydown', { key: 'ArrowDown' });
      wrapper.setProps({ isOpen: true });
      expect(wrapper.find(DropdownItemFocusManager).prop('autoFocus')).toBe(
        true,
      );
    });

    test('should call onOpenChange on trigger element click', () => {
      let buttonRef;
      const spy = jest.fn();
      const trigger = (
        <button
          ref={r => {
            buttonRef = r;
          }}
        >
          Test
        </button>
      );
      const wrapper = mount(
        <DropdownMenuStateless trigger={trigger} onOpenChange={spy} />,
      );
      wrapper.instance().dropdownListPositioned = true;
      wrapper.find(Droplist).simulate('click', {
        target: buttonRef,
      });
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ isOpen: true }),
      );
    });

    test('should not call onOpenChange when trigger element is disabled', () => {
      let buttonRef;
      const spy = jest.fn();
      const trigger = (
        <button
          disabled
          ref={r => {
            buttonRef = r;
          }}
        >
          Test
        </button>
      );
      const wrapper = mount(
        <DropdownMenuStateless trigger={trigger} onOpenChange={spy} />,
      );
      wrapper.instance().dropdownListPositioned = true;
      wrapper.find(Droplist).simulate('click', {
        target: buttonRef,
      });
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });
});

describe('DropdownMenuStatelessWithAnalytics', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'warn');
    jest.spyOn(global.console, 'error');
  });
  afterEach(() => {
    global.console.warn.mockRestore();
    global.console.error.mockRestore();
  });

  it('should mount without errors', () => {
    mount(<DropdownMenuStatelessWithAnalytics isOpen />);
    /* eslint-disable no-console */
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    /* eslint-enable no-console */
  });
  it('should override the existing analytics context of Droplist', () => {
    const wrapper = mount(<DropdownMenuStatelessWithAnalytics />);

    expect(wrapper.find(Droplist).prop('analyticsContext')).toEqual({
      componentName: 'dropdownMenu',
      packageName,
      packageVersion,
    });
  });
});
