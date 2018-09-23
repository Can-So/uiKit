import { ReactionContext } from '@atlaskit/reactions';
import { MockReactionsClient } from '@atlaskit/reactions/src/client/MockReactionsClient';
import * as React from 'react';
import { MOCK_USERS } from '../example-helpers/MockData';
import {
  getDataProviderFactory,
  MockProvider as ConversationResource,
} from '../example-helpers/MockProvider';
import { Conversation } from '../src';

const provider = new ConversationResource({
  url: 'http://mockservice/',
  user: MOCK_USERS[3],
});

const reactionClient = new MockReactionsClient();

export default class ExistingConversation extends React.Component<
  {},
  { conversationId?: string }
> {
  state = {
    conversationId: undefined,
  };

  async componentDidMount() {
    const [conversation] = await provider.getConversations();

    this.setState({
      conversationId: conversation.conversationId,
    });
  }

  render() {
    const { conversationId } = this.state;
    if (!conversationId) {
      return null;
    }

    return (
      <ReactionContext client={reactionClient}>
        <Conversation
          id={conversationId}
          containerId="ari:cloud:platform::conversation/demo"
          provider={provider}
          dataProviders={getDataProviderFactory()}
        />
      </ReactionContext>
    );
  }
}
