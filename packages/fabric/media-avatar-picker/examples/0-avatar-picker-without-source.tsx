import * as React from 'react';

import {Avatar, AvatarPickerDialog} from '../src';
import {generateAvatars} from '../example-helpers';
import {tallImage} from '@atlaskit/media-test-helpers';

const avatars: Array<Avatar> = generateAvatars(30);

export default () => (
  <AvatarPickerDialog
    avatars={avatars}
    onImagePicked={() => console.log('onImagePicked')}
    onAvatarPicked={() => console.log('onAvatarPicked')}
    onCancel={() => console.log('onCancel')}
  />
);