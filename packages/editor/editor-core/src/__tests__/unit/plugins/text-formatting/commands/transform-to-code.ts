import { ProviderFactory } from '@atlaskit/editor-common';
import {
  doc,
  p,
  code,
  mention,
  emoji,
  createEditor,
} from '@atlaskit/editor-test-helpers';
import {
  TextFormattingState,
  pluginKey as textFormattingPluginKey,
} from '../../../../../plugins/text-formatting/pm-plugins/main';
import { transformToCodeAction } from '../../../../../plugins/text-formatting/commands/transform-to-code';

describe('transform-to-code', () => {
  const editor = (doc: any) =>
    createEditor<TextFormattingState>({
      doc,
      editorProps: {
        analyticsHandler: jest.fn(),
        allowCodeBlocks: true,
        mentionProvider: new Promise(() => {}),
        emojiProvider: new Promise(() => {}),
      },
      pluginKey: textFormattingPluginKey,
      providerFactory: ProviderFactory.create({
        emojiProvider: new Promise(() => {}),
      }),
    });

  const thumbsupEmoji = emoji({
    id: '1f44d',
    shortName: ':thumbsup:',
    text: '👍',
  });

  it('should transform a range of text in a code block', () => {
    const { editorView, refs } = editor(doc(p('hey {from}-code-{to} joe')));
    const { state } = editorView;

    const transformToCodeTransaction = transformToCodeAction(
      refs.from,
      refs.to,
      state.tr,
    );

    expect(state.doc).toEqualDocument(doc(p('hey -code- joe')));

    const newState = state.apply(transformToCodeTransaction);

    expect(newState.doc).toEqualDocument(
      doc(p('hey ', code('-code-'), ' joe')),
    );
  });

  describe('when there is ASCII on inline code block', () => {
    it('should replace ascii chars to plain-text chars', () => {
      const { editorView, refs } = editor(doc(p('{from}… → ← – “ ” ‘ ’{to}')));

      const transformToCodeTransaction = transformToCodeAction(
        refs.from,
        refs.to,
        editorView.state.tr,
      );
      const newState = editorView.state.apply(transformToCodeTransaction);

      expect(newState.doc).toEqualDocument(
        doc(p(code('... -> <- -- " " \' \''))),
      );
    });

    it('should keep emojis in ASCII formats', () => {
      const { editorView, refs } = editor(
        doc(p('{from}', thumbsupEmoji(), '{to}')),
      );

      const transformToCodeTransaction = transformToCodeAction(
        refs.from,
        refs.to,
        editorView.state.tr,
      );
      const newState = editorView.state.apply(transformToCodeTransaction);

      expect(newState.doc).toEqualDocument(doc(p(code('👍'))));
    });

    it('should keep mentions in ASCII formats', () => {
      const helgaMention = mention({ id: '1234', text: '@helga' });
      const { editorView, refs } = editor(
        doc(p('{from}', helgaMention(), '{to}')),
      );

      const transformToCodeTransaction = transformToCodeAction(
        refs.from,
        refs.to,
        editorView.state.tr,
      );
      const newState = editorView.state.apply(transformToCodeTransaction);

      expect(newState.doc).toEqualDocument(doc(p(code('@helga'))));
    });
  });
});
