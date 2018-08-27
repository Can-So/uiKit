import { getCellsInTable, selectColumn, selectTable } from 'prosemirror-utils';
import { CellSelection } from 'prosemirror-tables';
import { Node as ProsemirrorNode, Fragment, Slice } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
// @ts-ignore
import { __serializeForClipboard } from 'prosemirror-view';
import {
  doc,
  p,
  defaultSchema,
  createEditor,
  table,
  tr,
  td,
  th,
  code_block,
  dispatchPasteEvent,
} from '@atlaskit/editor-test-helpers';
import { pluginKey as tablePluginKey } from '../../../../plugins/table/pm-plugins/main';
import {
  TablePluginState,
  PluginConfig,
} from '../../../../plugins/table/types';
import tablesPlugin from '../../../../plugins/table';
import {
  unwrapContentFromTable,
  removeTableFromFirstChild,
  removeTableFromLastChild,
  transformSliceToRemoveOpenTable,
} from '../../../../plugins/table/utils/paste';

const array = (...args): Node[] => args.map(i => i(defaultSchema));
const fragment = (...args) => Fragment.from(args.map(i => i(defaultSchema)));

const selectCell = (cell: {
  pos: number;
  start: number;
  node: ProsemirrorNode;
}) => tr => {
  const $anchor = tr.doc.resolve(cell.pos);
  return tr.setSelection(new CellSelection($anchor, $anchor));
};

