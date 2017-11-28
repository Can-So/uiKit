import styled from 'styled-components';

import * as React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import { akColorN80 } from '@atlaskit/util-shared-styles';

import Editor from './../src/editor';
import EditorContext from './../src/editor/ui/EditorContext';
import WithEditorActions from './../src/editor/ui/WithEditorActions';
import { name } from '../package.json';
import { storyMediaProviderFactory } from '@atlaskit/editor-test-helpers';
import { storyData as mentionStoryData } from '@atlaskit/mention/dist/es5/support';
import { storyData as emojiStoryData } from '@atlaskit/emoji/dist/es5/support';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';
import { ConfluenceTransformer } from '../';

import { macroProviderPromise } from '../example-helpers/mock-macro-provider';

import {
  akEditorCodeBackground,
  akEditorCodeBlockPadding,
  akEditorCodeFontFamily,
} from '../src/styles';

import { akBorderRadius } from '@atlaskit/util-shared-styles';

// tslint:disable-next-line:variable-name
export const TitleInput = styled.input`
  border: none;
  outline: none;
  font-size: 2.07142857em;
  margin: 0 0 21px;
  padding: 0;

  &::placeholder {
    color: ${akColorN80};
  }
`;
TitleInput.displayName = 'TitleInput';

// tslint:disable-next-line:variable-name
export const Content = styled.div`
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
}`;
Content.displayName = 'Content';

const analyticsHandler = (actionName, props) => console.log(actionName, props);

// tslint:disable-next-line:variable-name
const SaveAndCancelButtons = props => (
  <ButtonGroup>
    <Button
      appearance="primary"
      // tslint:disable-next-line:jsx-no-lambda no-console
      onClick={() =>
        props.editorActions
          .getValue()
          .then(value => console.log(value.toJSON()))
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
type Props = {};
type State = { disabled: boolean };

export default class Example extends React.Component<Props, State> {
  state: State = { disabled: true };

  render() {
    return (
      <Content>
        <EditorContext>
          <Editor
            appearance="full-page"
            analyticsHandler={analyticsHandler}
            allowTextFormatting={true}
            allowTasksAndDecisions={true}
            allowHyperlinks={true}
            allowCodeBlocks={true}
            allowLists={true}
            allowTextColor={true}
            allowTables={true}
            allowJiraIssue={true}
            allowUnsupportedContent={true}
            allowPanel={true}
            allowInlineExtension={true}
            mediaProvider={storyMediaProviderFactory()}
            emojiProvider={emojiStoryData.getEmojiResource({
              uploadSupported: true,
            })}
            mentionProvider={Promise.resolve(mentionStoryData.resourceProvider)}
            activityProvider={Promise.resolve(new MockActivityResource())}
            macroProvider={macroProviderPromise}
            // tslint:disable-next-line:jsx-no-lambda
            contentTransformerProvider={schema =>
              new ConfluenceTransformer(schema)
            }
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
          />
        </EditorContext>
      </Content>
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
