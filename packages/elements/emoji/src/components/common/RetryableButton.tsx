import * as React from 'react';
import { Component } from 'react';
import AkButton from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import { messages } from '../i18n';
import { FormattedMessage } from 'react-intl';

export interface Props {
  className: string;
  retryClassName: string;
  label: string;
  appearance: string;
  error: boolean;
  onSubmit: () => void;
  loading: boolean;
}

export default class RetryableButton extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  renderRetry() {
    const { loading, retryClassName, onSubmit } = this.props;
    return (
      <FormattedMessage {...messages.retryLabel}>
        {retryLabel => (
          <AkButton
            className={retryClassName}
            appearance="warning"
            onClick={onSubmit}
          >
            {loading ? <Spinner invertColor={false} /> : retryLabel}
          </AkButton>
        )}
      </FormattedMessage>
    );
  }

  render() {
    const {
      loading,
      error,
      className,
      appearance,
      onSubmit,
      label,
    } = this.props;
    return error ? (
      this.renderRetry()
    ) : (
      <AkButton
        className={className}
        appearance={appearance as any}
        onClick={onSubmit}
      >
        {loading ? <Spinner invertColor={true} /> : label}
      </AkButton>
    );
  }
}
