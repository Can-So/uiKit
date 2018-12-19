import { name } from '../../../../package.json';

import { ProviderFactory } from '@atlaskit/editor-common';
import {
  createEditor,
  doc,
  emojiQuery,
  p,
  typeAheadQuery,
} from '@atlaskit/editor-test-helpers';
import { mention as mentionData } from '@atlaskit/util-data-test';

import emojiPlugin from '../../../plugins/emoji';
import { emojiPluginKey } from '../../../plugins/emoji/pm-plugins/main';
import {
  pluginKey as typeAheadPluginKey,
  PluginState as TypeAheadPluginState,
} from '../../../plugins/type-ahead/pm-plugins/main';

import { checkEditorState } from '../../../utils/action';

describe(name, () => {
  describe('Utils -> Action', () => {
    function createEditorWith(
      opts: {
        editorProps?: any;
        editorPlugins?: any[];
        pluginKey?: any;
        providerFactory?: ProviderFactory;
      } = {},
    ) {
      return (doc: any) =>
        createEditor({
          doc,
          editorProps: opts.editorProps,
          editorPlugins: opts.editorPlugins,
          pluginKey: opts.pluginKey,
          providerFactory: opts.providerFactory,
        });
    }

    function forceUpdate(editorView: any) {
      editorView.updateState(editorView.state);
    }

    describe('checkEditorState()', () => {
      it('should dismiss emoji query if active', async () => {
        const { editorView, pluginState } = createEditorWith({
          editorPlugins: [emojiPlugin],
          pluginKey: emojiPluginKey,
        })(doc(p(emojiQuery(':grin{<>}'))));

        const spy = jest.spyOn(pluginState, 'dismiss');
        pluginState.emojiProvider = true;

        forceUpdate(editorView); // Force update to ensure active query.
        checkEditorState(editorView);

        expect(spy).toHaveBeenCalled();
        expect(pluginState.queryActive).toBeFalsy();
        expect(editorView.state.doc).toEqualDocument(doc(p(':grin{<>}')));

        editorView.destroy();
      });

      it('should dismiss mention query if active', () => {
        const mentionProvider = new Promise<any>(resolve =>
          resolve(mentionData.storyData.resourceProvider),
        );

        // editor created with default plugins list
        const { editorView, pluginState } = createEditorWith({
          editorProps: { mentionProvider },
          pluginKey: typeAheadPluginKey,
        })(doc(p(typeAheadQuery({ trigger: '@' })('@a{<>}'))));

        expect(pluginState.active).toBeTruthy();
        const spy = jest.spyOn(pluginState.typeAheadHandler, 'dismiss');

        checkEditorState(editorView);

        const newPluginState = typeAheadPluginKey.getState(
          editorView.state,
        ) as TypeAheadPluginState;

        expect(spy).toHaveBeenCalled();
        expect(newPluginState.active).toBeFalsy();
        expect(newPluginState.prevActiveState).toBeTruthy();
        expect(editorView.state.doc).toEqualDocument(doc(p('@a{<>}')));

        editorView.destroy();
      });

      it('should dismiss quickInsert if active', () => {
        // editor created with default plugins list
        const { editorView, pluginState } = createEditorWith({
          editorProps: {
            quickInsert: true,
          },
          pluginKey: typeAheadPluginKey,
        })(doc(p(typeAheadQuery({ trigger: '/' })('/a{<>}'))));

        expect(pluginState.active).toBeTruthy();

        checkEditorState(editorView);

        const newPluginState = typeAheadPluginKey.getState(
          editorView.state,
        ) as TypeAheadPluginState;

        expect(newPluginState.active).toBeFalsy();
        expect(newPluginState.prevActiveState).toBeTruthy();
        expect(editorView.state.doc).toEqualDocument(doc(p('/a{<>}')));

        editorView.destroy();
      });
    });
  });
});
