import * as React from 'react';
import Avatar from '@atlaskit/avatar';
import { getAvatarSize } from './utils';

export class Props {
  appearance: string;
  src?: string;
  name?: string;
}

export class SizeableAvatar extends React.PureComponent<any, {}> {
  render() {
    const { appearance, src, name } = this.props;

    return (
      <Avatar
        isHover={false}
        size={getAvatarSize(appearance)}
        src={src}
        name={name}
      />
    );
  }
}
