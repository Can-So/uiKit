import { colors } from '@atlaskit/theme';
import * as React from 'react';
import { User } from '../types';
import { HighlightText } from './HighlightText';
import { hasValue } from './utils';
import { CommonOption } from './CommonOption';
import { OptionTextWrapper } from './styles';

export type UserOptionProps = {
  user: User;
  status: string;
  isSelected: boolean;
};

export class UserOption extends React.PureComponent<UserOptionProps> {
  private getPrimaryText = () => {
    const {
      user: { name, publicName, highlight },
    } = this.props;

    const result = [
      <OptionTextWrapper
        key="name"
        color={this.props.isSelected ? colors.N0 : colors.N800}
      >
        <HighlightText highlights={highlight && highlight.name}>
          {name}
        </HighlightText>
      </OptionTextWrapper>,
    ];
    if (hasValue(publicName) && name.trim() !== publicName.trim()) {
      result.push(
        <React.Fragment key="publicName">
          {' '}
          <OptionTextWrapper
            color={this.props.isSelected ? colors.N50 : colors.N200}
          >
            (
            <HighlightText highlights={highlight && highlight.publicName}>
              {publicName}
            </HighlightText>
            )
          </OptionTextWrapper>
        </React.Fragment>,
      );
    }
    return result;
  };

  private renderByline = () =>
    this.props.user.byline ? (
      <OptionTextWrapper
        color={this.props.isSelected ? colors.N50 : colors.N200}
      >
        {this.props.user.byline}
      </OptionTextWrapper>
    ) : (
      undefined
    );

  render() {
    const {
      user: { name, avatarUrl },
      status,
    } = this.props;
    return (
      <CommonOption
        name={name}
        avatarUrl={avatarUrl}
        presence={status}
        getByline={this.renderByline}
        getPrimaryText={this.getPrimaryText}
      />
    );
  }
}
