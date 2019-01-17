import { colors } from '@atlaskit/theme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Team } from '../types';
import { HighlightText } from './HighlightText';
import { messages } from './i18n';
import { CommonOption } from './CommonOption';
import { OptionTextWrapper } from './styles';

export type TeamOptionProps = {
  team: Team;
  isSelected: boolean;
};

export class TeamOption extends React.PureComponent<TeamOptionProps> {
  private getPrimaryText = () => {
    const {
      team: { name, highlight },
    } = this.props;

    return [
      <OptionTextWrapper
        key="name"
        color={this.props.isSelected ? colors.N0 : colors.N800}
      >
        <HighlightText highlights={highlight && highlight.name}>
          {name}
        </HighlightText>
      </OptionTextWrapper>,
    ];
  };

  private renderByline = () => {
    const {
      isSelected,
      team: { memberCount, includesYou },
    } = this.props;

    // Member count should always be present in the data that's apssed by Legion. But for some reason
    // if it's not there, do not show the byline
    if (memberCount === null || typeof memberCount === 'undefined') {
      return undefined;
    }

    return (
      <OptionTextWrapper color={isSelected ? colors.N50 : colors.N200}>
        <FormattedMessage
          {...(memberCount > 50
            ? messages.plus50Members
            : messages.memberCount)}
          values={{ count: memberCount, includes: includesYou }}
        />
      </OptionTextWrapper>
    );
  };

  render() {
    const {
      team: { name, avatarUrl },
    } = this.props;
    return (
      <CommonOption
        name={name}
        avatarUrl={avatarUrl}
        byline={this.renderByline()}
        primaryText={this.getPrimaryText()}
      />
    );
  }
}
