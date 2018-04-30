// @flow
import React from 'react';
import { AvatarGroup } from '../src';
import { RANDOM_USERS, getAdorableAvatar } from '../examples-util/data';

function getStatus() {
  const chance = Math.random();
  switch (true) {
    case chance < 0.25:
      return 'approved';
    case chance < 0.5:
      return 'declined';
    default:
      return 'locked';
  }
}

const data = RANDOM_USERS.slice(0, 10).map(user => ({
  ...user,
  appearance: 'circle',
  enableTooltip: true,
  size: 'medium',
  src: getAdorableAvatar(user.email),
  status: getStatus(),
}));

export default () => (
  <div>
    <AvatarGroup
      appearance="stack"
      onAvatarClick={console.log}
      data={data}
      size="large"
    />
  </div>
);
