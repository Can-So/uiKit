// @flow
import React from 'react';
import { mount } from 'enzyme';

import Input from '../../src';
import { name } from '../../package.json';

describe(name, () => {
  it('selects the input when select() is called', () => {
    const value = 'my-value';
    const wrapper = mount(
      <Input isEditing onChange={() => {}} value={value} />,
    );

    wrapper.instance().select();

    const input = wrapper.find('input').instance();
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(value.length);
  });
});
