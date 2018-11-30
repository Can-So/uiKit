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

## FormHeader, FormSection & FormFooter

These components are can be used to help layout your form. They provide
padding and styling for form headings and subheadings.

${code`
import Form, { FormHeader, FormSection, FormFooter } from '@atlaskit/form';
import Button from '@atlaskit/button';

const MyForm = () => (
  <Form onSubmit={data => console.log('form data', data)}>
    {({ formProps }) => (
      <form {...formProps}>
        <FormHeader title="Register for axe throwing" />
        <FormSection title="Contact Information">
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
