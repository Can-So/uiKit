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

    const stopPropagation = jest.fn();
    onMouseDown({ stopPropagation });

    expect(clearValue).toHaveBeenCalledTimes(1);
    expect(stopPropagation).toHaveBeenCalledTimes(1);
  });
});
