//@flow
import React from 'react';
import {
  NPS,
  FeedbackPage,
  FollowupPage,
  ThankyouPage,
  getDefaultMessages,
} from '../src';
import { WithDataDisplay } from './helpers';

export default function Advanced() {
  const defaultMessages = getDefaultMessages('Stride');
  return (
    <WithDataDisplay>
      {(props: any) => (
        <NPS
          canClose
          canOptOut={false}
          onRatingSelect={props.onRatingSelect}
          onCommentChange={props.onCommentChange}
          onFeedbackSubmit={props.onFeedbackSubmit}
          onRoleSelect={props.onRoleSelect}
          onCanContactChange={props.onCanContactChange}
          onFollowupSubmit={props.onFollowupSubmit}
          renderFeedback={feedbackProps => (
            <FeedbackPage
              {...feedbackProps}
              messages={{
                title: 'Custom Title',
                description: 'Custom description',
                optOut: <b>Custom Opt out</b>,
                scaleLow: 'sucks',
                scaleHigh: 'pretty great',
                commentPlaceholder: 'Put your comment here',
                done: 'Submit',
              }}
            />
          )}
          renderFollowup={followupProps => (
            <FollowupPage
              {...followupProps}
              messages={{
                ...defaultMessages,
                title: defaultMessages.followupTitle,
                description: defaultMessages.followupDescription,
              }}
              roles={['Some job', 'Some other job', 'Some other other job']}
            />
          )}
          renderThankyou={thankyouProps => (
            <ThankyouPage
              {...thankyouProps}
              messages={{
                ...defaultMessages,
                title: defaultMessages.thankyouTitle,
                description: defaultMessages.thankyouDescription,
              }}
            />
          )}
        />
      )}
    </WithDataDisplay>
  );
}
