// @flow

import React from 'react';
import { mount } from 'enzyme';
import CheckboxIcon from '@atlaskit/icon/glyph/checkbox';
import CheckboxIndeterminateIcon from '@atlaskit/icon/glyph/checkbox-indeterminate';
import Checkbox, { CheckboxWithoutAnalytics } from '../../Checkbox';
import { name } from '../../../package.json';

describe(name, () => {
  const mountCheckbox = (overridingProps: any) =>
    mount(
      <CheckboxWithoutAnalytics
        label=""
        onChange={() => {}}
        name="stub"
        value="stub value"
        {...overridingProps}
      />,
    );
  describe('<Checkbox />', () => {
    describe('<Checkbox /> stateless: should not use state isChecked property when passing it as props', () => {
      it('keeps isChecked as false when passing it as prop and calling onChange', () => {
        const cb = mountCheckbox({ isChecked: false, onChange: null });
        cb.find('input').simulate('change', { target: { checked: true } });
        expect(cb.find('input').prop('checked')).toBe(false);
      });

      it('keeps isChecked as true when passing it as prop and calling onChange', () => {
        const cb = mountCheckbox({ isChecked: true, onChange: null });
        cb.find('input').simulate('change', { target: { checked: false } });
        expect(cb.find('input').prop('checked')).toBe(true);
      });
    });
    it('should be unchecked by default', () => {
      const cb = mountCheckbox({ defaultChecked: false });
      expect(cb.find('input[checked]').length === 1).toBe(true);
    });
    it('should call onchange on change', () => {
      const myMock = jest.fn();
      const cb = mountCheckbox({ isChecked: false, onChange: myMock });
      cb.find('input').simulate('change', { target: { checked: true } });
      expect(cb.find('Checkbox').prop('isChecked')).toBe(false);
      expect(myMock.mock.calls.length).toBe(1);
    });
    it('should call onchange once', () => {
      const spy = jest.fn();
      const cb = mountCheckbox({ onChange: spy });
      cb.find('input').simulate('change');
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should show indeterminate icon when indeterminate', () => {
      const cb = mountCheckbox({ isIndeterminate: true, isChecked: false });
      expect(cb.find(CheckboxIcon)).toHaveLength(0);
      expect(cb.find(CheckboxIndeterminateIcon)).toHaveLength(1);
    });
    it('should initially set the indeterminate state on the hidden checkbox', () => {
      const cb = mountCheckbox({ isIndeterminate: true, isChecked: false });
      const element = cb.find('Checkbox').instance().checkbox;
      expect(element.indeterminate).toBe(true);
    });
    it('should set the indeterminate state on the hidden checkbox on update', () => {
      const cb = mountCheckbox({
        isChecked: false,
        isIndeterminate: false,
      });

      const element = cb.find('Checkbox').instance().checkbox;
      expect(element.indeterminate).toBe(false);

      cb.setProps({ isIndeterminate: true });
      expect(element.indeterminate).toBe(true);
    });
  });
  describe('<Checkbox defaultChecked/>', () => {
    it('should render defaultChecked', () => {
      const cb = mountCheckbox({ defaultChecked: true });
      const element = cb.find('Checkbox').instance().checkbox;
      expect(element.checked).toBe(true);
    });
    it('should render defaultChecked={undefined}', () => {
      const cb = mountCheckbox();
      const element = cb.find('Checkbox').instance().checkbox;
      expect(element.checked).toBe(false);
    });
  });
});

describe('CheckboxWithAnalytics', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'warn');
    jest.spyOn(global.console, 'error');
  });
  afterEach(() => {
    global.console.warn.mockRestore();
    global.console.error.mockRestore();
  });

  it('should mount without errors', () => {
    mount(
      <Checkbox
        label=""
        isChecked
        onChange={() => {}}
        name="stub"
        value="stub value"
      />,
    );
    /* eslint-disable no-console */
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    /* eslint-enable no-console */
  });
});
