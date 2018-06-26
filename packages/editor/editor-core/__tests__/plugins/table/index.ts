import * as sinon from 'sinon';
import { CellSelection, TableMap } from 'prosemirror-tables';
import {
  selectRow,
  selectColumn,
  selectTable,
  findTable,
} from 'prosemirror-utils';
import {
  doc,
  p,
  createEditor,
  thEmpty,
  table,
  tr,
  td,
  th,
  ul,
  li,
  tdEmpty,
  tdCursor,
  thCursor,
  strong,
  mediaGroup,
  mediaSingle,
  media,
  sendKeyToPm,
  randomId,
} from '@atlaskit/editor-test-helpers';
import { TableLayout, defaultSchema } from '@atlaskit/editor-common';
import {
  TablePluginState,
  stateKey as tablePluginKey,
} from '../../../src/plugins/table/pm-plugins/main';
import { createTable } from '../../../src/plugins/table/actions';
import { setNodeSelection } from '../../../src/utils';
import {
  toggleHeaderRow,
  toggleHeaderColumn,
  insertColumn,
  insertRow,
  deleteSelectedColumns,
  deleteSelectedRows,
  setTableLayout,
} from '../../../src/plugins/table/actions';
import {
  checkIfNumberColumnEnabled,
  checkIfHeaderColumnEnabled,
  checkIfHeaderRowEnabled,
} from '../../../src/plugins/table/utils';
import tablesPlugin from '../../../src/plugins/table';
import codeBlockPlugin from '../../../src/plugins/code-block';
import { mediaPlugin } from '../../../src/plugins';
import { insertMediaAsMediaSingle } from '../../../src/plugins/media/utils/media-single';
import listPlugin from '../../../src/plugins/lists';
import TableView from '../../../src/plugins/table/nodeviews/table';

