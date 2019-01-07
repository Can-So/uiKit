// tslint:disable:no-console

import * as React from 'react';

import Button, { ButtonGroup } from '@atlaskit/button';
import LockCircleIcon from '@atlaskit/icon/glyph/lock-circle';
import Editor from './../src/editor';
import EditorContext from './../src/ui/EditorContext';
import WithEditorActions from './../src/ui/WithEditorActions';
import ToolbarHelp from './../src/ui/ToolbarHelp';
import CollapsedEditor from '../src/ui/CollapsedEditor';
import ToolbarFeedback from '../src/ui/ToolbarFeedback';
import { name, version } from '../package.json';

import { customInsertMenuItems } from '@atlaskit/editor-test-helpers';
import { extensionHandlers } from '../example-helpers/extension-handlers';
import { EmojiProvider } from '@atlaskit/emoji';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';
import { mention, emoji, taskDecision } from '@atlaskit/util-data-test';
import {
  storyContextIdentifierProviderFactory,
  macroProvider,
} from '@atlaskit/editor-test-helpers';
import { storyMediaProviderFactory } from '../../editor-test-helpers';

const SAVE_ACTION = () => console.log('Save');
const CANCEL_ACTION = () => console.log('Cancel');
const EXPAND_ACTION = () => console.log('Expand');

const analyticsHandler = (actionName, props) => console.log(actionName, props);
const exampleDocument = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Some example document with emojis ' },
        {
          type: 'emoji',
          attrs: {
            shortName: ':catchemall:',
            id: 'atlassian-catchemall',
            text: ':catchemall:',
          },
        },
        { type: 'text', text: ' and mentions ' },
        {
          type: 'mention',
          attrs: { id: '0', text: '@Carolyn', accessLevel: '' },
        },
        { type: 'text', text: '. ' },
      ],
    },
  ],
};

export type Props = {};
export type State = {
  hasJquery?: boolean;
  isExpanded?: boolean;
};

const providers = {
  emojiProvider: emoji.storyData.getEmojiResource({
    uploadSupported: true,
    currentUser: {
      id: emoji.storyData.loggedUser,
    },
  }) as Promise<EmojiProvider>,
  mentionProvider: Promise.resolve(mention.storyData.resourceProvider),
  taskDecisionProvider: Promise.resolve(
    taskDecision.getMockTaskDecisionResource(),
  ),
  contextIdentifierProvider: storyContextIdentifierProviderFactory(),
  activityProvider: Promise.resolve(new MockActivityResource()),
  macroProvider: Promise.resolve(macroProvider),
};

export const mediaProvider = storyMediaProviderFactory({
  includeUserAuthProvider: true,
});

export default class EditorWithFeedback extends React.Component<Props, State> {
  state = {
    hasJquery: false,
    isExpanded: false,
  };

  componentDidMount() {
    delete window.jQuery;
    this.loadJquery();
  }

  onFocus = () =>
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));

  render() {
    if (!this.state.hasJquery) {
      return <h3>Please wait, loading jQuery ...</h3>;
    }

    return (
      <EditorContext>
        <div>
          <WithEditorActions
            render={actions => (
              <ButtonGroup>
                <Button
                  onClick={() => actions.replaceDocument(exampleDocument)}
                >
                  Load Document
                </Button>
                <Button onClick={() => actions.clear()}>Clear</Button>
              </ButtonGroup>
            )}
          />
          <CollapsedEditor
            placeholder="What do you want to say?"
            isExpanded={this.state.isExpanded}
            onFocus={this.onFocus}
            onExpand={EXPAND_ACTION}
          >
            <Editor
              appearance="comment"
              placeholder="What do you want to say?"
              analyticsHandler={analyticsHandler}
              shouldFocus={true}
              quickInsert={true}
              allowTasksAndDecisions={true}
              allowCodeBlocks={true}
              allowTextColor={true}
              allowLists={true}
              allowRule={true}
              allowTables={true}
              allowHelpDialog={true}
              activityProvider={providers.activityProvider}
              mentionProvider={providers.mentionProvider}
              emojiProvider={providers.emojiProvider}
              media={{
                provider: mediaProvider,
                allowMediaSingle: true,
                allowResizing: true,
              }}
              taskDecisionProvider={providers.taskDecisionProvider}
              contextIdentifierProvider={providers.contextIdentifierProvider}
              onSave={SAVE_ACTION}
              onCancel={CANCEL_ACTION}
              primaryToolbarComponents={
                <>
                  <ToolbarFeedback
                    product={'bitbucket'}
                    packageVersion={version}
                    packageName={name}
                    key="toolbar-feedback"
                  />
                  <ToolbarHelp key="toolbar-help" />
                </>
              }
              allowExtension={true}
              insertMenuItems={customInsertMenuItems}
              extensionHandlers={extensionHandlers}
              secondaryToolbarComponents={[
                <LockCircleIcon
                  key="permission"
                  size="large"
                  label="Permissions"
                />,
              ]}
            />
          </CollapsedEditor>
        </div>
      </EditorContext>
    );
  }

  private loadJquery = () => {
    const scriptElem = document.createElement('script');
    scriptElem.type = 'text/javascript';
    scriptElem.src =
      'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js';

    scriptElem.onload = () => {
      this.setState({
        ...this.state,
        hasJquery: true,
      });
    };

    document.body.appendChild(scriptElem);
  };
}
