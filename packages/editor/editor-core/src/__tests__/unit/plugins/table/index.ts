import { CellSelection, TableMap } from 'prosemirror-tables';
import { selectRow, selectColumn, selectTable } from 'prosemirror-utils';
import {
  doc,
  p,
  createEditorFactory,
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
import {
  pluginKey,
  getPluginState,
} from '../../../../plugins/table/pm-plugins/main';
import {
  TablePluginState,
  PluginConfig,
} from '../../../../plugins/table/types';
import { createTable, setEditorFocus } from '../../../../plugins/table/actions';
import { setNodeSelection } from '../../../../utils';
import {
  toggleHeaderRow,
  toggleHeaderColumn,
  insertColumn,
  insertRow,
} from '../../../../plugins/table/actions';
import {
  checkIfNumberColumnEnabled,
  checkIfHeaderColumnEnabled,
  checkIfHeaderRowEnabled,
} from '../../../../plugins/table/utils';
import tablesPlugin from '../../../../plugins/table';
import codeBlockPlugin from '../../../../plugins/code-block';
import { mediaPlugin } from '../../../../plugins';
import { insertMediaAsMediaSingle } from '../../../../plugins/media/utils/media-single';
import listPlugin from '../../../../plugins/lists';
import { TextSelection } from 'prosemirror-state';

describe('table plugin', () => {
  const createEditor = createEditorFactory<TablePluginState>();

  const editor = (doc: any, trackEvent = () => {}) => {
    const tableOptions = {
      allowNumberColumn: true,
      allowHeaderRow: true,
      allowHeaderColumn: true,
      permittedLayouts: 'all',
    } as PluginConfig;
    return createEditor({
      doc,
      editorPlugins: [
        listPlugin,
        tablesPlugin(tableOptions),
        codeBlockPlugin(),
        mediaPlugin({ allowMediaSingle: true }),
      ],
      editorProps: {
        analyticsHandler: trackEvent,
        allowTables: tableOptions,
      },
      pluginKey,
    });
  };

  let trackEvent;
  beforeEach(() => {
    trackEvent = jest.fn();
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
        });
      });
    });

    describe('when adding a new row', () => {
      describe('when table has merged columns in rows', () => {
        it('copies the structure', () => {
          const { editorView } = editor(
            doc(
              table()(
                tr(td({})(p('row1')), td()(p())),
                tr(td({ colspan: 2, background: '#e6fcff' })(p('row2{<>}'))),
              ),
            ),
            trackEvent,
          );

          insertRow(2)(editorView.state, editorView.dispatch);

          expect(editorView.state.doc).toEqualDocument(
            doc(
              table()(
                tr(td({})(p('row1')), td()(p())),
                tr(td({ colspan: 2, background: '#e6fcff' })(p('row2'))),
                tr(td({ colspan: 2, background: '#e6fcff' })(p('{<>}'))),
              ),
            ),
          );

          expect(trackEvent).toHaveBeenLastCalledWith(
            'atlassian.editor.format.table.row.button',
          );
        });
      });

      it('copies the structure from a tableCell', () => {
        const { editorView } = editor(
          doc(
            table()(
              tr(th({})(p()), th({})(p())),
              tr(td({ background: '#e6fcff' })(p('row1')), td()(p('{<>}'))),
              tr(td({ colspan: 2, background: '#e6fcff' })(p('row2'))),
            ),
          ),
          trackEvent,
        );

        insertRow(2)(editorView.state, editorView.dispatch);

        expect(editorView.state.doc).toEqualDocument(
          doc(
            table()(
              tr(th({})(p()), th({})(p())),
              tr(td({ background: '#e6fcff' })(p('row1')), td()(p())),
              tr(td({ background: '#e6fcff' })(p('{<>}')), td()(p())),
              tr(td({ colspan: 2, background: '#e6fcff' })(p('row2'))),
            ),
          ),
        );

        expect(trackEvent).toHaveBeenLastCalledWith(
          'atlassian.editor.format.table.row.button',
        );
      });

      it('copies the structure from a tableHeader', () => {
        const { editorView } = editor(
          doc(
            table()(
              tr(th({})(p('row1')), th()(p()), th()(p('{<>}'))),
              tr(
                th({ colspan: 2, background: '#e6fcff' })(p('row2')),
                td()(p()),
              ),
            ),
          ),
          trackEvent,
        );

        insertRow(2)(editorView.state, editorView.dispatch);

        expect(editorView.state.doc).toEqualDocument(
          doc(
            table()(
              tr(th({})(p('row1')), th()(p()), th()(p())),
              tr(
                th({ colspan: 2, background: '#e6fcff' })(p('row2')),
                td()(p()),
              ),
              tr(th({ colspan: 2, background: '#e6fcff' })(p()), td()(p())),
            ),
          ),
        );

        expect(trackEvent).toHaveBeenLastCalledWith(
          'atlassian.editor.format.table.row.button',
        );
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
    });
  });

  describe('checkIfHeaderColumnEnabled', () => {
    it('should return false if table is not in focus', () => {
      const { editorView } = editor(
        doc(table()(tr(tdCursor, tdEmpty, tdEmpty))),
      );
      expect(checkIfHeaderColumnEnabled(editorView.state)).toBe(false);
    });
  });

  describe('checkIfHeaderRowEnabled', () => {
    it('should return false if table is not in focus', () => {
      const { editorView } = editor(
        doc(table()(tr(tdCursor, tdEmpty, tdEmpty))),
      );
      expect(checkIfHeaderRowEnabled(editorView.state)).toBe(false);
    });
  });

  describe('checkIfHeaderRowEnabled', () => {
    it('should return false if table is not in focus', () => {
      const { editorView } = editor(
        doc(table()(tr(tdCursor, tdEmpty, tdEmpty))),
      );
      expect(checkIfHeaderRowEnabled(editorView.state)).toBe(false);
    });
  });

  describe('table plugin state', () => {
    it('should update tableNode when cursor enters the table', () => {
      const {
        editorView: view,
        refs: { nextPos },
      } = editor(doc(table()(tr(td()(p('{nextPos}')))), p('te{<>}xt')));

      setEditorFocus(true)(view.state, view.dispatch);

      view.dispatch(
        view.state.tr.setSelection(
          new TextSelection(view.state.doc.resolve(nextPos)),
        ),
      );
      const { tableNode } = getPluginState(view.state);
      expect(tableNode).toBeDefined();
      expect(tableNode.type.name).toEqual('table');
    });
    it('should update targetCellPosition when document changes', () => {
      const { editorView } = editor(doc(table()(tr(tdCursor, tdEmpty))));
      const { state, dispatch } = editorView;
      setEditorFocus(true)(state, dispatch);
      let pluginState = getPluginState(editorView.state);
      expect(pluginState.targetCellPosition).toEqual(2);

      let documentChangeTr = editorView.state.tr.insertText('hello world', 1);
      // Don't use dispatch to mimic collab provider
      editorView.updateState(editorView.state.apply(documentChangeTr));

      pluginState = getPluginState(editorView.state);
      expect(pluginState.targetCellPosition).toEqual(23);
    });
  });
});
