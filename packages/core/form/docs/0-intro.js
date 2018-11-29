// @flow
import React from 'react';
import { md, code, Example } from '@atlaskit/docs';
import SectionMessage from '@atlaskit/section-message';
import { Link } from 'react-router-dom';

export default md`
${(
  <SectionMessage appearance="warning">
    <p>
      <strong>Note: @atlaskit/form is currently a developer preview.</strong>
    </p>
    <p>
      Please experiment with and test this package but be aware that the API may
      & probably will change with future releases.
    </p>
  </SectionMessage>
)}
  ## Getting started

  This package contains a number of components to help manage form **state**, **validation** and **layout**.
  Below is an example of a form with a single text field.

  ${code`
import Form, { Field } from '@atlaskit/form';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';

const MyForm = () => (
  <Form onSubmit={data => console.log('form data', data)}>
    {({ formProps }) => (
      <form {...formProps}>
        <Field name="username" defaultValue="" label="User name" isRequired>
          {({ fieldProps }) => <TextField {...fieldProps} />}
        </Field>
        <Button type="submit" appearance="primary">
          Submit
        </Button>
      </form>
    )}
  </Form>
);
`}

  This working example shows off different field types, validation and submission.

  ${(
    <Example
      packageName="@atlaskit/form"
      Component={require('../examples/0-signup-form').default}
      title="Sign up example"
      source={require('!!raw-loader!../examples/0-signup-form')}
    />
  )}
  
  ## Concepts

  This outlines the main concepts in the package and how they work together.

  ### The Form
  
  Form holds the current state of all fields. It is the source of truth for the form.
  In other words, your app's state is not the source of truth for form. From your app's
  perspective the Form component is an uncontrolled black box. You describe the fields,
  pass in default values and wait for the callback when the form is submitted.
  
  Form does not render anything itself. Instead it passes down props it expects to be
  spread onto a form element. It also passes to it's children global form information.
  This includes whether the form is dirty, disabled or submitting.
  
  The onSubmit function gets called when all fields are valid and the form gets
  submitted.
  
  ### The Field
  
  Each Field component is represented as a key-value entry in the form state. The key
  is the name prop used for Field. The value is the current value of the component
  controlled by Field.
  
  The label is the only visual element that Field renders. Like Form, Field passes
  down props to be spread on whichever component is controlled. The children function
  also passes along other information about the field. This includes any errors as 
  well as more granular things like dirty, touched and valid. This information should
  be used to give the user feedback about the field.
  
  We have tried to make easy to wrap other Atlaskit components in a Field component.
  That said, any component with a value and an on change handler can be a field. 
  If you have a colourful example of a field, try boil it down to something with 
  value and onChange props. Wire that component under a Field and you have 
  got a custom field working in your form.

  ## More examples & reference
${(
  <ul>
    <li>
      <Link to="form/docs/components">
        Learn more about Form and Field components
      </Link>
    </li>
    <li>
      <Link to="form/docs/visual-components">
        Browse the list of visual helper components
      </Link>
    </li>
    <li>
      <Link to="form/docs/migrating">
        See how Form and Field validation works
      </Link>
    </li>
  </ul>
)}
`;
