import * as React from 'react';
import { storyData as mentionStoryData } from '@atlaskit/mention/dist/es5/support';
import { storyData as emojiStoryData } from '@atlaskit/emoji/dist/es5/support';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';
import { BitbucketTransformer } from '../src';

import { Content } from './styles';

import { MentionResource } from '@atlaskit/editor-core';

const rejectedPromise = Promise.reject(
  new Error('Simulated provider rejection'),
);
const pendingPromise = new Promise<any>(() => {});

const providers = {
  mentionProvider: {
    resolved: Promise.resolve(mentionStoryData.resourceProvider),
    'resolved 2': Promise.resolve(
      new MentionResource({
        url:
          'https://pf-mentions-service.staging.atlassian.io/mentions/f7ebe2c0-0309-4687-b913-41d422f2110b',
        containerId: 'b0d035bd-9b98-4386-863b-07286c34dc14',
        productId: 'hipchat',
      }),
    ),
    pending: pendingPromise,
    rejected: rejectedPromise,
    undefined: undefined,
  },
  emojiProvider: {
    resolved: emojiStoryData.getEmojiResource({ uploadSupported: true }),
    pending: pendingPromise,
    rejected: rejectedPromise,
    undefined: undefined,
  },
  activityProvider: {
    resolved: new MockActivityResource(),
    pending: pendingPromise,
    rejected: rejectedPromise,
    undefined: undefined,
  },
};
rejectedPromise.catch(() => {});

export interface State {
  reloadEditor: boolean;
  editorEnabled: boolean;
  mentionProvider: string;
  emojiProvider: string;
  activityProvider: string;
  document?: string;
}

export default class ToolsDrawer extends React.Component<any, State> {
  constructor(props) {
    super(props);

    this.state = {
      reloadEditor: false,
      editorEnabled: true,
      mentionProvider: 'resolved',
      emojiProvider: 'resolved',
      activityProvider: 'resolved',
      document: '',
    };
  }

  private onChange = editorView => {
    const { schema, doc } = editorView.state;
    const document = new BitbucketTransformer(schema).encode(doc);
    this.setState({
      document,
    });
  };

  render() {
    const {
      mentionProvider,
      emojiProvider,
      activityProvider,
      document,
      reloadEditor,
      editorEnabled,
    } = this.state;
    return (
      <Content>
        <div style={{ padding: '5px 0' }}>️️️ Bitbucket Editor</div>
        {reloadEditor
          ? ''
          : this.props.renderEditor({
              disabled: !editorEnabled,
              mentionProvider: providers.mentionProvider[mentionProvider],
              emojiProvider: providers.emojiProvider[emojiProvider],
              activityProvider: providers.activityProvider[activityProvider],
              onChange: this.onChange,
            })}
        <legend>Markdown output:</legend>
        <pre>{document}</pre>
      </Content>
    );
  }
}
