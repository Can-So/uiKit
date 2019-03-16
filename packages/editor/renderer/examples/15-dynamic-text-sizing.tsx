import * as React from 'react';
import { ProviderFactory } from '@findable/editor-common';
import { storyMediaProviderFactory } from '@findable/editor-test-helpers';
import { default as Renderer } from '../src/ui/Renderer';
import { document } from './helper/story-data';

const mediaProvider = storyMediaProviderFactory();
const providerFactory = ProviderFactory.create({ mediaProvider });

export default function Example() {
  return (
    <Renderer
      dataProviders={providerFactory}
      appearance="full-page"
      allowDynamicTextSizing
      document={document}
    />
  );
}
