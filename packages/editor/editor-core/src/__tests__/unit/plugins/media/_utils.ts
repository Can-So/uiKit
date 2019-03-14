import { MediaAttributes } from '@atlaskit/adf-schema';
import {
  randomId,
  media,
  mediaGroup,
  storyMediaProviderFactory,
  createEditorFactory,
} from '@atlaskit/editor-test-helpers';

import {
  stateKey as mediaPluginKey,
  MediaPluginState,
} from '../../../../plugins/media/pm-plugins/main';
import mediaPlugin from '../../../../plugins/media';
import { EditorPlugin } from '../../../../types';
import { EditorView } from 'prosemirror-view';
import { insertMediaGroupNode } from '../../../../plugins/media/utils/media-files';

export const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
export const temporaryFileId = `temporary:${randomId()}`;

export const temporaryMediaAttrs: MediaAttributes = {
  id: temporaryFileId,
  type: 'file',
  collection: testCollectionName,
};

export const temporaryMedia = media(temporaryMediaAttrs)();

export const temporaryMediaWithDimensions = (width = 256, height = 128) => {
  return media({
    ...temporaryMediaAttrs,
    width,
    height,
  })();
};

export const temporaryMediaGroup = mediaGroup(temporaryMedia);

const createEditor = createEditorFactory<MediaPluginState>();
export const mediaEditor = (
  doc: any,
  additionalPlugins: Array<EditorPlugin> = [],
  uploadErrorHandler?: () => void,
) => {
  const mediaProvider = storyMediaProviderFactory({
    collectionName: testCollectionName,
    includeUserAuthProvider: true,
  });

  return createEditor({
    doc,
    editorPlugins: [
      ...additionalPlugins,
      mediaPlugin({ provider: mediaProvider, allowMediaSingle: true }),
    ],
    editorProps: {
      uploadErrorHandler,
    },
    pluginKey: mediaPluginKey,
  });
};

/**
 * Inserts a media group node via `insertMediaGroupNode` with the
 * testing collection name.
 *
 * @param view The EditorView under test.
 * @param id The initially inserted id and __key for the media node.
 */
export const insertMediaGroupItem = (
  view: EditorView,
  id: string,
  fileId = 'id',
) => {
  insertMediaGroupNode(view, [{ id }], testCollectionName);

  return media({
    id,
    type: 'file',
    collection: testCollectionName,
  })();
};
