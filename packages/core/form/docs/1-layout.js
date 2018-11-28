// @flow
import React from 'react';
import { code, md, Example, Props } from '@atlaskit/docs';
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
 
## Usage

${code`import Form {
    FormHeader,
    FormSection,
    FormFooter
  } from '@atlaskit/form';`}

  FormHeader & FormFooter provide optional layout containers. If you are using Form then FormSection is required as a container.
  for your Fields.
  
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
