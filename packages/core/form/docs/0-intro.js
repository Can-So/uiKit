// @flow
import React from 'react';
import { md, Props, code } from '@atlaskit/docs';
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

  ### Usage
  The Form package contains a number of components to help manage form state, validation and layout.
  It has been designed for use with other Atlaskit components.

  ${code`
import Form, { Field } from '@atlaskit/form';
import Button from '@atlaskit/button';
import FieldText from '@atlaskit/field-text';

const MyForm = () => (
  <Form onSubmit={data => console.log('form data', data)}>
    {props => (
      <form {...props}>
        <Field name="username" defaultValue="" label="User name" isRequired>
          {({ fieldProps }) => (
            <FieldText shouldFitContainer isLabelHidden {...fieldProps} />
          )}
        </Field>
        <Button type="submit" appearance="primary">
          Submit
        </Button>
      </form>
    )}
  </Form>
);
`}

  Layout & state management can be implemented using **Form**, **FormHeader**, **FormSection** & **FormFooter** components.
  If you have existing form wrappers then **Field**, **FieldGroup** & **Validator** can still be used to provide validation via
  validator libs, custom validator functions or Regular expressions.

  ## Getting Started
${(
  <ul>
    <li>
      <Link to="form/docs/fields">See examples of different fields.</Link>
    </li>
    <li>
      <Link to="form/docs/validation">
        Learn about how Field validation works.
      </Link>
    </li>
    <li>
      <Link to="form/docs/migrating">
        Migrate an existing form that uses Atlaskit components
      </Link>
    </li>
  </ul>
)}
   ## More Examples & Reference
${(
  <ul>
    <li>
      <Link to="form/docs/layout">Form layout</Link>
    </li>
    <li>
      <Link to="form/docs/validation">Form & Field Validation</Link>
    </li>
    <li>
      <Link to="form/docs/field-components">Supported Atlaskit Components</Link>
    </li>
    <li>Designing better forms</li>
  </ul>
)}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/Form')}
      heading="Form Props"
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/FormHeader')}
      heading="FormHeader Props"
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/FormSection')}
      heading="FormSection Props"
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/FormFooter')}
      heading="FormFooter Props"
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/Field')}
      heading="Field Props"
    />
  )}

`;
