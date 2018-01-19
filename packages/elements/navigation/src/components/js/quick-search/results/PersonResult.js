// @flow
import React, { PureComponent } from 'react';
import Avatar from '@atlaskit/avatar';

import ResultBase from './ResultBase';

import type { PersonResultType as Props } from './types';

const PERSON_RESULT_TYPE = 'person';

// ===================================================================
// If adding a prop or feature that may be useful to all result types,
// add it to ResultBase instead
// ===================================================================

export default class PersonResult extends PureComponent<Props> {
  static defaultProps = {
    isCompact: false,
    isSelected: false,
    mentionPrefix: '@',
    onClick: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    presenceState: null, // No presence indicator by default
    type: PERSON_RESULT_TYPE,
  };

  getMention = () =>
    this.props.mentionName
      ? `${this.props.mentionPrefix}${this.props.mentionName}`
      : null;

  getAvatar = () => (
    <Avatar presence={this.props.presenceState} src={this.props.avatarUrl} />
  );

  render() {
    const { name, presenceMessage, ...resultBaseProps } = this.props;
    return (
      <ResultBase
        {...resultBaseProps}
        caption={this.getMention()}
        icon={this.getAvatar()}
        subText={presenceMessage}
        text={name}
      />
    );
  }
}
