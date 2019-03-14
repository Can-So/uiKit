import {
  p,
  code_block,
  panel,
  table,
  tr,
  tdCursor,
  tdEmpty,
  decisionList,
  decisionItem,
  taskList,
  taskItem,
  bodiedExtension,
  hr,
  extension,
  mediaSingle,
  media,
  mediaGroup,
  randomId,
  bodiedExtensionData,
} from '@atlaskit/editor-test-helpers';

const extensionAttrs = bodiedExtensionData[0].attrs;

const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
const temporaryFileId = `temporary:${randomId()}`;

const cursorIfSelected = (selected?: boolean) => (selected ? '{<>}' : '');

export const blockNodes = {
  code_block: (opts: { id?: string; selected?: boolean } = {}) =>
    code_block({ language: 'java', uniqueId: opts.id })(
      cursorIfSelected(opts.selected),
    ),
  panel: (opts: { id?: string; selected?: boolean } = {}) =>
    panel({ localId: opts.id })(p(cursorIfSelected(opts.selected))),
  table: (opts: { selected?: boolean } = {}) =>
    table()(tr(opts.selected ? tdCursor : tdEmpty)),
  decisionList: (opts: { id?: string; selected?: boolean } = {}) =>
    decisionList({ localId: opts.id })(
      decisionItem({ localId: opts.id })(cursorIfSelected(opts.selected)),
    ),
  taskList: (opts: { id?: string; selected?: boolean } = {}) =>
    taskList({ localId: opts.id })(
      taskItem({ localId: opts.id })(cursorIfSelected(opts.selected)),
    ),
  bodiedExtension: (opts: { selected?: boolean } = {}) =>
    bodiedExtension(extensionAttrs)(p(cursorIfSelected(opts.selected))),
};

export type BlockNodesKeys = Array<keyof typeof blockNodes>;

export const leafBlockNodes = {
  hr: hr(),
  extension: extension(extensionAttrs)(),
  mediaSingle: mediaSingle({ layout: 'center' })(
    media({
      id: temporaryFileId,
      type: 'file',
      collection: testCollectionName,
      width: 100,
      height: 200,
    })(),
  ),
  mediaGroup: mediaGroup(
    media({
      id: temporaryFileId,
      type: 'link',
      collection: testCollectionName,
    })(),
  ),
};

export type LeafBlockNodesKeys = Array<keyof typeof leafBlockNodes>;
