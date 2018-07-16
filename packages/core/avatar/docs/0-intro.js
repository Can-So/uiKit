// @flow
import React from 'react';
import { md, Example, Props } from '@atlaskit/docs';
import { colors } from '@atlaskit/theme';

const Warning = p => (
  <div
    style={{
      backgroundColor: colors.Y75,
      boxShadow: `-4px 0 0 ${colors.Y200}`,
      marginBottom: '1.4em',
      padding: '1em 1.2em',
    }}
    {...p}
  />
);

export default md`
  ### Usage

  ${(
    <Warning>
      <p>
        <strong>
          The previous export of `AvatarGroup` has been moved to its own package
          `@atlaskit/avatar-group`.
        </strong>
      </p>
      <p>
        Please update your dependencies to use the @atlaskit/avatar-group
        package.
      </p>
    </Warning>
  )}

  This package exports an number of different Avatar related components:

  - Avatar (Default Export)
  - [AvatarItem](/packages/core/avatar/docs/avatar-item)
  - [Presence](/packages/core/avatar/docs/presence)
  - [Status](/packages/core/avatar/docs/status)
  - [Skeleton](/packages/core/avatar/docs/skeleton)

  ## Avatar - Default Export

  Use the \`Avatar\` component to represent users with their profile picture.
  Optionally, a presence to indicate online status can also be displayed.

  You can use the \`Presence\` component independently for contexts where the
  profile picture is not required (e.g. next to a username)

  ${(
    <Example
      Component={require('../examples/01-basicAvatar').default}
      title="Avatar"
      source={require('!!raw-loader!../examples/01-basicAvatar')}
    />
  )}

  ${(
    <Props
      heading="Avatar Props"
      props={require('!!extract-react-types-loader!../src/components/Avatar')}
    />
  )}
`;