describe('table plugin', () => {
  const editor = (doc: any, trackEvent = () => {}) =>
    createEditor<TablePluginState>({
      doc,
      editorPlugins: [
        listPlugin,
        tablesPlugin,
        codeBlockPlugin(),
        mediaPlugin({ allowMediaSingle: true }),
      ],
      editorProps: {
        analyticsHandler: trackEvent,
        allowTables: {
          allowNumberColumn: true,
          allowHeaderRow: true,
          allowHeaderColumn: true,
          permittedLayouts: 'all',
        },
      },
      pluginKey: tablePluginKey,
    });

  let trackEvent;
  beforeEach(() => {
    trackEvent = jest.fn();
  });

  describe('TableView', () => {
    // previous regression involved PM trying to render child DOM elements,
    // but the NodeView had an undefined contentDOM after the React render finishes
    // (since render is not synchronous)
    it('always provides a content DOM', () => {
      jest.useFakeTimers();

      const originalHandleRef = (TableView.prototype as any)._handleRef;
      const handleRefInnerMock = jest.fn(originalHandleRef);

      // in the tests, handleRef gets called immediately (due to event loop ordering)
      // however, the ref callback function can be called async from React after
      // calling render, which can often occur in the browser
      //
      // to simulate this, we add a callback to force it to run out-of-order
      const handleRefMock = sinon
        // @ts-ignore
        .stub(TableView.prototype, '_handleRef')
        .callsFake(ref => {
          setTimeout(ref => handleRefInnerMock.call(this, ref), 0);
        });

      // create the NodeView
      const node = table()(tr(tdCursor, tdEmpty, tdEmpty))(defaultSchema);
      const { editorView, portalProviderAPI } = editor(doc(p()));
      const tableView = new TableView({
        node,
        allowColumnResizing: false,
        view: editorView,
        portalProviderAPI,
        getPos: () => 1,
      }).init();

      // we expect to have a contentDOM after instanciating the NodeView so that
      // ProseMirror will render the node's children into the element
      expect(tableView.contentDOM).toBeDefined();

      // we shouldn't have called the mock yet, since it's behind the setTimeout
      expect(handleRefInnerMock).not.toBeCalled();

      // run the timers through
      jest.runAllTimers();

      // the timer should have expired now
      expect(handleRefInnerMock).toBeCalled();

      // ensure we still have a contentDOM
      expect(tableView.contentDOM).toBeDefined();

      // reset the mock
      handleRefMock.reset();
    });
  });

  describe('createTable()', () => {
    describe('when the cursor is outside the table', () => {
      it('it should create a new table and return true', () => {
        const { editorView } = editor(doc(p('{<>}')));
        expect(createTable(editorView.state, editorView.dispatch)).toEqual(
          true,
        );
        const tableNode = table()(
          tr(thEmpty, thEmpty, thEmpty),
          tr(tdEmpty, tdEmpty, tdEmpty),
          tr(tdEmpty, tdEmpty, tdEmpty),
        );
        expect(editorView.state.doc).toEqualDocument(doc(tableNode));
        editorView.destroy();
      });
    });

    describe('when selection has a mark', () => {
      it('it should create a new table and return true', () => {
        const { editorView } = editor(doc(p(strong('text{<>}'))));
        expect(createTable(editorView.state, editorView.dispatch)).toEqual(
          true,
        );
        expect(editorView.state.doc).toEqualDocument(
          doc(
            p(strong('text')),
            table()(
              tr(thEmpty, thEmpty, thEmpty),
              tr(tdEmpty, tdEmpty, tdEmpty),
              tr(tdEmpty, tdEmpty, tdEmpty),
            ),
          ),
        );
        editorView.destroy();
      });
    });
  });

  describe('insertColumn(number)', () => {
    describe('when table has 2 columns', () => {
      describe('when it called with 0', () => {
        it("it should prepend a new column and move cursor inside it's first cell", () => {
          const { editorView } = editor(
            doc(p('text'), table()(tr(td({})(p('c1')), td({})(p('c2{<>}'))))),
            trackEvent,
          );

          insertColumn(0)(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('text'),
              table()(tr(tdCursor, td({})(p('c1')), td({})(p('c2')))),
            ),
          );
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.column.button',
          );
          expect(editorView.state.selection.$from.pos).toEqual(10);
          editorView.destroy();
        });
      });

      describe('when it called with 1', () => {
        it("it should insert a new column in the middle and move cursor inside it's first cell", () => {
          const { editorView } = editor(
            doc(p('text'), table()(tr(td({})(p('c1{<>}')), td({})(p('c2'))))),
            trackEvent,
          );

          insertColumn(1)(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('text'),
              table()(tr(td({})(p('c1')), tdCursor, td({})(p('c2')))),
            ),
          );
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.column.button',
          );
          expect(editorView.state.selection.$from.pos).toEqual(16);
          editorView.destroy();
        });
      });

      describe('when it called with 2', () => {
        it("it should append a new column and move cursor inside it's first cell", () => {
          const { editorView } = editor(
            doc(p('text'), table()(tr(td({})(p('c1{<>}')), td({})(p('c2'))))),
            trackEvent,
          );

          insertColumn(2)(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('text'),
              table()(tr(td({})(p('c1')), td({})(p('c2')), tdCursor)),
            ),
          );
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.column.button',
          );
          expect(editorView.state.selection.$from.pos).toEqual(22);
          editorView.destroy();
        });
      });
    });
  });

  describe('insertRow(number)', () => {
    describe('when table has 2 rows', () => {
      describe('when it called with 0', () => {
        it("it should prepend a new row and move cursor inside it's first cell", () => {
          const { editorView } = editor(
            doc(
              p('text'),
              table()(tr(td({})(p('row1'))), tr(td({})(p('row2{<>}')))),
            ),
            trackEvent,
          );

          insertRow(0)(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('text'),
              table()(
                tr(tdCursor),
                tr(td({})(p('row1'))),
                tr(td({})(p('row2'))),
              ),
            ),
          );
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.row.button',
          );
          expect(editorView.state.selection.$from.pos).toEqual(10);
          editorView.destroy();
        });
      });

      describe('when it called with 1', () => {
        it("it should insert a new row in the middle and move cursor inside it's first cell", () => {
          const { editorView } = editor(
            doc(
              p('text'),
              table()(tr(td({})(p('row1{<>}'))), tr(td({})(p('row2')))),
            ),
            trackEvent,
          );

          insertRow(1)(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('text'),
              table()(
                tr(td({})(p('row1'))),
                tr(tdCursor),
                tr(td({})(p('row2'))),
              ),
            ),
          );
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.row.button',
          );
          expect(editorView.state.selection.$from.pos).toEqual(20);
          editorView.destroy();
        });
      });
    });

    describe('when table has 2 row', () => {
      describe('when it called with 2', () => {
        it("it should append a new row and move cursor inside it's first cell", () => {
          const { editorView } = editor(
            doc(
              p('text'),
              table()(tr(td({})(p('row1{<>}'))), tr(td({})(p('row2')))),
            ),
            trackEvent,
          );

          insertRow(2)(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('text'),
              table()(
                tr(td({})(p('row1'))),
                tr(td({})(p('row2'))),
                tr(tdCursor),
              ),
            ),
          );
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.row.button',
          );
          expect(editorView.state.selection.$from.pos).toEqual(30);
          editorView.destroy();
        });
      });
    });
  });

  describe('selectColumn(number)', () => {
    describe('when table has 3 columns', () => {
      [0, 1, 2].forEach(column => {
        describe(`when called with ${column}`, () => {
          it(`it should select ${column} column`, () => {
            const { editorView } = editor(
              doc(p('text'), table()(tr(tdCursor, tdEmpty, tdEmpty))),
            );

            editorView.dispatch(selectColumn(column)(editorView.state.tr));
            const selection = (editorView.state
              .selection as any) as CellSelection;
            const tableNode = selection.$anchorCell.node(-1);
            const map = TableMap.get(tableNode);
            const start = selection.$anchorCell.start(-1);
            const anchor = map.colCount(selection.$anchorCell.pos - start);
            const head = map.colCount(selection.$headCell.pos - start);
            expect(anchor).toEqual(column);
            expect(head).toEqual(column);
            expect(selection.isColSelection()).toEqual(true);
            editorView.destroy();
          });
        });
      });
    });
  });

  describe('selectRow(number)', () => {
    describe('when table has 3 rows', () => {
      [0, 1, 2].forEach(row => {
        describe(`when called with ${row}`, () => {
          it(`it should select ${row} row`, () => {
            const { editorView } = editor(
              doc(p('text'), table()(tr(tdCursor), tr(tdEmpty), tr(tdEmpty))),
            );

            editorView.dispatch(selectRow(row)(editorView.state.tr));
            const selection = (editorView.state
              .selection as any) as CellSelection;
            const anchor = selection.$anchorCell.index(-1);
            const head = selection.$headCell.index(-1);
            expect(anchor).toEqual(row);
            expect(head).toEqual(row);
            expect(selection.isRowSelection()).toEqual(true);
            editorView.destroy();
          });
        });
      });
    });
  });

  describe('selectTable()', () => {
    it('it should select the whole table', () => {
      const { editorView } = editor(
        doc(p('text'), table()(tr(tdCursor), tr(tdEmpty), tr(tdEmpty))),
      );

      editorView.dispatch(selectTable(editorView.state.tr));
      const selection = (editorView.state.selection as any) as CellSelection;
      expect(selection.isRowSelection()).toEqual(true);
      expect(selection.isColSelection()).toEqual(true);
      editorView.destroy();
    });
  });

  describe('remove columns/rows/table', () => {
    describe('when table has 3 columns', () => {
      describe('when the first column is selected', () => {
        it('it should remove the first column and move cursor to the first cell of the column to the left', () => {
          const { editorView, refs } = editor(
            doc(
              p('text'),
              table()(tr(td({})(p('{nextPos}')), tdCursor, tdEmpty)),
            ),
            trackEvent,
          );
          const { nextPos } = refs;

          editorView.dispatch(selectColumn(0)(editorView.state.tr));
          deleteSelectedColumns(editorView.state, editorView.dispatch);

          expect(editorView.state.doc).toEqualDocument(
            doc(p('text'), table()(tr(tdCursor, tdEmpty))),
          );
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.delete_column.button',
          );
          expect(editorView.state.selection.$from.pos).toEqual(nextPos);
          editorView.destroy();
        });
      });

      describe('when the middle column is selected', () => {
        it('it should remove the middle column and move cursor to the first cell of the column to the left', () => {
          const { editorView, refs } = editor(
            doc(
              p('text'),
              table()(tr(td({})(p('{nextPos}')), tdCursor, tdEmpty)),
            ),
            trackEvent,
          );
          const { nextPos } = refs;

          editorView.dispatch(selectColumn(1)(editorView.state.tr));
          deleteSelectedColumns(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(p('text'), table()(tr(tdCursor, tdEmpty))),
          );
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.delete_column.button',
          );
          expect(editorView.state.selection.$from.pos).toEqual(nextPos);
          editorView.destroy();
        });
      });

      describe('when the header row is selected', () => {
        const editorTableHeader = (doc: any) =>
          createEditor<TablePluginState>({
            doc,
            editorPlugins: [tablesPlugin],
            editorProps: {
              allowTables: {
                isHeaderRowRequired: true,
              },
            },
            pluginKey: tablePluginKey,
          });

        it('it should convert first following row to header if isHeaderRowRequired is true', () => {
          const { editorView } = editorTableHeader(
            doc(table()(tr(thCursor), tr(tdEmpty), tr(tdEmpty))),
          );

          editorView.dispatch(selectRow(0)(editorView.state.tr));
          deleteSelectedRows(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(table()(tr(th({})(p())), tr(tdEmpty))),
          );
          editorView.destroy();
        });

        it('it should move cursor to the first cell of the new header row', () => {
          const { editorView, refs } = editorTableHeader(
            doc(
              table()(
                tr(th({})(p('{nextPos}testing{<>}'))),
                tr(tdEmpty),
                tr(tdEmpty),
              ),
            ),
          );
          const { nextPos } = refs;

          editorView.dispatch(selectRow(0)(editorView.state.tr));
          deleteSelectedRows(editorView.state, editorView.dispatch);
          expect(editorView.state.selection.$from.pos).toEqual(nextPos);
          expect(editorView.state.selection.$to.pos).toEqual(nextPos);
          editorView.destroy();
        });
      });

      describe('when the last column is selected', () => {
        it('it should remove the last column and move cursor to the first cell of the previous column', () => {
          const { editorView, refs } = editor(
            doc(
              p('text'),
              table()(tr(tdCursor, td({})(p('{nextPos}')), tdCursor)),
            ),
            trackEvent,
          );
          const { nextPos } = refs;

          editorView.dispatch(selectColumn(2)(editorView.state.tr));
          deleteSelectedColumns(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(p('text'), table()(tr(tdCursor, tdEmpty))),
          );
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.delete_column.button',
          );
          expect(editorView.state.selection.$from.pos).toEqual(nextPos);
          editorView.destroy();
        });
      });
    });

    describe('when table has 3 rows', () => {
      describe('when the first row is selected', () => {
        it('it should remove the first row and move cursor to the first cell of the first row', () => {
          const { editorView, refs } = editor(
            doc(
              p('text'),
              table()(tr(td({})(p('{nextPos}'))), tr(tdCursor), tr(tdEmpty)),
            ),
            trackEvent,
          );
          const { nextPos } = refs;

          editorView.dispatch(selectRow(0)(editorView.state.tr));
          deleteSelectedRows(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(p('text'), table()(tr(tdCursor), tr(tdEmpty))),
          );
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.delete_row.button',
          );
          expect(editorView.state.selection.$from.pos).toEqual(nextPos);
          editorView.destroy();
        });
      });

      describe('when the middle row is selected', () => {
        it('it should remove the middle row and move cursor to the first cell of the next row', () => {
          const { editorView, refs } = editor(
            doc(
              p('text'),
              table()(tr(tdCursor), tr(td({})(p('{nextPos}'))), tr(tdEmpty)),
            ),
            trackEvent,
          );
          const { nextPos } = refs;

          editorView.dispatch(selectRow(1)(editorView.state.tr));
          deleteSelectedRows(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(p('text'), table()(tr(tdEmpty), tr(tdCursor))),
          );
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.delete_row.button',
          );
          expect(editorView.state.selection.$from.pos).toEqual(nextPos);
          editorView.destroy();
        });
      });

      describe('when the last row is selected', () => {
        it('it should remove the middle row and move cursor to the first cell of the previous row', () => {
          const { editorView, refs } = editor(
            doc(
              p('text'),
              table()(tr(tdCursor), tr(td({})(p('{nextPos}'))), tr(tdEmpty)),
            ),
            trackEvent,
          );
          const { nextPos } = refs;

          editorView.dispatch(selectRow(2)(editorView.state.tr));
          deleteSelectedRows(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(p('text'), table()(tr(tdEmpty), tr(tdCursor))),
          );
          expect(trackEvent).toHaveBeenCalledWith(
            'atlassian.editor.format.table.delete_row.button',
          );
          expect(editorView.state.selection.$from.pos).toEqual(nextPos);
          editorView.destroy();
        });
      });
    });
  });

  describe('toggleHeaderRow()', () => {
    describe("when there's no header row yet", () => {
      it('it should convert first row to a header row', () => {
        // p('text') goes before table to ensure that conversion uses absolute position of cells relative to the document
        const { editorView } = editor(
          doc(p('text'), table()(tr(tdCursor, tdEmpty), tr(tdEmpty, tdEmpty))),
        );
        toggleHeaderRow(editorView.state, editorView.dispatch);
        expect(editorView.state.doc).toEqualDocument(
          doc(p('text'), table()(tr(thEmpty, thEmpty), tr(tdEmpty, tdEmpty))),
        );
        editorView.destroy();
      });

      describe('when header column is enabled', () => {
        it('it should convert the rest of the cells from the first row to header cells', () => {
          const { editorView } = editor(
            doc(
              p('text'),
              table()(tr(thCursor, tdEmpty), tr(thEmpty, tdEmpty)),
            ),
          );
          toggleHeaderRow(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(p('text'), table()(tr(thEmpty, thEmpty), tr(thEmpty, tdEmpty))),
          );
          editorView.destroy();
        });
      });
    });

    describe('when header row is enabled', () => {
      it('it should convert first row to a normal row', () => {
        const { editorView } = editor(
          doc(p('text'), table()(tr(thEmpty, thEmpty), tr(tdEmpty, tdEmpty))),
        );
        toggleHeaderRow(editorView.state, editorView.dispatch);
        expect(editorView.state.doc).toEqualDocument(
          doc(p('text'), table()(tr(tdEmpty, tdEmpty), tr(tdEmpty, tdEmpty))),
        );
        editorView.destroy();
      });

      describe('when header column is enabled', () => {
        it('it should convert the rest of the cells from the first row to normal cells', () => {
          const { editorView } = editor(
            doc(
              p('text'),
              table()(tr(thCursor, thEmpty), tr(thEmpty, tdEmpty)),
            ),
          );
          toggleHeaderRow(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(p('text'), table()(tr(thEmpty, tdEmpty), tr(thEmpty, tdEmpty))),
          );
          editorView.destroy();
        });
      });
    });
  });

  describe('toggleHeaderColumn()', () => {
    describe("when there's no header column yet", () => {
      it('it should convert first column to a header column', () => {
        // p('text') goes before table to ensure that conversion uses absolute position of cells relative to the document
        const { editorView } = editor(
          doc(p('text'), table()(tr(tdEmpty, tdEmpty), tr(tdEmpty, tdEmpty))),
        );
        toggleHeaderColumn(editorView.state, editorView.dispatch);
        expect(editorView.state.doc).toEqualDocument(
          doc(p('text'), table()(tr(thEmpty, tdEmpty), tr(thEmpty, tdEmpty))),
        );
        editorView.destroy();
      });

      describe('when header row is enabled', () => {
        it('it should convert the rest of the cells from the first column to header cells', () => {
          const { editorView } = editor(
            doc(p('text'), table()(tr(thEmpty, thEmpty), tr(tdEmpty, tdEmpty))),
          );
          toggleHeaderColumn(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(p('text'), table()(tr(thEmpty, thEmpty), tr(thEmpty, tdEmpty))),
          );
          editorView.destroy();
        });
      });
    });

    describe('when header column is enabled', () => {
      it('it should convert first column to a normal column', () => {
        const { editorView } = editor(
          doc(p('text'), table()(tr(thEmpty, tdEmpty), tr(thEmpty, tdEmpty))),
        );
        toggleHeaderColumn(editorView.state, editorView.dispatch);
        expect(editorView.state.doc).toEqualDocument(
          doc(p('text'), table()(tr(tdEmpty, tdEmpty), tr(tdEmpty, tdEmpty))),
        );
        editorView.destroy();
      });

      describe('when header row is enabled', () => {
        it('it should convert the rest of the cells from the first column to normal cells', () => {
          const { editorView } = editor(
            doc(p('text'), table()(tr(thEmpty, thEmpty), tr(thEmpty, tdEmpty))),
          );
          toggleHeaderColumn(editorView.state, editorView.dispatch);
          expect(editorView.state.doc).toEqualDocument(
            doc(p('text'), table()(tr(thEmpty, thEmpty), tr(tdEmpty, tdEmpty))),
          );
          editorView.destroy();
        });
      });
    });
  });

  describe('when the cells contains only an image', () => {
    it('should add a paragraph below when arrow down is pressed', () => {
      const { editorView } = editor(
        doc(
          table()(
            tr(
              td()(
                mediaGroup(
                  media({
                    id: 'af9310df-fee5-459a-a968-99062ecbb756',
                    type: 'file',
                    collection: 'MediaServicesSample',
                    __fileMimeType: 'image/jpeg',
                  })(),
                ),
              ),
              tdEmpty,
              tdEmpty,
            ),
            tr(td()(p('2')), tdEmpty, tdEmpty),
          ),
        ),
      );

      setNodeSelection(editorView, 4);
      sendKeyToPm(editorView, 'ArrowDown');

      expect(editorView.state.doc).toEqualDocument(
        doc(
          table()(
            tr(
              td()(
                mediaGroup(
                  media({
                    id: 'af9310df-fee5-459a-a968-99062ecbb756',
                    type: 'file',
                    collection: 'MediaServicesSample',
                    __fileMimeType: 'image/jpeg',
                  })(),
                ),
                p(''),
              ),
              tdEmpty,
              tdEmpty,
            ),
            tr(td()(p('2')), tdEmpty, tdEmpty),
          ),
        ),
      );
      editorView.destroy();
    });

    it('should add a paragraph above when arrow up is pressed', () => {
      const { editorView } = editor(
        doc(
          table()(
            tr(
              td()(
                mediaGroup(
                  media({
                    id: 'af9310df-fee5-459a-a968-99062ecbb756',
                    type: 'file',
                    collection: 'MediaServicesSample',
                    __fileMimeType: 'image/jpeg',
                  })(),
                ),
              ),
              tdEmpty,
              tdEmpty,
            ),
            tr(td()(p('2')), tdEmpty, tdEmpty),
          ),
        ),
      );

      setNodeSelection(editorView, 4);
      sendKeyToPm(editorView, 'ArrowUp');

      expect(editorView.state.doc).toEqualDocument(
        doc(
          table()(
            tr(
              td()(
                p(''),
                mediaGroup(
                  media({
                    id: 'af9310df-fee5-459a-a968-99062ecbb756',
                    type: 'file',
                    collection: 'MediaServicesSample',
                    __fileMimeType: 'image/jpeg',
                  })(),
                ),
              ),
              tdEmpty,
              tdEmpty,
            ),
            tr(td()(p('2')), tdEmpty, tdEmpty),
          ),
        ),
      );
      editorView.destroy();
    });

    it('should not add a paragraph, if there already is a paragraph below when arrow down is pressed', () => {
      const docWithTable = doc(
        table()(
          tr(
            td()(
              mediaGroup(
                media({
                  id: 'af9310df-fee5-459a-a968-99062ecbb756',
                  type: 'file',
                  collection: 'MediaServicesSample',
                  __fileMimeType: 'image/jpeg',
                })(),
              ),
              p('1'),
              p('2'),
            ),
            tdEmpty,
            tdEmpty,
          ),
          tr(td()(p('3')), tdEmpty, tdEmpty),
        ),
      );

      const { editorView } = editor(docWithTable);

      setNodeSelection(editorView, 4);
      sendKeyToPm(editorView, 'ArrowDown');

      expect(editorView.state.doc).toEqualDocument(docWithTable);
      editorView.destroy();
    });

    it('should not add a paragraph, if there already is a paragraph above when arrow up is pressed', () => {
      const docWithTable = doc(
        table()(
          tr(
            td()(
              p('1'),
              p('2'),
              mediaGroup(
                media({
                  id: 'af9310df-fee5-459a-a968-99062ecbb756',
                  type: 'file',
                  collection: 'MediaServicesSample',
                  __fileMimeType: 'image/jpeg',
                })(),
              ),
            ),
            tdEmpty,
            tdEmpty,
          ),
          tr(td()(p('3')), tdEmpty, tdEmpty),
        ),
      );

      const { editorView } = editor(docWithTable);

      setNodeSelection(editorView, 6);
      sendKeyToPm(editorView, 'ArrowUp');

      expect(editorView.state.doc).toEqualDocument(docWithTable);
      editorView.destroy();
    });
  });

  describe('when images is inside lists in table', () => {
    const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
    const temporaryFileId = `temporary:${randomId()}`;

    it('inserts image as single', () => {
      const { editorView } = editor(
        doc(
          p('1'),
          table()(
            tr(td()(p('2'), ul(li(p('3{<>}'))))),
            tr(tdEmpty),
            tr(tdEmpty),
          ),
        ),
      );

      insertMediaAsMediaSingle(
        editorView,
        media({
          id: temporaryFileId,
          __key: temporaryFileId,
          type: 'file',
          collection: testCollectionName,
          __fileMimeType: 'image/png',
        })()(editorView.state.schema),
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          p('1'),
          table()(
            tr(
              td()(
                p('2'),
                ul(
                  li(
                    p('3'),
                    mediaSingle()(
                      media({
                        id: temporaryFileId,
                        __key: temporaryFileId,
                        type: 'file',
                        collection: testCollectionName,
                        __fileMimeType: 'image/png',
                      })(),
                    ),
                    p(''),
                    p(''),
                  ),
                ),
              ),
            ),
            tr(tdEmpty),
            tr(tdEmpty),
          ),
        ),
      );
    });
  });

  describe('checkIfNumberColumnEnabled', () => {
    it('should return false if table is not in focus', () => {
      const { editorView } = editor(
        doc(table()(tr(tdCursor, tdEmpty, tdEmpty))),
      );
      expect(checkIfNumberColumnEnabled(editorView.state)).toBe(false);
      editorView.destroy();
    });
  });

  describe('checkIfHeaderColumnEnabled', () => {
    it('should return false if table is not in focus', () => {
      const { editorView } = editor(
        doc(table()(tr(tdCursor, tdEmpty, tdEmpty))),
      );
      expect(checkIfHeaderColumnEnabled(editorView.state)).toBe(false);
      editorView.destroy();
    });
  });

  describe('checkIfHeaderRowEnabled', () => {
    it('should return false if table is not in focus', () => {
      const { editorView } = editor(
        doc(table()(tr(tdCursor, tdEmpty, tdEmpty))),
      );
      expect(checkIfHeaderRowEnabled(editorView.state)).toBe(false);
      editorView.destroy();
    });
  });

  describe('checkIfHeaderRowEnabled', () => {
    it('should return false if table is not in focus', () => {
      const { editorView } = editor(
        doc(table()(tr(tdCursor, tdEmpty, tdEmpty))),
      );
      expect(checkIfHeaderRowEnabled(editorView.state)).toBe(false);
      editorView.destroy();
    });
  });

  describe('table layouts', () => {
    it('should update the table node layout attribute', () => {
      const { editorView } = editor(
        doc(table()(tr(tdCursor, tdEmpty, tdEmpty))),
      );

      const nodeInitial = findTable(editorView.state.selection)!.node;
      expect(nodeInitial).toBeDefined();
      expect(nodeInitial!.attrs.layout).toBe('default');

      setTableLayout('full-width')(editorView.state, editorView.dispatch);

      const { node } = findTable(editorView.state.selection)!;

      expect(node).toBeDefined();
      expect(node!.attrs.layout).toBe('full-width');

      editorView.destroy();
    });

    it('can set the data-layout attribute on the table DOM element', () => {
      const { editorView } = editor(
        doc(table()(tr(tdCursor, tdEmpty, tdEmpty))),
      );

      let tableElement = editorView.dom.querySelector('table');
      expect(tableElement!.getAttribute('data-layout')).toBe('default');

      setTableLayout('full-width')(editorView.state, editorView.dispatch);
      tableElement = editorView.dom.querySelector('table');
      expect(tableElement!.getAttribute('data-layout')).toBe('full-width');

      editorView.destroy();
    });

    it('applies the initial data-layout attribute on the table DOM element', () => {
      const { editorView } = editor(
        doc(table({ layout: 'full-width' })(tr(tdCursor, tdEmpty, tdEmpty))),
      );

      const tables = editorView.dom.getElementsByTagName('table');
      expect(tables.length).toBe(1);
      const tableElement = tables[0];

      expect(tableElement.getAttribute('data-layout')).toBe('full-width');

      editorView.destroy();
    });

    ['default', 'wide', 'full-width'].forEach(nextLayout => {
      describe(`when setTableLayout(${nextLayout}) is called`, () => {
        it(`should set table layout attribute to ${nextLayout}`, () => {
          const { editorView } = editor(
            doc(table()(tr(tdCursor, tdEmpty, tdEmpty))),
          );
          setTableLayout(nextLayout as TableLayout)(
            editorView.state,
            editorView.dispatch,
          );
          const { tableNode } = tablePluginKey.getState(editorView.state);
          expect(tableNode.attrs.layout).toBe(nextLayout);
          editorView.destroy();
        });
      });
    });

    it('applies the initial data-layout attribute on the table DOM element', () => {
      const { editorView } = editor(
        doc(table({ layout: 'full-width' })(tr(tdCursor, tdEmpty, tdEmpty))),
      );

      const tables = editorView.dom.getElementsByTagName('table');
      expect(tables.length).toBe(1);
      const tableElement = tables[0];

      expect(tableElement.getAttribute('data-layout')).toBe('full-width');

      editorView.destroy();
    });
  });
});
