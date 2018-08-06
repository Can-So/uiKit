// @flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import RadioIcon from '@atlaskit/icon/glyph/radio';
import { colors } from '@atlaskit/theme';
import Item from '@atlaskit/item';

import { KEY_ENTER, KEY_SPACE } from '../../../util/keys';
import DropdownMenu, {
  DropdownItemGroupRadio,
  DropdownItemRadio,
  DropdownMenuStateless,
} from '../../..';

test('Skipped tests', () => {});

/* TODO: create integration tests to replace these See https://ecosystem.atlassian.net/browse/AK-5183
describe('dropdown menu - DropdownItemRadio', () => {
  const isIconSelected = icon =>
    icon.prop('primaryColor') === colors.B400 &&
    icon.prop('secondaryColor') === colors.N40;

  describe('common use cases', () => {
    let wrapper;

    const clickItem = () => {
      wrapper
        .find('Item')
        .first()
        .simulate('click');
    };
    
    beforeEach(() => {
      wrapper = mount(
        <DropdownMenuStateless isOpen>
          <DropdownItemGroupRadio id="radio-group">
            <DropdownItemRadio id="radio-item">Item zero</DropdownItemRadio>
          </DropdownItemGroupRadio>
        </DropdownMenuStateless>,
      );
    });

    test('should render a radio icon', () => {
      expect(wrapper.find(RadioIcon).length).toBe(1);
    });

    test('should default the radio icon to unchecked', () => {
      expect(isIconSelected(wrapper.find(RadioIcon))).toBe(false);
    });

    test('should appear as checked when clicked, and still checked when clicked again', () => {
      clickItem();
      expect(isIconSelected(wrapper.find(RadioIcon))).toBe(true);

      clickItem();
      expect(isIconSelected(wrapper.find(RadioIcon))).toBe(true);
    });

    // Cannot seem to mock window.navigator.userAgent in jest reliably. If/when possible, another
    // test for non-VoiceOver browsers would expect role="radio"
    test('should have role="menuitemradio" on a browser that does not support VoiceOver', () => {
      expect(wrapper.find(Item).prop('role')).toBe('menuitemradio');
    });
  });

  test('custom checkbox item onClick should be called', () => {
    const clickSpy = jest.fn();
    const wrapper = mount(
      <DropdownMenuStateless isOpen>
        <DropdownItemGroupRadio id="radio-items">
          <DropdownItemRadio id="zero" onClick={clickSpy}>
            Item zero
          </DropdownItemRadio>
        </DropdownItemGroupRadio>
      </DropdownMenuStateless>,
    );
    wrapper
      .find(Item)
      .first()
      .simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });

  [KEY_SPACE, KEY_ENTER].forEach(triggerKey => {
    test(`custom checkbox item onClick should be called when "${triggerKey}" key pressed`, () => {
      const clickSpy = jest.fn();
      const wrapper = mount(
        <DropdownMenuStateless isOpen>
          <DropdownItemGroupRadio id="radio-items">
            <DropdownItemRadio id="zero" onClick={clickSpy}>
              Item zero
            </DropdownItemRadio>
          </DropdownItemGroupRadio>
        </DropdownMenuStateless>,
      );
      wrapper
        .find(Item)
        .first()
        .simulate('keydown', { key: triggerKey });
      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('defaultSelected prop', () => {
    test('causes item to be selected by default, but not if unselected and menu re-opened', () => {
      const wrapper = mount(
        <DropdownMenuStateless isOpen>
          <DropdownItemGroupRadio id="check-items">
            <DropdownItemRadio id="zero" defaultSelected>
              Item zero
            </DropdownItemRadio>
            <DropdownItemRadio id="one">Item one</DropdownItemRadio>
          </DropdownItemGroupRadio>
        </DropdownMenuStateless>,
      );
      expect(isIconSelected(wrapper.find(RadioIcon).at(0))).toBe(true);
      expect(isIconSelected(wrapper.find(RadioIcon).at(1))).toBe(false);

      // Clicks the DropdownItemRadio to unselect it
      wrapper
        .find(Item)
        .at(1)
        .simulate('click');
      expect(isIconSelected(wrapper.find(RadioIcon).at(0))).toBe(false);
      expect(isIconSelected(wrapper.find(RadioIcon).at(1))).toBe(true);

      // Causes the DropdownItemRadio to be unmounted and remounted
      wrapper.setProps({ isOpen: false });
      wrapper.setProps({ isOpen: true });

      expect(isIconSelected(wrapper.find(RadioIcon).at(0))).toBe(false);
      expect(isIconSelected(wrapper.find(RadioIcon).at(1))).toBe(true);
    });
  });

  describe('isSelected prop', () => {
    class IsSelectedController extends React.Component<{}> {
      render() {
        return (
          <DropdownMenu defaultOpen trigger={<span className="test-trigger" />}>
            <DropdownItemGroupRadio id="check-items">
              <DropdownItemRadio {...this.props} id="zero">
                Item zero
              </DropdownItemRadio>
              <DropdownItemRadio id="one">Item one</DropdownItemRadio>
            </DropdownItemGroupRadio>
          </DropdownMenu>
        );
      }
    }

    test('setting at mount should cause item to appear selected', () => {
      const wrapper = mount(
        <DropdownMenuStateless isOpen>
          <DropdownItemGroupRadio id="check-items">
            <DropdownItemRadio id="zero" isSelected>
              Item zero
            </DropdownItemRadio>
          </DropdownItemGroupRadio>
        </DropdownMenuStateless>,
      );
      expect(isIconSelected(wrapper.find(RadioIcon))).toBe(true);
    });

    test('setting at mount on multiple radio items should cause the last to actually be selected', () => {
      const wrapper = mount(
        <DropdownMenuStateless isOpen>
          <DropdownItemGroupRadio id="check-items">
            <DropdownItemRadio id="zero" isSelected>
              Item zero
            </DropdownItemRadio>
            <DropdownItemRadio id="one">Item one</DropdownItemRadio>
            <DropdownItemRadio id="two" isSelected>
              Item two
            </DropdownItemRadio>
          </DropdownItemGroupRadio>
        </DropdownMenuStateless>,
      );
      expect(isIconSelected(wrapper.find(RadioIcon).at(0))).toBe(false);
      expect(isIconSelected(wrapper.find(RadioIcon).at(1))).toBe(false);
      expect(isIconSelected(wrapper.find(RadioIcon).at(2))).toBe(true);
    });

    test('setting after mount should cause item to appear selected', () => {
      const wrapper = mount(<IsSelectedController />);
      expect(isIconSelected(wrapper.find(RadioIcon).at(0))).toBe(false);
      wrapper.setProps({ isSelected: true });
      expect(isIconSelected(wrapper.find(RadioIcon).at(0))).toBe(true);
    });

    test('setting to false after mount should cause item to appear unselected', () => {
      const wrapper = mount(<IsSelectedController isSelected />);
      expect(isIconSelected(wrapper.find(RadioIcon).at(0))).toBe(true);
      expect(isIconSelected(wrapper.find(RadioIcon).at(1))).toBe(false);
      wrapper.setProps({ isSelected: false });
      expect(isIconSelected(wrapper.find(RadioIcon).at(0))).toBe(false);
      expect(isIconSelected(wrapper.find(RadioIcon).at(1))).toBe(false);
    });

    test('setting after mount should not fire onClick', () => {
      const clickSpy = jest.fn();
      const wrapper = mount(<IsSelectedController onClick={clickSpy} />);
      wrapper.setProps({ isSelected: true });
      expect(clickSpy).not.toHaveBeenCalled();
    });

    test('should still be applied when other items are clicked and the menu is reopened', () => {
      const wrapper = mount(<IsSelectedController isSelected />);
      expect(isIconSelected(wrapper.find(RadioIcon).at(0))).toBe(true);
      expect(isIconSelected(wrapper.find(RadioIcon).at(1))).toBe(false);

      // Item is now not selected, and onClick has been called so app can update it's state
      wrapper
        .find(Item)
        .at(1)
        .simulate('click');
      expect(isIconSelected(wrapper.find(RadioIcon).at(0))).toBe(false);
      expect(isIconSelected(wrapper.find(RadioIcon).at(1))).toBe(true);

      // Toggles the menu closed then open again
      wrapper.find('.test-trigger').simulate('click');
      wrapper.find('.test-trigger').simulate('click');

      // Item should still be selected, because it still has isSelected applied
      expect(isIconSelected(wrapper.find(RadioIcon).at(0))).toBe(true);
      expect(isIconSelected(wrapper.find(RadioIcon).at(1))).toBe(false);
    });
  });
});
*/
