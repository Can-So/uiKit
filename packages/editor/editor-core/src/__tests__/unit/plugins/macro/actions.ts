import {
  createEditorFactory,
  doc,
  p,
  bodiedExtension,
  extension,
} from '@atlaskit/editor-test-helpers';
import {
  insertMacroFromMacroBrowser,
  MacroProvider,
  MacroAttributes,
} from '../../../../plugins/macro';
import { extensionPlugin, macroPlugin } from '../../../../plugins';

const macroProvider: MacroProvider = {
  config: {},
  openMacroBrowser: node => {
    const attrs: MacroAttributes = {
      type: 'extension',
      attrs: {
        extensionKey: 'com.fake',
        extensionType: 'com.fake',
        layout: 'full-width',
      },
    };

    return Promise.resolve(attrs);
  },
  autoConvert: () => null,
};

describe('macro plugin -> commands -> insert macro from provider', () => {
  const createEditor = createEditorFactory();

  it('should normalise a nodes layout if nested inside another node', async () => {
    const { editorView } = createEditor({
      doc: doc(
        bodiedExtension({
          extensionKey: 'fake.extension',
          extensionType: 'atlassian.com.editor',
        })(p('{<>}')),
      ),
      editorPlugins: [macroPlugin, extensionPlugin],
    });

    const macroNode = editorView.state.schema.nodes.bodiedExtension.createChecked(
      {
        layout: 'full-width',
        extensionKey: 'com.fake',
        extensionType: 'com.fake',
      },
      editorView.state.schema.nodes.paragraph.createChecked(),
    );

    await insertMacroFromMacroBrowser(macroProvider, macroNode)(
      editorView.state,
      editorView.dispatch,
    );

    expect(editorView.state.doc).toEqualDocument(
      doc(
        bodiedExtension({
          extensionKey: 'fake.extension',
          extensionType: 'atlassian.com.editor',
        })(
          extension({
            extensionKey: 'com.fake',
            extensionType: 'com.fake',
            layout: 'default',
          })(),
        ),
      ),
    );
  });
});
