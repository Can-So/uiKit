// @flow
import React from 'react';
import { md, Example, Props } from '@atlaskit/docs';

export default md`
  Theme is a combined component and utility set, exporting a main component for
  use and as well as a number of helper methods to allow easy application of
  atlaskit's themes.

  \`\`\`
  import { AtlaskitThemeProvider, themed, colors } from '@atlaskit/theme';
  \`\`\`

  ## The theme provider

  Theme provider is a wrapper component that accepts a 'mode'. This mode is passed down to styled components below it, using the styled components library theme provider, while also providing some defaults.

  Native Atlaskit components are set up to have both a 'light' mode and a 'dark' mode, and will respond to this, defaulting to the 'light' mode if no theme is provided.

  The AtlaskitThemeProvider should wrap your entire app, to ensure all components are set to the same theme. Mixing dark and light moded components will severely impact accessibility.
  themed function

  ${(
    <Example
      Component={require('../examples/0-theme-provider').default}
      title="Theme Provider Example"
      source={require('!!raw-loader!../examples/0-theme-provider')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/AtlaskitThemeProvider')}
    />
  )}

  ## Helpers

  The \`themed\` export is a function that generates functions which switch on mode. These generated functions can be passed to a styled component to make a property responsive to mode. Atlaskit components will do this by default.
  colors object

  The \`colors\` object is an export that has the ADG colors attached to it, for easy use.
`;
