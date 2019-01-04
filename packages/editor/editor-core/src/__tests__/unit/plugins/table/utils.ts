import { CellSelection } from 'prosemirror-tables';
import { isTableSelected } from 'prosemirror-utils';
import {
  doc,
  p,
  createEditor,
  table,
  tr,
  td,
  tdCursor,
  tdEmpty,
} from '@atlaskit/editor-test-helpers';
import {
  getColumnsWidths,
  getRowHeights,
  isColumnInsertButtonVisible,
  isRowInsertButtonVisible,
  isColumnDeleteButtonVisible,
  isRowDeleteButtonVisible,
  getColumnDeleteButtonParams,
  getRowDeleteButtonParams,
  getColumnsParams,
  getRowsParams,
  getColumnClassNames,
  getRowClassNames,
} from '../../../../plugins/table/utils';
import { TablePluginState } from '../../../../plugins/table/types';
import tablesPlugin from '../../../../plugins/table';
import { pluginKey } from '../../../../plugins/table/pm-plugins/main';
import { Command } from '../../../../types/';

describe('table plugin: utils', () => {
  const editor = (doc: any) =>
    createEditor<TablePluginState>({
      doc,
      editorPlugins: [tablesPlugin()],
      pluginKey,
    });
  const setCellSelection = (anchor: number, head: number): Command => (
    state,
    dispatch,
  ) => {
    if (dispatch) {
      dispatch(
        state.tr.setSelection(new CellSelection(
          state.doc.resolve(anchor - 2),
          state.doc.resolve(head - 2),
        ) as any),
      );
    }
    return true;
  };

  describe('#getColumnsWidths', () => {
    describe('when columns are not merged', () => {
      it('should return an array of widths of all columns', () => {
        const { editorView } = editor(
          doc(
            p('text'),
            table()(
              tr(td({})(p('a1')), td({})(p('a2'))),
              tr(td({})(p('b1')), td({})(p('b2'))),
            ),
          ),
        );
        const columnsWidths = getColumnsWidths(editorView);
        columnsWidths.forEach(width => {
          expect(typeof width).toEqual('number');
          expect(width > 0).toBe(true);
        });
        editorView.destroy();
      });
    });

    describe('when columns are merged', () => {
      describe('when merged column has cells', () => {
        it('should return an array of widths of all columns', () => {
          const { editorView } = editor(
            doc(
              p('text'),
              table()(
                tr(td({ colspan: 2 })(p('a1')), td({})(p('a3'))),
                tr(td({})(p('b1')), td({})(p('b2')), td({})(p('b3'))),
              ),
            ),
          );
          const columnsWidths = getColumnsWidths(editorView);
          columnsWidths.forEach(width => {
            expect(typeof width).toEqual('number');
            expect(width > 0).toBe(true);
          });
          editorView.destroy();
        });
      });
      describe('when merged column does not have cells', () => {
        it('should return an array of columns widths where widths of merged columns === undefined', () => {
          // column 2 doesn't have any cells here
          const { editorView } = editor(
            doc(
              p('text'),
              table()(
                tr(td({ colspan: 2 })(p('a1')), td({})(p('a3'))),
                tr(td({ colspan: 2 })(p('b1')), td({})(p('b3'))),
              ),
            ),
          );
          const columnsWidths = getColumnsWidths(editorView);
          columnsWidths.forEach((width, index) => {
            if (index === 1) {
              expect(typeof width).toEqual('undefined');
            } else {
              expect(typeof width).toEqual('number');
              expect(width > 0).toBe(true);
            }
          });
          editorView.destroy();
        });
      });
    });
  });

  describe('#getRowHeights', () => {
    describe('when rows are not merged', () => {
      it('should return an array of heights of all rows', () => {
        const { editorView } = editor(
          doc(
            p('text'),
            table()(
              tr(td({})(p('a1')), td({})(p('a2'))),
              tr(td({})(p('b1')), td({})(p('b2'))),
            ),
          ),
        );
        const tableRef = editorView.dom.querySelector('table')!;
        const rowHeights = getRowHeights(tableRef);
        rowHeights.forEach(height => {
          expect(typeof height).toEqual('number');
          expect(height > 0).toBe(true);
        });
        editorView.destroy();
      });
    });

    describe('when rows are merged', () => {
      describe('when merged row has cells', () => {
        it('should return an array of heights of all rows', () => {
          const { editorView } = editor(
            doc(
              p('text'),
              table()(
                tr(td({ rowspan: 2 })(p('a1')), td({})(p('a2'))),
                tr(td({})(p('b2'))),
              ),
            ),
          );
          const tableRef = editorView.dom.querySelector('table')!;
          const rowHeights = getRowHeights(tableRef);

          rowHeights.forEach(height => {
            expect(typeof height).toEqual('number');
            expect(height > 0).toBe(true);
          });
          editorView.destroy();
        });
      });
    });
  });

  describe('#isColumnInsertButtonVisible', () => {
    describe('when selection is a TextSelection', () => {
      it('should return true', () => {
        const { editorView } = editor(
          doc(p('text'), table()(tr(tdCursor, tdEmpty, tdEmpty))),
        );
        for (let i = 0; i < 2; i++) {
          expect(
            isColumnInsertButtonVisible(i, editorView.state.selection),
          ).toBe(true);
        }
        editorView.destroy();
      });
    });
    describe('when selection is a CellSelection', () => {
      describe('when no columns are fully selected', () => {
        it('should return true', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}b3'))),
                tr(tdEmpty, tdEmpty, tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          for (let i = 0; i < 2; i++) {
            expect(
              isColumnInsertButtonVisible(i, editorView.state.selection),
            ).toBe(true);
          }
          editorView.destroy();
        });
      });

      describe('when first column is selected', () => {
        it('should return true', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(td({})(p('{head}c1')), tdEmpty, tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          for (let i = 0; i < 2; i++) {
            expect(
              isColumnInsertButtonVisible(i, editorView.state.selection),
            ).toBe(true);
          }
          editorView.destroy();
        });
      });

      describe('when two columns are selected', () => {
        it('should return false for second column', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, td({})(p('{head}c2')), tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          for (let i = 0; i < 2; i++) {
            if (i === 1) {
              expect(
                isColumnInsertButtonVisible(i, editorView.state.selection),
              ).toBe(false);
            } else {
              expect(
                isColumnInsertButtonVisible(i, editorView.state.selection),
              ).toBe(true);
            }
          }
          editorView.destroy();
        });
      });
      describe('when three columns are selected', () => {
        it('should return true', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}c3')), tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          for (let i = 0; i < 2; i++) {
            expect(
              isColumnInsertButtonVisible(i, editorView.state.selection),
            ).toBe(true);
          }
          editorView.destroy();
        });
      });
      describe('when table is selected', () => {
        it('should return true', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}c3'))),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          for (let i = 0; i < 2; i++) {
            expect(
              isColumnInsertButtonVisible(i, editorView.state.selection),
            ).toBe(true);
          }
          editorView.destroy();
        });
      });
    });
  });

  describe('#isRowInsertButtonVisible', () => {
    describe('when selection is a TextSelection', () => {
      it('should return true', () => {
        const { editorView } = editor(
          doc(
            p('text'),
            table()(
              tr(tdCursor, tdEmpty),
              tr(tdEmpty, tdEmpty),
              tr(tdEmpty, tdEmpty),
            ),
          ),
        );
        for (let i = 0; i < 2; i++) {
          expect(isRowInsertButtonVisible(i, editorView.state.selection)).toBe(
            true,
          );
        }
        editorView.destroy();
      });
    });
    describe('when selection is a CellSelection', () => {
      describe('when no rows are fully selected', () => {
        it('should return true', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, td({})(p('{head}c2')), tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          for (let i = 0; i < 2; i++) {
            expect(
              isRowInsertButtonVisible(i, editorView.state.selection),
            ).toBe(true);
          }
          editorView.destroy();
        });
      });

      describe('when first row is selected', () => {
        it('should return true', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, td({})(p('{head}a3'))),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          for (let i = 0; i < 2; i++) {
            expect(
              isRowInsertButtonVisible(i, editorView.state.selection),
            ).toBe(true);
          }
          editorView.destroy();
        });
      });

      describe('when two rows are selected', () => {
        it('should return false for second row', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}b3'))),
                tr(tdEmpty, tdEmpty, tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          for (let i = 0; i < 2; i++) {
            if (i === 1) {
              expect(
                isRowInsertButtonVisible(i, editorView.state.selection),
              ).toBe(false);
            } else {
              expect(
                isRowInsertButtonVisible(i, editorView.state.selection),
              ).toBe(true);
            }
          }
          editorView.destroy();
        });
      });
      describe('when three rows are selected', () => {
        it('should return true', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}c3'))),
                tr(tdEmpty, tdEmpty, tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          for (let i = 0; i < 2; i++) {
            expect(
              isRowInsertButtonVisible(i, editorView.state.selection),
            ).toBe(true);
          }
          editorView.destroy();
        });
      });
      describe('when table is elected', () => {
        it('should return true', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}c3'))),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          for (let i = 0; i < 2; i++) {
            expect(
              isRowInsertButtonVisible(i, editorView.state.selection),
            ).toBe(true);
          }
          editorView.destroy();
        });
      });
    });
  });

  describe('#isColumnDeleteButtonVisible', () => {
    describe('when selection is a TextSelection', () => {
      it('should return false', () => {
        const { editorView } = editor(
          doc(p('text'), table()(tr(tdCursor, tdEmpty, tdEmpty))),
        );
        expect(isColumnDeleteButtonVisible(editorView.state.selection)).toBe(
          false,
        );
        editorView.destroy();
      });
    });
    describe('when selection is a CellSelection', () => {
      describe('when no columns are fully selected', () => {
        it('should return false', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}b3'))),
                tr(tdEmpty, tdEmpty, tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          expect(isColumnDeleteButtonVisible(editorView.state.selection)).toBe(
            false,
          );
          editorView.destroy();
        });
      });
      describe('when a column is selected', () => {
        it('should return true', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(td({})(p('{head}c1')), tdEmpty, tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          expect(isColumnDeleteButtonVisible(editorView.state.selection)).toBe(
            true,
          );
          editorView.destroy();
        });
      });
      describe('when table is selected', () => {
        it('should return false', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}c3'))),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          expect(isColumnDeleteButtonVisible(editorView.state.selection)).toBe(
            false,
          );
          editorView.destroy();
        });
      });
    });
  });

  describe('#isRowDeleteButtonVisible', () => {
    describe('when selection is a TextSelection', () => {
      it('should return false', () => {
        const { editorView } = editor(
          doc(p('text'), table()(tr(tdCursor, tdEmpty, tdEmpty))),
        );
        expect(isRowDeleteButtonVisible(editorView.state.selection)).toBe(
          false,
        );
        editorView.destroy();
      });
    });
    describe('when selection is a CellSelection', () => {
      describe('when no rows are fully selected', () => {
        it('should return false', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, td({})(p('{head}b3')), tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          expect(isRowDeleteButtonVisible(editorView.state.selection)).toBe(
            false,
          );
          editorView.destroy();
        });
      });
      describe('when a row is selected', () => {
        it('should return true', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, td({})(p('{head}a1'))),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          expect(isRowDeleteButtonVisible(editorView.state.selection)).toBe(
            true,
          );
          editorView.destroy();
        });
      });
      describe('when table is selected', () => {
        it('should return false', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}c3'))),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          expect(isRowDeleteButtonVisible(editorView.state.selection)).toBe(
            false,
          );
          editorView.destroy();
        });
      });
    });
  });

  describe('#getColumnDeleteButtonParams', () => {
    describe('when selection is a TextSelection', () => {
      it('should return null', () => {
        const { editorView } = editor(
          doc(p('text'), table()(tr(tdCursor, tdEmpty, tdEmpty))),
        );
        const columnsWidths = [100, 150, 200];
        expect(
          getColumnDeleteButtonParams(
            columnsWidths,
            editorView.state.selection,
          ),
        ).toBe(null);
        editorView.destroy();
      });
    });
    describe('when selection is a CellSelection and 3 columns are selected', () => {
      describe('columnsWidths = [100, 150, 200]', () => {
        it('should return indexes = [0, 1, 2]', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}c3')), tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          const columnsWidths = [100, 150, 200];
          const { indexes, left } = getColumnDeleteButtonParams(
            columnsWidths,
            editorView.state.selection,
          )!;
          expect(indexes).toEqual([0, 1, 2]);
          expect(left > 0).toBe(true);
          editorView.destroy();
        });
      });
      describe('columnsWidths = [100, ,150, ,200]', () => {
        it('should return indexes = [0, 2]', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(
                  td({ colspan: 2 })(p('{anchor}a1')),
                  td({ colspan: 2 })(p('')),
                  tdEmpty,
                ),
                tr(
                  td({ colspan: 2 })(p('')),
                  td({ colspan: 2 })(p('')),
                  tdEmpty,
                ),
                tr(
                  td({ colspan: 2 })(p('')),
                  td({ colspan: 2 })(p('{head}c3')),
                  tdEmpty,
                ),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          const columnsWidths = [100, , 150, , 200];
          const { indexes, left } = getColumnDeleteButtonParams(
            columnsWidths,
            editorView.state.selection,
          )!;
          expect(indexes).toEqual([0, 2]);
          expect(left > 0).toBe(true);
          editorView.destroy();
        });
      });
    });
  });

  describe('#getRowDeleteButtonParams', () => {
    describe('when selection is a TextSelection', () => {
      it('should return null', () => {
        const { editorView } = editor(
          doc(
            p('text'),
            table()(
              tr(tdCursor, tdEmpty, tdEmpty),
              tr(tdEmpty, tdEmpty, tdEmpty),
              tr(tdEmpty, tdEmpty, tdEmpty),
            ),
          ),
        );
        const rowsHeights = [100, 150, 200];
        expect(
          getRowDeleteButtonParams(rowsHeights, editorView.state.selection),
        ).toBe(null);
        editorView.destroy();
      });
    });
    describe('when selection is a CellSelection and 3 rows are selected', () => {
      describe('rowsHeights = [100, 150, 200]', () => {
        it('should return indexes = [0, 1, 2]', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}c3'))),
                tr(tdEmpty, tdEmpty, tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          const rowsHeights = [100, 150, 200];
          const { indexes, top } = getRowDeleteButtonParams(
            rowsHeights,
            editorView.state.selection,
          )!;
          expect(indexes).toEqual([0, 1, 2]);
          expect(top > 0).toBe(true);
          editorView.destroy();
        });
      });
      describe('rowsHeights = [100, ,150, ,200]', () => {
        it('should return indexes = [0, 1, 2]', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(
                  td({ rowspan: 2 })(p('{anchor}a1')),
                  td({ rowspan: 2 })(p('a2')),
                  td({ rowspan: 2 })(p('a3')),
                ),
                tr(
                  td({ rowspan: 2 })(p('c1')),
                  td({ rowspan: 2 })(p('c2')),
                  td({ rowspan: 2 })(p('{head}c3')),
                ),
                tr(tdEmpty, tdEmpty, tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          const rowsHeights = [100, , 150, , 200];
          const { indexes, top } = getRowDeleteButtonParams(
            rowsHeights,
            editorView.state.selection,
          )!;
          expect(indexes).toEqual([0, 2]);
          expect(top > 0).toBe(true);
          editorView.destroy();
        });
      });
    });
  });

  describe('#getColumnsParams', () => {
    describe('columnsWidths = [100, 150, 200]', () => {
      it('should return consecutive indexes', () => {
        const columnsWidths = [100, 150, 200];
        const columns = getColumnsParams(columnsWidths);
        columns.forEach((column, index) => {
          expect(column.startIndex).toEqual(index);
          expect(column.endIndex).toEqual(index + 1);
          expect(column.width).toEqual(columnsWidths[index]);
        });
      });
    });
    describe('columnsWidths = [100, ,150, ,200]', () => {
      it('should return correct indexes', () => {
        const columnsWidths = [100, , 150, , 200];
        const columns = getColumnsParams(columnsWidths);
        const expectedIndexes = [0, 2, 4, 5];
        for (let i = 0, count = columns.length; i < count; i++) {
          const column = columns[i];
          expect(column.startIndex).toEqual(expectedIndexes[i]);
          expect(column.endIndex).toEqual(expectedIndexes[i + 1]);
          expect(column.width).toEqual(columnsWidths[expectedIndexes[i]]);
        }
      });
    });
  });

  describe('#getRowsParams', () => {
    describe('rowHeights = [100, 150, 200]', () => {
      it('should return consecutive indexes', () => {
        const rowHeights = [100, 150, 200];
        const rows = getRowsParams(rowHeights);
        rows.forEach((row, index) => {
          expect(row.startIndex).toEqual(index);
          expect(row.endIndex).toEqual(index + 1);
          expect(row.height).toEqual(rowHeights[index]);
        });
      });
    });
    describe('rowHeights = [100, ,150, ,200]', () => {
      it('should return correct indexes', () => {
        const rowHeights = [100, , 150, , 200];
        const rows = getRowsParams(rowHeights);
        const expectedIndexes = [0, 2, 4, 5];
        for (let i = 0, count = rows.length; i < count; i++) {
          const row = rows[i];
          expect(row.startIndex).toEqual(expectedIndexes[i]);
          expect(row.endIndex).toEqual(expectedIndexes[i + 1]);
          expect(row.height).toEqual(rowHeights[expectedIndexes[i]]);
        }
      });
    });
  });

  describe('#getColumnClassNames', () => {
    describe('when selection is a TextSelection', () => {
      [[0], [1], [2], [0, 1], [1, 2], [0, 2]].forEach(hoveredColumns => {
        describe(`when hoveredColumns = ${hoveredColumns}`, () => {
          it('return a string containing "active" substring', () => {
            const { editorView } = editor(
              doc(
                p('text'),
                table()(
                  tr(tdCursor, tdEmpty, tdEmpty),
                  tr(tdEmpty, tdEmpty, tdEmpty),
                  tr(tdEmpty, tdEmpty, tdEmpty),
                ),
              ),
            );
            const isInDanger = false;
            const classNames = getColumnClassNames(
              hoveredColumns[0],
              editorView.state.selection,
              hoveredColumns,
              isInDanger,
            );
            expect(classNames.indexOf('active') > -1).toBe(true);
          });
          describe('when isInDanger = true', () => {
            it('return a string containing "danger" substring', () => {
              const { editorView } = editor(
                doc(
                  p('text'),
                  table()(
                    tr(tdCursor, tdEmpty, tdEmpty),
                    tr(tdEmpty, tdEmpty, tdEmpty),
                    tr(tdEmpty, tdEmpty, tdEmpty),
                  ),
                ),
              );
              const isInDanger = true;
              const classNames = getColumnClassNames(
                hoveredColumns[0],
                editorView.state.selection,
                hoveredColumns,
                isInDanger,
              );
              expect(classNames.indexOf('danger') > -1).toBe(true);
            });
          });
        });
      });
    });
    describe('when selection is a CellSelection', () => {
      describe('when no columns are fully selected', () => {
        it('should return an empty string', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}b3'))),
                tr(tdEmpty, tdEmpty, tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          const classNames = getColumnClassNames(
            0,
            editorView.state.selection,
            [],
            false,
          );
          expect(classNames).toBe('');
          editorView.destroy();
        });
      });
      describe('when a column is selected', () => {
        it('return a string containing "active" substring', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}c3'))),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          [0, 1, 2].forEach(index => {
            const classNames = getColumnClassNames(
              index,
              editorView.state.selection,
              [],
              false,
            );
            expect(classNames.indexOf('active') > -1).toBe(true);
          });
        });
        describe('when isInDanger = true', () => {
          it('return a string containing "danger" substring', () => {
            const {
              editorView,
              refs: { anchor, head },
            } = editor(
              doc(
                p('text'),
                table()(
                  tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                  tr(tdEmpty, tdEmpty, tdEmpty),
                  tr(tdEmpty, tdEmpty, td({})(p('{head}c3'))),
                ),
              ),
            );
            setCellSelection(anchor, head)(
              editorView.state,
              editorView.dispatch,
            );
            [0, 1, 2].forEach(index => {
              const classNames = getColumnClassNames(
                index,
                editorView.state.selection,
                [],
                true,
              );
              expect(classNames.indexOf('danger') > -1).toBe(true);
            });
          });
        });
      });
    });
  });

  describe('#getRowClassNames', () => {
    describe('when selection is a TextSelection', () => {
      [[0], [1], [2], [0, 1], [1, 2], [0, 2]].forEach(hoveredRows => {
        describe(`when hoveredRows = ${hoveredRows}`, () => {
          it('return a string containing "active" substring', () => {
            const { editorView } = editor(
              doc(
                p('text'),
                table()(
                  tr(tdCursor, tdEmpty, tdEmpty),
                  tr(tdEmpty, tdEmpty, tdEmpty),
                  tr(tdEmpty, tdEmpty, tdEmpty),
                ),
              ),
            );
            const isInDanger = false;
            const classNames = getRowClassNames(
              hoveredRows[0],
              editorView.state.selection,
              hoveredRows,
              isInDanger,
            );
            expect(classNames.indexOf('active') > -1).toBe(true);
          });
          describe('when isInDanger = true', () => {
            it('return a string containing "danger" substring', () => {
              const { editorView } = editor(
                doc(
                  p('text'),
                  table()(
                    tr(tdCursor, tdEmpty, tdEmpty),
                    tr(tdEmpty, tdEmpty, tdEmpty),
                    tr(tdEmpty, tdEmpty, tdEmpty),
                  ),
                ),
              );
              const isInDanger = true;
              const classNames = getRowClassNames(
                hoveredRows[0],
                editorView.state.selection,
                hoveredRows,
                isInDanger,
              );
              expect(classNames.indexOf('danger') > -1).toBe(true);
            });
          });
        });
      });
    });
    describe('when selection is a CellSelection', () => {
      describe('when no rows are fully selected', () => {
        it('should return an empty string', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, td({})(p('{head}c3')), tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          const classNames = getRowClassNames(
            0,
            editorView.state.selection,
            [],
            false,
          );
          expect(classNames).toBe('');
          editorView.destroy();
        });
      });
      describe('when a row is selected', () => {
        it('return a string containing "active" substring', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, tdEmpty),
                tr(tdEmpty, tdEmpty, td({})(p('{head}c3'))),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);
          [0, 1, 2].forEach(index => {
            const classNames = getRowClassNames(
              index,
              editorView.state.selection,
              [],
              false,
            );
            expect(classNames.indexOf('active') > -1).toBe(true);
          });
        });
        describe('when isInDanger = true', () => {
          it('return a string containing "danger" substring', () => {
            const {
              editorView,
              refs: { anchor, head },
            } = editor(
              doc(
                p('text'),
                table()(
                  tr(td({})(p('{anchor}a1')), tdEmpty, tdEmpty),
                  tr(tdEmpty, tdEmpty, tdEmpty),
                  tr(tdEmpty, tdEmpty, td({})(p('{head}c3'))),
                ),
              ),
            );
            setCellSelection(anchor, head)(
              editorView.state,
              editorView.dispatch,
            );
            [0, 1, 2].forEach(index => {
              const classNames = getRowClassNames(
                index,
                editorView.state.selection,
                [],
                true,
              );
              expect(classNames.indexOf('danger') > -1).toBe(true);
            });
          });
        });
      });
    });
  });

  describe('#normalizeSelection', () => {
    describe('when table has non-rectangular column CellSelection', () => {
      describe('when first column is selected', () => {
        it('should create a rectangular CellSelection', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(td({})(p('{anchor}a1')), tdEmpty),
                tr(td({ colspan: 2 })(p('b1'))),
                tr(td({})(p('{head}c1')), tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);

          expect(isTableSelected(editorView.state.selection)).toBe(true);
        });
      });
      describe('when second column is selected', () => {
        it('should create a rectangular CellSelection', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(tdEmpty, td({})(p('{anchor}a1'))),
                tr(td({ colspan: 2 })(p('b1'))),
                tr(tdEmpty, td({})(p('{head}c1'))),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);

          expect(isTableSelected(editorView.state.selection)).toBe(true);
        });
      });
    });

    describe('when table has non-rectangular rpw CellSelection', () => {
      describe('when first row is selected', () => {
        it('should create a rectangular CellSelection', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(
                  td({})(p('{anchor}a1')),
                  td({ rowspan: 2 })(p('a2')),
                  td({})(p('{head}a3')),
                ),
                tr(tdEmpty, tdEmpty),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);

          expect(isTableSelected(editorView.state.selection)).toBe(true);
        });
      });
      describe('when second row is selected', () => {
        it('should create a rectangular CellSelection', () => {
          const {
            editorView,
            refs: { anchor, head },
          } = editor(
            doc(
              p('text'),
              table()(
                tr(tdEmpty, td({ rowspan: 2 })(p('a2')), tdEmpty),
                tr(td({})(p('{anchor}b1')), td({})(p('{head}b3'))),
              ),
            ),
          );
          setCellSelection(anchor, head)(editorView.state, editorView.dispatch);

          expect(isTableSelected(editorView.state.selection)).toBe(true);
        });
      });
    });
  });
});
