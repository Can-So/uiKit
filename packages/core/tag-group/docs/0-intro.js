// @flow
import React from 'react';
import { md, Example, Props, code } from '@findable/docs';

export default md`
  A container around a [Tag](/components/tag) component that applies consistent
  styling to the collection of ties.

  ## Usage

  ${code`import TagGroup from '@findable/tag-group';`}

  ${(
    <Example
      packageName="@findable/tag-group"
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic')}
    />
  )}

  ${(
    <Props
      heading="TagGroup Props"
      props={require('!!extract-react-types-loader!../src/TagGroup')}
    />
  )}
`;
