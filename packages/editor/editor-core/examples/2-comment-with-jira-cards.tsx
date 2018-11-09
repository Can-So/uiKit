// tslint:disable:no-console

import * as React from 'react';

import {
  Provider as SmartCardProvider,
  Client,
  ResolveResponse,
} from '@atlaskit/smart-card';
import Editor, { EditorProps } from './../src/editor';
import EditorContext from './../src/ui/EditorContext';
import {
  cardProvider,
  customInsertMenuItems,
} from '@atlaskit/editor-test-helpers';
import { extensionHandlers } from '../example-helpers/extension-handlers';

const jiraClient = new class extends Client {
  jiraUrlMatch = /https?\:\/\/hello\.atlassian\.net\/browse\/(?:[A-Za-z\-0-9]+)|https?\:\/\/product\-fabric\.atlassian\.net\/browse\/(?:[A-Za-z\-0-9]+)/i;

  fetchData(url: string): Promise<ResolveResponse> {
    const match = url.match(this.jiraUrlMatch);
    if (!match) {
      return super.fetchData(url);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          meta: {
            visibility: 'restricted',
            access: 'granted',
            auth: [],
            definitionId: 'jira-native-resolve',
          },
          data: {
            '@context': {
              '@vocab': 'https://www.w3.org/ns/activitystreams#',
              atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
              schema: 'http://schema.org/',
            },
            '@type': ['atlassian:Task', 'Object'],
            name: 'PC-4820: Smart Card in Fabric Editor integration',
            tag: {
              name: 'Shipped',
            },
            url,
          },
        });
      }, 2000);
    });
  }
}();

export class CommentEditorWithJiraCards extends React.Component<
  {
    editorProps?: EditorProps;
    replacementDoc?: any;
  },
  {}
> {
  state = {};

  render() {
    return (
      <EditorContext>
        <div>
          <SmartCardProvider client={jiraClient}>
            <Editor
              appearance="comment"
              placeholder="What do you want to say?"
              shouldFocus={true}
              quickInsert={true}
              allowCodeBlocks={true}
              allowTextColor={true}
              allowLists={true}
              allowRule={true}
              allowTables={true}
              allowHelpDialog={true}
              allowGapCursor={true}
              allowExtension={true}
              insertMenuItems={customInsertMenuItems}
              extensionHandlers={extensionHandlers}
              UNSAFE_cards={{
                provider: Promise.resolve(cardProvider),
              }}
              {...this.props.editorProps}
              defaultValue={exampleDocument}
            />
          </SmartCardProvider>
        </div>
      </EditorContext>
    );
  }
}

export default function CommentExample(...props: any) {
  return <CommentEditorWithJiraCards {...props} />;
}

const exampleDocument = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Example URLs:' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'https://hello.atlassian.net/browse/PC-4820' },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'https://product-fabric.atlassian.net/browse/MS-1105',
        },
      ],
    },
  ],
};
