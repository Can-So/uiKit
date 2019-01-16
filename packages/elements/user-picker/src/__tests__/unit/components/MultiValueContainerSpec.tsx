import { shallow } from 'enzyme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  MultiValueContainer,
  ScrollAnchor,
} from '../../../components/MultiValueContainer';
import { renderProp } from '../_testUtils';

describe('MultiValueContainer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  const selectProps = {
    value: [1],
    options: [1, 2, 3],
    isLoading: false,
  };

  const shallowValueContainer = props =>
    shallow(<MultiValueContainer selectProps={selectProps} {...props} />);

  test.each([
    ['add more people...', selectProps.value, false, false],
    ['Enter more...', selectProps.value, false, true],
    [undefined, selectProps.options, false, false],
    [undefined, [], false, false],
    [undefined, [], true, false],
  ])(
    'should set placeholder to "%s" when (value: %p, loading: %s)',
    (placeholder, value, isLoading, override) => {
      const component = shallowValueContainer({
        children: [
          <div key="placeholder">Placeholder</div>,
          <input key="input" type="text" />,
        ],
        selectProps: {
          ...selectProps,
          value,
          isLoading,
          addMoreMessage: override ? placeholder : undefined,
        },
      });

      const input = (component
        .find(FormattedMessage as React.ComponentClass<any>)
        .exists()
        ? renderProp(
            component.find(FormattedMessage as React.ComponentClass<any>),
            'children',
            'add more people...',
          )
        : component
      ).find('input');

      expect(input.prop('placeholder')).toEqual(placeholder);
    },
  );

  it('should scroll to bottom when adding new items', () => {
    const component = shallowValueContainer({
      children: 'some text',
      getValue: jest.fn(() => []),
    });
    const scrollIntoView = jest.fn();
    const innerRef = component.find(ScrollAnchor).prop('innerRef');
    if (innerRef && typeof innerRef === 'function') {
      innerRef({ scrollIntoView });
    }

    expect(component.state()).toHaveProperty('valueSize', 0);
    component.setProps({ getValue: jest.fn(() => [1]) });
    jest.runAllTimers();
    expect(component.state()).toHaveProperty('valueSize', 1);
    expect(component.state()).toHaveProperty('previousValueSize', 0);

    expect(scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it('should not scroll when removing and item', () => {
    const component = shallowValueContainer({
      children: 'some text',
      getValue: jest.fn(() => [1]),
    });
    const scrollIntoView = jest.fn();
    const innerRef = component.find(ScrollAnchor).prop('innerRef');
    if (innerRef && typeof innerRef === 'function') {
      innerRef({ scrollIntoView });
    }

    expect(component.state()).toHaveProperty('valueSize', 1);
    component.setProps({ getValue: jest.fn(() => []) });
    jest.runAllTimers();
    expect(component.state()).toHaveProperty('valueSize', 0);
    expect(component.state()).toHaveProperty('previousValueSize', 1);

    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});
