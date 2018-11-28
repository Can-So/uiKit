import { shallow } from 'enzyme';
import * as React from 'react';
import { SingleValueContainer } from '../../../components/SingleValueContainer';
import { testUser } from '../_testUtils';
import { SizeableAvatar } from '../../../components/SizeableAvatar';

describe('SingleValueContainer', () => {
  const shallowValueContainer = props =>
    shallow(<SingleValueContainer {...props} />);

  const userValue = {
    user: testUser,
    label: testUser.name,
  };

  it('initial, empty: should render default avatar if not focused and no value', () => {
    const component = shallowValueContainer({
      hasValue: false,
      selectProps: { isFocused: false },
    });
    expect(component.find(SizeableAvatar).prop('src')).toBeUndefined();
  });

  it('has value: should not render avatar if not focused and has value', () => {
    const component = shallowValueContainer({
      hasValue: true,
      selectProps: { isFocused: false },
    });
    expect(component.find(SizeableAvatar)).toHaveLength(0);
  });

  it('has query: should render default avatar if focused and no value', () => {
    const component = shallowValueContainer({
      hasValue: false,
      selectProps: { isFocused: false },
    });
    expect(component.find(SizeableAvatar).prop('src')).toBeUndefined();
  });

  it("focus value: should render user's avatar if value matches inputValue", () => {
    const component = shallowValueContainer({
      hasValue: true,
      selectProps: {
        isFocused: true,
        inputValue: testUser.name,
        value: userValue,
      },
    });
    expect(component.find(SizeableAvatar).prop('src')).toEqual(
      testUser.avatarUrl,
    );
  });

  it('focus value then edit query: should render default avatar if value does not match inputValue', () => {
    const component = shallowValueContainer({
      hasValue: true,
      selectProps: { isFocused: true, inputValue: 'query', value: userValue },
    });
    expect(component.find(SizeableAvatar).prop('src')).toBeUndefined();
  });
});
