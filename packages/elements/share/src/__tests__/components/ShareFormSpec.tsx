import Button from '@atlaskit/button';
import Form, { FormFooter, FormSection } from '@atlaskit/form';
import { shallow } from 'enzyme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CommentField } from '../../components/CommentField';
import { ShareForm } from '../../components/ShareForm';
import { ShareHeader } from '../../components/ShareHeader';
import { UserPickerField } from '../../components/UserPickerField';
import { messages } from '../../i18n';
import { renderProp } from '../_testUtils';

describe('ShareForm', () => {
  it('should render Form with fields', () => {
    const loadOptions = jest.fn();
    const onShareClick = jest.fn();
    const component = shallow(
      <ShareForm
        loadOptions={loadOptions}
        onShareClick={onShareClick}
        title="some title"
      />,
    );

    const akForm = component.find<any>(Form);
    expect(akForm).toHaveLength(1);
    expect(akForm.prop('onSubmit')).toBe(onShareClick);

    const formProps = {};
    const form = renderProp(akForm, 'children', { formProps }).find('form');
    expect(form).toHaveLength(1);
    expect(form.find(ShareHeader).prop('title')).toEqual('some title');

    const formSection = form.find(FormSection);
    expect(formSection).toHaveLength(1);
    const userPickerField = formSection.find(UserPickerField);
    expect(userPickerField).toHaveLength(1);
    expect(userPickerField.prop('loadOptions')).toBe(loadOptions);
    expect(formSection.find(CommentField)).toHaveLength(1);

    const footer = form.find(FormFooter);
    expect(footer).toHaveLength(1);
    const button = footer.find(Button);
    expect(button).toHaveLength(1);
    expect(button.props()).toMatchObject({
      appearance: 'primary',
      type: 'submit',
    });

    const buttonLabel = button.find(FormattedMessage);
    expect(buttonLabel).toHaveLength(1);
    expect(buttonLabel.props()).toMatchObject(messages.formSend);
  });

  it('should override submit button label', () => {
    const loadOptions = jest.fn();
    const component = shallow(
      <ShareForm loadOptions={loadOptions} submitButtonLabel="Invite" />,
    );

    const akForm = component.find<any>(Form);
    const formProps = {};
    const form = renderProp(akForm, 'children', { formProps }).find('form');

    const footer = form.find(FormFooter);
    const button = footer.find(Button);
    expect(button.text()).toEqual('Invite');
  });
});
