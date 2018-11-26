import * as React from 'react'; // eslint-disable-line
import { expect } from 'chai';
import Button from '@atlaskit/button';
import { messages } from '@atlaskit/media-ui';
import ConnectedErrorView from '../../errorView';

import {
  ErrorPopup,
  ErrorIconWrapper,
  ErrorMessage,
  ErrorHint,
} from '../../styles';
import { mountWithIntlContext } from '@atlaskit/media-test-helpers';

describe('ErrorView', () => {
  const message = 'some-message';
  const onRetry = () => {};
  const onCancel = () => {};

  it('should display one button in case of critical error', () => {
    const errorView = mountWithIntlContext(
      <ConnectedErrorView message={message} onCancel={onCancel} />,
    );
    expect(errorView.find(ErrorPopup)).to.have.length(1);
    expect(errorView.find(ErrorIconWrapper)).to.have.length(1);

    const mainMessage = errorView.find(ErrorMessage);
    expect(mainMessage).to.have.length(1);
    expect(mainMessage.first().text()).to.equal(message);

    const hint = errorView.find(ErrorHint);
    expect(hint).to.have.length(1);

    expect(hint.first().text()).to.equal(
      messages.error_hint_critical.defaultMessage,
    );

    const buttons = errorView.find(Button);
    expect(buttons).to.have.length(1);
    expect(buttons.first().text()).to.equal(messages.close.defaultMessage);
  });

  it('should display two buttons in case of retriable error', () => {
    const errorView = mountWithIntlContext(
      <ConnectedErrorView
        message={message}
        onRetry={onRetry}
        onCancel={onCancel}
      />,
    );
    expect(errorView.find(ErrorPopup)).to.have.length(1);
    expect(errorView.find(ErrorIconWrapper)).to.have.length(1);

    const mainMessage = errorView.find(ErrorMessage);
    expect(mainMessage).to.have.length(1);
    expect(mainMessage.first().text()).to.equal(message);

    const hint = errorView.find(ErrorHint);
    expect(hint).to.have.length(1);
    expect(hint.first().text()).to.equal(
      messages.error_hint_retry.defaultMessage,
    );

    const buttons = errorView.find(Button);
    expect(buttons).to.have.length(2);
    expect(buttons.at(0).text()).to.equal(messages.try_again.defaultMessage);
    expect(buttons.at(1).text()).to.equal(messages.cancel.defaultMessage);
  });
});
