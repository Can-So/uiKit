// @flow
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { colors } from '@atlaskit/theme';
import AkSpinner from '@atlaskit/spinner';
import AkAvatar from '@atlaskit/avatar';
import AkButton from '@atlaskit/button';
import AkLozenge from '@atlaskit/lozenge';

import ErrorMessage from './components/ErrorMessage';
import HeightTransitionWrapper from './components/HeightTransitionWrapper';
import IconLabel from './components/IconLabel';
import relativeDate from './relative-date';
import presences from './internal/presences';
import messages from './messages';

import type { ProfilecardProps } from './types';

import {
  ActionButtonGroup,
  ActionsFlexSpacer,
  AppTitleLabel,
  CardContainer,
  CardContent,
  DisabledInfo,
  DetailsGroup,
  FullNameLabel,
  JobTitleLabel,
  ProfileImage,
  SpinnerContainer,
  LozengeWrapper,
} from './styled/Card';

export default class Profilecard extends PureComponent<ProfilecardProps, void> {
  static defaultProps = {
    status: 'active',
    isBot: false,
    isNotMentionable: false,
    presence: 'none',
    actions: [],
    isLoading: false,
    hasError: false,
    analytics: () => {},
    clientFetchProfile: () => {},
    presenceMessage: '',
  };

  _timeOpen: any;
  clientFetchProfile: Function;

  constructor(props: ProfilecardProps) {
    super(props);

    this._timeOpen = null;

    this.clientFetchProfile = (...args: any) => {
      this.callAnalytics('profile-card.reload', {});
      this.callClientFetchProfile(...args);
    };
  }

  callClientFetchProfile = (...args: any) => {
    if (this.props.clientFetchProfile) {
      this.props.clientFetchProfile(...args);
    }
  };

  callAnalytics = (id: string, options: any) => {
    if (this.props.analytics) {
      this.props.analytics(id, options);
    }
  };

  componentDidMount() {
    this._timeOpen = Date.now();
    this.callAnalytics('profile-card.view', {});
  }

  _durationSince = (from: number) => {
    const fromParsed = parseInt(from, 10) || 0;
    return fromParsed > 0 ? Date.now() - fromParsed : null;
  };

  renderActionsButtons() {
    if (this.props.actions && this.props.actions.length === 0) {
      return null;
    }

    return (
      <ActionButtonGroup>
        {this.props.actions &&
          this.props.actions.map((action, idx) => (
            <AkButton
              appearance={idx === 0 ? 'default' : 'subtle'}
              compact
              key={action.label}
              onClick={(...args) => {
                this.callAnalytics('profile-card.click', {
                  id: action.id || null,
                  duration: this._durationSince(this._timeOpen),
                });
                if (action.callback) {
                  action.callback(...args);
                }
              }}
            >
              {action.label}
            </AkButton>
          ))}
      </ActionButtonGroup>
    );
  }

  renderErrorMessage() {
    return (
      <ErrorMessage
        reload={this.props.clientFetchProfile && this.clientFetchProfile}
        errorType={this.props.errorType}
      />
    );
  }

  renderCardDetailsDefault() {
    const {
      meta,
      presence,
      presenceMessage,
      nickname,
      fullName,
      location,
      email,
      timestring,
      companyName,
    } = this.props;

    const validPresence = presences[presence || 'none'];

    return (
      <DetailsGroup>
        <FullNameLabel noMeta={!meta}>{fullName}</FullNameLabel>
        {meta && <JobTitleLabel>{meta}</JobTitleLabel>}
        <IconLabel icon={presence}>
          {(!!validPresence && presenceMessage) || validPresence}
        </IconLabel>
        <IconLabel icon="email">{email}</IconLabel>
        <IconLabel icon="mention">{nickname && `@${nickname}`}</IconLabel>
        <IconLabel icon="time">{timestring}</IconLabel>
        <IconLabel icon="companyName">{companyName}</IconLabel>
        <IconLabel icon="location">{location}</IconLabel>
      </DetailsGroup>
    );
  }

