import * as React from 'react';
import { Component } from 'react';
import { Card } from '../src';
import {
  createStorybookContext,
  imageFileId,
} from '@atlaskit/media-test-helpers';

const context = createStorybookContext();

interface ExampleState {
  shouldOpenMediaViewer: boolean;
}

class Example extends Component<{}, {}> {
  state: ExampleState = {
    shouldOpenMediaViewer: true,
  };

  render() {
    const { shouldOpenMediaViewer } = this.state;

    return (
      <Card
        context={context}
        identifier={imageFileId}
        shouldOpenMediaViewer={shouldOpenMediaViewer}
      />
    );
  }
}

export default () => <Example />;
