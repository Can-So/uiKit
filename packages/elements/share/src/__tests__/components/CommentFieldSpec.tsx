import { shallowWithIntl } from '@atlaskit/editor-test-helpers';
import FieldTextArea from '@atlaskit/field-text-area';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CommentField } from '../../components/CommentField';
import { messages } from '../../i18n';
import { renderProp } from '../_testUtils';

describe('CommentField', () => {
  it('should render TextField', () => {
    const component = shallowWithIntl(<CommentField />);
    const fieldProps = {
      onChange: jest.fn(),
      value: 'Some text',
    };
    const field = renderProp(component, 'children', { fieldProps });

    const formattedMessage = field.find(FormattedMessage);
    expect(formattedMessage).toHaveLength(1);
    expect(formattedMessage.props()).toMatchObject(messages.commentPlaceholder);

    const fieldTextArea = renderProp(
      formattedMessage,
      'children',
      'placeholder',
    ).find(FieldTextArea);
    expect(fieldTextArea).toHaveLength(1);
    expect(fieldTextArea.prop('placeholder')).toEqual('placeholder');
    expect(fieldTextArea.prop('onChange')).toEqual(fieldProps.onChange);
    expect(fieldTextArea.prop('value')).toBe(fieldProps.value);
  });
});
