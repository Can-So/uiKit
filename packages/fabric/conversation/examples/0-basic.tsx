import * as React from 'react';
import Conversation from '../src/components/Conversation';
import {
  Comment as CommentType,
  Conversation as ConversationType,
} from '../src/model';
import { MockProvider as ConversationResource } from '../example-helpers/MockProvider';
import { Demo } from '../example-helpers/DemoPage';

const provider = new ConversationResource({
  url: 'http://localhost:8080',
});

export default function Example() {
  return <Demo provider={provider} />;
}
