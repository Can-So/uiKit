import {
  doc,
  p,
  createEditorFactory,
  table,
  tr,
  td,
  th,
} from '@atlaskit/editor-test-helpers';
import { removeColumnAt } from 'prosemirror-utils';
import {
  TablePluginState,
  PluginConfig,
} from '../../../../plugins/table/types';

import { pluginKey as tablePluginKey } from '../../../../plugins/table/pm-plugins/main';
import { pluginKey as tableResizePluginKey } from '../../../../plugins/table/pm-plugins/table-resizing/plugin';
import tablesPlugin from '../../../../plugins/table';

describe('Tables with Collab editing', () => {
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

  it('applies colwidths to cells and sets autosize to false', () => {
    const { editorView: view } = editor(
      doc(
        table()(
          tr(th()(p('{<>}1')), th()(p('2')), th()(p('3'))),
          tr(td()(p('4')), td()(p('5')), td()(p('6'))),
          tr(td()(p('7')), td()(p('8')), td()(p('9'))),
        ),
      ),
    );

    // Trigger table resizing mouse down handlers.
    view.dispatch(
      view.state.tr.setMeta(tableResizePluginKey, { setHandle: 2 }),
    );
    const mousedownEvent = new MouseEvent('mousedown', { clientX: 50 });
    view.dom.dispatchEvent(mousedownEvent);

    // Simulate collab change, delete col.
    const documentChangeTr = removeColumnAt(1)(view.state.tr);
    view.updateState(view.state.apply(documentChangeTr));

    // Trigger table resizing finish handlers
    const mouseupEvent = new MouseEvent('mouseup', { clientX: 150 });
    window.dispatchEvent(mouseupEvent);

    expect(view.state.doc).toEqualDocument(
      doc(
        table()(
          tr(th()(p('1')), th()(p('3'))),
          tr(td()(p('4')), td()(p('6'))),
          tr(td()(p('7')), td()(p('9'))),
        ),
      ),
    );
  });
});
