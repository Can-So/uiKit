import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Email } from '../types';
import { AddOptionAvatar } from './AddOptionAvatar';
import { AvatarItemOption } from './AvatarItemOption';
import { messages } from './i18n';

export type EmailOptionProps = {
  email: Email;
  isSelected: boolean;
  label?: string;
};

export class EmailOption extends React.PureComponent<EmailOptionProps> {
  private renderOption = (label: string) => (
    <AvatarItemOption
      avatar={<AddOptionAvatar label={label} />}
      primaryText={this.props.email.id}
      secondaryText={label}
    />
  );

  render() {
    const { label } = this.props;
    return label ? (
      this.renderOption(label)
    ) : (
      <FormattedMessage {...messages.addEmail}>
        {label => this.renderOption(label as string)}
      </FormattedMessage>
    );
  }
}
