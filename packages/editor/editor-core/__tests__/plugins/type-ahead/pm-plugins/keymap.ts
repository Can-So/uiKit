import {
  createEditor,
  doc,
  p,
  typeAheadQuery,
  sendKeyToPm,
} from '@atlaskit/editor-test-helpers';
import { pluginKey } from '../../../../src/plugins/type-ahead/pm-plugins/main';

const createTypeAheadPlugin = ({
  getItems,
  selectItem,
}: {
  getItems?: Function;
  selectItem?: Function;
} = {}) => {
  return {
    pluginsOptions: {
      typeAhead: {
        trigger: '/',
        getItems:
          getItems !== undefined
            ? getItems
            : () => [{ title: '1' }, { title: '2' }, { title: '3' }],
        selectItem:
          selectItem !== undefined
            ? selectItem
            : (state, item, replaceWith) =>
                replaceWith(state.schema.text(`${item.title} selected`)),
      },
    },
  };
};

describe('typeAhead keymaps', () => {
  it('enter should select current item', () => {
    const plugin = createTypeAheadPlugin();
    const { editorView } = createEditor({
      doc: doc(p(typeAheadQuery({ trigger: '/' })('/item'))),
      editorPlugins: [plugin],
    });
    sendKeyToPm(editorView, 'Enter');
    expect(editorView.state.doc).toEqualDocument(doc(p('1 selected')));
  });

  it('tab should select current item', () => {
    const plugin = createTypeAheadPlugin();
    const { editorView } = createEditor({
      doc: doc(p(typeAheadQuery({ trigger: '/' })('/item'))),
      editorPlugins: [plugin],
    });
    sendKeyToPm(editorView, 'Tab');
    expect(editorView.state.doc).toEqualDocument(doc(p('1 selected')));
  });

  it('up arrow should move selection to a previous item', () => {
    const plugin = createTypeAheadPlugin();
    const { editorView } = createEditor({
      doc: doc(p(typeAheadQuery({ trigger: '/' })('/item'))),
      editorPlugins: [plugin],
    });
    sendKeyToPm(editorView, 'Up');
    const pluginState = pluginKey.getState(editorView.state);
    expect(pluginState.currentIndex).toBe(2);
  });

  it('down arrow should move selection to a next item', () => {
    const plugin = createTypeAheadPlugin();
    const { editorView } = createEditor({
      doc: doc(p(typeAheadQuery({ trigger: '/' })('/item'))),
      editorPlugins: [plugin],
    });
    sendKeyToPm(editorView, 'Down');
    const pluginState = pluginKey.getState(editorView.state);
    expect(pluginState.currentIndex).toBe(1);
  });

  it('esc should dismiss type ahead query', () => {
    const plugin = createTypeAheadPlugin();
    const { editorView } = createEditor({
      doc: doc(p(typeAheadQuery({ trigger: '/' })('/item'))),
      editorPlugins: [plugin],
    });
    sendKeyToPm(editorView, 'Esc');
    expect(editorView.state.doc).toEqualDocument(doc(p('/item')));
  });

  it("space should select item if there's only one available", () => {
    const plugin = createTypeAheadPlugin({ getItems: () => [{ title: 1 }] });
    const { editorView } = createEditor({
      doc: doc(p(typeAheadQuery({ trigger: '/' })('/item'))),
      editorPlugins: [plugin],
    });
    sendKeyToPm(editorView, 'Space');
    expect(editorView.state.doc).toEqualDocument(doc(p('1 selected')));
  });

  it('space should dismiss type ahead query if not items is available', () => {
    const plugin = createTypeAheadPlugin({ getItems: () => [] });
    const { editorView } = createEditor({
      doc: doc(p(typeAheadQuery({ trigger: '/' })('/item'))),
      editorPlugins: [plugin],
    });
    sendKeyToPm(editorView, 'Space');
    expect(editorView.state.doc).toEqualDocument(doc(p('/item')));
  });
});
