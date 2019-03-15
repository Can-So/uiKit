import * as React from 'react';
import {
  AnalyticsEventPayload,
  WithAnalyticsEventProps,
} from '@atlaskit/analytics-next-types';
import { injectIntl, InjectedIntlProps, Messages } from 'react-intl';
import { ErrorBoundaryWrapper } from '../primitives/wrapper';
import FormattedMessage from '../primitives/formatted-message';
import {
  NAVIGATION_CHANNEL,
  OPERATIONAL_EVENT_TYPE,
  withAnalyticsEvents,
} from '../utils/analytics';
import notFoundImage from '../assets/something-went-wrong.png';

const TRIGGER_SUBJECT = 'errorBoundary';
const ACTION_SUBJECT = 'rendered';

type ErrorBoundaryProps = {
  messages: Messages;
} & InjectedIntlProps &
  WithAnalyticsEventProps;

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false };

  fireOperationalEvent = (payload: AnalyticsEventPayload) => {
    if (this.props.createAnalyticsEvent) {
      this.props
        .createAnalyticsEvent({
          eventType: OPERATIONAL_EVENT_TYPE,
          actionSubject: TRIGGER_SUBJECT,
          ...payload,
        })
        .fire(NAVIGATION_CHANNEL);
    }
  };

  componentDidCatch() {
    this.setState(
      {
        hasError: true,
      },
      () => {
        this.fireOperationalEvent({
          action: ACTION_SUBJECT,
        });
      },
    );
  }

  render() {
    const { messages, intl } = this.props;
    if (this.state.hasError) {
      return (
        <ErrorBoundaryWrapper>
          <img
            src={notFoundImage}
            alt={intl.formatMessage(messages.errorImageAltText)}
            width="160px"
          />
          <h3>
            <FormattedMessage {...messages.errorHeading} />
          </h3>
          <p>
            <FormattedMessage {...messages.errorText} />
          </p>
        </ErrorBoundaryWrapper>
      );
    }

    return this.props.children;
  }
}

export default withAnalyticsEvents()(injectIntl(ErrorBoundary));
