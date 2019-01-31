import { ProviderFactory } from '@atlaskit/editor-common';
import {
  doc,
  insertText,
  createEditorFactory,
  p,
  panel,
  sleep,
  sendKeyToPm,
} from '@atlaskit/editor-test-helpers';
import { pluginKey as quickInsertPluginKey } from '../../../../plugins/quick-insert';

describe('Quick Insert', () => {
  const createEditor = createEditorFactory();

  const editor = (doc: any, providerFactory?: any) =>
    createEditor({
      doc,
      pluginKey: quickInsertPluginKey,
      providerFactory,
      editorProps: {
        quickInsert: true,
        allowPanel: true,
        allowCodeBlocks: true,
      },
    });

  it('should be able to select a quick insert items using type ahead', async () => {
    const { editorView, sel } = editor(doc(p('{<>}')));
    insertText(editorView, '/Panel', sel);
    await sleep(50);
    sendKeyToPm(editorView, 'Enter');
    expect(editorView.state.doc).toEqualDocument(
      doc(panel({ panelType: 'info' })(p())),
    );
  });

  it('should support custom items through the QuickInsert provider', async () => {
    const provider = Promise.resolve({
      getItems() {
        return Promise.resolve([
          {
            title: 'Custom item',
            action(insert) {
              return insert('custom item');
            },
          },
        ]);
      },
    });
    const providerFactory = new ProviderFactory();
    const { editorView, sel } = editor(doc(p('{<>}')), providerFactory);
    providerFactory.setProvider('quickInsertProvider', provider);
    insertText(editorView, '/Custom', sel);
    await sleep(50);
    sendKeyToPm(editorView, 'Enter');
    expect(editorView.state.doc).toEqualDocument(doc(p('custom item')));
  });

  it('should fallback to default items if QuickInsert provider rejects', async () => {
    const provider = Promise.resolve({
      getItems: () => Promise.reject('Error'),
    });
    const providerFactory = new ProviderFactory();
    const { editorView, sel } = editor(doc(p('{<>}')), providerFactory);
    providerFactory.setProvider('quickInsertProvider', provider);
    insertText(editorView, '/Panel', sel);
    await sleep(50);
    sendKeyToPm(editorView, 'Enter');
    expect(editorView.state.doc).toEqualDocument(
      doc(panel({ panelType: 'info' })(p())),
    );
  });
});
