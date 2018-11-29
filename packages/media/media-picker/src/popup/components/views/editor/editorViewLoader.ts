import { ComponentClass } from 'react';
import { EditorViewOwnProps } from './editorView/editorView';

export default (): Promise<ComponentClass<EditorViewOwnProps>> =>
  import(/* webpackChunkName:"@atlaskit-internal_media-editor-view" */

  './editorView/editorView').then(module => module.default);
