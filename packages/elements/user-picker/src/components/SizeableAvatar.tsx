import Avatar from '@atlaskit/avatar';
import * as React from 'react';
import { getAvatarSize } from './utils';

export class Props {
  appearance: 'compact' | 'normal' | 'big';
  src?: string;
  name?: string;
  presence?: string;
}

export class SizeableAvatar extends React.PureComponent<Props, {}> {
  render() {
    const { appearance, src, name, presence } = this.props;

    return (
      <Avatar
        isHover={false}
        size={getAvatarSize(appearance)}
        src={src}
        name={name}
        enableTooltip={false}
        borderColor="transparent"
        presence={presence}
      />
    );
  }
}
