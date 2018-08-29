import { TableMap, CellSelection } from 'prosemirror-tables';
import { EditorView } from 'prosemirror-view';
import {
  selectRow,
  selectColumn,
  selectTable,
  findTable,
} from 'prosemirror-utils';
import {
  doc,
  createEditor,
  sendKeyToPm,
  table,
  tr,
  td,
  tdEmpty,
  tdCursor,
  thEmpty,
  p,
  defaultSchema,
  pmNodeBuilder,
} from '@atlaskit/editor-test-helpers';

import { pluginKey } from '../../../../plugins/table/pm-plugins/main';
import { TablePluginState } from '../../../../plugins/table/types';
import {
  tablesPlugin,
  extensionPlugin,
  tasksAndDecisionsPlugin,
  codeBlockPlugin,
  mediaPlugin,
  panelPlugin,
  rulePlugin,
  listsPlugin,
} from '../../../../plugins';

describe('table keymap', () => {
  const editor = (doc: any, trackEvent = () => {}) =>
    createEditor<TablePluginState>({
      doc,
      editorPlugins: [tablesPlugin()],
      editorProps: {
        analyticsHandler: trackEvent,
      },
      pluginKey,
    });
  const editorWithPlugins = (doc: any, trackEvent = () => {}) =>
    createEditor<TablePluginState>({
      doc,
      editorPlugins: [
        tablesPlugin(),
        rulePlugin,
        listsPlugin,
        panelPlugin,
        mediaPlugin({ allowMediaSingle: true }),
        codeBlockPlugin(),
        tasksAndDecisionsPlugin,
        extensionPlugin,
      ],
      editorProps: {
        analyticsHandler: trackEvent,
      },
      pluginKey,
    });
  let trackEvent;
  beforeEach(() => {
    trackEvent = jest.fn();
  });

  describe('Tab keypress', () => {
    describe('when the whole row is selected', () => {
      it('it should select the first cell of the next row', () => {
        const { editorView, refs } = editor(
          doc(
            table()(tr(tdCursor, tdEmpty), tr(td({})(p('{nextPos}')), tdEmpty)),
          ),
          trackEvent,
        );
        const { nextPos } = refs;
        editorView.dispatch(selectRow(0)(editorView.state.tr));
        sendKeyToPm(editorView, 'Tab');
        expect(editorView.state.selection.$from.pos).toEqual(nextPos);
        expect(editorView.state.selection.empty).toEqual(true);
        expect(trackEvent).toHaveBeenCalledWith(
          'atlassian.editor.format.table.next_cell.keyboard',
        );
        editorView.destroy();
      });
    });

    describe('when the whole column is selected', () => {
      it('it should select the last cell of the next column', () => {
        const { editorView, refs } = editor(
          doc(
            table()(tr(tdCursor, tdEmpty), tr(tdEmpty, td({})(p('{nextPos}')))),
          ),
          trackEvent,
        );
        const { nextPos } = refs;

        editorView.dispatch(selectColumn(0)(editorView.state.tr));
        sendKeyToPm(editorView, 'Tab');
        expect(editorView.state.selection.$from.pos).toEqual(nextPos);
        expect(editorView.state.selection.empty).toEqual(true);
        expect(trackEvent).toHaveBeenCalledWith(
          'atlassian.editor.format.table.next_cell.keyboard',
        );
        editorView.destroy();
      });
    });

    describe('when the cursor is at the first cell of the first row', () => {
      it('it should select next cell of the current row', () => {
        const { editorView, refs } = editor(
          doc(table()(tr(tdCursor, td({})(p('{nextPos}')), tdEmpty))),
          trackEvent,
        );
        const { nextPos } = refs;
        sendKeyToPm(editorView, 'Tab');
        expect(editorView.state.selection.$from.pos).toEqual(nextPos);
        expect(editorView.state.selection.empty).toEqual(true);
        expect(trackEvent).toHaveBeenCalledWith(
          'atlassian.editor.format.table.next_cell.keyboard',
        );
        editorView.destroy();
      });
    });

    describe('when the cursor is at the last cell of the first row', () => {
      it('it should select first cell of the next row', () => {
        const { editorView, refs } = editor(
          doc(
            table()(
              tr(tdEmpty, tdEmpty, tdCursor),
              tr(td({})(p('{nextPos}')), tdEmpty, tdEmpty),
            ),
          ),
          trackEvent,
        );
        const { nextPos } = refs;
        sendKeyToPm(editorView, 'Tab');
        expect(editorView.state.selection.$from.pos).toEqual(nextPos);
        expect(editorView.state.selection.empty).toEqual(true);
        expect(trackEvent).toHaveBeenCalledWith(
          'atlassian.editor.format.table.next_cell.keyboard',
        );
        editorView.destroy();
      });
    });

    describe('when the cursor is at the last cell of the last row', () => {
      it('it should create a new row and select the first cell of the new row', () => {
        const { editorView } = editor(
          doc(
            table()(
              tr(tdEmpty, tdEmpty, tdEmpty),
              tr(tdEmpty, tdEmpty, tdCursor),
            ),
          ),
          trackEvent,
        );
        sendKeyToPm(editorView, 'Tab');
        const tableNode = findTable(editorView.state.selection)!;
        const map = TableMap.get(tableNode.node);
        expect(map.height).toEqual(3);
        expect(editorView.state.selection.$from.pos).toEqual(32);
        expect(editorView.state.selection.empty).toEqual(true);
        expect(trackEvent).toHaveBeenCalledWith(
          'atlassian.editor.format.table.next_cell.keyboard',
        );
        editorView.destroy();
      });
    });
  });

  describe('Shift-Tab keypress', () => {
    describe('when the cursor is at the last cell of the first row', () => {
      it('it should select previous cell of the current row', () => {
        const { editorView, refs } = editor(
          doc(table()(tr(tdEmpty, td({})(p('{nextPos}')), tdCursor))),
          trackEvent,
        );
        const { nextPos } = refs;
        sendKeyToPm(editorView, 'Shift-Tab');
        expect(editorView.state.selection.$from.pos).toEqual(nextPos);
        expect(editorView.state.selection.empty).toEqual(true);
        expect(trackEvent).toHaveBeenCalledWith(
          'atlassian.editor.format.table.previous_cell.keyboard',
        );
        editorView.destroy();
      });
    });

    describe('when the cursor is at the first cell of the second row', () => {
      it('it should select the last cell of the first row', () => {
        const { editorView, refs } = editor(
          doc(
            table()(
              tr(tdEmpty, tdEmpty, td({})(p('{nextPos}'))),
              tr(tdCursor, tdEmpty, tdEmpty),
            ),
          ),
          trackEvent,
        );
        const { nextPos } = refs;
        sendKeyToPm(editorView, 'Shift-Tab');
        expect(editorView.state.selection.$from.pos).toEqual(nextPos);
        expect(editorView.state.selection.empty).toEqual(true);
        expect(trackEvent).toHaveBeenCalledWith(
          'atlassian.editor.format.table.previous_cell.keyboard',
        );
        editorView.destroy();
      });
    });

    describe('when the cursor is at the first cell of the first row', () => {
      it('it should create a new row and select the first cell of the new row', () => {
        const { editorView } = editor(
          doc(
            table()(
              tr(tdCursor, tdEmpty, tdEmpty),
              tr(tdEmpty, tdEmpty, tdEmpty),
            ),
          ),
          trackEvent,
        );
        sendKeyToPm(editorView, 'Shift-Tab');
        const tableNode = findTable(editorView.state.selection)!;
        const map = TableMap.get(tableNode.node);
        expect(map.height).toEqual(3);
        expect(editorView.state.selection.$from.pos).toEqual(4);
        expect(editorView.state.selection.empty).toEqual(true);
        expect(trackEvent).toHaveBeenCalledWith(
          'atlassian.editor.format.table.previous_cell.keyboard',
        );
        editorView.destroy();
      });
    });

    describe('Shift-Alt-T keypress', () => {
      it('it should insert 3x3 table', () => {
        const tableNode = table()(
          tr(thEmpty, thEmpty, thEmpty),
          tr(tdEmpty, tdEmpty, tdEmpty),
          tr(tdEmpty, tdEmpty, tdEmpty),
        );
        const { editorView } = editor(doc(p('{<>}')));
        sendKeyToPm(editorView, 'Shift-Alt-T');
        expect(editorView.state.doc).toEqualDocument(doc(tableNode));
        editorView.destroy();
      });
    });
  });

  describe('Backspace keypress', () => {
    describe('when cursor is immediately after the table', () => {
      it('it should move cursor to the last cell', () => {
        const { editorView, refs } = editor(
          doc(
            p('text'),
            table()(tr(tdEmpty, td({})(p('hello{nextPos}')))),
            p('{<>}text'),
          ),
        );
        const { nextPos } = refs;

        sendKeyToPm(editorView, 'Backspace');
        expect(editorView.state.selection.$from.pos).toEqual(nextPos);
        editorView.destroy();
      });

      const backspace = (view: EditorView) => {
        const {
          state: {
            tr,
            selection: { $head },
          },
        } = view;
        view.dispatch(tr.delete($head.pos - 1, $head.pos));
      };

      const excludeNodes = [
        'doc',
        'table',
        'applicationCard',
        'bodiedExtension',
      ];

      Object.keys(defaultSchema.nodes).forEach(nodeName => {
        const node = defaultSchema.nodes[nodeName];
        if (
          node.spec.group !== 'block' ||
          excludeNodes.indexOf(nodeName) > -1
        ) {
          return;
        }

        if (!pmNodeBuilder[nodeName]) {
          return;
        }

        it(`should remove a ${nodeName}, and place the cursor into the last cell`, () => {
          const { editorView, refs } = editorWithPlugins(
            doc(
              table()(tr(tdEmpty, td({})(p('hello{nextPos}')))),
              pmNodeBuilder[nodeName],
            ),
          );
          const { nextPos } = refs;
          const { state } = editorView;

          // work backwards from document end to find out where to put the cursor
          let last = state.doc.lastChild;

          while (last && !last.isTextblock) {
            last = last.lastChild;
          }

          let backspaceAmount = 0;
          if (last) {
            // also delete any existing placeholder content that pmNodeBuilder gave us
            backspaceAmount += last.content.size;
          }

          // lists need an an extra backspace before cursor moves to table, since we need to
          // outdent the first item, first.
          if (nodeName.endsWith('List')) {
            backspaceAmount++;
          }
          for (let i = 0; i < backspaceAmount; i++) {
            sendKeyToPm(editorView, 'Backspace');
            backspace(editorView);
          }

          sendKeyToPm(editorView, 'Backspace');
          expect(editorView.state.selection.$from.pos).toEqual(nextPos);
          editorView.destroy();
        });
      });
    });

    describe('when table is selected', () => {
      it('it should empty table cells and move cursor to the last selected cell', () => {
        const { editorView } = editor(
          doc(
            table()(
              tr(
                tdCursor,
                td({})(p('text text text')),
                td({})(p('more text text text')),
              ),
            ),
          ),
          trackEvent,
        );

        editorView.dispatch(selectTable(editorView.state.tr));
        expect(editorView.state.selection instanceof CellSelection).toEqual(
          true,
        );
        sendKeyToPm(editorView, 'Backspace');
        expect(editorView.state.doc).toEqualDocument(
          doc(table()(tr(tdEmpty, tdEmpty, tdEmpty))),
        );
        expect(trackEvent).toHaveBeenCalledWith(
          'atlassian.editor.format.table.delete_content.keyboard',
        );
        expect(editorView.state.selection.$from.pos).toEqual(12);
        editorView.destroy();
      });
    });

    [0, 1, 2].forEach(index => {
      describe(`when row ${index + 1} is selected`, () => {
        it(`it should empty cells in the row ${index +
          1} and move cursor to the last selected cell`, () => {
          const { editorView } = editor(
            doc(
              table()(
                tr(tdEmpty, td({})(p('{<>}1'))),
                tr(tdEmpty, td({})(p('2'))),
                tr(tdEmpty, td({})(p('3'))),
              ),
            ),
            trackEvent,
          );

          editorView.dispatch(selectRow(index)(editorView.state.tr));
          expect(editorView.state.selection instanceof CellSelection).toEqual(
            true,
          );
          const { selection } = editorView.state;
          const { start } = findTable(selection)!;
          const cursorPos =
            selection.$head.pos - selection.$head.parentOffset + start!;
          sendKeyToPm(editorView, 'Backspace');
          const rows: any = [];
          for (let i = 0; i < 3; i++) {
            rows.push(tr(tdEmpty, td({})(p(i === index ? '' : `${i + 1}`))));
          }
          expect(editorView.state.doc).toEqualDocument(doc(table()(...rows)));
          expect(cursorPos).toEqual(editorView.state.selection.$from.pos);
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.delete_content.keyboard',
          );
          expect(editorView.state.selection.$from.pos).toEqual(
            [8, 19, 30][index],
          );
          editorView.destroy();
        });
      });

      describe(`when column ${index + 1} is selected`, () => {
        it(`it should empty cells in the column ${index +
          1} and move cursor to the last selected cell`, () => {
          const emptyRow = tr(tdEmpty, tdEmpty, tdEmpty);
          const { editorView } = editor(
            doc(
              table()(
                emptyRow,
                tr(td({})(p('{<>}1')), td({})(p('2')), td({})(p('3'))),
              ),
            ),
            trackEvent,
          );

          editorView.dispatch(selectColumn(index)(editorView.state.tr));
          expect(editorView.state.selection instanceof CellSelection).toEqual(
            true,
          );
          const { selection } = editorView.state;
          const { start } = findTable(selection)!;
          const cursorPos =
            selection.$head.pos - selection.$head.parentOffset + start;
          sendKeyToPm(editorView, 'Backspace');
          const columns: any = [];
          for (let i = 0; i < 3; i++) {
            columns.push(td({})(p(i === index ? '' : `${i + 1}`)));
          }
          expect(editorView.state.doc).toEqualDocument(
            doc(table()(emptyRow, tr(...columns))),
          );
          expect(cursorPos).toEqual(editorView.state.selection.$from.pos);
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.delete_content.keyboard',
          );
          expect(editorView.state.selection.$from.pos).toEqual(
            [18, 23, 28][index],
          );
          editorView.destroy();
        });
      });
    });
  });

  describe('Cmd-A keypress', () => {
    describe('when a table cell is selected', () => {
      it('it should select whole editor', () => {
        const { editorView } = editor(
          doc(
            p('testing'),
            table()(tr(tdCursor, tdEmpty), tr(tdEmpty, tdEmpty)),
            p('testing'),
          ),
        );
        sendKeyToPm(editorView, 'Mod-a');
        expect(editorView.state.selection.$from.pos).toEqual(0);
        expect(editorView.state.selection.$to.pos).toEqual(
          editorView.state.doc.content.size,
        );
        editorView.destroy();
      });
    });

    describe('when a table row is selected', () => {
      it('it should select whole editor', () => {
        const { editorView } = editor(
          doc(
            p('testing'),
            table()(tr(td()(p('{<}testing{>}'))), tr(tdEmpty)),
            p('testing'),
          ),
        );
        sendKeyToPm(editorView, 'Mod-a');
        expect(editorView.state.selection.$from.pos).toEqual(0);
        expect(editorView.state.selection.$to.pos).toEqual(
          editorView.state.doc.content.size,
        );
        editorView.destroy();
      });
    });
  });
});
