// @flow
import React, { Component } from 'react';
import uid from 'uid';
import styled from 'styled-components';
import { AtlasKitThemeProvider, colors, themed } from '@atlaskit/theme';
import { profiles } from '../../mock-helpers';
import { AkProfilecard } from '../../src';

import type {
  PresenceTypes,
  StatusTypes,
  StatusModifiedDateType,
} from '../../src/types';

const StoryWrapper = styled.div`
  label {
    color: ${themed({ light: colors.N800, dark: colors.N0 })};
    margin-right: 10px;
    -webkit-user-select: none;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    float: left;
  }
`;

const ProfileCardWrapper = styled.div`
  height: 340px;
`;

const handleActionClick = title => () => {
  console.log(`${title} button clicked`);
};

const getTimeString = showWeekday => {
  return showWeekday ? 'Thu 9:56am' : '9:56am';
};

type Props = {};

type State = {
  avatarUrl: string,
  email: string,
  presence: PresenceTypes,
  fullName: string,
  nickname: string,
  orgName: string,
  meta: string,
  location: string,
  timeString: string,
  statusModifiedDate?: number,
  statusModifiedDateFieldName: StatusModifiedDateType,

  isBot: boolean,
  status: StatusTypes,
  customElevation?: string,
  hasCustomElevation: boolean,

  hasDarkTheme: boolean,
  hasWeekday: boolean,
  hasAvatar: boolean,
  hasMeta: boolean,
  hasLocation: boolean,
  hasTime: boolean,
  hasLongName: boolean,
  hasLongRole: boolean,
  hasAltActions: boolean,
  hasNoActions: boolean,
  hasLoadingState: boolean,
  hasErrorState: boolean,
  hasLongPresenceMessage: string,
};

export default class ProfilecardInteractive extends Component<Props, State> {
  state = {
    avatarUrl: profiles[4].User.avatarUrl,
    email: 'nlindsey@example.com',
    presence: 'available',
    fullName: 'Natalie Lindsey',
    nickname: 'natalie',
    meta: 'Senior Developer',
    location: 'Sydney, Australia',
    orgName: 'Atlassian',
    timeString: getTimeString(),
    statusModifiedDate: undefined,
    statusModifiedDateFieldName: 'noDate',
    customElevation: undefined,
    hasCustomElevation: false,

    isBot: false,
    status: 'active',

    hasDarkTheme: false,
    hasWeekday: false,
    hasAvatar: true,
    hasMeta: true,
    hasLocation: true,
    hasOrgName: true,
    hasTime: true,
    hasLongName: false,
    hasLongRole: false,
    hasAltActions: false,
    hasNoActions: false,
    hasLoadingState: false,
    hasErrorState: false,
    hasLongPresenceMessage: '',
  };

  actions = [
    {
      label: 'View profile',
      id: 'view-profile',
      callback: handleActionClick('View profile'),
    },
  ];

  createCheckboxBooleanAttribute(attribute: string) {
    const id = `label-${uid()}`;
    return (
      <label htmlFor={id}>
        <input
          checked={this.state[attribute]}
          id={id}
          onChange={() =>
            this.setState({ [attribute]: !this.state[attribute] })
          }
          type="checkbox"
        />
        {attribute}
      </label>
    );
  }

  createRadioPresenceAttribute(attribute: PresenceTypes) {
    const id = `label-${uid()}`;
    return (
      <label htmlFor={id}>
        <input
          checked={this.state.presence === attribute}
          id={id}
          onChange={() => this.setState({ presence: attribute })}
          type="radio"
        />
        {attribute}
      </label>
    );
  }

  createRadioStatusAttribute(attribute: StatusTypes) {
    const id = `label-${uid()}`;

    return (
      <label htmlFor={id}>
        <input
          checked={this.state.status === attribute}
          id={id}
          onChange={() => this.setState({ status: attribute })}
          type="radio"
        />
        {attribute}
      </label>
    );
  }

  createRadioStatusModifiedDate(attribute: StatusModifiedDateType) {
    const id = `label-${uid()}`;

    return (
      <label htmlFor={id}>
        <input
          checked={this.state.statusModifiedDateFieldName === attribute}
          id={id}
          onChange={() => {
            let dateTime;
            const today = new Date();

            switch (attribute) {
              case 'thisWeek':
                // if `today.getDate() - 1` === 0, the last date of previous month is returned
                dateTime = new Date(today).setDate(today.getDate() - 1);
                break;

              case 'thisMonth':
                // in case, today is 1st or 2st, so we can not render "this month" period
                // above periods can be displayed instead.
                dateTime = new Date(today).setDate(1);
                break;

              case 'lastMonth':
                // if `today.getMonth() - 1` === -1, the last date of Dec of previous year is returned.
                dateTime = new Date(today).setMonth(today.getMonth() - 1);
                break;

              case 'aFewMonths':
                dateTime = new Date(today).setMonth(today.getMonth() - 3);
                break;

              case 'severalMonths':
                dateTime = new Date(today).setMonth(today.getMonth() - 7);
                break;

              case 'moreThanAYear':
                dateTime = new Date(today).setMonth(today.getMonth() - 13);
                break;

              default:
                dateTime = undefined;
            }

            return this.setState({
              statusModifiedDate: dateTime,
              statusModifiedDateFieldName: attribute,
            });
          }}
          type="radio"
        />
        {attribute}
      </label>
    );
  }

