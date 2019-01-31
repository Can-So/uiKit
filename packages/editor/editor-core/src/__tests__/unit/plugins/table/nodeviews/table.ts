import {
  doc,
  p,
  createEditorFactory,
  table,
  tr,
  td,
  tdEmpty,
} from '@atlaskit/editor-test-helpers';
import { TablePluginState } from '../../../../../plugins/table/types';
import { pluginKey } from '../../../../../plugins/table/pm-plugins/main';

describe('table -> nodeviews -> table.tsx', () => {
  const createEditor = createEditorFactory<TablePluginState>();

  const editor = (doc: any) =>
    createEditor({
      doc,
      editorProps: {
        allowTables: { advanced: true },
      },
      pluginKey,
    });

  describe('when table column sizes are changed in collab', () => {
    it('should apply new widths to the document and colgroup', () => {
      const { editorView } = editor(
        doc(table()(tr(tdEmpty, tdEmpty, tdEmpty))),
      );

      // Create a transaction that changes column widths
      const tableNode = editorView.state.doc.resolve(1).node();
      const documentChangeTr = editorView.state.tr.setNodeMarkup(
        0,
        undefined,
        tableNode.attrs,
      );

      tableNode.forEach((rowNode, rowOffset, i) => {
        rowNode.forEach((colNode, colOffset, j) => {
          const pos = rowOffset + colOffset + 2;

          documentChangeTr.setNodeMarkup(pos, undefined, {
            ...colNode.attrs,
            colwidth: [226],
          });
        });
      });

      // Don't use dispatch to mimic collab provider
      editorView.updateState(editorView.state.apply(documentChangeTr));

      // Check the colgroup has been updated
      // This ensures 'visually' our sizes have been applied.
      const tableDom = editorView.domAtPos(0).node as HTMLElement;
      const colgroup = tableDom.querySelector('colgroup');
      if (colgroup) {
        for (let i = 0; i < colgroup.children.length; i++) {
          const child = colgroup.children[i] as HTMLElement;
          expect(child.style.width).toEqual('226px');
        }
      } else {
        throw new Error('colgroup not found!');
      }

      // Lastly ensure our document reflects what visually is there.
      expect(editorView.state.doc).toEqualDocument(
        doc(
          table()(
            tr(
              td({ colwidth: [226] })(p('')),
              td({ colwidth: [226] })(p('')),
              td({ colwidth: [226] })(p('')),
            ),
          ),
        ),
      );
    });
  });
});
