// @flow

import React from 'react';
import { mount } from 'enzyme';

import { DropdownItemCheckbox, DropdownItemRadio } from '../src';

import DropdownItemFocusManager from '../src/components/context/DropdownItemFocusManager';
import DropdownItemSelectionManager from '../src/components/context/DropdownItemSelectionManager';
import { selectionCacheContext } from '../src/util/contextNamespace';

describe('dropdown menu - DropdownItemSelectionManager', () => {
  jest.useFakeTimers();
  const prepareEnvironment = (behavior, ItemComponent, isItemSelected) => {
    const changeSpy = jest.fn();
    const fakeCache = {
      isItemSelected: () => isItemSelected,
      itemsInGroup: () =>
        isItemSelected ? [{ id: '0', groupId: 'my-group' }] : [],
      itemSelectionsChanged: changeSpy,
    };
    const wrapper = mount(
      <DropdownItemSelectionManager groupId="my-group" behavior={behavior}>
        <DropdownItemFocusManager>
          <ItemComponent id="0">Item zero</ItemComponent>
          <ItemComponent id="1">Item one</ItemComponent>
        </DropdownItemFocusManager>
      </DropdownItemSelectionManager>,
      { context: { [selectionCacheContext]: fakeCache } },
    );
    return { changeSpy, wrapper };
  };

  const clickItem = (wrapper, idx) => {
    wrapper
      .find('Item')
      .at(idx)
      .simulate('click');
    jest.runOnlyPendingTimers();
  };

  describe('checkbox', () => {
    test('should store the selected checkbox item values on click', () => {
      const { changeSpy, wrapper } = prepareEnvironment(
        'checkbox',
        DropdownItemCheckbox,
        false,
      );

      clickItem(wrapper, 0);
      expect(changeSpy).toHaveBeenCalledWith('my-group', [
        { groupId: 'my-group', id: '0' },
      ]);
    });

    test('should stop storing a selected checkbox item value when clicked twice', () => {
      const { changeSpy, wrapper } = prepareEnvironment(
        'checkbox',
        DropdownItemCheckbox,
        true,
      );

      clickItem(wrapper, 0);
      expect(changeSpy).toHaveBeenCalledWith('my-group', []);
    });
  });

  describe('radio', () => {
    test('should store the most recently selected radio item value', () => {
      const { changeSpy, wrapper } = prepareEnvironment(
        'radio',
        DropdownItemRadio,
        false,
      );

      clickItem(wrapper, 1);
      expect(changeSpy).toHaveBeenCalledWith('my-group', [
        { groupId: 'my-group', id: '1' },
      ]);
    });

    test('should continue storing a selected radio item value when clicked twice', () => {
      const { changeSpy, wrapper } = prepareEnvironment(
        'radio',
        DropdownItemRadio,
        true,
      );
      clickItem(wrapper, 0);
      expect(changeSpy).toHaveBeenCalledWith('my-group', [
        { groupId: 'my-group', id: '0' },
      ]);
    });
  });
});
