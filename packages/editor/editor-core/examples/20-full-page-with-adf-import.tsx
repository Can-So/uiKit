import * as React from 'react';
import styled from 'styled-components';
import { ExampleEditor as FullPageEditor } from './5-full-page';
import EditorContext from '../src/ui/EditorContext';
import WithEditorActions from '../src/ui/WithEditorActions';
import { EditorActions } from '../src';

export const Textarea: any = styled.textarea`
  box-sizing: border-box;
  border: 1px solid lightgray;
  font-family: monospace;
  padding: 10px;
  width: 100%;
  height: 25px;
`;

export default class Example extends React.Component {
  private inputRef?: HTMLTextAreaElement;
  state = { inputValue: '' };

  render() {
    return (
      <EditorContext>
        <div>
          <FullPageEditor />
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
}
