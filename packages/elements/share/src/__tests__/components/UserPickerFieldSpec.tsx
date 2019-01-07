import { shallowWithIntl } from '@atlaskit/editor-test-helpers';
import UserPicker from '@atlaskit/user-picker';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { UserPickerField } from '../../components/UserPickerField';
import { messages } from '../../i18n';
import { renderProp } from '../_testUtils';

describe('UserPickerField', () => {
  const loadOptions = jest.fn();

  it('should render UserPicker', () => {
    const component = shallowWithIntl(
      <UserPickerField loadOptions={loadOptions} />,
    );
    const fieldProps = {
      onChange: jest.fn(),
      value: [],
    };
    const field = renderProp(component, 'children', { fieldProps });

    const formattedMessageAddMore = field.find(FormattedMessage);
    expect(formattedMessageAddMore).toHaveLength(1);
    expect(formattedMessageAddMore.props()).toMatchObject(
      messages.userPickerAddMoreMessage,
    );

    const formattedMessagePlaceholder = renderProp(
      formattedMessageAddMore,
      'children',
      'add more',
    ).find(FormattedMessage);
    expect(formattedMessagePlaceholder).toHaveLength(1);
    expect(formattedMessagePlaceholder.props()).toMatchObject(
      messages.userPickerPlaceholder,
    );

    const userPicker = renderProp(
      formattedMessagePlaceholder,
      'children',
      'placeholder',
    ).find(UserPicker);
    expect(userPicker).toHaveLength(1);
    expect(userPicker.props()).toMatchObject({
      placeholder: 'placeholder',
      addMoreMessage: 'add more',
      onChange: fieldProps.onChange,
      value: fieldProps.value,
      loadOptions,
    });
  });

  describe('validate function', () => {
    let validate;
    beforeEach(() => {
      const component = shallowWithIntl(
        <UserPickerField loadOptions={loadOptions} />,
      );
      validate = component.prop('validate');
    });

    test.each([
      [[], 'REQUIRED'],
      [null, 'REQUIRED'],
      [[{ id: 'some-id' }], undefined],
    ])('should return "%s" when called with %p', (value, expected) => {
      expect(validate(value)).toEqual(expected);
    });
  });
});
