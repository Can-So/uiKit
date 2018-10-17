import * as React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import MockServiceProvider from './helpers/mock-provider';
import { Container, Toolbar } from './helpers/styles';
import {
  EmbeddedDocument,
  DocumentBody,
  WithDocumentActions,
  DocumentMode,
} from '../src';

const renderToolbar = (mode: DocumentMode, editorActions?: any) => (
  <WithDocumentActions
    render={actions => {
      switch (mode) {
        case 'edit':
        case 'create':
          return (
            <ButtonGroup>
              <Button
                appearance="primary"
                onClick={async () => {
                  const value = await editorActions!.getValue();
                  mode === 'create'
                    ? actions.createDocument(value)
                    : actions.updateDocument(value);
                }}
              >
                Publish
              </Button>
              <Button appearance="subtle" onClick={() => actions.cancelEdit()}>
                Close
              </Button>
            </ButtonGroup>
          );

        default:
          return (
            <Toolbar>
              <ButtonGroup>
                <Button
                  appearance="primary"
                  onClick={() => actions.editDocument()}
                >
                  Edit
                </Button>
                <Button
                  appearance="link"
                  onClick={() => (location.href = 'https://www.atlassian.com')}
                >
                  www.atlassian.com
                </Button>
              </ButtonGroup>
            </Toolbar>
          );
      }
    }}
  />
);

export default function Example() {
  const mockProvider = new MockServiceProvider();
  return (
    <Container>
      <EmbeddedDocument
        objectId="ari:cloud:demo::document/1"
        documentId="demo-doc"
        renderToolbar={renderToolbar}
        provider={mockProvider}
      >
        <DocumentBody />
      </EmbeddedDocument>
    </Container>
  );
}
