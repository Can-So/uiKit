// @flow
import React from 'react';
import Avatar, { AvatarGroup } from '@atlaskit/avatar';
import { AkProfilecardTrigger, AkProfileClient } from '@atlaskit/profilecard';
import { getDirectoryServiceEndpoint } from '../api/directory';

type AvatarWithProfileCardProps = {
  userId: string,
  username: string,
  cloudId: string,
};

const AvatarWithProfileCard = (props: AvatarWithProfileCardProps) => {
  const { userId, username, cloudId } = props;

  const profileClient = new AkProfileClient({
    url: getDirectoryServiceEndpoint(),
  });

  return (
    <AkProfilecardTrigger
      cloudId={cloudId}
      userId={userId}
      resourceClient={profileClient}
      actions={[
        {
          label: 'View profile', //TODO: How to i18n?
          callback: () => {
            window.location.href = `/wiki/display/~${username}`;
          },
        },
      ]}
    >
      <Avatar isHover={false} {...props} />
    </AkProfilecardTrigger>
  );
};

type User = {
  displayName: string,
  profilePicture: {
    path: string,
  },
  accountId: string,
  username: string,
};

type ContributorsProps = {
  cloudId: string,
  contributors: {
    publishers: {
      users: Array<User>,
    },
  },
};

const Contributors = (props: ContributorsProps) => {
  const data: Array<any> = props.contributors.publishers.users.map(user => {
    return {
      name: user.displayName,
      size: 'medium',
      src: user.profilePicture.path,
      userId: user.accountId,
      username: user.username,
    };
  });

  const AvatarWithCloudId = avatarProps => (
    <AvatarWithProfileCard {...avatarProps} cloudId={props.cloudId} />
  );

  return (
    <div style={{ maxWidth: 270 }}>
      <AvatarGroup
        appearance="stack"
        data={data}
        avatar={AvatarWithCloudId}
        size="small" //TODO: check this
        maxCount={3}
      />
    </div>
  );
};

export { Contributors };
