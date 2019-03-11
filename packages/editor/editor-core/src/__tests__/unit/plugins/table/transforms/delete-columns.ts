import {
  doc,
  p,
  createEditorFactory,
  table,
  tr,
  td,
  tdCursor,
  tdEmpty,
} from '@atlaskit/editor-test-helpers';
import { TablePluginState } from '../../../../../plugins/table/types';
import tablesPlugin from '../../../../../plugins/table';
import { deleteColumns } from '../../../../../plugins/table/transforms';
import { pluginKey } from '../../../../../plugins/table/pm-plugins/main';

describe('table plugin -> transforms -> delete columns', () => {
  const createEditor = createEditorFactory<TablePluginState>();

  const editor = (doc: any) =>
    createEditor({
      doc,
      editorPlugins: [tablesPlugin()],
      pluginKey,
    });

  describe('when column indexes are given', () => {
    describe('when the first column is deleted', () => {
      it('should delete the column and move cursor to the first column', () => {
        const {
          editorView,
          refs: { nextCursorPos },
        } = editor(
          doc(
            p('text'),
            table()(
              tr(
                td({})(p('{nextCursorPos}')),
                td({})(p('c2')),
                td({})(p('c3')),
              ),
            ),
          ),
        );
        const { state, dispatch } = editorView;
        dispatch(deleteColumns([0])(state.tr));
        expect(editorView.state.doc).toEqualDocument(
          doc(p('text'), table()(tr(td({})(p('c2')), td()(p('c3'))))),
        );
        expect(editorView.state.selection.from).toEqual(nextCursorPos);
      });
    });

    describe('when middle column is deleted', () => {
      it('should delete the column and move cursor to the previous column', () => {
        const {
          editorView,
          refs: { nextCursorPos },
        } = editor(
          doc(
            p('text'),
            table()(
              tr(
                td({})(p('{nextCursorPos}')),
                td({})(p('c2')),
                td({})(p('c3')),
              ),
            ),
          ),
        );
        const { state, dispatch } = editorView;
        dispatch(deleteColumns([1])(state.tr));
        expect(editorView.state.doc).toEqualDocument(
          doc(p('text'), table()(tr(tdEmpty, td()(p('c3'))))),
        );
        expect(editorView.state.selection.from).toEqual(nextCursorPos);
      });
    });

    describe('when an array of column indexes is passed in', () => {
      it('should delete these columns', () => {
        const { editorView } = editor(
          doc(
            p('text'),
            table()(tr(tdCursor, td({})(p('c1')), td({})(p('c2')))),
          ),
        );
        const { state, dispatch } = editorView;
        dispatch(deleteColumns([0, 1])(state.tr));
        expect(editorView.state.doc).toEqualDocument(
          doc(p('text'), table()(tr(td()(p('c2'))))),
        );
      });
    });
  });

  describe('when no columns are selected', () => {
    it('should do nothing', () => {
      const { editorView } = editor(
        doc(
          p('text'),
          table()(
            tr(td({})(p('a1')), td({})(p('a2'))),
            tr(td({})(p('b1')), td({})(p('b2'))),
          ),
        ),
      );
      const { state, dispatch } = editorView;
      dispatch(deleteColumns()(state.tr));
      expect(editorView.state.doc).toEqualDocument(
        doc(
          p('text'),
          table()(
            tr(td({})(p('a1')), td({})(p('a2'))),
            tr(td({})(p('b1')), td({})(p('b2'))),
          ),
        ),
      );
    });
  });

  describe('when one column is selected', () => {
    it('should delete the column', () => {
      const { editorView } = editor(
        doc(
          p('text'),
          table()(
            tr(td({})(p('a1')), td({})(p('{<cell}a2')), td({})(p('a3'))),
            tr(td({})(p('b1')), td({})(p('{cell>}b2')), td({})(p('b3'))),
          ),
        ),
      );
      const { state, dispatch } = editorView;
      dispatch(deleteColumns()(state.tr));
      expect(editorView.state.doc).toEqualDocument(
        doc(
          p('text'),
          table()(
            tr(td({})(p('a1')), td({})(p('a3'))),
            tr(td({})(p('b1')), td({})(p('b3'))),
          ),
        ),
      );
    });
  });

  describe('when multiple columns are selected', () => {
    it('should delete these column', () => {
      const { editorView } = editor(
        doc(
          p('text'),
          table()(
            tr(td({})(p('{<cell}a1')), td({})(p('a2')), td({})(p('a3'))),
            tr(td({})(p('b1')), td({})(p('{cell>}b2')), td({})(p('b3'))),
          ),
        ),
      );
      const { state, dispatch } = editorView;
      dispatch(deleteColumns()(state.tr));
      expect(editorView.state.doc).toEqualDocument(
        doc(p('text'), table()(tr(td({})(p('a3'))), tr(td({})(p('b3'))))),
      );
    });
  });

  describe('when some of the columns are merged', () => {
    it('should delete columns and update colspans of cells DOM nodes', () => {
      const { editorView } = editor(
        doc(
          p('text'),
          table()(
            tr(td({ colspan: 2 })(p('{<cell}c1')), td({})(p('c2'))),
            tr(td({})(p('{cell>}c3')), td({})(p('c4')), td({})(p('c5'))),
          ),
        ),
      );
      const { state, dispatch } = editorView;
      dispatch(deleteColumns()(state.tr));
      expect(editorView.state.doc).toEqualDocument(
        doc(
          p('text'),
          table()(
            tr(td({ colspan: 1 })(p('c2'))),
            tr(td({ colspan: 1 })(p('c5'))),
          ),
        ),
      );
      const cells = editorView.dom.querySelectorAll('td');
      for (let i = 0, count = cells.length; i < count; i++) {
        const cell = cells[i] as HTMLElement;
        expect(cell.getAttribute('colspan')).not.toEqual('2');
      }
    });

    describe('when after deleting the last column table has rows where cells have rowspans > 1 in each column', () => {
      it('should decrement rowspans of these cells', () => {
        const { editorView } = editor(
          doc(
            p('text'),
            table()(
              tr(tdEmpty, tdEmpty, td({})(p('{<cell}a3'))),
              tr(
                td({ rowspan: 2 })(p('b1')),
                td({ rowspan: 2 })(p('b2')),
                tdEmpty,
              ),
              tr(td({})(p('{cell>}c3'))),
            ),
          ),
        );
        const { state, dispatch } = editorView;
        dispatch(deleteColumns()(state.tr));
        expect(editorView.state.doc).toEqualDocument(
          doc(
            p('text'),
            table()(tr(tdEmpty, tdEmpty), tr(td({})(p('b1')), td({})(p('b2')))),
          ),
        );
      });
    });

    describe('when after deleting the first column table has rows where cells have rowspans > 1 in each column', () => {
      it('should decrement rowspans of these cells', () => {
        const { editorView } = editor(
          doc(
            p('text'),
            table()(
              tr(td({})(p('{<cell}a1')), tdEmpty, tdEmpty),
              tr(
                tdEmpty,
                td({ rowspan: 2 })(p('b2')),
                td({ rowspan: 2 })(p('b3')),
              ),
              tr(td({})(p('{cell>}c1'))),
            ),
          ),
        );
        const { state, dispatch } = editorView;
        dispatch(deleteColumns()(state.tr));
        expect(editorView.state.doc).toEqualDocument(
          doc(
            p('text'),
            table()(tr(tdEmpty, tdEmpty), tr(td({})(p('b2')), td({})(p('b3')))),
          ),
        );
      });
    });
  });
});
