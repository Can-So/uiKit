// @flow
import React from 'react';
import { md, code, Props } from '@atlaskit/docs';
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

This page covers how validation works at both form and field level.

<a name="field-validation"></a>
## Field-level validation

The

<a name="form-validation"></a>
## Form validation


${code`
import Form, { ErrorMessage, HelperMessage, ValidMessage } from '@atlaskit/form';
import Button from '@atlaskit/button';

const MyField = () => {}

`}

`;
