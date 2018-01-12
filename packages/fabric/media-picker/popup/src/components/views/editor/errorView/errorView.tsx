import * as React from 'react';
import { Component } from 'react';
// import Button from '@atlaskit/button';

import { EscHelper } from '../escHelper';
import {
  errorHintRetry,
  errorHintCritical,
  errorButtonRetry,
  errorButtonCancel,
  errorButtonClose,
} from '../phrases';
import { CenterView } from '../styles';
import {
  ErrorPopup,
  ErrorIcon,
  ErrorMessage,
  ErrorHint,
  ErrorButton,
} from './styles';

// The error icon is inlined because the error message can be shown if there is no network connection.
// If we had this svg in a separate file, it wouldn't be loaded and the user would see a "no image" box.
const errorIcon = require('!raw-loader!../icons/error.svg');

export interface ErrorViewProps {
  readonly message: string;
  readonly onCancel: () => void;
  readonly onRetry?: () => void;
}

export class ErrorView extends Component<ErrorViewProps> {
  private escHelper: EscHelper;

  componentDidMount() {
    this.escHelper = new EscHelper(this.props.onCancel);
  }

  componentWillUnmount() {
    this.escHelper.teardown();
  }

  render(): JSX.Element {
    return (
      <CenterView>
        <ErrorPopup>
          <ErrorIcon src={errorIcon} />
          <ErrorMessage>{this.props.message}</ErrorMessage>
          <ErrorHint>{this.renderHint()}</ErrorHint>
          {this.renderTryAgainButton()}
          {this.renderCancelButton()}
        </ErrorPopup>
      </CenterView>
    );
  }

  private renderHint(): JSX.Element {
    const { onRetry } = this.props;
    if (onRetry) {
      return <span>{errorHintRetry}</span>;
    }

    return <span>{errorHintCritical}</span>;
  }

  private renderTryAgainButton(): JSX.Element | null {
    const { onRetry } = this.props;
    if (onRetry) {
      return (
        <ErrorButton appearance="primary" onClick={onRetry}>
          {errorButtonRetry}
        </ErrorButton>
      );
    }

    return null;
  }

  private renderCancelButton(): JSX.Element {
    const { onCancel, onRetry } = this.props;
    return (
      <ErrorButton appearance="subtle" onClick={onCancel}>
        {onRetry ? errorButtonCancel : errorButtonClose}
      </ErrorButton>
    );
  }
}
