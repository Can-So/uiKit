import { shallow } from 'enzyme';
import * as React from 'react';
import { Input } from '../../../components/Input';

describe('ClearIndicator', () => {
  const shallowInput = (props: any) => shallow(<Input {...props} />);

  it('should be enabled by default', () => {
    const component = shallowInput({
      selectProps: {},
    });

    expect(component.prop('disabled')).toBeFalsy();
  });

  it('should be disabled if disableInput select prop is passed in', () => {
    const component = shallowInput({
      selectProps: { disableInput: true },
    });

    expect(component.prop('disabled')).toBeTruthy();
  });
});
