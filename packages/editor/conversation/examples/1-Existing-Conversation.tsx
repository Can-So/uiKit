import * as React from 'react';
import {
  MockProvider as ConversationResource,
  getDataProviderFactory,
} from '../example-helpers/MockProvider';
import { MOCK_USERS } from '../example-helpers/MockData';
import { Conversation } from '../src';

const provider = new ConversationResource({
  url: 'http://mockservice/',
  user: MOCK_USERS[3],
});

export default class ExistingConversation extends React.Component<
  {},
  { conversationId?: string }
> {
  state = {
    conversationId: null,
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
      <Conversation
        id={conversationId}
        containerId="ari:cloud:platform::conversation/demo"
        provider={provider}
        dataProviders={getDataProviderFactory()}
      />
    );
  }
}
