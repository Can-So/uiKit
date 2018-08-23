// @flow
import React, { Component } from 'react';
import Button from '@atlaskit/button';
import FeedbackCollector, { FeedbackFlag } from '../src';

type State = { isOpen: boolean, displayFlag: boolean };

const EMBEDDABLE_KEY = 'your_jsd_embeddable_key';
const REQUEST_TYPE_ID = 'your_jsd_request_type_id';
const name = 'Feedback Sender';
const email = 'fsender@atlassian.com';

export default class DisplayFeedback extends Component<void, State> {
  state = { isOpen: false, displayFlag: false };

  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });
  displayFlag = () => this.setState({ displayFlag: true });
  hideFlag = () => this.setState({ displayFlag: false });

  render() {
    const { isOpen, displayFlag } = this.state;
    return (
      <div>
        <Button appearance="primary" onClick={this.open}>
          Display Feedback
        </Button>

        {isOpen && (
          <FeedbackCollector
            onClose={this.close}
            onSubmit={this.displayFlag}
            email={email}
            name={name}
            requestTypeId={REQUEST_TYPE_ID}
            embeddableKey={EMBEDDABLE_KEY}
          />
        )}

        {displayFlag && <FeedbackFlag onDismissed={this.hideFlag} />}
      </div>
    );
  }
}
