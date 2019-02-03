import Button from '@atlaskit/button';
import Form, { FormFooter, FormSection, HelperMessage } from '@atlaskit/form';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CommentField } from '../../../components/CommentField';
import { ShareForm } from '../../../components/ShareForm';
import { ShareHeader } from '../../../components/ShareHeader';
import { UserPickerField } from '../../../components/UserPickerField';
import { CopyLinkButton } from '../../../components/CopyLinkButton';
import { messages } from '../../../i18n';
import { renderProp } from '../_testUtils';

describe('ShareForm', () => {
  it('should render Form with fields', () => {
    const mockLink = 'link';
    const loadOptions = jest.fn();
    const onShareClick = jest.fn();
    const component = shallow(
      <ShareForm
        copyLink={mockLink}
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
    const copyLinkButton = footer.find(CopyLinkButton);
    expect(copyLinkButton.length).toBe(1);
    expect(copyLinkButton.prop('link')).toEqual(mockLink);

    const buttonLabel = button.find(FormattedMessage);
    expect(buttonLabel).toHaveLength(1);
    expect(buttonLabel.props()).toMatchObject(messages.formSend);

    const helperMessage = form.find(HelperMessage);
    expect(helperMessage).toHaveLength(0);
  });

  it('should override submit button label', () => {
    const mockLink = 'link';
    const loadOptions = jest.fn();
    const component = shallow(
      <ShareForm
        copyLink={mockLink}
        loadOptions={loadOptions}
        submitButtonLabel="Invite"
      />,
    );

    const akForm = component.find<any>(Form);
    const formProps = {};
    const form = renderProp(akForm, 'children', { formProps }).find('form');

    const footer = form.find(FormFooter);
    const button = footer.find(Button);
    expect(button.text()).toEqual('Invite');
  });

  describe('shouldShowCapabilitiesInfoMessage prop', () => {
    it('should only rendered HelperMessage if shouldShowCapabilitiesInfoMessage prop is true', () => {
      const loadOptions = jest.fn();
      const onShareClick = jest.fn();
      const wrapper = mount(
        <ShareForm
          copyLink="link"
          loadOptions={loadOptions}
          onShareClick={onShareClick}
          title="some title"
          shouldShowCapabilitiesInfoMessage
        />,
      );
      expect(wrapper.find(HelperMessage)).toHaveLength(1);
    });

    it('should allow capabilitiesInfoMessage to replace default helper message if provided', () => {
      const mockMessage = 'mock message';
      const loadOptions = jest.fn();
      const onShareClick = jest.fn();
      const wrapper = mount(
        <ShareForm
          capabilitiesInfoMessage={mockMessage}
          copyLink="link"
          loadOptions={loadOptions}
          onShareClick={onShareClick}
          title="some title"
          shouldShowCapabilitiesInfoMessage
        />,
      );
      expect(wrapper.find(HelperMessage)).toHaveLength(1);
      expect(wrapper.find(HelperMessage).text()).toEqual(mockMessage);
    });
  });
});
