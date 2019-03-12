import * as React from 'react';
import styled from 'styled-components';
import {
  ExampleEditor as FullPageEditor,
  LOCALSTORAGE_defaultDocKey,
} from './5-full-page';
import EditorContext from '../src/ui/EditorContext';
import { DevTools } from '../example-helpers/DevTools';
import WithEditorActions from '../src/ui/WithEditorActions';
import { EditorActions } from '../src';

export const Textarea = styled.textarea`
  box-sizing: border-box;
  border: 1px solid lightgray;
  font-family: monospace;
  padding: 10px;
  width: 100%;
  height: 250px;
`;

export interface State {
  inputValue?: string;
}

export default class Example extends React.Component<any, State> {
  private inputRef?: HTMLTextAreaElement;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <EditorContext>
        <div style={{ height: '100%' }}>
          <DevTools />
          <Textarea
            id="adf-input"
            className="adf-input"
            innerRef={this.handleRef}
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <WithEditorActions
            render={actions => (
              <React.Fragment>
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
                <button
                  id="save-adf"
                  className="save-adf"
                  onClick={() => this.handleDefault()}
                >
                  Save ADF as default
                </button>
                <FullPageEditor />
              </React.Fragment>
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

  private handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
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

  private handleDefault = () => {
    localStorage.setItem(
      LOCALSTORAGE_defaultDocKey,
      this.state.inputValue || '{}',
    );
  };
}
