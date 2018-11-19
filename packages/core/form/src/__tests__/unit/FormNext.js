// @flow
import React from 'react';
import { mount } from 'enzyme';
import Button from '@atlaskit/button';
import FieldText from '@atlaskit/field-text';
import Form from '../../FormNext';
import Field from '../../FieldNext';
import { HelperMessage, ErrorMessage } from '../../Messages';

test('should not be dirty after mount', () => {
  const wrapper = mount(
    <Form onSubmit={jest.fn()}>
      {() => (
        <Field name="username" defaultValue="Joe Bloggs">
          {({ fieldProps, dirty }) => (
            <>
              <FieldText {...fieldProps} />
              <HelperMessage>
                Field is {dirty ? 'dirty' : 'pristine'}
              </HelperMessage>
            </>
          )}
        </Field>
      )}
    </Form>,
  );
  expect(wrapper.find(HelperMessage).text()).toBe('Field is pristine');
});

test('should validate field on mount', () => {
  const wrapper = mount(
    <Form onSubmit={jest.fn()}>
      {() => (
        <Field
          name="username"
          defaultValue="Joe Bloggs"
          validate={() => 'ERROR'}
        >
          {({ fieldProps, error }) => (
            <>
              <FieldText {...fieldProps} />
              {error && (
                <ErrorMessage>There is a problem with this field</ErrorMessage>
              )}
            </>
          )}
        </Field>
      )}
    </Form>,
  );
  expect(wrapper.find(ErrorMessage)).toHaveLength(1);
  expect(wrapper.find(FieldText).props()).toMatchObject({ isInvalid: true });
});

test('should show errors on submission', () => {
  const wrapper = mount(
    <Form onSubmit={() => Promise.resolve({ username: 'TAKEN_USERNAME' })}>
      {({ onSubmit }) => (
        <>
          <Field name="username" defaultValue="Joe Bloggs">
            {({ fieldProps, submitError }) => (
              <>
                <FieldText {...fieldProps} />
                {submitError && (
                  <ErrorMessage>
                    There is a problem with this field
                  </ErrorMessage>
                )}
              </>
            )}
          </Field>
          <Button onClick={onSubmit}>Submit</Button>
        </>
      )}
    </Form>,
  );
  expect(wrapper.find(ErrorMessage)).toHaveLength(0);
  wrapper.find(Button).simulate('click');
  return Promise.resolve().then(() => {
    wrapper.update();
    expect(wrapper.find(ErrorMessage)).toHaveLength(1);
    expect(wrapper.find(FieldText).props()).toMatchObject({ isInvalid: true });
  });
});
