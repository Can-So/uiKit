jest.mock('../../../components/styles', () => ({
  getStyles: jest.fn(),
}));

import { AnalyticsListener } from '@atlaskit/analytics-next';
import Select from '@atlaskit/select';
import { mount, shallow } from 'enzyme';
import * as debounce from 'lodash.debounce';
import * as React from 'react';
import { getStyles } from '../../../components/styles';
import { UserPicker } from '../../../components/UserPicker';
import { usersToOptions, userToOption } from '../../../components/utils';
import {
  User,
  UserOption,
  UserPickerProps as Props,
  UserPickerProps,
} from '../../../types';

describe('UserPicker', () => {
  const shallowUserPicker = (props: Partial<Props> = {}) =>
    shallow(<UserPicker {...props} />)
      .dive()
      .dive();

  const users: User[] = [
    {
      id: 'abc-123',
      name: 'Jace Beleren',
      publicName: 'jbeleren',
    },
    {
      id: '123-abc',
      name: 'Chandra Nalaar',
      publicName: 'cnalaar',
    },
  ];

  const userOptions: UserOption[] = usersToOptions(users);

  it('should render Select', () => {
    const component = shallowUserPicker({ users });
    const select = component.find(Select);
    expect(select.prop('options')).toEqual(userOptions);
    expect(getStyles).toHaveBeenCalledWith(350);
    expect(select.prop('menuPlacement')).toBeTruthy();
  });

  it('should disable picker if isDisabled is true', () => {
    const component = shallowUserPicker({ isDisabled: true });
    const select = component.find(Select);
    expect(select.prop('isDisabled')).toEqual(true);
  });

  it('should set width', () => {
    shallowUserPicker({ width: 500 });

    expect(getStyles).toHaveBeenCalledWith(500);
  });

  it('should set custom placeholder', () => {
    const custom = 'Custom';
    const component = shallowUserPicker({ placeholder: custom });
    const select = component.find(Select);
    expect(select.prop('placeholder')).toEqual(custom);
  });

  it('should pass custom no options message to picker', () => {
    const customMessage = 'Custom';
    const component = shallowUserPicker({ noOptionsMessage: customMessage });
    const select = component.find(Select);
    expect(select.prop('noOptionsMessage')).toBeInstanceOf(Function);
    const result = (select.prop('noOptionsMessage') as Function)();
    expect(result).toEqual(customMessage);
  });

  it('should trigger onChange with User', () => {
    const onChange = jest.fn();
    const component = shallowUserPicker({ onChange });

    const select = component.find(Select);
    select.simulate('change', userOptions[0], { action: 'select-option' });

    expect(onChange).toHaveBeenCalledWith(users[0], 'select-option');
  });

  it('should trigger props.onSelection if onChange with select-option action', () => {
    const onSelection = jest.fn();
    const component = shallowUserPicker({ onSelection });

    const select = component.find(Select);
    select.simulate('change', userOptions[0], { action: 'select-option' });

    expect(onSelection).toHaveBeenCalledWith(users[0]);
  });

  it('should call onFocus handler', () => {
    const onFocus = jest.fn();
    const component = shallowUserPicker({ onFocus });

    component.simulate('focus');
    expect(onFocus).toHaveBeenCalled();
  });

  it('should call onBlur handler', () => {
    const onBlur = jest.fn();
    const component = shallowUserPicker({ onBlur });

    component.simulate('blur');
    expect(onBlur).toHaveBeenCalled();
  });

  describe('Multiple users select', () => {
    it('should set isMulti in Select', () => {
      const component = shallowUserPicker({ users, isMulti: true });
      const select = component.find(Select);
      expect(select.prop('isMulti')).toBeTruthy();
    });

    it('should call onChange with an array of users', () => {
      const onChange = jest.fn();
      const component = shallowUserPicker({ users, isMulti: true, onChange });

      component
        .find(Select)
        .simulate('change', userOptions, { action: 'select-option' });

      expect(onChange).toHaveBeenCalledWith(
        [users[0], users[1]],
        'select-option',
      );
    });
  });

  it('should set hovering clear indicator', () => {
    const component = shallowUserPicker();
    const select = component.find(Select);
    select.simulate('clearIndicatorHover', true);
    expect(component.state()).toHaveProperty('hoveringClearIndicator', true);
  });

  it('should set isClearable to false', () => {
    const component = shallowUserPicker({ isClearable: false });
    const select = component.find(Select);
    expect(select.prop('isClearable')).toEqual(false);
  });

  it('should open menu onFocus', () => {
    const component = shallowUserPicker();
    const select = component.find(Select);
    select.simulate('focus');
    expect(component.state()).toHaveProperty('menuIsOpen', true);
  });

  it('should close menu onBlur', () => {
    const component = shallowUserPicker();
    component.setState({ menuIsOpen: true });
    const select = component.find(Select);
    select.simulate('blur');
    expect(component.state()).toHaveProperty('menuIsOpen', false);
  });

  describe('async load', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('should load users when picker open', () => {
      const usersPromise = new Promise<User[]>(resolve =>
        window.setTimeout(() => resolve(users), 500),
      );
      const loadUsers = jest.fn(() => usersPromise);
      const component = shallowUserPicker({ loadUsers });
      component.setProps({ open: true });
      jest.runAllTimers();
      expect(loadUsers).toHaveBeenCalled();
      return usersPromise.then(() => {
        jest.runAllTimers();
        expect(component.state()).toMatchObject({
          users,
        });
      });
    });

    describe('onInputChange', () => {
      it('should load users on input change', () => {
        const usersPromise = new Promise<User[]>(resolve =>
          window.setTimeout(() => resolve(users), 500),
        );
        const loadUsers = jest.fn(() => usersPromise);
        const component = shallowUserPicker({ loadUsers });
        const select = component.find(Select);
        select.simulate('inputChange', 'some text', { action: 'input-change' });
        jest.runAllTimers();
        expect(loadUsers).toHaveBeenCalled();
        expect(loadUsers).toHaveBeenCalledWith('some text');
        return usersPromise.then(() => {
          jest.runAllTimers();
          expect(component.state()).toMatchObject({
            users,
          });
        });
      });

      it('should call props.onInputChange', () => {
        const onInputChange = jest.fn();
        const component = shallowUserPicker({ onInputChange });
        const select = component.find(Select);
        select.simulate('inputChange', 'some text', { action: 'input-change' });
        expect(onInputChange).toHaveBeenCalled();
      });

      it('should debounce input change events', () => {
        const usersPromise = new Promise<User[]>(resolve =>
          window.setTimeout(() => resolve(users), 500),
        );
        const loadUsers = jest.fn(() => usersPromise);
        shallowUserPicker({ loadUsers });

        expect(debounce).toHaveBeenCalledWith(expect.any(Function), 200);
      });
    });
  });

  describe('with defaultOptions', () => {
    it('should render with default options', () => {
      const component = shallowUserPicker({
        isMulti: true,
        defaultValue: [users[0]],
      });

      expect(component.find(Select).prop('value')).toEqual([
        { label: 'Jace Beleren', user: users[0], value: 'abc-123' },
      ]);
    });

    it('should not remove fixed options', () => {
      const onChange = jest.fn();
      const component = shallowUserPicker({
        isMulti: true,
        defaultValue: [{ ...users[0], fixed: true }],
        onChange,
      });

      const select = component.find(Select);
      const fixedOption = userToOption({ ...users[0], fixed: true });
      expect(select.prop('value')).toEqual([fixedOption]);

      select.simulate('change', [], {
        action: 'pop-value',
        removedValue: fixedOption,
      });

      expect(onChange).not.toHaveBeenCalled();

      expect(select.prop('value')).toEqual([fixedOption]);
    });

    it('should not remove fixed options with other values', () => {
      const onChange = jest.fn();
      const fixedUser = { ...users[0], fixed: true };
      const component = shallowUserPicker({
        isMulti: true,
        defaultValue: [fixedUser],
        onChange,
      });

      const fixedOption = userToOption(fixedUser);
      expect(component.find(Select).prop('value')).toEqual([fixedOption]);

      const removableOption = userToOption(users[1]);
      component
        .find(Select)
        .simulate('change', [fixedOption, removableOption], {
          action: 'select-option',
        });

      component.update();

      expect(component.find(Select).prop('value')).toEqual([
        fixedOption,
        removableOption,
      ]);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        [fixedUser, users[1]],
        'select-option',
      );

      onChange.mockClear();

      expect(component.find(Select).prop('value')).toEqual([
        fixedOption,
        removableOption,
      ]);

      component.find(Select).simulate('change', [removableOption], {
        action: 'pop-value',
        removedValue: fixedOption,
      });

      component.update();

      expect(onChange).not.toHaveBeenCalled();

      expect(component.find(Select).prop('value')).toEqual([
        fixedOption,
        removableOption,
      ]);
    });
  });

  describe('inputValue', () => {
    it('should set inputValue to empty string by default', () => {
      const component = shallowUserPicker({ value: users[0] });
      expect(component.find(Select).prop('inputValue')).toEqual('');
    });

    it('onInputChange: should set inputValue to query', () => {
      const component = shallowUserPicker();
      const select = component.find(Select);
      select.simulate('inputChange', 'some text', { action: 'input-change' });
      expect(component.find(Select).prop('inputValue')).toEqual('some text');
    });

    it('onBlur: should clear inputValue', () => {
      const component = shallowUserPicker();
      const select = component.find(Select);
      select.simulate('blur');
      expect(component.find(Select).prop('inputValue')).toEqual('');
    });

    it('onChange: should clear inputValue', () => {
      const component = shallowUserPicker();
      const select = component.find(Select);
      select.simulate('change', userOptions[0], { action: 'select-option' });
      expect(component.find(Select).prop('inputValue')).toEqual('');
    });

    it('single onFocus with value: should set inputValue to value', () => {
      const component = shallowUserPicker({ value: users[0] });
      const select = component.find(Select);
      select.simulate('focus', { target: {} });
      expect(component.find(Select).prop('inputValue')).toEqual(users[0].name);
    });

    it('onFocus no value: should have set empty inputValue', () => {
      const component = shallowUserPicker();
      const select = component.find(Select);
      select.simulate('focus', { target: {} });
      expect(component.find(Select).prop('inputValue')).toEqual('');
    });

    it('multi onFocus with value: should have empty inputValue', () => {
      const component = shallowUserPicker({ value: users[0], isMulti: true });
      const select = component.find(Select);
      select.simulate('focus', { target: {} });
      expect(component.find(Select).prop('inputValue')).toEqual('');
    });

    it('should highlight input value on focus', () => {
      const component = shallowUserPicker({ value: users[0] });
      const select = component.find(Select);
      const highlightInput = jest.fn();
      const input = document.createElement('input') as HTMLInputElement;
      input.select = highlightInput;
      select.simulate('focus', { target: input });
      expect(highlightInput).toBeCalledTimes(1);
    });

    it('should clear inputValue on change after focus', () => {
      const component = shallowUserPicker({ value: users[0] });
      const select = component.find(Select);
      select.simulate('focus', {});
      select.simulate('change', null, { action: 'clear' });
      component.update();
      expect(component.find(Select).prop('inputValue')).toBe('');
    });
  });

  describe('preventFilter', () => {
    it('default: should set preventFilter to false', () => {
      const component = shallowUserPicker();
      expect(component.state('preventFilter')).toBeFalsy();
    });

    it('onInputChange: should set preventFilter to false', () => {
      const component = shallowUserPicker();
      const select = component.find(Select);
      select.simulate('inputChange', 'some text', { action: 'input-change' });
      expect(component.state('preventFilter')).toBeFalsy();
    });

    it('onBlur: should set preventFilter to false', () => {
      const component = shallowUserPicker();
      const select = component.find(Select);
      select.simulate('blur');
      expect(component.state('preventFilter')).toBeFalsy();
    });

    it('onFocus with no value: should not set preventFilter to true', () => {
      const component = shallowUserPicker();
      const select = component.find(Select);
      select.simulate('focus', { target: {} });
      expect(component.state('preventFilter')).toBeFalsy();
    });

    it('multi onFocus with value: should not set preventFilter to true', () => {
      const component = shallowUserPicker({ isMulti: true, value: users[0] });
      const select = component.find(Select);
      select.simulate('focus', { target: {} });
      expect(component.state('preventFilter')).toBeFalsy();
    });

    it('single onFocus with value: should set preventFilter to true', () => {
      const component = shallowUserPicker({ value: users[0] });
      const select = component.find(Select);
      select.simulate('focus', { target: {} });
      expect(component.state('preventFilter')).toBeTruthy();
    });
  });

  it('should blur on escape', () => {
    const component = shallowUserPicker();
    component.setState({ menuIsOpen: true });
    const ref = { blur: jest.fn() };
    (component.instance() as any).handleSelectRef(ref);

    component.find(Select).simulate('keyDown', { keyCode: 27 });
    expect(ref.blur).toHaveBeenCalled();
  });

  it('should prevent default selection event when user inserts space on empty input', () => {
    const component = shallowUserPicker({ users });
    component.setState({ menuIsOpen: true });
    const preventDefault = jest.fn();
    component.find(Select).simulate('keyDown', { keyCode: 32, preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  it('should not prevent default event when there is inputValue', () => {
    const component = shallowUserPicker({ users });
    component.setState({ menuIsOpen: true, inputValue: 'test' });
    const preventDefault = jest.fn();
    component.find(Select).simulate('keyDown', { keyCode: 32, preventDefault });
    expect(preventDefault).toHaveBeenCalledTimes(0);
  });

  describe('analytics', () => {
    const onEvent = jest.fn();
    let component;

    const AnalyticsTestComponent = (props: Partial<UserPickerProps>) => (
      <AnalyticsListener channel="fabric-elements" onEvent={onEvent}>
        <UserPicker {...props} />
      </AnalyticsListener>
    );

    beforeEach(() => {
      component = mount(<AnalyticsTestComponent />);
    });

    afterEach(() => {
      onEvent.mockClear();
    });

    it('should trigger cancel event', () => {
      const input = component.find('input');
      input.simulate('focus');
      input.simulate('blur');
      expect(onEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'cancelled',
            actionSubject: 'userPicker',
            eventType: 'ui',
            attributes: {
              duration: expect.any(Number),
              packageName: '@atlaskit/user-picker',
              packageVersion: expect.any(String),
              sessionId: expect.any(String),
              queryLength: 0,
              spaceInQuery: false,
              pickerType: 'single',
              upKeyCount: 0,
              downKeyCount: 0,
            },
          }),
        }),
        'fabric-elements',
      );
    });

    it('should trigger pressed event', () => {
      const input = component.find('input');
      input.simulate('focus');
      component.setProps({ users });
      input.simulate('keyDown', { keyCode: 40 });
      input.simulate('keyDown', { keyCode: 40 });
      input.simulate('keyDown', { keyCode: 40 });
      input.simulate('keyDown', { keyCode: 38 });
      input.simulate('keyDown', { keyCode: 13 });
      component.find(Select).prop('onChange')(userToOption(users[0]), {
        action: 'select-option',
      });
      expect(onEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'pressed',
            actionSubject: 'userPicker',
            eventType: 'ui',
            attributes: {
              duration: expect.any(Number),
              packageName: '@atlaskit/user-picker',
              packageVersion: expect.any(String),
              sessionId: expect.any(String),
              queryLength: 0,
              spaceInQuery: false,
              pickerType: 'single',
              upKeyCount: 1,
              downKeyCount: 3,
              position: 0,
              result: { id: 'abc-123' },
            },
          }),
        }),
        'fabric-elements',
      );
    });

    it('should trigger clicked event', () => {
      const input = component.find('input');
      input.simulate('focus');
      component.setProps({ users });
      input.simulate('keyDown', { keyCode: 40 });
      input.simulate('keyDown', { keyCode: 40 });
      input.simulate('keyDown', { keyCode: 40 });
      input.simulate('keyDown', { keyCode: 38 });
      component.find(Select).prop('onChange')(userToOption(users[0]), {
        action: 'select-option',
      });
      expect(onEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'clicked',
            actionSubject: 'userPicker',
            eventType: 'ui',
            attributes: {
              duration: expect.any(Number),
              packageName: '@atlaskit/user-picker',
              packageVersion: expect.any(String),
              sessionId: expect.any(String),
              queryLength: 0,
              spaceInQuery: false,
              pickerType: 'single',
              upKeyCount: 1,
              downKeyCount: 3,
              position: 0,
              result: { id: 'abc-123' },
            },
          }),
        }),
        'fabric-elements',
      );
    });

    it('should trigger cleared event', () => {
      const input = component.find('input');
      input.simulate('focus');
      component.find(Select).prop('onChange')(userToOption(users[0]), {
        action: 'clear',
      });
      expect(onEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'cleared',
            actionSubject: 'userPicker',
            eventType: 'ui',
            attributes: {
              packageName: '@atlaskit/user-picker',
              packageVersion: expect.any(String),
              sessionId: expect.any(String),
              values: [],
              pickerType: 'single',
              pickerOpen: true,
            },
          }),
        }),
        'fabric-elements',
      );
    });

    it('should trigger deleted event', () => {
      component.setProps({ isMulti: true });
      const input = component.find('input');
      input.simulate('focus');
      component.find(Select).prop('onChange')([], {
        action: 'remove-value',
        removedValue: userToOption(users[0]),
      });
      expect(onEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'deleted',
            actionSubject: 'userPickerItem',
            eventType: 'ui',
            attributes: {
              packageName: '@atlaskit/user-picker',
              packageVersion: expect.any(String),
              sessionId: expect.any(String),
              pickerOpen: true,
              value: { id: users[0].id },
            },
          }),
        }),
        'fabric-elements',
      );
    });

    it('should trigger failed event', () => {
      component.setProps({
        loadUsers: () => Promise.reject(new Error('some error')),
      });
      const input = component.find('input');
      input.simulate('focus');
      onEvent.mockClear();
      return Promise.resolve()
        .then()
        .then(() => {
          expect(onEvent).toHaveBeenCalledWith(
            expect.objectContaining({
              payload: expect.objectContaining({
                action: 'failed',
                actionSubject: 'userPicker',
                eventType: 'operational',
                attributes: {
                  packageName: '@atlaskit/user-picker',
                  packageVersion: expect.any(String),
                  pickerType: 'single',
                  sessionId: expect.any(String),
                },
              }),
            }),
            'fabric-elements',
          );
        });
    });

    describe('searched event', () => {
      it('should fire when opening menu with options', () => {
        component.setProps({
          open: true,
          users,
        });
        return Promise.resolve().then(() => {
          expect(onEvent).toHaveBeenCalledTimes(2);
          expect(onEvent).toHaveBeenCalledWith(
            expect.objectContaining({
              payload: expect.objectContaining({
                action: 'searched',
                actionSubject: 'userPicker',
                eventType: 'operational',
                attributes: expect.objectContaining({
                  packageVersion: expect.any(String),
                  packageName: '@atlaskit/user-picker',
                  sessionId: expect.any(String),
                  duration: expect.any(Number),
                  queryLength: 0,
                  results: [{ id: 'abc-123' }, { id: '123-abc' }],
                  pickerType: 'single',
                }),
              }),
            }),
            'fabric-elements',
          );
        });
      });

      it('should not fire searched if the menu is not open', () => {
        component.setProps({
          users: [users[0]],
        });
        component.update();

        return Promise.resolve().then(() => {
          expect(onEvent).not.toHaveBeenCalled();
        });
      });

      it('should fire searched when users change', () => {
        component.setProps({
          open: true,
          users,
        });

        onEvent.mockClear();

        component.setProps({
          users: [users[0]],
        });

        return Promise.resolve().then(() => {
          expect(onEvent).toHaveBeenCalledTimes(1);
          expect(onEvent).toHaveBeenCalledWith(
            expect.objectContaining({
              payload: expect.objectContaining({
                action: 'searched',
                actionSubject: 'userPicker',
                eventType: 'operational',
                attributes: expect.objectContaining({
                  packageVersion: expect.any(String),
                  packageName: '@atlaskit/user-picker',
                  sessionId: expect.any(String),
                  duration: expect.any(Number),
                  queryLength: 0,
                  results: [{ id: 'abc-123' }],
                  pickerType: 'single',
                }),
              }),
            }),
            'fabric-elements',
          );
        });
      });
    });
  });
});
