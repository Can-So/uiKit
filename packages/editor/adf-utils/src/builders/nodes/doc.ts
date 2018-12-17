import {
  DocNode,
  BlockContent,
  LayoutSectionDefinition,
} from '@atlaskit/editor-common';

export const doc = (
  ...content: Array<BlockContent | LayoutSectionDefinition>
): DocNode => ({
  type: 'doc',
  version: 1,
  content,
});
