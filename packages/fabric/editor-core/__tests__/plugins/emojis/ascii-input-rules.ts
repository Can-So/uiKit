import { ProviderFactory } from '@atlaskit/editor-common';
import { EmojiDescription } from '@atlaskit/emoji';
import asciiEmojiPlugins from '../../../src/plugins/emojis/ascii-input-rules';
import {
  insertText,
  makeEditor,
  doc,
  p,
  text,
  code,
  code_block,
  hardBreak,
  emojiQuery,
} from '@atlaskit/editor-test-helpers';
import { defaultSchema } from '@atlaskit/editor-test-helpers';
import { testData as emojiTestData } from '@atlaskit/emoji/dist/es5/support';

const emojiProvider = emojiTestData.getEmojiResourcePromise();
const providerFactory = ProviderFactory.create({ emojiProvider });

const plugins = asciiEmojiPlugins(defaultSchema, providerFactory);

describe('ascii emojis - input rules', () => {
  const editor = (doc: any) =>
    makeEditor({
      doc,
      plugins,
    });

  const smileyEmoji = emojiNode({
    id: '1f603',
    shortName: ':smiley:',
    text: '😃',
  });
  const thumbsupEmoji = emojiNode({
    id: '1f44d',
    shortName: ':thumbsup:',
    text: '👍',
  });
  const sweatSmileEmoji = emojiNode({
    id: '1f605',
    shortName: ':sweat_smile:',
    text: '😅',
  });

  const assert = (
    what: string,
    docContents: any,
    expectation: (state) => void,
  ) => {
    return emojiProvider.then(() => {
      const { editorView, sel } = editor(doc(docContents));
      insertText(editorView, what, sel);

      const { state } = editorView;
      expectation(state);
      editorView.destroy();
    });
  };

  describe('when an emoticon is preceded by a space character', () => {
    describe('and starting with a colon character', () => {
      it('should replace a matching emoticon when followed by a space', () => {
        return assert('text :D ', p('{<>}'), state => {
          expect(state.doc.content.child(0)).toEqualDocument(
            p(textNode('text '), smileyEmoji, textNode(' ')),
          );
        });
      });

      it('should not replace a matching emoticon if not followed by a space', () => {
        return assert('text :D', p('{<>}'), state => {
          expect(state.doc.content.child(0)).toEqualDocument(p('text :D'));
        });
      });
    });

    describe('and not starting with a colon character', () => {
      it('should replace a matching emoticon', () => {
        return assert('text (y)', p('{<>}'), state => {
          expect(state.doc.content.child(0)).toEqualDocument(
            p(textNode('text '), thumbsupEmoji),
          );
        });
      });

      it('should replace a matching emoticon even when containing a colon', () => {
        return assert(`text ':D`, p('{<>}'), state => {
          const emoji = emojiNode({
            id: '1f605',
            shortName: ':sweat_smile:',
            text: '😅',
          });
          expect(state.doc.content.child(0)).toEqualDocument(
            p(textNode('text '), emoji),
          );
        });
      });
    });

    describe('in unsupported content', () => {
      it('should not replace a matching emoticon in an unsupported node', () => {
        return assert('text :D ', code_block()('{<>}'), state => {
          expect(state.doc.content.child(0)).toEqualDocument(
            code_block()('text :D '),
          );
        });
      });

      it('should not replace an emoticon in an unsupported mark', () => {
        return assert(' :D ', p(code('code{<>}')), state => {
          expect(state.doc.content.child(0)).toEqualDocument(
            p(code('code :D ')),
          );
        });
      });
    });
  });

  describe('when preceded by a tab character', () => {
    it('should replace a matching emoticon', () => {
      return assert('\t(y)', p('{<>}'), state => {
        expect(state.doc.content.child(0)).toEqualDocument(
          p(textNode('\t'), thumbsupEmoji),
        );
      });
    });
  });

  describe('when starting at the beginning of a line', () => {
    describe('and starting with a colon character', () => {
      it('should replace a matching emoticon if followed by a space', () => {
        return assert(':D ', p('{<>}'), state => {
          expect(state.doc.content.child(0)).toEqualDocument(
            p(smileyEmoji, textNode(' ')),
          );
        });
      });

      it('should not replace a matching emoticon if not followed by a space', () => {
        return assert(':D', p('{<>}'), state => {
          expect(state.doc.content.child(0)).toEqualDocument(p(':D'));
        });
      });
    });

    describe('and not starting with a colon character', () => {
      it('should replace a matching emoticon', () => {
        return assert('(y)', p('{<>}'), state => {
          expect(state.doc.content.child(0)).toEqualDocument(p(thumbsupEmoji));
        });
      });
    });
  });

  describe('when preceded by a hard break', () => {
    it('should replace a matching emoticon', () => {
      return assert('(y)', p(hardBreak(), '{<>}'), state => {
        expect(state.doc.content.child(0)).toEqualDocument(
          p(hardBreak(), thumbsupEmoji),
        );
      });
    });
  });

  describe('when preceded by another emoji', () => {
    it('should replace a matching emoticon starting with a colon', () => {
      return assert(':D ', p(thumbsupEmoji, '{<>}'), state => {
        expect(state.doc.content.child(0)).toEqualDocument(
          p(thumbsupEmoji, smileyEmoji, textNode(' ')),
        );
      });
    });

    it('should replace a matching emoticon not starting with a colon', () => {
      return assert('(y)', p(smileyEmoji, '{<>}'), state => {
        expect(state.doc.content.child(0)).toEqualDocument(
          p(smileyEmoji, thumbsupEmoji),
        );
      });
    });
  });

  describe('when preceded by an opening round bracket', () => {
    it('should replace a matching emoticon starting with a colon', () => {
      return assert(':D ', p('({<>}'), state => {
        expect(state.doc.content.child(0)).toEqualDocument(
          p(textNode('('), smileyEmoji, textNode(' ')),
        );
      });
    });

    it('should replace the thumbsup emoticon', () => {
      return assert('(y)', p('({<>}'), state => {
        expect(state.doc.content.child(0)).toEqualDocument(
          p(textNode('('), thumbsupEmoji),
        );
      });
    });

    it('should replace a matching emoticon ending with a closing rounded bracket', () => {
      return assert("'=)", p('({<>}'), state => {
        expect(state.doc.content.child(0)).toEqualDocument(
          p(textNode('('), sweatSmileEmoji),
        );
      });
    });
  });

  describe('when preceded by non-whitespace character', () => {
    it('should not replace a matching emoticon starting with a colon', () => {
      return assert('text:D ', p('{<>}'), state => {
        expect(state.doc.content.child(0)).toEqualDocument(p('text:D '));
      });
    });

    it('should not replace a matching emoticon not starting with a colon', () => {
      return assert('text(y)', p('{<>}'), state => {
        expect(state.doc.content.child(0)).toEqualDocument(p('text(y)'));
      });
    });
  });

  describe('when there is already an emojiQuery mark', () => {
    it('it should replace a matching emoticon starting with a colon', () => {
      return assert(' ', p(emojiQuery(':D{<>}')), state => {
        expect(state.doc.content.child(0)).toEqualDocument(
          p(smileyEmoji, textNode(' ')),
        );
      });
    });
  });

  describe('recording emoji usage', () => {
    beforeEach(() => {
      return emojiProvider.then(provider => {
        provider.recordedSelections = [];
      });
    });

    afterEach(() => {
      return emojiProvider.then(provider => {
        provider.recordedSelections = [];
      });
    });

    it('it should record usage when an emoticon is matched', () => {
      return emojiProvider.then(resource => {
        const { editorView, sel } = editor(doc(p('{<>}')));
        insertText(editorView, ':D ', sel);

        const selections: EmojiDescription[] = resource.recordedSelections;
        expect(selections.length).toBe(1);
        expect(selections[0].shortName).toEqual(smileyEmoji.attrs.shortName);
        editorView.destroy();
      });
    });
  });

  function emojiNode(attrs: {}) {
    return defaultSchema.nodes.emoji.create(attrs);
  }

  function textNode(value: string) {
    return text(value, defaultSchema);
  }
});
