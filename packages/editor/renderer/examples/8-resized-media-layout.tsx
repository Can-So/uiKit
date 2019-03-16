import * as React from 'react';
import { ProviderFactory } from '@findable/editor-common';
import { storyMediaProviderFactory } from '@findable/editor-test-helpers';

import { default as Renderer } from '../src/ui/Renderer';
import document from './helper/media-resize-layout.adf.json';

const mediaProvider = storyMediaProviderFactory();
const providerFactory = ProviderFactory.create({ mediaProvider });

export default function Example() {
  return (
    <Renderer
      dataProviders={providerFactory}
      document={document}
      appearance="full-page"
      allowDynamicTextSizing
    />
  );
}
