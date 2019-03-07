import * as React from 'react';
import styled from 'styled-components';
import { defaultSchema } from '@atlaskit/adf-schema';
import { ProviderFactory } from '@atlaskit/editor-common';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { WikiMarkupTransformer } from '../src';
import { ReactRenderer } from '@atlaskit/renderer';
import {
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
} from '@atlaskit/editor-test-helpers';
import {
  profilecard as profilecardUtils,
  emoji,
  taskDecision,
} from '@atlaskit/util-data-test';
import { AkProfileClient, modifyResponse } from '@atlaskit/profilecard';
import { Context } from '../src/parser/tokenize';

const Container = styled.div`
  display: grid;
  grid-template-columns: 33% 34% 33%;

  #source,
  #output {
    box-sizing: border-box;
    margin: 8px;
    padding: 8px;
    white-space: pre-wrap;
    width: 100%;
    &:focus {
      outline: none;
    }
  }

  #source {
    height: 80px;
  }

  #output {
    border: 1px solid;
    min-height: 480px;
  }
`;

const { getMockProfileClient: getMockProfileClientUtil } = profilecardUtils;
const MockProfileClient = getMockProfileClientUtil(
  AkProfileClient,
  modifyResponse,
);

const mentionProvider = Promise.resolve({
  shouldHighlightMention(mention: any) {
    return mention.id === 'ABCDE-ABCDE-ABCDE-ABCDE';
  },
});
const mediaProvider = storyMediaProviderFactory();
const emojiProvider = emoji.storyData.getEmojiResource();
const taskDecisionProvider = Promise.resolve(
  taskDecision.getMockTaskDecisionResource(),
);
const profilecardProvider = Promise.resolve({
  cloudId: 'DUMMY-CLOUDID',
  resourceClient: new MockProfileClient({
    cacheSize: 10,
    cacheMaxAge: 5000,
  }),
  getActions: (id: string) => {
    const actions = [
      {
        label: 'Mention',
        callback: () => console.log('profile-card:mention'),
      },
      {
        label: 'Message',
        callback: () => console.log('profile-card:message'),
      },
    ];

    return id === '1' ? actions : actions.slice(0, 1);
  },
});

const contextIdentifierProvider = storyContextIdentifierProviderFactory();

const providerFactory = ProviderFactory.create({
  mentionProvider,
  mediaProvider,
  emojiProvider,
  profilecardProvider,
  taskDecisionProvider,
  contextIdentifierProvider,
});

const wikiTransformer = new WikiMarkupTransformer(defaultSchema);
const adfTransformer = new JSONTransformer();

function getADF(wiki: string) {
  const context: Context = {
    tokenErrCallback: (err, type) => console.log(err, type),
    inlineCardConversion: {
      'ABC-10': 'https://instance.atlassian.net/browse/ABC-10',
      'ABC-20': 'https://instance.atlassian.net/browse/ABC-20',
      'ABC-30': 'https://instance.atlassian.net/browse/ABC-30',
      'ABC-40': 'https://instance.atlassian.net/browse/ABC-40',
    },
  };
  const pmNode = wikiTransformer.parse(wiki, context);

  return adfTransformer.encode(pmNode);
}

export interface State {
  source: string;
}

class Example extends React.PureComponent<{}, State> {
  state: State = { source: '' };

  handleChange = (evt: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ source: evt.currentTarget.value });
  };

  render() {
    const doc = this.state.source ? getADF(this.state.source) : '';
    return (
      <Container>
        <textarea id="source" onChange={this.handleChange} />
        <div id="output">
          <ReactRenderer
            document={doc}
            dataProviders={providerFactory}
            schema={defaultSchema}
          />
        </div>
        <pre id="output">{JSON.stringify(doc, null, 2)}</pre>
      </Container>
    );
  }
}

export default () => <Example />;
