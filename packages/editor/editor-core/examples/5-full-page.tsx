import styled from 'styled-components';

import * as React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import { akColorN300 } from '@atlaskit/util-shared-styles';

import Editor from './../src/editor';
import EditorContext from './../src/ui/EditorContext';
import WithEditorActions from './../src/ui/WithEditorActions';
import {
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
  macroProvider,
} from '@atlaskit/editor-test-helpers';
import { mention, emoji, taskDecision } from '@atlaskit/util-data-test';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';
import { EmojiProvider } from '@atlaskit/emoji';

import { customInsertMenuItems } from '@atlaskit/editor-test-helpers';
import { extensionHandlers } from '../example-helpers/extension-handlers';
import { DevTools } from '../example-helpers/DevTools';

import {
  akEditorCodeBackground,
  akEditorCodeBlockPadding,
  akEditorCodeFontFamily,
} from '../src/styles';

import { akBorderRadius } from '@atlaskit/util-shared-styles';

export const TitleInput: any = styled.input`
  border: none;
  outline: none;
  font-size: 2.07142857em;
  margin: 0 0 21px;
  padding: 0;

  &::placeholder {
    color: ${akColorN300};
  }
`;
TitleInput.displayName = 'TitleInput';

/**
 * +-------------------------------+
 * + [Editor core v] [Full page v] +  48px height
 * +-------------------------------+
 * +                               +  16px padding-top
 * +            Content            +
 * +                               +  16px padding-bottom
 * +-------------------------------+  ----
 *                                    80px - 48px (Outside of iframe)
 */
export const Wrapper: any = styled.div`
  height: calc(100vh - 32px);
`;
Wrapper.displayName = 'Wrapper';

export const Content: any = styled.div`
  padding: 0 20px;
  height: 100%;
  background: #fff;
  box-sizing: border-box;

  & .ProseMirror {
    & pre {
      font-family: ${akEditorCodeFontFamily};
      background: ${akEditorCodeBackground};
      padding: ${akEditorCodeBlockPadding};
      border-radius: ${akBorderRadius};
    }
  }
`;
Content.displayName = 'Content';

// tslint:disable-next-line:no-console
const analyticsHandler = (actionName, props) => console.log(actionName, props);
// tslint:disable-next-line:no-console
const SAVE_ACTION = () => console.log('Save');

const SaveAndCancelButtons = props => (
  <ButtonGroup>
    <Button
      appearance="primary"
      onClick={() =>
        props.editorActions
          .getValue()
          // tslint:disable-next-line:no-console
          .then(value => console.log(value))
      }
    >
      Publish
    </Button>
    <Button
      appearance="subtle"
      // tslint:disable-next-line:jsx-no-lambda
      onClick={() => props.editorActions.clear()}
    >
      Close
    </Button>
  </ButtonGroup>
);

export type Props = {};
export type State = { disabled: boolean };

const providers = {
  emojiProvider: emoji.storyData.getEmojiResource({
    uploadSupported: true,
  }) as Promise<EmojiProvider>,
  mentionProvider: Promise.resolve(mention.storyData.resourceProvider),
  taskDecisionProvider: Promise.resolve(
    taskDecision.getMockTaskDecisionResource(),
  ),
  contextIdentifierProvider: storyContextIdentifierProviderFactory(),
  activityProvider: Promise.resolve(new MockActivityResource()),
  macroProvider: Promise.resolve(macroProvider),
};
const mediaProvider = storyMediaProviderFactory({
  includeUserAuthProvider: true,
});

export class ExampleEditor extends React.Component<Props, State> {
  state: State = { disabled: true };

  componentDidMount() {
    // tslint:disable-next-line:no-console
    console.log(`To try the macro paste handler, paste one of the following links:

  www.dumbmacro.com?paramA=CFE
  www.smartmacro.com?paramB=CFE
    `);
  }

  render() {
    return (
      <Wrapper>
        <Content>
          <Editor
            appearance="full-page"
            analyticsHandler={analyticsHandler}
            UNSAFE_allowQuickInsert={true}
            allowTasksAndDecisions={true}
            allowCodeBlocks={true}
            allowLists={true}
            allowTextColor={true}
            allowTables={{
              allowColumnResizing: true,
              allowMergeCells: true,
              allowNumberColumn: true,
              allowBackgroundColor: true,
              allowHeaderRow: true,
              allowHeaderColumn: true,
              permittedLayouts: 'all',
              stickToolbarToBottom: true,
            }}
            allowJiraIssue={true}
            allowUnsupportedContent={true}
            allowPanel={true}
            allowExtension={true}
            allowRule={true}
            allowDate={true}
            UNSAFE_allowLayouts={true}
            allowGapCursor={true}
            allowTemplatePlaceholders={{ allowInserting: true }}
            {...providers}
            media={{ provider: mediaProvider, allowMediaSingle: true }}
            placeholder="Write something..."
            shouldFocus={false}
            disabled={this.state.disabled}
            contentComponents={
              <TitleInput
                placeholder="Give this page a title..."
                // tslint:disable-next-line:jsx-no-lambda
                innerRef={this.handleTitleRef}
                onFocus={this.handleTitleOnFocus}
                onBlur={this.handleTitleOnBlur}
              />
            }
            primaryToolbarComponents={
              <WithEditorActions
                // tslint:disable-next-line:jsx-no-lambda
                render={actions => (
                  <SaveAndCancelButtons editorActions={actions} />
                )}
              />
            }
            onSave={SAVE_ACTION}
            insertMenuItems={customInsertMenuItems}
            extensionHandlers={extensionHandlers}
          />
        </Content>
      </Wrapper>
    );
  }

  private handleTitleOnFocus = () => this.setState({ disabled: true });
  private handleTitleOnBlur = () => this.setState({ disabled: false });
  private handleTitleRef = (ref?: HTMLElement) => {
    if (ref) {
      ref.focus();
    }
  };
}

export default function Example() {
  return (
    <EditorContext>
      <div style={{ height: '100%' }}>
        <DevTools />
        <ExampleEditor />
      </div>
    </EditorContext>
  );
}
