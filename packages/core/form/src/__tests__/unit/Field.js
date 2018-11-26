// @flow
import React from 'react';
import { mount } from 'enzyme';
import Button from '@atlaskit/button';
import FieldText from '@atlaskit/field-text';
import { WithState } from './helpers';
import Form, { Field } from '../../../src';
import { HelperMessage, ErrorMessage } from '../../Messages';

const touch = wrapper => {
  wrapper.simulate('focus');
  wrapper.simulate('blur');
};

test('should not be dirty after mount', () => {
  const wrapper = mount(
    <Form onSubmit={jest.fn()}>
      {() => (
        <Field name="username" defaultValue="Joe Bloggs">
          {({ fieldProps, meta: { dirty } }) => (
            <>
              <FieldText {...fieldProps} />
              <HelperMessage>
                Field is {dirty === true ? 'dirty' : 'pristine'}
              </HelperMessage>
            </>
          )}
        </Field>
      )}
    </Form>,
  );
  expect(wrapper.find(HelperMessage).text()).toBe('Field is pristine');
});

test('untouched field should not show validation error', () => {
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
  expect(wrapper.find(ErrorMessage)).toHaveLength(0);
  expect(wrapper.find(FieldText).props()).toMatchObject({ isInvalid: false });
});

test('touched field should show validation error', () => {
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
  touch(wrapper.find('input'));
  expect(wrapper.find(ErrorMessage)).toHaveLength(1);
  expect(wrapper.find(FieldText).props()).toMatchObject({ isInvalid: true });
});

test('should show errors after submission', () => {
  const wrapper = mount(
    <Form onSubmit={() => Promise.resolve({ username: 'TAKEN_USERNAME' })}>
      {({ formProps: { onSubmit } }) => (
        <>
          <Field name="username" defaultValue="Joe Bloggs">
            {({ fieldProps, error }) => (
              <>
                <FieldText {...fieldProps} />
                {error === 'TAKEN_USERNAME' && (
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

test('change in defaultValue should reset form field', () => {
  const wrapper = mount(
    <WithState defaultState={''}>
      {(defaultValue, setDefaultValue) => (
        <>
          <Form onSubmit={jest.fn()}>
            {() => (
              <Field
                name="username"
                defaultValue={defaultValue}
                validate={value => (value.length < 1 ? 'too short' : undefined)}
              >
                {({ fieldProps, error }) => (
                  <>
                    <FieldText {...fieldProps} />
                    {error && (
                      <ErrorMessage>
                        There is a problem with this field
                      </ErrorMessage>
                    )}
                  </>
                )}
              </Field>
            )}
          </Form>
          <Button onClick={() => setDefaultValue('jill')}>Submit</Button>
        </>
      )}
    </WithState>,
  );
  wrapper.find(Button).simulate('click');
  return Promise.resolve().then(() => {
    wrapper.update();
    expect(wrapper.find(ErrorMessage)).toHaveLength(0);
    expect(wrapper.find(FieldText).props()).toMatchObject({ value: 'jill' });
  });
});

const wait = ms => new Promise(res => setTimeout(res, ms));

test('should indicate whether form is submitting', () => {
  let complete = () => {};
  const promise = new Promise(res => {
    complete = res;
  });
  const wrapper = mount(
    <Form onSubmit={() => promise}>
      {({ formProps, submitting }) => (
        <Button type="submit" onClick={formProps.onSubmit}>
          {submitting ? 'submitting' : 'submit'}
        </Button>
      )}
    </Form>,
  );
  expect(wrapper.find(Button).text()).toBe('submit');
  wrapper.find(Button).simulate('click');
  return Promise.resolve()
    .then(() => {
      wrapper.update();
      expect(wrapper.find(Button).text()).toBe('submitting');
      complete();
    })
    .then(() => {
      wrapper.update();
      expect(wrapper.find(Button).text()).toBe('submit');
    });
});
