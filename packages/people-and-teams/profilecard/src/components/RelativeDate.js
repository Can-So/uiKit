// @flow

import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import isThisWeek from 'date-fns/is_this_week';
import isThisMonth from 'date-fns/is_this_month';
import differenceInMonths from 'date-fns/difference_in_months';
import isValid from 'date-fns/is_valid';

import type { RelativeDateProps } from '../types';
import messages from '../messages';

export default class RelativeDate extends PureComponent<RelativeDateProps> {
  static isValidDate(date?: Date | null, today: Date = new Date()) {
    return (
      !!date &&
      !!date.getTime &&
      isValid(date) &&
      date.getTime() <= today.getTime()
    );
  }

  render() {
    const { date } = this.props;
    const today = new Date();

    if (!RelativeDate.isValidDate(date, today)) {
      return null;
    }

    if (isThisWeek(date)) {
      return <FormattedMessage {...messages.thisWeek} />;
    }

    if (isThisMonth(date)) {
      return <FormattedMessage {...messages.thisMonth} />;
    }

    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() - 1
    ) {
      return <FormattedMessage {...messages.lastMonth} />;
    }

    const diffInMonths = differenceInMonths(today, date);
    if (diffInMonths < 6) {
      return <FormattedMessage {...messages.aFewMonths} />;
    }

    if (diffInMonths >= 6 && diffInMonths <= 12) {
      return <FormattedMessage {...messages.severalMonths} />;
    }

    if (diffInMonths > 12) {
      return <FormattedMessage {...messages.moreThanAYear} />;
    }

    return null;
  }
}
