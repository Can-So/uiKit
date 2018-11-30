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

<a name="field-reference"></a>

## Field [#](#field-reference)

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

## CheckboxField [#](#checkboxfield-reference)

Checkbox fields are different enough to warrent this variation of Field.
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
