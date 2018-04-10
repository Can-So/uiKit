import * as React from 'react';
import { PureComponent } from 'react';

import { PredefinedAvatarViewWrapper, LargeAvatarImage } from './styled';
import { Avatar } from '../avatar-list';

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import Button from '@atlaskit/button';

export interface BackBtnProps {
  onClick?: () => void;
}

class BackBtn extends PureComponent<BackBtnProps, {}> {
  render() {
    return (
      <Button
        className="back-button"
        iconAfter={<ArrowLeftIcon label="" />}
        onClick={this.props.onClick}
      />
    );
  }
}

export interface PredefinedAvatarViewProps {
  avatars: Array<Avatar>;
  onGoBack?: () => void;
  onAvatarSelected: (avatar: Avatar) => void;
  selectedAvatar?: Avatar;
  predefinedAvatarsText?: string;
}

export class PredefinedAvatarView extends PureComponent<
  PredefinedAvatarViewProps,
  {}
> {
  static defaultProps: PredefinedAvatarViewProps = {
    avatars: [],
    predefinedAvatarsText: 'Default avatars',
    onAvatarSelected() {},
  };

  render() {
    const {
      avatars,
      selectedAvatar,
      onGoBack,
      predefinedAvatarsText,
    } = this.props;
    const cards = avatars.map((avatar, idx) => {
      const elementKey = `predefined-avatar-${idx}`;
      return (
        <li key={elementKey}>
          <LargeAvatarImage
            isSelected={avatar === selectedAvatar}
            src={avatar.dataURI}
            onClick={this.createOnItemClickHandler(avatar)}
          />
        </li>
      );
    });

    return (
      <PredefinedAvatarViewWrapper>
        <div className="header">
          <BackBtn onClick={onGoBack} />
          <div className="description">{predefinedAvatarsText}</div>
        </div>
        <ul>{cards}</ul>
      </PredefinedAvatarViewWrapper>
    );
  }

  createOnItemClickHandler(avatar: Avatar) {
    const { onAvatarSelected } = this.props;
    return e => {
      if (onAvatarSelected) {
        onAvatarSelected(avatar);
      }
    };
  }
}
