//@flow
import React from 'react';
import DefaultNPS from '../src';
import { WithDataDisplay } from './helpers';

export default function BasicMoreConfig() {
  return (
    <WithDataDisplay>
      {(props: any) => {
        return (
          <DefaultNPS
            canOptOut
            product="Stride"
            onRatingSelect={props.onRatingSelect}
            onCommentChange={props.onCommentChange}
            onRoleSelect={props.onRoleSelect}
            onCanContactChange={props.onCanContactChange}
            onFeedbackSubmit={props.onFeedbackSubmit}
            onFollowupSubmit={props.onFollowupSubmit}
            onFinish={props.onFinish}
          />
        );
      }}
    </WithDataDisplay>
  );
}
