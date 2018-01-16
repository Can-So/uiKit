// @flow

import React from 'react';
import { md, Example, Props } from '@atlaskit/docs';

export default md`
The comment component exports both the wrapper component for comments, as well as several smaller components designed to be passed in to the comment component to display a richer comment. The complete export is:

~~~
import Comment, {
  CommentAction,
  CommentAuthor,
  CommentEdited,
  CommentLayout,
  CommentTime
} from @atlaskit/comment
~~~
All subcomponents are expected as props with the same lowercased name.

All children components are displayed indented after the comment body, allowing nesting of comments.

${(
  <Example
    Component={require('../examples/01-example-comment').default}
    title="Example Comment"
    source={require('!!raw-loader!../examples/01-example-comment')}
  />
)}

${(
  <Example
    Component={require('../examples/02-comment-components').default}
    title="Comment Components"
    source={require('!!raw-loader!../examples/02-comment-components')}
  />
)}

${(
  <Example
    Component={require('../examples/03-nested-comments').default}
    title="Nested Comments"
    source={require('!!raw-loader!../examples/03-nested-comments')}
  />
)}

${(
  <Props
    heading="CommentAction Props"
    props={require('!!extract-react-types-loader!../src/components/ActionItem')}
  />
)}

${(
  <Props
    heading="CommentAuthor Props"
    props={require('!!extract-react-types-loader!../src/components/Author')}
  />
)}

${(
  <Props
    heading="CommentEdited Props"
    props={require('!!extract-react-types-loader!../src/components/Edited')}
  />
)}

${(
  <Props
    heading="CommentLayout Props"
    props={require('!!extract-react-types-loader!../src/components/Layout')}
  />
)}

${(
  <Props
    heading="CommentTime Props"
    props={require('!!extract-react-types-loader!../src/components/Time')}
  />
)}
`;
