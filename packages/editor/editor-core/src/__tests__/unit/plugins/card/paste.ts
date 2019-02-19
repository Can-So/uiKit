import { pluginKey } from '../../../../plugins/card/pm-plugins/main';
import cardPlugin from '../../../../plugins/card';
import { setProvider } from '../../../../plugins/card/pm-plugins/actions';

import {
  doc,
  createEditorFactory,
  p,
  dispatchPasteEvent,
  EditorTestCardProvider,
} from '@atlaskit/editor-test-helpers';

describe('card', () => {
  const createEditor = createEditorFactory();

  const editor = (doc: any) => {
    return createEditor({
      doc,
      editorPlugins: [cardPlugin],
      pluginKey,
    });
  };

  describe('paste', () => {
    describe('pasting plain text url', () => {
      it('should queue a card with spaces', () => {
        const text =
          'https://www.atlassian.com/s/7xr7xdqto7trhvr/Media%20picker.sketch?dl=0';

        const { editorView } = editor(doc(p('{<>}')));
        const { state, dispatch } = editorView;

        const provider = new EditorTestCardProvider();
        dispatch(setProvider(provider)(state.tr));

        dispatchPasteEvent(editorView, { plain: text });

        expect(pluginKey.getState(editorView.state)).toEqual({
          requests: [
            {
              url:
                'https://www.atlassian.com/s/7xr7xdqto7trhvr/Media%20picker.sketch?dl=0',
              pos: 1,
              appearance: 'inline',
            },
          ],
          provider,
        });
      });
    });
  });
});
