import { mergeCells } from 'prosemirror-tables';
import {
  doc,
  p,
  createEditorFactory,
  table,
  tr,
  td,
  tdEmpty,
} from '@atlaskit/editor-test-helpers';
import { TablePluginState } from '../../../../plugins/table/types';
import tablesPlugin from '../../../../plugins/table';
import panelPlugin from '../../../../plugins/panel';
import { pluginKey } from '../../../../plugins/table/pm-plugins/main';

describe('table merging logic', () => {
  const createEditor = createEditorFactory<TablePluginState>();

  const editor = (doc: any) =>
    createEditor({
      doc,
      editorPlugins: [tablesPlugin(), panelPlugin],
      pluginKey,
    });

  describe('#mergeCells', () => {
    describe('when two rows gets merged column by column', () => {
      describe('when last non-merged cell gets merged from the end of the row', () => {
        it('should delete an empty row that gets created as a result', () => {
          const { editorView } = editor(
            doc(
              p('text'),
              table()(
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(
                  td({ rowspan: 2 })(p('b1')),
                  td({ rowspan: 2 })(p('b2')),
                  td({})(p('{<cell}b3')),
                ),
                tr(td({})(p('{cell>}c3'))),
              ),
            ),
          );
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
          const { editorView } = editor(
            doc(
              p('text'),
              table()(
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(
                  td({})(p('{<cell}b1')),
                  td({ rowspan: 2 })(p('b2')),
                  td({ rowspan: 2 })(p('b3')),
                ),
                tr(td({})(p('{cell>}c1'))),
              ),
            ),
          );
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

    describe('when more than two rows gets merged', () => {
      describe('when last non-merged cell gets merged from the end of the row', () => {
        it('should delete an empty row that gets created as a result', () => {
          const { editorView } = editor(
            doc(
              p('text'),
              table()(
                tr(td({ rowspan: 4 })(p('a1')), td({})(p('{<cell}a2'))),
                tr(tdEmpty),
                tr(td({})(p('{cell>}c2'))),
                tr(tdEmpty),
                tr(tdEmpty, tdEmpty),
              ),
            ),
          );
          mergeCells(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('text'),
              table()(
                tr(td({ rowspan: 2 })(p('a1')), td({})(p('a2'), p('c2'))),
                tr(tdEmpty),
                tr(tdEmpty, tdEmpty),
              ),
            ),
          );
        });
      });
    });

    describe('when rows from the first columns get merged', () => {
      describe('and table has merged rows in the next column', () => {
        it('should delete an empty row and decrement rowspan of the next column', () => {
          const { editorView } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{<cell}a1')), td({ rowspan: 3 })(p('a2'))),
                tr(td({})(p('{cell>}'))),
                tr(tdEmpty),
              ),
            ),
          );
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
          const { editorView } = editor(
            doc(
              p('text'),
              table()(
                tr(td({ rowspan: 3 })(p('a1')), td({})(p('{<cell}a2'))),
                tr(td({})(p('{cell>}'))),
                tr(tdEmpty),
              ),
            ),
          );
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
