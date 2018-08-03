import { Slice, Fragment } from 'prosemirror-model';
import { isColumnSelected, isRowSelected } from 'prosemirror-utils';
import { defaultSchema } from '@atlaskit/editor-common';
import {
  doc,
  p,
  createEditor,
  table,
  tr,
  td,
  th,
  tdCursor,
  tdEmpty,
  panelNote,
} from '@atlaskit/editor-test-helpers';
import {
  transformSliceToAddTableHeaders,
  deleteColumns,
  deleteRows,
  emptyMultipleCells,
  setMultipleCellAttrs,
  toggleContextualMenu,
  setEditorFocus,
  setTableRef,
  selectColumn,
  selectRow,
} from '../../../src/plugins/table/actions';
import { TablePluginState } from '../../../src/plugins/table/types';
import tablesPlugin from '../../../src/plugins/table';
import panelPlugin from '../../../src/plugins/panel';
import {
  pluginKey,
  getPluginState,
} from '../../../src/plugins/table/pm-plugins/main';

describe('table plugin: actions', () => {
  const editor = (doc: any) =>
    createEditor<TablePluginState>({
      doc,
      editorPlugins: [tablesPlugin, panelPlugin],
      pluginKey,
    });

  describe('transformSliceToAddTableHeaders', () => {
    const textNode = defaultSchema.text('hello', undefined);
    const paragraphNode = defaultSchema.nodes.paragraph.createChecked(
      undefined,
      defaultSchema.text('within paragraph', [
        defaultSchema.marks.strong.create(),
      ]),
      undefined,
    );
    const ruleNode = defaultSchema.nodes.rule.createChecked();

    const tableBody = tr(
      td({ colwidth: [300] })(p('r4')),
      td()(p('r5')),
      td()(panelNote(p('r6'))),
    );

    it('handles an empty fragment', () => {
      const slice = new Slice(Fragment.from(undefined), 0, 0);
      expect(
        transformSliceToAddTableHeaders(slice, defaultSchema).eq(slice),
      ).toBe(true);
    });

    it('does nothing to a text fragment', () => {
      const slice = new Slice(Fragment.from(textNode), 0, 0);
      expect(
        transformSliceToAddTableHeaders(slice, defaultSchema).eq(slice),
      ).toBe(true);
    });

    it('does nothing to fragment with multiple non-table nodes', () => {
      const slice = new Slice(
        Fragment.from([textNode, ruleNode, paragraphNode]),
        1,
        0,
      );

      expect(
        transformSliceToAddTableHeaders(slice, defaultSchema).eq(slice),
      ).toBe(true);
    });

    it('transforms only the table within the slice', () => {
      const preTable = table({ isNumberColumnEnabled: true })(
        tr(
          td()(p('r1')),
          th({ colspan: 2 })(p('r2')),
          td()(panelNote(p('r3'))),
        ),

        tableBody,
      );

      const postTable = table({ isNumberColumnEnabled: true })(
        tr(
          th()(p('r1')),
          th({ colspan: 2 })(p('r2')),
          th()(panelNote(p('r3'))),
        ),

        tableBody,
      );

      const preSlice = new Slice(
        Fragment.from([textNode, preTable(defaultSchema), paragraphNode]),
        1,
        0,
      );

      const postSlice = new Slice(
        Fragment.from([textNode, postTable(defaultSchema), paragraphNode]),
        1,
        0,
      );

      expect(
        transformSliceToAddTableHeaders(preSlice, defaultSchema).eq(postSlice),
      ).toBe(true);
    });

    it('transforms any table within the slice', () => {
      const preTableA = table({ isNumberColumnEnabled: true })(
        tr(
          td()(p('r1')),
          th({ colspan: 2 })(p('r2')),
          td()(panelNote(p('r3'))),
        ),

        tableBody,
      );

      const postTableA = table({ isNumberColumnEnabled: true })(
        tr(
          th()(p('r1')),
          th({ colspan: 2 })(p('r2')),
          th()(panelNote(p('r3'))),
        ),

        tableBody,
      );

      const preTableB = table({ isNumberColumnEnabled: true })(
        tr(td()(p('b1')), th()(p('b2')), th()(p('b3'))),

        tableBody,
      );

      const postTableB = table({ isNumberColumnEnabled: true })(
        tr(th()(p('b1')), th()(p('b2')), th()(p('b3'))),

        tableBody,
      );

      const preSlice = new Slice(
        Fragment.from([
          textNode,
          preTableA(defaultSchema),
          paragraphNode,
          preTableB(defaultSchema),
        ]),
        1,
        0,
      );

      const postSlice = new Slice(
        Fragment.from([
          textNode,
          postTableA(defaultSchema),
          paragraphNode,
          postTableB(defaultSchema),
        ]),
        1,
        0,
      );

      expect(
        transformSliceToAddTableHeaders(preSlice, defaultSchema).eq(postSlice),
      ).toBe(true);
    });
  });

  describe('#deleteColumns', () => {
    it('should delete columns by indexes', () => {
      const { editorView } = editor(
        doc(p('text'), table()(tr(tdCursor, td({})(p('c1')), td({})(p('c2'))))),
      );
      const { state, dispatch } = editorView;
      deleteColumns([0, 1])(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(p('text'), table()(tr(td()(p('c2'))))),
      );
    });
  });

  describe('#deleteRows', () => {
    it('should delete rows by indexes', () => {
      const { editorView } = editor(
        doc(
          p('text'),
          table()(
            tr(td()(p('c1')), td()(p('c2'))),
            tr(td()(p('c3')), td()(p('c4'))),
            tr(td()(p('c5')), td()(p('c6'))),
          ),
        ),
      );
      const { state, dispatch } = editorView;
      deleteRows([0, 1])(state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(p('text'), table()(tr(td()(p('c5')), td()(p('c6'))))),
      );
    });
  });

  describe('#emptyMultipleCells', () => {
    it('should empty selected cells', () => {
      const { editorView } = editor(
        doc(
          p('text'),
          table()(
            tr(td()(p('c1')), tdEmpty),
            tr(td()(panelNote(p('text'))), tdEmpty),
          ),
        ),
      );
      const { state, dispatch } = editorView;
      selectColumn(0)(state, dispatch);
      emptyMultipleCells(0)(editorView.state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(p('text'), table()(tr(tdEmpty, tdEmpty), tr(tdEmpty, tdEmpty))),
      );
    });

    it('should empty cell with the cursor', () => {
      const { editorView } = editor(
        doc(
          p('text'),
          table()(
            tr(td()(p('c1')), tdEmpty),
            tr(td()(panelNote(p('te{<>}xt'))), tdEmpty),
          ),
        ),
      );
      const { state, dispatch } = editorView;
      emptyMultipleCells(state.selection.$from.pos)(editorView.state, dispatch);

      expect(editorView.state.doc).toEqualDocument(
        doc(
          p('text'),
          table()(tr(td()(p('c1')), tdEmpty), tr(tdEmpty, tdEmpty)),
        ),
      );
    });
  });

  describe('#setMultipleCellAttrs', () => {
    it('should set selected cell attributes', () => {
      const { editorView } = editor(
        doc(
          p('text'),
          table()(
            tr(td()(p('c1')), td()(p('c2'))),
            tr(td()(p('c3')), td()(p('c4'))),
          ),
        ),
      );
      const { state, dispatch } = editorView;
      selectColumn(0)(state, dispatch);
      setMultipleCellAttrs({ colspan: 2 }, 0)(editorView.state, dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          p('text'),
          table()(
            tr(td({ colspan: 2 })(p('c1')), td()(p('c2'))),
            tr(td({ colspan: 2 })(p('c3')), td()(p('c4'))),
          ),
        ),
      );
    });
    it('should set cell attributes if the cell has cursor', () => {
      const { editorView } = editor(
        doc(
          p('text'),
          table()(
            tr(tdEmpty, tdEmpty),
            tr(td()(panelNote(p('te{<>}xt'))), tdEmpty),
          ),
        ),
      );
      const { state, dispatch } = editorView;
      setMultipleCellAttrs({ colspan: 2 }, state.selection.$from.pos)(
        editorView.state,
        dispatch,
      );
      expect(editorView.state.doc).toEqualDocument(
        doc(
          p('text'),
          table()(
            tr(tdEmpty, tdEmpty, tdEmpty),
            tr(td({ colspan: 2 })(panelNote(p('text'))), tdEmpty),
          ),
        ),
      );
    });
  });

  describe('#toggleContextualMenu', () => {
    it('should update isContextualMenuOpen in plugin state', () => {
      const { editorView } = editor(
        doc(p('text'), table()(tr(tdEmpty, tdEmpty))),
      );
      const { state, dispatch } = editorView;
      toggleContextualMenu(true)(state, dispatch);
      const { isContextualMenuOpen } = getPluginState(editorView.state);
      expect(isContextualMenuOpen).toBe(true);
    });
  });

  describe('#setEditorFocus', () => {
    it('should update editorHasFocus in plugin state', () => {
      const { editorView } = editor(
        doc(p('text'), table()(tr(tdEmpty, tdEmpty))),
      );
      const { state, dispatch } = editorView;
      setEditorFocus(true)(state, dispatch);
      const { editorHasFocus } = getPluginState(editorView.state);
      expect(editorHasFocus).toBe(true);
    });
  });

  describe('#setTableRef', () => {
    it('should update tableRef and tableNode in plugin state', () => {
      const { editorView } = editor(doc(table()(tr(tdCursor, tdEmpty))));
      const { state, dispatch } = editorView;
      const tableRef = document.querySelector(
        '.ProseMirror table',
      ) as HTMLElement;
      setEditorFocus(true)(state, dispatch);
      setTableRef(tableRef)(editorView.state, dispatch);
      const pluginState = getPluginState(editorView.state);
      expect(pluginState.tableRef).toEqual(tableRef);
      expect(pluginState.tableNode).toEqual(editorView.state.doc.firstChild!);
    });
  });

  describe('#selectColumn', () => {
    it('should select a column and set targetCellPosition to point to the first cell', () => {
      const { editorView } = editor(doc(table()(tr(tdEmpty, tdEmpty))));
      const { state, dispatch } = editorView;
      selectColumn(1)(state, dispatch);
      const pluginState = getPluginState(editorView.state);
      expect(pluginState.targetCellPosition).toEqual(6);
      expect(isColumnSelected(1)(editorView.state.selection));
    });
  });

  describe('#selectRow', () => {
    it('should select a row and set targetCellPosition to point to the first cell', () => {
      const { editorView } = editor(doc(table()(tr(tdEmpty), tr(tdEmpty))));
      const { state, dispatch } = editorView;
      selectRow(1)(state, dispatch);
      const pluginState = getPluginState(editorView.state);
      expect(pluginState.targetCellPosition).toEqual(8);
      expect(isRowSelected(1)(editorView.state.selection));
    });
  });
});
