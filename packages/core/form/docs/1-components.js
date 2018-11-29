// @flow
import React from 'react';
import { code, md, Props } from '@atlaskit/docs';
import SectionMessage from '@atlaskit/section-message';

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

${code`import Form, { Field, CheckboxField } from '@atlaskit/form';`}

This page is the reference for [Form](#form-reference), [Field](#field-reference)
and [CheckboxField](#checkboxfield-reference) components. These are the three
 main components used to compose a form.

<a name="form-reference"></a>
## Form

Responsible for managing the state of the form. Provides props to spread onto
a form element and others to check the form state.

${code`
import Form from '@atlaskit/form';
import Button from '@atlaskit/button';

const MyForm = () => (
  <Form onSubmit={data => console.log('form data', data)}>
    {({ formProps, dirty, submitting }) => (
      <form {...formProps}>
        {/* fields */}
        <Button
          type="submit"
          appearance="primary"
          isDisabled={!dirty || submitting}
        >
          Submit
        </Button>
      </form>
    )}
  </Form>
);
`}

### Form props
  
  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/Form')}
      heading=""
    />
  )}

<a name="field-reference"></a>
## Field

Each Field component is an entry in the form state. Passes down props to be spread
onto the inner component as well as information about the field state.

${code`
import { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';

const UsernameField = () => (
  <Field name="username" defaultValue="" isRequired>
    {({ fieldProps, error }) => <TextField {...fieldProps} />}
  </Field>
);
`}

### Field props

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/Field')}
      heading=""
    />
  )}

<a name="checkboxfield-reference"></a>
## CheckboxField

Checkbox fields are different enough to warrent this a variation of Field.
By default the value of a CheckboxField will be true or false. When the 
component is rendered with a \`value\` prop the form value will be an array. 
The array with contain the \`value\` depending on whether the field is checked.

${code`
import { CheckboxField } from '@atlaskit/form';
import { Checkbox } from '@atlaskit/checkbox';

const RememberMeField = () => (
  <CheckboxField name="remember" defaultIsChecked>
    {({ fieldProps }) => (
      <Checkbox {...fieldProps} label="Remember me" />
    )}
  </CheckboxField>
);
`}

### CheckboxField props

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/CheckboxField')}
      heading=""
    />
  )}
`;
