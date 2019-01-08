import { shallowWithIntl } from '@atlaskit/editor-test-helpers';
import { ErrorMessage } from '@atlaskit/form';
import UserPicker from '@atlaskit/user-picker';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { REQUIRED, UserPickerField } from '../../components/UserPickerField';
import { messages } from '../../i18n';
import { renderProp } from '../_testUtils';

describe('UserPickerField', () => {
  const loadOptions = jest.fn();

  const renderField = (...args) =>
    renderProp(
      shallowWithIntl(<UserPickerField loadOptions={loadOptions} />),
      'children',
      ...args,
    );

  it('should render UserPicker', () => {
    const fieldProps = {
      onChange: jest.fn(),
      value: [],
    };
    const field = renderField({ fieldProps, meta: { valid: true } });

    const formattedMessageAddMore = field.find(FormattedMessage);
    expect(formattedMessageAddMore).toHaveLength(1);
    expect(formattedMessageAddMore.props()).toMatchObject(
      messages.userPickerAddMoreMessage,
    );

    expect(field.find(ErrorMessage).exists()).toBeFalsy();

    const userPicker = renderProp(
      formattedMessageAddMore,
      'children',
      'add more',
    ).find(UserPicker);
    expect(userPicker).toHaveLength(1);
    expect(userPicker.props()).toMatchObject({
      addMoreMessage: 'add more',
      onChange: fieldProps.onChange,
      value: fieldProps.value,
      placeholder: <FormattedMessage {...messages.userPickerPlaceholder} />,
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
      ['REQUIRED', []],
      ['REQUIRED', null],
      [undefined, [{ id: 'some-id' }]],
    ])('should return "%s" when called with %p', (expected, value) => {
      expect(validate(value)).toEqual(expected);
    });
  });

  describe('error messages', () => {
    it('should display required message', () => {
      const fieldProps = {
        onChange: jest.fn(),
        value: [],
      };
      const errorMessage = renderField({
        fieldProps,
        meta: { valid: false },
        error: REQUIRED,
      }).find(ErrorMessage);

      expect(errorMessage).toHaveLength(1);
      const message = errorMessage.find(FormattedMessage);
      expect(message).toHaveLength(1);
      expect(message.props()).toMatchObject(messages.userPickerRequiredMessage);
    });
  });
});
