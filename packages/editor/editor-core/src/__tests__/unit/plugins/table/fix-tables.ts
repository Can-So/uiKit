import createStub from 'raf-stub';
import { mergeCells } from 'prosemirror-tables';
import {
  doc,
  p,
  createEditorFactory,
  table,
  tr,
  td,
  th,
  tdEmpty,
} from '@atlaskit/editor-test-helpers';
import {
  TablePluginState,
  PluginConfig,
} from '../../../../plugins/table/types';

import { pluginKey as tablePluginKey } from '../../../../plugins/table/pm-plugins/main';
import tablesPlugin from '../../../../plugins/table';

describe('fix tables', () => {
  const createEditor = createEditorFactory<TablePluginState>();

  const editor = (doc: any) => {
    const tableOptions = {
      allowNumberColumn: true,
      allowHeaderRow: true,
      allowHeaderColumn: true,
      permittedLayouts: 'all',
      allowColumnResizing: true,
    } as PluginConfig;
    return createEditor({
      doc,
      editorPlugins: [tablesPlugin(tableOptions)],
      editorProps: {
        allowTables: tableOptions,
      },
      pluginKey: tablePluginKey,
    });
  };

  describe('autoSize table', () => {
    let waitForAnimationFrame;
    beforeEach(() => {
      let stub = createStub();
      waitForAnimationFrame = stub.flush;
      jest.spyOn(window, 'requestAnimationFrame').mockImplementation(stub.add);
    });

    afterEach(() => {
      ((window.requestAnimationFrame as any) as jest.SpyInstance<
        any
      >).mockClear();
    });

    it('applies colwidths to cells and sets autosize to false', () => {
      const { editorView } = editor(
        doc(
          table({ __autoSize: true })(
            tr(th()(p('{<>}1')), th()(p('2')), th()(p('3'))),
            tr(td()(p('4')), td()(p('5')), td()(p('6'))),
            tr(td()(p('7')), td()(p('8')), td()(p('9'))),
          ),
        ),
      );

      waitForAnimationFrame();

      expect(editorView.state.doc).toEqualDocument(
        doc(
          table({ __autoSize: false })(
            tr(
              th({ colwidth: [48] })(p('1')),
              th({ colwidth: [48] })(p('2')),
              th({ colwidth: [48] })(p('3')),
            ),
            tr(
              td({ colwidth: [48] })(p('4')),
              td({ colwidth: [48] })(p('5')),
              td({ colwidth: [48] })(p('6')),
            ),
            tr(
              td({ colwidth: [48] })(p('7')),
              td({ colwidth: [48] })(p('8')),
              td({ colwidth: [48] })(p('9')),
            ),
          ),
        ),
      );
    });
  });

  describe('when document contains a table with empty rows', () => {
    it('should remove the table node', () => {
      global['fetch'] = jest.fn();

      const { editorView } = editor(doc(p('one'), table()(tr()), p('two')));

      expect(editorView.state.doc).toEqualDocument(doc(p('one'), p('two')));
      expect(global['fetch']).toHaveBeenCalled();
    });
  });

  describe('removeExtraneousColumnWidths', () => {
    it('removes unneccesary column widths', () => {
      const { editorView } = editor(
        doc(
          table()(
            tr(
              th({ colwidth: [100, 100] })(p('{<>}1')),
              th({ colwidth: [100, 100] })(p('2')),
              th({ colwidth: [480] })(p('3')),
            ),
            tr(
              td({ colwidth: [100, 100] })(p('4')),
              td({ colwidth: [100, 100] })(p('5')),
              td({ colwidth: [480] })(p('6')),
            ),
          ),
        ),
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          table()(
            tr(
              th({ colwidth: [100] })(p('1')),
              th({ colwidth: [100] })(p('2')),
              th({ colwidth: [480] })(p('3')),
            ),
            tr(
              td({ colwidth: [100] })(p('4')),
              td({ colwidth: [100] })(p('5')),
              td({ colwidth: [480] })(p('6')),
            ),
          ),
        ),
      );
    });
  });

  describe('when minimum colspan of a column is > 1', () => {
    it('should decrement colspans', () => {
      const { editorView } = editor(
        doc(
          table({})(
            tr(td({ colspan: 3 })(p('')), tdEmpty, tdEmpty),
            tr(
              td({})(p('{<cell}')),
              tdEmpty,
              tdEmpty,
              td({})(p('{cell>}')),
              tdEmpty,
            ),
          ),
        ),
      );
      mergeCells(editorView.state, editorView.dispatch);

      expect(editorView.state.doc).toEqualDocument(
        doc(
          table({})(
            tr(tdEmpty, tdEmpty, tdEmpty),
            tr(td({ colspan: 2 })(p('')), tdEmpty),
          ),
        ),
      );
    });
  });
});
