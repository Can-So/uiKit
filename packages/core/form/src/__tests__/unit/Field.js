// @flow
import React from 'react';
import { mount } from 'enzyme';
import Button from '@atlaskit/button';
import FieldText from '@atlaskit/field-text';
import TextField from '@atlaskit/textfield';
import Form, {
  Field,
  HelperMessage,
  ErrorMessage,
  ValidMessage,
} from '../../../src';
import { Label } from '../../styled/Field';

export class WithState extends React.Component<
  { defaultState: any, children: (any, Function) => any },
  { currentState: any },
> {
  state = {
    currentState: this.props.defaultState,
  };
  render() {
    return this.props.children(this.state.currentState, state =>
      this.setState({ currentState: state }),
    );
  }
}

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

test('should assosiate messages with field', () => {
  const wrapper = mount(
    <Form onSubmit={jest.fn()}>
      {() => (
        <Field name="username" id="username" defaultValue="">
          {({ fieldProps }) => (
            <>
              <TextField {...fieldProps} />
              <HelperMessage>Helper text</HelperMessage>
              <ErrorMessage>Error message</ErrorMessage>
              <ValidMessage>Valid message</ValidMessage>
            </>
          )}
        </Field>
      )}
    </Form>,
  );
  const labelledBy = wrapper
    .find(TextField)
    .prop('aria-labelledby')
    .split(' ');
  expect(labelledBy).toContain(
    wrapper
      .find(HelperMessage)
      .find('div')
      .prop('id'),
  );
  expect(labelledBy).toContain(
    wrapper
      .find(ErrorMessage)
      .find('div')
      .prop('id'),
  );
  expect(labelledBy).toContain(
    wrapper
      .find(ValidMessage)
      .find('div')
      .prop('id'),
  );
});

test('should assosiate label with field', () => {
  const wrapper = mount(
    <Form onSubmit={jest.fn()}>
      {() => (
        <Field name="username" id="username" label="User name" defaultValue="">
          {({ fieldProps }) => <TextField {...fieldProps} />}
        </Field>
      )}
    </Form>,
  );
  const labelledBy = wrapper
    .find(TextField)
    .prop('aria-labelledby')
    .split(' ');
  expect(labelledBy).toContain(wrapper.find(Label).prop('id'));
});

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

test('isDisabled should disable all fields in form', () => {
  const spy = jest.fn();
  const wrapper = mount(
    <Form onSubmit={spy} isDisabled>
      {({ formProps, disabled }) => (
        <form {...formProps}>
          <Field name="name" defaultValue="">
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <Button
            type="submit"
            onClick={formProps.onSubmit}
            isDisabled={disabled}
          >
            Submit
          </Button>
        </form>
      )}
    </Form>,
  );
  expect(wrapper.find(TextField).props()).toMatchObject({ isDisabled: true });
  wrapper.find(Button).simulate('click');
  return Promise.resolve().then(() => {
    expect(spy).not.toHaveBeenCalled();
  });
});

test('should never render with undefined fieldProp value', () => {
  const spy = jest.fn(() => 'Hello');
  mount(
    <Form onSubmit={jest.fn()}>
      {() => (
        <Field name="username" defaultValue="Joe Bloggs">
          {spy}
        </Field>
      )}
    </Form>,
  );
  return Promise.resolve().then(() => {
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toMatchObject({
      fieldProps: { value: 'Joe Bloggs' },
    });
    expect(spy.mock.calls[1][0]).toMatchObject({
      fieldProps: { value: 'Joe Bloggs' },
    });
  });
});

// unskip as part of https://ecosystem.atlassian.net/browse/AK-5752
// eslint-disable-next-line jest/no-disabled-tests
xtest('should always show most recent validation result', done => {
  let resolveValidation = () => {};
  const wrapper = mount(
    <Form onSubmit={jest.fn()}>
      {() => (
        <Field
          name="username"
          defaultValue=""
          validate={value => {
            if (value.length < 3) {
              return 'TOO_SHORT';
            } else if (value === 'Joe Bloggs') {
              return new Promise(res => {
                resolveValidation = () => res('TAKEN_USERNAME');
              });
            }
            return undefined;
          }}
        >
          {({ fieldProps, error }) => (
            <>
              <TextField {...fieldProps} />
              {error === 'TOO_SHORT' && <ErrorMessage>Too short</ErrorMessage>}
              {error === 'TAKEN_USERNAME' && (
                <ErrorMessage>Username is in use</ErrorMessage>
              )}
            </>
          )}
        </Field>
      )}
    </Form>,
  );
  // kick off an async validation that will fail
  wrapper.find('input').simulate('change', { target: { value: 'Joe Bloggs' } });
  // causes a sync validation failure
  wrapper.find('input').simulate('change', { target: { value: 'Jo' } });
  // now resolve previous async validation
  resolveValidation();
  // check that the most recent error message is visible - should be the sync validation error
  setTimeout(() => {
    wrapper.update();
    expect(wrapper.find(ErrorMessage)).toHaveLength(1);
    expect(wrapper.find(ErrorMessage).text()).toBe('Too short');
    done();
  });
});
