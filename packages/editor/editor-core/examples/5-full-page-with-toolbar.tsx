import * as React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';

import Editor from './../src/editor';
import EditorContext from './../src/ui/EditorContext';
import WithEditorActions from './../src/ui/WithEditorActions';
import { macroProvider, cardProvider } from '@atlaskit/editor-test-helpers';
import ToolsDrawer from '../example-helpers/ToolsDrawer';

import { customInsertMenuItems } from '@atlaskit/editor-test-helpers';
import { extensionHandlers } from '../example-helpers/extension-handlers';
import { exampleDocument } from '../example-helpers/example-document';
import quickInsertProviderFactory from '../example-helpers/quick-insert-provider';
import { DevTools } from '../example-helpers/DevTools';
import { Wrapper, Content } from './5-full-page';
import withSentry from '../example-helpers/withSentry';
import { EditorActions } from '../src';

// tslint:disable-next-line:no-console
const analyticsHandler = (actionName: string, props?: {}) =>
  console.log(actionName, props);
// tslint:disable-next-line:no-console
const SAVE_ACTION = () => console.log('Save');

const SaveAndCancelButtons = (props: { editorActions: EditorActions }) => (
  <ButtonGroup>
    <Button
      className="loadExampleDocument"
      onClick={() =>
        props.editorActions.replaceDocument(exampleDocument, false)
      }
    >
      Load Example
    </Button>
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

export type Props = {
  defaultValue?: Object;
};

const quickInsertProvider = quickInsertProviderFactory();

class ExampleEditorFullPage extends React.Component<Props> {
  render() {
    return (
      <Wrapper>
        <Content>
          <ToolsDrawer
            renderEditor={({
              mentionProvider,
              emojiProvider,
              mediaProvider,
              activityProvider,
              taskDecisionProvider,
              contextIdentifierProvider,
              onChange,
              disabled,
              enabledFeatures,
            }: any) => (
              <Editor
                defaultValue={this.props.defaultValue}
                appearance="full-page"
                analyticsHandler={analyticsHandler}
                allowAnalyticsGASV3={true}
                quickInsert={{
                  provider: Promise.resolve(quickInsertProvider),
                }}
                allowCodeBlocks={{ enableKeybindingsForIDE: true }}
                allowLists={true}
                allowBreakout={true}
                allowTextColor={true}
                allowTextAlignment={true}
                allowIndentation={true}
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
                allowStatus={true}
                allowExtension={{
                  allowBreakout: true,
                }}
                allowRule={true}
                allowDate={true}
                allowLayouts={true}
                allowTemplatePlaceholders={{ allowInserting: true }}
                UNSAFE_cards={{
                  provider: Promise.resolve(cardProvider),
                }}
                activityProvider={activityProvider}
                mentionProvider={mentionProvider}
                emojiProvider={emojiProvider}
                taskDecisionProvider={taskDecisionProvider}
                contextIdentifierProvider={contextIdentifierProvider}
                macroProvider={Promise.resolve(macroProvider)}
                media={{
                  provider: mediaProvider,
                  allowMediaSingle: true,
                  allowResizing: enabledFeatures.imageResizing,
                }}
                allowDynamicTextSizing={enabledFeatures.dynamicTextSizing}
                placeholder="Write something..."
                shouldFocus={false}
                onChange={onChange}
                disabled={disabled}
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
            )}
          />
        </Content>
      </Wrapper>
    );
  }
}

export const ExampleEditor = withSentry(ExampleEditorFullPage);

function Example(defaultValue: string | object) {
  return (
    <EditorContext>
      <div style={{ height: '100%' }}>
        <DevTools />
        <ExampleEditorFullPage defaultValue={defaultValue} />
      </div>
    </EditorContext>
  );
}

export default withSentry(Example);
