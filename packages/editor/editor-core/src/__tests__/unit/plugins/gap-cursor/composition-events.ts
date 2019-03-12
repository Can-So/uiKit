import { doc, createEditorFactory, p } from '@atlaskit/editor-test-helpers';
import { EditorView } from 'prosemirror-view';

import { setGapCursorSelection } from '../../../../utils';
import gapCursorPlugin, { Side } from '../../../../plugins/gap-cursor';
import { pluginKey } from '../../../../plugins/gap-cursor/pm-plugins/main';
import codeBlockPlugin from '../../../../plugins/code-block';
import rulePlugin from '../../../../plugins/rule';
import panelPlugin from '../../../../plugins/panel';
import tasksAndDecisionsPlugin from '../../../../plugins/tasks-and-decisions';
import tablesPlugin from '../../../../plugins/table';
import extensionPlugin from '../../../../plugins/extension';
import mediaPlugin from '../../../../plugins/media';

import {
  blockNodes,
  leafBlockNodes,
  BlockNodesKeys,
  LeafBlockNodesKeys,
} from './_utils';

const deleteContentBackward = (view: EditorView) => {
  view.dom.dispatchEvent(
    new (window as any).InputEvent('beforeinput', {
      isComposing: false,
      inputType: 'deleteContentBackward',
    }),
  );
};

describe('gap-cursor: composition events', () => {
  const createEditor = createEditorFactory();

  const editor = (doc: any, trackEvent?: () => {}) =>
    createEditor({
      doc,
      editorPlugins: [
        gapCursorPlugin,
        mediaPlugin({ allowMediaSingle: true }),
        extensionPlugin,
        tablesPlugin(),
        tasksAndDecisionsPlugin,
        codeBlockPlugin(),
        rulePlugin,
        panelPlugin,
      ],
      editorProps: {
        analyticsHandler: trackEvent,
      },
      pluginKey,
    });

  describe('when cursor is after a block node', () => {
    describe(`when pressing Backspace`, () => {
      (Object.keys(blockNodes) as BlockNodesKeys).forEach(nodeName => {
        describe(nodeName, () => {
          it(`should delete the ${nodeName}`, () => {
            const { editorView, refs } = editor(
              doc((blockNodes[nodeName] as any)(), '{pos}'),
            );
            setGapCursorSelection(editorView, refs.pos, Side.RIGHT);
            deleteContentBackward(editorView);

            expect(editorView.state.doc).toEqualDocument(doc(p('')));
          });
        });
      });

      (Object.keys(leafBlockNodes) as LeafBlockNodesKeys).forEach(nodeName => {
        describe(nodeName, () => {
          it(`should delete the ${nodeName}`, () => {
            const { editorView, refs } = editor(
              doc(leafBlockNodes[nodeName], '{pos}'),
            );
            setGapCursorSelection(editorView, refs.pos, Side.RIGHT);
            deleteContentBackward(editorView);

            expect(editorView.state.doc).toEqualDocument(doc(p('')));
          });
        });
      });
    });
  });
});
