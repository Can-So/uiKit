// @flow
import React from 'react';
import { md, Example } from '@atlaskit/docs';
import SectionMessage from '@atlaskit/section-message';
import { fieldComponents } from './data/fieldComponents';
import ComponentsTable from './data/ComponentsTable';

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

  ### Supported Atlaskit Components

  The following table lists all the currently supported components and any known issues.

  ${<ComponentsTable components={fieldComponents} />}


`;
