// @flow
import React from 'react';
import { md, Example, Props, code } from '@findable/docs';
import SectionMessage from '@findable/section-message';

export default md`
  Tags are designed to be displayed within a [Tag Group](/components/tag-group).
  They can be rendered flat, as links, or with a close button.

  ${(
    <SectionMessage>{md`
      **Note:** Once a tag has been removed, there is nothing that you can pass
      to it to make it re-render the tag.
    `}</SectionMessage>
  )}
  

  ## Usage

  ${code`import Tag from '@findable/tag';`}

  ${(
    <Example
      packageName="@findable/tag"
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic')}
    />
  )}

  ${(
    <Example
      packageName="@findable/tag"
      Component={require('../examples/1-colors').default}
      title="Colors"
      source={require('!!raw-loader!../examples/1-colors')}
    />
  )}

  ${(
    <Props
      heading="Tag Props"
      props={require('!!extract-react-types-loader!../src/Tag')}
    />
  )}
`;