  renderCardDetailsForDisabledAccount() {
    const { nickname, status, companyName } = this.props;

    return (
      <DetailsGroup>
        <FullNameLabel noMeta isDisabledAccount>
          {this.getDisabledAccountName()}
        </FullNameLabel>

        <LozengeWrapper>
          <AkLozenge appearance="default" isBold>
            {status === 'inactive' && (
              <FormattedMessage {...messages.inactiveAccountMsg} />
            )}
            {status === 'closed' && (
              <FormattedMessage {...messages.closedAccountMsg} />
            )}
          </AkLozenge>
        </LozengeWrapper>

        <DisabledInfo>{this.getDisabledAccountDesc()}</DisabledInfo>

        {status === 'inactive' && (
          <>
            <IconLabel icon="mention">{nickname && `@${nickname}`}</IconLabel>
            <IconLabel icon="companyName">{companyName}</IconLabel>
          </>
        )}
      </DetailsGroup>
    );
  }

  getDisabledAccountName() {
    const { nickname, fullName, status } = this.props;
    if (status === 'inactive') {
      return fullName || nickname;
    } else if (status === 'closed') {
      return (
        nickname || (
          <FormattedMessage {...messages.disabledAccountDefaultName} />
        )
      );
    }

    return null;
  }

  getDisabledAccountDesc() {
    const { status = 'closed', statusModifiedDate } = this.props;
    const date = statusModifiedDate
      ? new Date(statusModifiedDate * 1000)
      : null;
    const relativeDateKey = relativeDate(date);

    let secondSentence = null;
    if (relativeDateKey) {
      secondSentence = (
        <FormattedMessage
          {...messages[`${status}AccountDescMsgHasDate${relativeDateKey}`]}
        />
      );
    } else {
      secondSentence = (
        <FormattedMessage {...messages[`${status}AccountDescMsgNoDate`]} />
      );
    }

    return (
      <p>
        <FormattedMessage {...messages.generalDescMsgForDisabledUser} />{' '}
        {secondSentence}
      </p>
    );
  }

  renderCardDetailsApp() {
    return (
      <DetailsGroup>
        <FullNameLabel>{this.props.fullName}</FullNameLabel>
        <AppTitleLabel>App</AppTitleLabel>
        <IconLabel icon="mention">
          {this.props.nickname && `@${this.props.nickname}`}
        </IconLabel>
      </DetailsGroup>
    );
  }

  renderCardDetails() {
    const { isBot, status } = this.props;

    if (isBot) {
      return this.renderCardDetailsApp();
    }

    if (status === 'inactive' || status === 'closed') {
      return this.renderCardDetailsForDisabledAccount();
    }

    return this.renderCardDetailsDefault();
  }

  renderProfilecard() {
    const { status } = this.props;

    this.callAnalytics('profile-card.loaded', {
      duration: this._durationSince(this._timeOpen),
    });
    const isDisabledUser = status === 'inactive' || status === 'closed';

    return (
      <CardContainer isDisabledUser={isDisabledUser}>
        <ProfileImage>
          <AkAvatar
            size="xlarge"
            src={this.props.status !== 'closed' ? this.props.avatarUrl : null}
            borderColor={colors.N0}
          />
        </ProfileImage>
        <CardContent>
          {this.renderCardDetails()}
          <ActionsFlexSpacer />
          {this.renderActionsButtons()}
        </CardContent>
      </CardContainer>
    );
  }

  render() {
    const { customElevation } = this.props;
    let cardContent = null;

    if (this.props.hasError) {
      this.callAnalytics('profile-card.error', {});

      cardContent = this.renderErrorMessage();
    } else if (this.props.isLoading) {
      cardContent = (
        <SpinnerContainer>
          <AkSpinner />
        </SpinnerContainer>
      );
    } else if (this.props.fullName) {
      cardContent = this.renderProfilecard();
    }

    return (
      <HeightTransitionWrapper customElevation={customElevation}>
        {cardContent}
      </HeightTransitionWrapper>
    );
  }
}
