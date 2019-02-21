import { findTable } from 'prosemirror-utils';
import {
  doc,
  p,
  createEditorFactory,
  table,
  tr,
  th,
  tdEmpty,
  tdCursor,
  thEmpty,
} from '@atlaskit/editor-test-helpers';
import { TablePluginState } from '../../../../../plugins/table/types';
import tablesPlugin from '../../../../../plugins/table';
import { pluginKey } from '../../../../../plugins/table/pm-plugins/main';
import { containsHeaderColumn } from '../../../../../plugins/table/utils/nodes';

describe('table merging logic', () => {
  const createEditor = createEditorFactory<TablePluginState>();

  const editor = (doc: any) =>
    createEditor({
      doc,
      editorPlugins: [tablesPlugin()],
      pluginKey,
    });

  describe('#containsHeaderColumn', () => {
    it('should return true when first col is all tableHeaders', () => {
      const { editorView } = editor(
        doc(
          table()(
            tr(thEmpty, tdCursor, tdEmpty),
            tr(thEmpty, tdEmpty, tdEmpty),
            tr(thEmpty, tdEmpty, tdEmpty),
          ),
        ),
      );

      const TableWithPos = findTable(editorView.state.selection)!;
      expect(containsHeaderColumn(editorView.state, TableWithPos.node)).toEqual(
        true,
      );
    });

    it('should return true when first col has a rowspan', () => {
      const { editorView } = editor(
        doc(
          table()(
            tr(thEmpty, tdCursor, tdEmpty),
            tr(th({ rowspan: 2 })(p()), tdEmpty, tdEmpty),
            tr(tdEmpty, tdEmpty),
          ),
        ),
      );

      const TableWithPos = findTable(editorView.state.selection)!;
      expect(containsHeaderColumn(editorView.state, TableWithPos.node)).toEqual(
        true,
      );
    });
  });
});
