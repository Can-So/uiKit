import * as React from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
import { storyMediaProviderFactory } from '@atlaskit/editor-test-helpers';
import Button from '@atlaskit/button';

import { default as Renderer } from '../src/ui/Renderer';
import {
  LOCALSTORAGE_defaultDocKey,
  LOCALSTORAGE_defaultTitleKey,
} from '../../editor-core/examples/5-full-page';
import Sidebar from './helper/NavigationNext';

const mediaProvider = storyMediaProviderFactory();
const providerFactory = ProviderFactory.create({ mediaProvider });

export default class ExampleRenderer extends React.Component {
  constructor(props) {
    super(props);

    // opens an iframe
    if (window.top !== window.self) {
      window.top.location.replace(location.href);
    }
  }

  render() {
    return (
      <Sidebar showSidebar={true}>
        {additionalProps => (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button tabIndex="-1" onClick={this.handleRedirect}>
                Edit
              </Button>
            </div>
            <h1 style={{ margin: '20px 0' }}>
              {localStorage
                ? localStorage.getItem(LOCALSTORAGE_defaultTitleKey)
                : null}
            </h1>
            <Renderer
              dataProviders={providerFactory}
              {...additionalProps}
              document={
                localStorage
                  ? JSON.parse(
                      localStorage.getItem(LOCALSTORAGE_defaultDocKey) || '{}',
                    )
                  : undefined
              }
            />
          </>
        )}
      </Sidebar>
    );
  }

  private handleRedirect = () => {
    location.href = location.href.replace('renderer', 'editor-core');
  };
}
