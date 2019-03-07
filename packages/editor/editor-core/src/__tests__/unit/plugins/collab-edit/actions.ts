import {
  createEditorFactory,
  doc,
  p,
  unsupportedInline,
} from '@atlaskit/editor-test-helpers';

import collabPlugin from '../../../../plugins/collab-edit';

import { handleInit } from '../../../../plugins/collab-edit/actions';
import { InitData } from '../../../../plugins/collab-edit/types';

const unknownNodesDoc = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          text: 'Valid! ',
          type: 'text',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'inlineCard',
          attrs: {
            url: 'https://atlassian.net',
          },
        },
        {
          text: ' ',
          type: 'text',
        },
      ],
    },
  ],
  version: 1,
};

describe('collab-edit: actions', () => {
  const createEditor = createEditorFactory();

  const editor = (doc: any) => {
    return createEditor({
      doc,
      editorPlugins: [collabPlugin],
      editorProps: {
        allowUnsupportedContent: true,
      },
    });
  };

  describe('handleInit', () => {
    it('should wrap invalid nodes in unsupported when the allowUnsupportedContent option is enabled.', () => {
      const { editorView } = editor(doc(p('')));

      const initData: InitData = {
        doc: unknownNodesDoc,
      };

      handleInit(initData, editorView, { allowUnsupportedContent: true });

      expect(editorView.state.doc).toEqualDocument(
        doc(
          p('Valid! '),
          p(
            unsupportedInline({
              originalValue: {
                attrs: { url: 'https://atlassian.net' },
                type: 'inlineCard',
              },
            })(),
            ' ',
          ),
        ),
      );
    });
  });
});
