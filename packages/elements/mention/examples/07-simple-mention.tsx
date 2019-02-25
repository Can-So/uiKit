import { AnalyticsListener } from '@atlaskit/analytics';
import { AnalyticsListener as AnalyticsListenerNext } from '@atlaskit/analytics-next';
import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';
import * as React from 'react';
import { onMentionEvent } from '../example-helpers/index';
import Mention from '../src/components/Mention';
import { ELEMENTS_CHANNEL } from '../src/constants';
import debug from '../src/util/logger';
import { mockMentionData as mentionData } from '../src/__tests__/unit/_test-helpers';

const padding = { padding: '10px' };

function listenerHandler(eventName: string, eventData: Object) {
  debug(`listenerHandler event: ${eventName} `, eventData);
}

const listenerHandlerNext = (e: UIAnalyticsEventInterface) => {
  debug(
    'Analytics Next handler - payload:',
    e.payload,
    ' context: ',
    e.context,
  );
};

const handler = (
  _mentionId: string,
  text: string,
  event?: any,
  analytics?: any,
) => {
  debug(
    'Old Analytics handler: ',
    text,
    ' ',
    event,
    ' - analytics: ',
    analytics,
  );
};

export default function Example() {
  return (
    <div>
      <div style={padding}>
        <AnalyticsListenerNext
          onEvent={listenerHandlerNext}
          channel={ELEMENTS_CHANNEL}
        >
          <AnalyticsListener onEvent={listenerHandler} matchPrivate={true}>
            <Mention
              {...mentionData}
              accessLevel={'CONTAINER'}
              onClick={handler}
              onMouseEnter={onMentionEvent}
              onMouseLeave={onMentionEvent}
            />
          </AnalyticsListener>
        </AnalyticsListenerNext>
      </div>
      <div style={padding}>
        <Mention
          {...mentionData}
          isHighlighted={true}
          onClick={onMentionEvent}
          onMouseEnter={onMentionEvent}
          onMouseLeave={onMentionEvent}
        />
      </div>
      <div style={padding}>
        <Mention
          {...mentionData}
          accessLevel={'NONE'}
          onClick={onMentionEvent}
          onMouseEnter={onMentionEvent}
          onMouseLeave={onMentionEvent}
        />
      </div>
    </div>
  );
}
