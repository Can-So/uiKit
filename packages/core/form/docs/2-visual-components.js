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

The @atlaskit/form package exports a number of components to help layout your form
and display validation messages to the user. The page covers the components that
fall in those categories.

<a name="validation-messages"></a>
## Helper, Error & Valid messages

These components are used to 

${code`
import Form, { ErrorMessage, HelperMessage, ValidMessage } from '@atlaskit/form';
import Button from '@atlaskit/button';

const MyField = () => {}

`}

### HelperMessage props

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/FormHeader')}
      heading=""
    />
  )}

### ErrorMessage props

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/FormSection')}
      heading=""
    />
  )}

### ValidMessage props

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/FormFooter')}
      heading=""
    />
  )}


<a name="form-layout"></a>
## FormHeader, FormSection & FormFooter

These components are used to 

${code`
import Form, { FormHeader, FormSection, FormFooter } from '@atlaskit/form';
import Button from '@atlaskit/button';

const MyForm = () => (
  <Form onSubmit={data => console.log('form data', data)}>
    {({ formProps }) => (
      <form {...formProps}>
        <FormHeader title="My form" />
        <FormSection title="Section one">
          {/* fields */}
        </FormSection>
        <FormFooter>
          {/* buttons */}
        </FormFooter>
      </form>
    )}
  </Form>
);
`}

### FormHeader props

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/FormHeader')}
      heading=""
    />
  )}

### FormSection props

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/FormSection')}
      heading=""
    />
  )}

### FormFooter props

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/FormFooter')}
      heading=""
    />
  )}
`;
