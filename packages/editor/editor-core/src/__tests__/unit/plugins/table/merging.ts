import { mergeCells, CellSelection } from 'prosemirror-tables';
import {
  doc,
  p,
  createEditor,
  table,
  tr,
  td,
  tdEmpty,
} from '@atlaskit/editor-test-helpers';
import { TablePluginState } from '../../../../plugins/table/types';
import tablesPlugin from '../../../../plugins/table';
import panelPlugin from '../../../../plugins/panel';
import { pluginKey } from '../../../../plugins/table/pm-plugins/main';
import { Command } from '../../../../types/';

describe('table merging logic', () => {
  const editor = (doc: any) =>
    createEditor<TablePluginState>({
      doc,
      editorPlugins: [tablesPlugin(), panelPlugin],
      pluginKey,
    });

  const setCellSelection = (anchor: number, head: number): Command => (
    state,
    dispatch,
  ) => {
    dispatch(
      state.tr.setSelection(new CellSelection(
        state.doc.resolve(anchor - 2),
        state.doc.resolve(head - 2),
      ) as any),
    );
    return true;
  };

  describe('#mergeCells', () => {
    describe('when two rows gets merged column by column', () => {
      describe('when last non-merged cell gets merged from the end of the row', () => {
        it('should delete an empty row that gets created as a result', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(
                  td({ rowspan: 2 })(p('b1')),
                  td({ rowspan: 2 })(p('b2')),
                  td({})(p('{anchor}b3')),
                ),
                tr(td({})(p('{head}c3'))),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          mergeCells(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('text'),
              table()(
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(td({})(p('b1')), td({})(p('b2')), td({})(p('b3'), p('c3'))),
              ),
            ),
          );
        });
      });
      describe('when last non-merged cell gets merged from the start of the row', () => {
        it('should delete an empty row that gets created as a result', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(
                  td({})(p('{anchor}b1')),
                  td({ rowspan: 2 })(p('b2')),
                  td({ rowspan: 2 })(p('b3')),
                ),
                tr(td({})(p('{head}c1'))),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          mergeCells(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('text'),
              table()(
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(td({})(p('b1'), p('c1')), td({})(p('b2')), td({})(p('b3'))),
              ),
            ),
          );
        });
      });
    });

    describe('when rows from the first columns get merged', () => {
      describe('and table has merged rows in the next column', () => {
        it('should delete an empty row and decrement rowspan of the next column', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), td({ rowspan: 3 })(p('a2'))),
                tr(td({})(p('{head}'))),
                tr(tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          mergeCells(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('text'),
              table()(
                tr(td({})(p('a1')), td({ rowspan: 2 })(p('a2'))),
                tr(tdEmpty),
              ),
            ),
          );
        });
      });
    });

    describe('when rows from the last columns get merged', () => {
      describe('and table has merged rows in the previous column', () => {
        it('should delete an empty row and decrement rowspan of the previous column', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({ rowspan: 3 })(p('a1')), td({})(p('{anchor}a2'))),
                tr(td({})(p('{head}'))),
                tr(tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          mergeCells(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('text'),
              table()(
                tr(td({ rowspan: 2 })(p('a1')), td({})(p('a2'))),
                tr(tdEmpty),
              ),
            ),
          );
        });
      });
    });
  });
});
