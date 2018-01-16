import * as React from 'react';
import styled from 'styled-components';
import {
  Editor,
  EditorContext,
  WithEditorActions,
} from '@atlaskit/editor-core';
import { MarkdownTransformer } from '../src';
import exampleMarkdown from '../example-helpers/exampleMarkdown';

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;

  #source {
    border: 2px solid;
    margin: 8px;
    padding: 8px;
    white-space: pre-wrap;
    font-size: xx-small;
    &:focus {
      outline: none;
    }
    &:empty:not(:focus):before {
      content: attr(data-placeholder)
      font-size: 14px;
    }
  }
`;

type Props = { actions: any };
type State = { source: string };

class Example extends React.PureComponent<Props, State> {
  state: State = { source: exampleMarkdown };

  componentDidMount() {
    setTimeout(() => {
      this.props.actions.replaceDocument(this.state.source);
    });
  }

  handleUpdateToSource = (e: React.FormEvent<HTMLDivElement>) => {
    const value = e.currentTarget.innerText;
    this.setState({ source: value }, () =>
      this.props.actions.replaceDocument(value),
    );
  };

  render() {
    return (
      <Container>
        <div
          id="source"
          contentEditable={true}
          data-placeholder="Enter Markdown to convert"
          onInput={this.handleUpdateToSource}
        >
          {exampleMarkdown}
        </div>
        <Editor
          appearance="comment"
          allowTextFormatting={true}
          allowTasksAndDecisions={true}
          allowHyperlinks={true}
          allowCodeBlocks={true}
          allowLists={true}
          allowRule={true}
          allowTables={true}
          contentTransformerProvider={schema => new MarkdownTransformer(schema)}
        />
      </Container>
    );
  }
}

export default () => (
  <EditorContext>
    <WithEditorActions render={actions => <Example actions={actions} />} />
  </EditorContext>
);