  render() {
    const { hasCustomElevation } = this.state;

    const customActions = [
      { label: 'Foo', id: 'foo', callback: handleActionClick('Foo') },
      { label: 'Bar', id: 'bar', callback: handleActionClick('Bar') },
      { label: 'Baz', id: 'baz', callback: handleActionClick('Baz') },
    ];

    const actions = this.state.hasAltActions ? customActions : this.actions;
    const customElevation = hasCustomElevation ? 'e100' : undefined;

    const meta = this.state.hasLongRole
      ? 'Sed do eiusmod tempor incididunt ut labore'
      : this.state.meta;

    /* eslint-disable max-len */
    return (
      <AtlasKitThemeProvider mode={this.state.hasDarkTheme ? 'dark' : 'light'}>
        <StoryWrapper>
          <ProfileCardWrapper>
            <AkProfilecard
              isLoading={this.state.hasLoadingState}
              hasError={this.state.hasErrorState}
              actions={this.state.hasNoActions ? [] : actions}
              isBot={this.state.isBot}
              status={this.state.status}
              statusModifiedDate={this.state.statusModifiedDate}
              customElevation={customElevation}
              avatarUrl={this.state.hasAvatar ? this.state.avatarUrl : ''}
              email={this.state.email}
              fullName={
                this.state.hasLongName
                  ? `${this.state.fullName} Hathaway ${this.state.fullName}`
                  : this.state.fullName
              }
              location={this.state.hasLocation ? this.state.location : ''}
              orgName={this.state.hasOrgName ? this.state.orgName : ''}
              meta={this.state.hasMeta ? meta : ''}
              nickname={this.state.nickname}
              presence={this.state.presence}
              timestring={
                this.state.hasTime ? getTimeString(this.state.hasWeekday) : ''
              }
              clientFetchProfile={handleActionClick('Retry')}
              presenceMessage={
                this.state.hasLongPresenceMessage
                  ? 'I honestly have a very long and useless presence message'
                  : ''
              }
            />
          </ProfileCardWrapper>

          <div style={{ marginTop: '16px', clear: 'both', overflow: 'auto' }}>
            <ul>
              <li>{this.createCheckboxBooleanAttribute('hasAvatar')}</li>
              <li>{this.createCheckboxBooleanAttribute('hasAltActions')}</li>
              <li>{this.createCheckboxBooleanAttribute('hasNoActions')}</li>
              <li>{this.createCheckboxBooleanAttribute('hasMeta')}</li>
              <li>{this.createCheckboxBooleanAttribute('hasLocation')}</li>
              <li>{this.createCheckboxBooleanAttribute('hasOrgName')}</li>
              <li>{this.createCheckboxBooleanAttribute('hasTime')}</li>
            </ul>

            <ul>
              <li>{this.createCheckboxBooleanAttribute('hasLongName')}</li>
              <li>{this.createCheckboxBooleanAttribute('hasLongRole')}</li>
              <li>{this.createCheckboxBooleanAttribute('hasWeekday')}</li>
            </ul>

            <ul>
              <li>{this.createCheckboxBooleanAttribute('hasLoadingState')}</li>
              <li>{this.createCheckboxBooleanAttribute('hasErrorState')}</li>
              <li>{this.createCheckboxBooleanAttribute('isBot')}</li>
              <li>
                {this.createCheckboxBooleanAttribute('hasCustomElevation')}
              </li>
              <li>{this.createCheckboxBooleanAttribute('hasDarkTheme')}</li>
            </ul>

            <ul>
              <li>{this.createRadioPresenceAttribute('available')}</li>
              <li>{this.createRadioPresenceAttribute('busy')}</li>
              <li>{this.createRadioPresenceAttribute('unavailable')}</li>
              <li>{this.createRadioPresenceAttribute('focus')}</li>
              <li>{this.createRadioPresenceAttribute('none')}</li>
              <li>
                {this.createCheckboxBooleanAttribute('hasLongPresenceMessage')}
              </li>
            </ul>
          </div>

          <div style={{ marginTop: '16px', clear: 'both', overflow: 'auto' }}>
            <ul>
              <li>{this.createRadioStatusAttribute('active')}</li>
              <li>{this.createRadioStatusAttribute('inactive')}</li>
              <li>{this.createRadioStatusAttribute('closed')}</li>
            </ul>

            <ul>
              <li>
                <strong>
                  These are applied when `status` is `inactive` or `closed`
                </strong>
              </li>
              <li>{this.createRadioStatusModifiedDate('noDate')}</li>
              <li>{this.createRadioStatusModifiedDate('thisWeek')}</li>
              <li>{this.createRadioStatusModifiedDate('thisMonth')}</li>
              <li>{this.createRadioStatusModifiedDate('lastMonth')}</li>
              <li>{this.createRadioStatusModifiedDate('aFewMonths')}</li>
              <li>{this.createRadioStatusModifiedDate('severalMonths')}</li>
              <li>{this.createRadioStatusModifiedDate('moreThanAYear')}</li>
            </ul>
          </div>
        </StoryWrapper>
      </AtlasKitThemeProvider>
    );
  }
}
