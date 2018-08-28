import * as sinon from 'sinon';
import { defaultSchema } from '@atlaskit/editor-common';
import {
  doc,
  p,
  table,
  tr,
  tdEmpty,
  tdCursor,
  createEditor,
} from '@atlaskit/editor-test-helpers';
import tablesPlugin from '../../../../plugins/table';
import codeBlockPlugin from '../../../../plugins/code-block';
import { mediaPlugin } from '../../../../plugins';
import listPlugin from '../../../../plugins/lists';
import TableView from '../../../../plugins/table/nodeviews/table';
import { pluginKey } from '../../../../plugins/table/pm-plugins/main';
import {
  TablePluginState,
  PluginConfig,
} from '../../../../plugins/table/types';

describe('TableView', () => {
  const editor = (doc: any, trackEvent = () => {}) => {
    const tableOptions = {
      allowNumberColumn: true,
      allowHeaderRow: true,
      allowHeaderColumn: true,
      permittedLayouts: 'all',
    } as PluginConfig;
    return createEditor<TablePluginState>({
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
