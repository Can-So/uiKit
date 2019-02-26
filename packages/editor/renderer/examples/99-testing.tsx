import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ProviderFactory } from '@atlaskit/editor-common';
import { taskDecision, emoji } from '@atlaskit/util-data-test';
import { Provider } from '@atlaskit/smart-card';
import {
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
} from '@atlaskit/editor-test-helpers';
import { default as Renderer } from '../src/ui/Renderer';
import { document as doc } from './helper/story-data';
import Sidebar from './helper/NavigationNext';

const mediaProvider = storyMediaProviderFactory();
const emojiProvider = emoji.storyData.getEmojiResource();
const contextIdentifierProvider = storyContextIdentifierProviderFactory();
const mentionProvider = Promise.resolve({
  shouldHighlightMention: mention => mention.id === 'ABCDE-ABCDE-ABCDE-ABCDE',
});
const taskDecisionProvider = Promise.resolve(
  taskDecision.getMockTaskDecisionResource(),
);

const providerFactory = ProviderFactory.create({
  mediaProvider,
  mentionProvider,
  emojiProvider,
  contextIdentifierProvider,
  taskDecisionProvider,
});

function createRendererWindowBindings(win: Window) {
  if ((win as Window & { __mountRenderer?: () => void }).__mountRenderer) {
    return;
  }

  window['__mountRenderer'] = props => {
    const target = document.getElementById('renderer-container');

    if (!target) {
      return;
    }

    const { showSidebar, ...reactProps } = props;

    ReactDOM.unmountComponentAtNode(target);
    ReactDOM.render(
      <Provider>
        <Sidebar showSidebar={showSidebar}>
          {additionalRendererProps => (
            <Renderer
              dataProviders={providerFactory}
              document={doc}
              {...reactProps}
              {...additionalRendererProps}
            />
          )}
        </Sidebar>
      </Provider>,
      target,
    );
  };
}

export default function RendererExampleForTests() {
  createRendererWindowBindings(window);
  return <div id="renderer-container" />;
}
