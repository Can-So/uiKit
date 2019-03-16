import * as React from 'react';
import { md, Example, code } from '@findable/docs';

export default md`

This package provides a transformer for ProseMirror Node <-> Wikimarkup conversion.
  ## Usage

  Use the component in your React app as follows:

  ${code`import { WikiMarkupTransformer } from '@findable/editor-wikimarkup-transformer';
  const transformer = new WikiMarkupTransformer(schema);
  const pmNode = transformer.parse(wikiMarkup);`}

  ${(
    <Example
      packageName="@findable/editor-wikimarkup-transformer"
      Component={require('../examples/0-adf-to-wikimarkup').default}
      title="ADF to Wikimarkup"
      source={require('!!raw-loader!../examples/0-adf-to-wikimarkup')}
    />
  )}
`;
