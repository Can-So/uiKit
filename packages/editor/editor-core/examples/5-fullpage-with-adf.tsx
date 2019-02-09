import styled from 'styled-components';

import * as React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import { colors } from '@atlaskit/theme';

import Editor, { EditorProps } from '../src/editor';
import EditorContext from '../src/ui/EditorContext';
import WithEditorActions from '../src/ui/WithEditorActions';
import {
  cardProvider,
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
  macroProvider,
} from '@atlaskit/editor-test-helpers';
import { mention, emoji, taskDecision } from '@atlaskit/util-data-test';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';
import { EmojiProvider } from '@atlaskit/emoji';
import { Provider as SmartCardProvider } from '@atlaskit/smart-card';

import { customInsertMenuItems } from '@atlaskit/editor-test-helpers';
import { extensionHandlers } from '../example-helpers/extension-handlers';
import quickInsertProviderFactory from '../example-helpers/quick-insert-provider';
import { EditorActions } from '../src';

export const TitleInput: any = styled.input`
  border: none;
  outline: none;
  font-size: 2.07142857em;
  margin: 0 0 21px;
  padding: 0;

  &::placeholder {
    color: ${colors.N90};
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
  box-sizing: border-box;
  padding: 2px;
  height: calc(100vh - 32px);
`;
Wrapper.displayName = 'Wrapper';

export const Content: any = styled.div`
  padding: 0 20px;
  height: 100%;
  background: #fff;
  box-sizing: border-box;
`;
Content.displayName = 'Content';

// tslint:disable-next-line:no-console
export const analyticsHandler = (actionName, props) =>
  console.log(actionName, props);
// tslint:disable-next-line:no-console
const SAVE_ACTION = () => console.log('Save');

export const LOCALSTORAGE_defaultDocKey = 'fabric.editor.example.full-page';
export const LOCALSTORAGE_defaultTitleKey =
  'fabric.editor.example.full-page.title';

export const SaveAndCancelButtons = props => (
  <ButtonGroup>
    <Button
      tabIndex="-1"
      appearance="primary"
      onClick={() =>
        props.editorActions.getValue().then(value => {
          // tslint:disable-next-line:no-console
          console.log(value);
          localStorage.setItem(
            LOCALSTORAGE_defaultDocKey,
            JSON.stringify(value),
          );
        })
      }
    >
      Publish
    </Button>
    <Button
      tabIndex="-1"
      appearance="subtle"
      onClick={() => {
        props.editorActions.clear();
        localStorage.removeItem(LOCALSTORAGE_defaultDocKey);
      }}
    >
      Close
    </Button>
  </ButtonGroup>
);

export type State = { disabled: boolean; title: string };

export const providers = {
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

export const quickInsertProvider = quickInsertProviderFactory();

export interface ExampleProps {
  onTitleChange?: (title: string) => void;
}

export class ExampleEditor extends React.Component<
  EditorProps & ExampleProps,
  State
> {
  state: State = {
    disabled: true,
    title: localStorage.getItem(LOCALSTORAGE_defaultTitleKey) || '',
  };

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
          <SmartCardProvider>
            <Editor
              appearance="full-page"
              analyticsHandler={analyticsHandler}
              quickInsert={{ provider: Promise.resolve(quickInsertProvider) }}
              allowCodeBlocks={{ enableKeybindingsForIDE: true }}
              allowLists={true}
              allowTextColor={true}
              allowTables={{
                advanced: true,
              }}
              allowBreakout={true}
              allowJiraIssue={true}
              allowUnsupportedContent={true}
              allowPanel={true}
              allowExtension={{
                allowBreakout: true,
              }}
              allowRule={true}
              allowDate={true}
              allowLayouts={{
                allowBreakout: true,
              }}
              allowTextAlignment={true}
              allowIndentation={true}
              allowTemplatePlaceholders={{ allowInserting: true }}
              UNSAFE_cards={{
                provider: Promise.resolve(cardProvider),
              }}
              allowStatus={true}
              {...providers}
              media={{
                provider: mediaProvider,
                allowMediaSingle: true,
                allowResizing: true,
              }}
              placeholder="Use markdown shortcuts to format your page as you type, like * for lists, # for headers, and *** for a horizontal rule."
              shouldFocus={false}
              disabled={this.state.disabled}
              defaultValue={
                (localStorage &&
                  localStorage.getItem('fabric.editor.example.full-page')) ||
                undefined
              }
              contentComponents={
                <WithEditorActions
                  // tslint:disable-next-line:jsx-no-lambda
                  render={actions => (
                    <TitleInput
                      value={this.state.title}
                      onChange={this.handleTitleChange}
                      placeholder="Give this page a title..."
                      // tslint:disable-next-line:jsx-no-lambda
                      innerRef={this.handleTitleRef}
                      onFocus={this.handleTitleOnFocus}
                      onBlur={this.handleTitleOnBlur}
                      onKeyDown={(e: KeyboardEvent) => {
                        this.onKeyPressed(e, actions);
                      }}
                    />
                  )}
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
              {...this.props}
            />
          </SmartCardProvider>
        </Content>
      </Wrapper>
    );
  }
  private onKeyPressed = (e: KeyboardEvent, actions: EditorActions) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      // Move to the editor view
      this.setState({
        disabled: false,
      });
      actions.focus();
      return false;
    }
  };

  private handleTitleChange = (e: KeyboardEvent) => {
    const title = (e.target as HTMLInputElement).value;
    this.setState({
      title,
    });

    if (this.props.onTitleChange) {
      this.props.onTitleChange(title);
    }
  };

  private handleTitleOnFocus = () => this.setState({ disabled: true });
  private handleTitleOnBlur = () => this.setState({ disabled: false });
  private handleTitleRef = (ref?: HTMLElement) => {
    if (ref) {
      ref.focus();
    }
  };
}

export const Textarea: any = styled.textarea`
  box-sizing: border-box;
  border: 1px solid lightgray;
  font-family: monospace;
  padding: 10px;
  width: 100%;
  height: 0px;
`;

export default class Example extends React.Component<any, any> {
  private inputRef?: HTMLTextAreaElement;

  constructor(props) {
    super(props);
    this.state = {};
  }

  private handleRef = (ref: HTMLTextAreaElement | null) => {
    if (ref) {
      this.inputRef = ref;
    }
  };

  private handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  private handleImport = (actions: EditorActions) => {
    if (this.inputRef) {
      const document = JSON.parse(this.inputRef.value || '{}');
      actions.replaceDocument(document);
    }
  };

  private handleExport = (actions: EditorActions) => {
    actions.getValue().then(value => {
      this.setState({ inputValue: JSON.stringify(value, null, 2) });
    });
  };

  render() {
    return (
      <EditorContext>
        <div style={{ height: '100%' }}>
          <ExampleEditor />
          <Textarea
            id="adf-input"
            className="adf-input"
            innerRef={this.handleRef}
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <WithEditorActions
            render={actions => (
              <>
                <button
                  id="import-adf"
                  className="import-adf"
                  onClick={() => this.handleImport(actions)}
                >
                  Import ADF
                </button>
                <button
                  id="export-adf"
                  className="export-adf"
                  onClick={() => this.handleExport(actions)}
                >
                  Export ADF
                </button>
              </>
            )}
          />
        </div>
      </EditorContext>
    );
  }
}
