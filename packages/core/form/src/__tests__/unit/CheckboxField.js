// @flow
import React from 'react';
import { mount } from 'enzyme';
import Button from '@atlaskit/button';
import Checkbox from '@atlaskit/textfield';
import Form, { CheckboxField } from '../../../src';

test('should default to false value', () => {
  const spy = jest.fn();
  const wrapper = mount(
    <Form onSubmit={data => spy(data)}>
      {({ formProps }) => (
        <>
          <CheckboxField name="remember">
            {({ fieldProps }) => <Checkbox {...fieldProps} />}
          </CheckboxField>
          <Button onClick={formProps.onSubmit}>Submit</Button>
        </>
      )}
    </Form>,
  );
  wrapper.find(Button).simulate('click');
  expect(spy).toHaveBeenCalledWith({ remember: false });
});

test('should use value prop when set', () => {
  const spy = jest.fn();
  const wrapper = mount(
    <Form onSubmit={data => spy(data)}>
      {({ formProps }) => (
        <>
          <CheckboxField name="remember" value="always" defaultIsChecked>
            {({ fieldProps }) => <Checkbox {...fieldProps} />}
          </CheckboxField>
          <Button onClick={formProps.onSubmit}>Submit</Button>
        </>
      )}
    </Form>,
  );
  wrapper.find(Button).simulate('click');
  expect(spy).toHaveBeenCalledWith({ remember: ['always'] });
});

test('should be undefined when value prop set and not checked', () => {
  const spy = jest.fn();
  const wrapper = mount(
    <Form onSubmit={data => spy(data)}>
      {({ formProps }) => (
        <>
          <CheckboxField name="remember" value="always">
            {({ fieldProps }) => <Checkbox {...fieldProps} />}
          </CheckboxField>
          <Button onClick={formProps.onSubmit}>Submit</Button>
        </>
      )}
    </Form>,
  );
  wrapper.find(Button).simulate('click');
  // toHaveBeenCalled doesn't check undefined object properties
  expect(spy.mock.calls[0][0]).toMatchObject({ remember: [] });
});

test('fields with same name and defaultIsChecked should create array of values', () => {
  const spy = jest.fn();
  const wrapper = mount(
    <Form onSubmit={data => spy(data)}>
      {({ formProps }) => (
        <>
          <fieldset>
            <CheckboxField name="product" value="jira" defaultIsChecked>
              {({ fieldProps }) => <Checkbox {...fieldProps} />}
            </CheckboxField>
            <CheckboxField name="product" value="confluence" defaultIsChecked>
              {({ fieldProps }) => <Checkbox {...fieldProps} />}
            </CheckboxField>
            <CheckboxField name="product" value="bitbucket">
              {({ fieldProps }) => <Checkbox {...fieldProps} />}
            </CheckboxField>
          </fieldset>
          <Button onClick={formProps.onSubmit}>Submit</Button>
        </>
      )}
    </Form>,
  );
  wrapper.find(Button).simulate('click');
  expect(spy).toHaveBeenCalledWith({
    product: ['jira', 'confluence'],
  });
});

const wait = ms => new Promise(res => setTimeout(res, ms));

test('checking checkbox should append value to field value', () => {
  const spy = jest.fn();
  const wrapper = mount(
    <Form onSubmit={data => spy(data)}>
      {({ formProps }) => (
        <>
          <fieldset>
            <CheckboxField name="product" value="jira">
              {({ fieldProps }) => <Checkbox {...fieldProps} />}
            </CheckboxField>
            <CheckboxField name="product" value="confluence">
              {({ fieldProps }) => <Checkbox {...fieldProps} />}
            </CheckboxField>
            <CheckboxField name="product" value="bitbucket">
              {({ fieldProps }) => <Checkbox {...fieldProps} />}
            </CheckboxField>
          </fieldset>
          <Button onClick={formProps.onSubmit}>Submit</Button>
        </>
      )}
    </Form>,
  );
  wrapper
    .find('input')
    .last()
    .simulate('change', { target: { checked: true } });
  wrapper.find(Button).simulate('click');
  return wait(200).then(() => {
    expect(spy).toHaveBeenCalledWith({
      product: ['bitbucket'],
    });
  });
});
