// @flow
import React from 'react';
import { md, Example } from '@atlaskit/docs';

export default md`
  React component which allows selection of an item or items from a dropdown list.
  Substitute for the native select element.

  ${(
    <Example
      Component={require('../examples/00-single-select').default}
      source={require('!!raw-loader!../examples/00-single-select')}
      title="Single"
    />
  )}

  ${(
    <Example
      Component={require('../examples/01-multi-select').default}
      source={require('!!raw-loader!../examples/01-multi-select')}
      title="Multi"
    />
  )}

  ${(
    <Example
      Component={require('../examples/05-validation').default}
      source={require('!!raw-loader!../examples/05-validation')}
      title="Validation"
    />
  )}

  ### Named Exports

  To consolidate patterns and improve developer experience \`@atlaskit/select\`
  provides some pre-configure components as named exports.

  ${(
    <Example
      Component={require('../examples/02-radio-select').default}
      source={require('!!raw-loader!../examples/02-radio-select')}
      title="Radio Select"
    />
  )}

  ${(
    <Example
      Component={require('../examples/03-checkbox-select').default}
      source={require('!!raw-loader!../examples/03-checkbox-select')}
      title="Checkbox Select"
    />
  )}

  ${(
    <Example
      Component={require('../examples/04-country-select').default}
      source={require('!!raw-loader!../examples/04-country-select')}
      title="Country Select"
    />
  )}

  ${(
    <Example
      Component={require('../examples/06-async-select-with-callback').default}
      source={require('!!raw-loader!../examples/06-async-select-with-callback')}
      title="Async Select"
    />
  )}

  ${(
    <Example
      Component={require('../examples/09-creatable-select.js').default}
      source={require('!!raw-loader!../examples/09-creatable-select.js')}
      title="Creatable Select"
    />
  )}

  ${(
    <Example
      Component={require('../examples/08-async-creatable-select.js').default}
      source={require('!!raw-loader!../examples/08-async-creatable-select.js')}
      title="AsyncCreatable Select"
    />
  )}

  ### Props

  Please refer to the react-select documentation for [prop documentation](https://bit.ly/react-select-v2).
`;

/*
re-introduce props when there's a resolution for missing types in extract-react-types

${(
  <Props
    heading="Select Props"
    props={require('!!extract-react-types-loader!../src/Select')}
  />
)}
*/
