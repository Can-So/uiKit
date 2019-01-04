import { ComponentClass } from 'react';
import { EditorViewOwnProps } from '@atlaskit/media-editor';

export default (): Promise<ComponentClass<EditorViewOwnProps>> =>
  import(/* webpackChunkName:"@atlaskit-internal_media-editor-view" */

  '@atlaskit/media-editor').then(module => module.default);