describe('table plugin', () => {
  const editor = (doc: any, trackEvent = () => {}) => {
    const tableOptions = {
      allowNumberColumn: true,
      allowHeaderRow: true,
      allowHeaderColumn: true,
      permittedLayouts: 'all',
    } as PluginConfig;
    return createEditor<TablePluginState>({
      doc,
      editorPlugins: [tablesPlugin(tableOptions)],
      editorProps: {
        analyticsHandler: trackEvent,
        allowTables: tableOptions,
      },
      pluginKey: tablePluginKey,
    });
  };

  describe('TableView', () => {
    describe('copy paste', () => {
      it('copies one cell onto another', () => {
        const { editorView } = editor(
          doc(
            table()(
              tr(th()(p('{<>}1')), th()(p('2')), th()(p('3'))),
              tr(td()(p('4')), td()(p('5')), td()(p('6'))),
              tr(td()(p('7')), td()(p('8')), td()(p('9'))),
            ),
          ),
        );

        let { state } = editorView;

        // select first cell
        const cells = getCellsInTable(state.selection);
        expect(cells![0].node.textContent).toEqual('1');
        state = state.apply(selectCell(cells![0])(state.tr));

        // copy it
        const { dom, text } = __serializeForClipboard(
          editorView,
          state.selection.content(),
        );

        // select the destination cell, which is 8
        const targetCell = cells![cells!.length - 2];
        expect(targetCell.node.textContent).toEqual('8');
        state = state.apply(selectCell(targetCell)(state.tr));

        // apply local state to view before paste
        editorView.updateState(state);

        // paste the first cell over the top of it
        dispatchPasteEvent(editorView, { html: dom.innerHTML, plain: text });

        expect(editorView.state.doc).toEqualDocument(
          doc(
            table()(
              tr(th()(p('1')), th()(p('2')), th()(p('3'))),
              tr(td()(p('4')), td()(p('5')), td()(p('6'))),
              tr(td()(p('7')), th()(p('1')), td()(p('9'))),
            ),
          ),
        );
      });

      it('copies one column onto another', () => {
        const {
          editorView,
          refs: { nextPos },
        } = editor(
          doc(
            table()(
              tr(th()(p('{<>}1')), th()(p('2')), th()(p('3{nextPos}'))),
              tr(td()(p('4')), td()(p('5')), td()(p('6'))),
              tr(td()(p('7')), td()(p('8')), td()(p('9'))),
            ),
          ),
        );

        let { state } = editorView;

        // select second column
        state = state.apply(selectColumn(1)(state.tr));

        // copy it
        const { dom, text } = __serializeForClipboard(
          editorView,
          state.selection.content(),
        );

        // move cursor to the 3rd column
        const $pos = state.doc.resolve(nextPos);
        state = state.apply(
          state.tr.setSelection(new TextSelection($pos, $pos)),
        );

        // apply local state to view before paste
        editorView.updateState(state);

        // paste the column
        dispatchPasteEvent(editorView, { html: dom.innerHTML, plain: text });

        expect(editorView.state.doc).toEqualDocument(
          doc(
            table()(
              tr(th()(p('1')), th()(p('2')), th()(p('2'))),
              tr(td()(p('4')), td()(p('5')), td()(p('5'))),
              tr(td()(p('7')), td()(p('8')), td()(p('8'))),
            ),
          ),
        );
      });

      it('copies a table with all attributes', () => {
        const {
          editorView,
          refs: { nextPos },
        } = editor(
          doc(
            table({
              layout: 'wide',
            })(
              tr(th()(p('{<>}1')), th()(p('2')), th()(p('3'))),
              tr(
                td({ background: 'rgba(255, 252, 242, 0.5)' })(p('4')),
                td({ background: '#fffcf7' })(p('5')),
                td()(p('6')),
              ),
              tr(td()(p('7')), td()(p('8')), td()(p('9'))),
            ),
            p('{nextPos}'),
          ),
        );

        let { state } = editorView;
        state = state.apply(selectTable(state.tr));

        const { dom, text } = __serializeForClipboard(
          editorView,
          state.selection.content(),
        );

        // move cursor to the 3rd column
        const $pos = state.doc.resolve(nextPos);
        state = state.apply(
          state.tr.setSelection(new TextSelection($pos, $pos)),
        );

        editorView.updateState(state);

        // paste the column
        dispatchPasteEvent(editorView, { html: dom.innerHTML, plain: text });

        expect(editorView.state.doc).toEqualDocument(
          doc(
            table({ layout: 'wide' })(
              tr(th()(p('1')), th()(p('2')), th()(p('3'))),
              tr(
                td({ background: 'rgba(255, 252, 242, 0.5)' })(p('4')),
                td({ background: '#fffcf7' })(p('5')),
                td()(p('6')),
              ),
              tr(td()(p('7')), td()(p('8')), td()(p('9'))),
            ),
            table({ layout: 'wide' })(
              tr(th()(p('1')), th()(p('2')), th()(p('3'))),
              tr(
                td({ background: 'rgba(255, 252, 242, 0.5)' })(p('4')),
                td({ background: 'rgba(255, 252, 247, 0.5)' })(p('5')),
                td()(p('6')),
              ),
              tr(td()(p('7')), td()(p('8')), td()(p('9'))),
            ),
          ),
        );
      });
    });
  });

  describe('copy-pasting table content', () => {
    describe('unwrapContentFromTable()', () => {
      it('should ignore any node that is not a table', () => {
        const tableNode = p('text')(defaultSchema);
        expect(unwrapContentFromTable(tableNode)).toBe(tableNode);
      });

      it('should unwrap any content inside a table', () => {
        const tableNode = table()(
          tr(th()(p('1')), th()(p('2'))),
          tr(td()(code_block()('3')), td()(p('4'))),
        )(defaultSchema);

        const expected = array(p('1'), p('2'), code_block()('3'), p('4'));
        expect(unwrapContentFromTable(tableNode)).toEqual(expected);
      });
    });

    describe('removeTableFromFirstChild()', () => {
      it('should unwrap the table when it is the first child of a node', () => {
        const tableNode = table()(
          tr(th()(p('1')), th()(p('2'))),
          tr(td()(code_block()('3')), td()(p('4'))),
        )(defaultSchema);

        const expected = array(p('1'), p('2'), code_block()('3'), p('4'));
        expect(removeTableFromFirstChild(tableNode, 0)).toEqual(expected);
      });

      it('should do nothing when the table is not the first child of a node', () => {
        const tableNode = table()(
          tr(th()(p('1')), th()(p('2'))),
          tr(td()(code_block()('3')), td()(p('4'))),
        )(defaultSchema);
        expect(removeTableFromFirstChild(tableNode, 1)).toEqual(tableNode);
      });
    });

    describe('removeTableFromLastChild()', () => {
      it('should unwrap the table when it is the last child of a node', () => {
        const tableNode = table()(
          tr(th()(p('1')), th()(p('2'))),
          tr(td()(code_block()('3')), td()(p('4'))),
        );
        const sliceFragment = fragment(p('Start'), tableNode);

        const expected = array(p('1'), p('2'), code_block()('3'), p('4'));
        expect(
          removeTableFromLastChild(
            sliceFragment.lastChild!,
            sliceFragment.childCount - 1,
            sliceFragment,
          ),
        ).toEqual(expected);
      });

      it('should do nothing when the table is not the last child of a node', () => {
        const tableNode = table()(
          tr(th()(p('1')), th()(p('2'))),
          tr(td()(code_block()('3')), td()(p('4'))),
        );
        const sliceFragment = fragment(p('Start'), tableNode, p('End'));

        expect(
          removeTableFromLastChild(sliceFragment.child(1), 1, sliceFragment),
        ).toEqualDocument(tableNode);
      });
    });

    describe('transformSliceToRemoveOpenTable()', () => {
      describe('when a slice contains only one table', () => {
        it('should ignore the table if the node is closed', () => {
          const slice = new Slice(
            fragment(
              table()(
                tr(th()(p('1')), th()(p('2'))),
                tr(td()(code_block()('3')), td()(p('4'))),
              ),
            ),
            0,
            0,
          );
          expect(transformSliceToRemoveOpenTable(slice, defaultSchema)).toBe(
            slice,
          );
        });

        it('should unwrap the table if the node is open', () => {
          const slice = new Slice(
            fragment(
              table()(
                tr(th()(p('1')), th()(p('2'))),
                tr(td()(code_block()('3')), td()(p('4'))),
              ),
            ),
            4,
            4,
          );
          expect(transformSliceToRemoveOpenTable(slice, defaultSchema)).toEqual(
            new Slice(
              fragment(p('1'), p('2'), code_block()('3'), p('4')),
              1,
              1,
            ),
          );
        });
      });

      describe('when a slice begins with a table', () => {
        it('should ignore the table if the node is closed', () => {
          const slice = new Slice(
            fragment(
              table()(
                tr(th()(p('1')), th()(p('2'))),
                tr(td()(code_block()('3')), td()(p('4'))),
              ),
              p('End'),
            ),
            0,
            0,
          );
          expect(transformSliceToRemoveOpenTable(slice, defaultSchema)).toBe(
            slice,
          );
        });

        it('should unwrap the table if the node is open', () => {
          const slice = new Slice(
            fragment(
              table()(
                tr(th()(p('1')), th()(p('2'))),
                tr(td()(code_block()('3')), td()(p('4'))),
              ),
              p('End'),
            ),
            4,
            0,
          );
          expect(transformSliceToRemoveOpenTable(slice, defaultSchema)).toEqual(
            new Slice(
              fragment(p('1'), p('2'), code_block()('3'), p('4'), p('End')),
              1,
              0,
            ),
          );
        });
      });

      describe('when a slice ends with a table', () => {
        it('should ignore the table if the node is closed', () => {
          const slice = new Slice(
            fragment(
              p('Start'),
              table()(
                tr(th()(p('1')), th()(p('2'))),
                tr(td()(code_block()('3')), td()(p('4'))),
              ),
            ),
            0,
            0,
          );
          expect(transformSliceToRemoveOpenTable(slice, defaultSchema)).toBe(
            slice,
          );
        });

        it('should unwrap the table if the node is open', () => {
          const slice = new Slice(
            fragment(
              p('Start'),
              table()(
                tr(th()(p('1')), th()(p('2'))),
                tr(td()(code_block()('3')), td()(p('4'))),
              ),
            ),
            0,
            4,
          );
          expect(transformSliceToRemoveOpenTable(slice, defaultSchema)).toEqual(
            new Slice(
              fragment(p('Start'), p('1'), p('2'), code_block()('3'), p('4')),
              0,
              1,
            ),
          );
        });
      });

      describe('when a slice starts in one table and ends in another', () => {
        it('should ignore the table if the slice is closed', () => {
          const tableNode = table()(
            tr(th()(p('1')), th()(p('2'))),
            tr(td()(code_block()('3')), td()(p('4'))),
          );
          const slice = new Slice(
            fragment(tableNode, p('Middle'), tableNode),
            0,
            0,
          );
          expect(transformSliceToRemoveOpenTable(slice, defaultSchema)).toBe(
            slice,
          );
        });
      });
    });
  });
});
