import { components } from '@atlaskit/select';
import { shallow } from 'enzyme';
import * as React from 'react';
import { ClearIndicator } from '../../../components/ClearIndicator';

describe('ClearIndicator', () => {
  const shallowClearIndicator = props => shallow(<ClearIndicator {...props} />);

  it('should clear value onMouseDown', () => {
    const clearValue = jest.fn();
    const component = shallowClearIndicator({ clearValue });

    const { onMouseDown } = component
      .find(components.ClearIndicator)
      .prop('innerProps');

    onMouseDown();

    expect(clearValue).toHaveBeenCalledTimes(1);
  });

  it('should call stopPropagation if not focused', () => {
    const component = shallowClearIndicator({
      clearValue: jest.fn(),
      selectProps: { isFocused: false },
    });

    const { onMouseDown } = component
      .find(components.ClearIndicator)
      .prop('innerProps');
    const stopPropagation = jest.fn();
    onMouseDown({ stopPropagation });
    expect(stopPropagation).toHaveBeenCalledTimes(1);
  });

  it('should call not stopPropagation if focused', () => {
    const component = shallowClearIndicator({
      clearValue: jest.fn(),
      selectProps: { isFocused: true },
    });

    const { onMouseDown } = component
      .find(components.ClearIndicator)
      .prop('innerProps');
    const stopPropagation = jest.fn();
    onMouseDown({ stopPropagation });
    expect(stopPropagation).toHaveBeenCalledTimes(0);
  });
});
