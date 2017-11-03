import * as chai from 'chai';
import { expect } from 'chai';
import { EmojiDescription } from '@atlaskit/emoji';
import asciiEmojiPlugins from '../../../../src/plugins/emojis/ascii-input-rules';
import ProviderFactory from '../../../../src/providerFactory';
import {
  chaiPlugin,
  insertText,
  makeEditor,
  doc,
  p,
  text,
  code,
  code_block,
  hardBreak,
  emojiQuery,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { testData as emojiTestData } from '@atlaskit/emoji/dist/es5/support';

const providerFactory = new ProviderFactory();
const emojiProvider = emojiTestData.getEmojiResourcePromise();
providerFactory.setProvider('emojiProvider', emojiProvider);

const plugins = asciiEmojiPlugins(defaultSchema, providerFactory);

chai.use(chaiPlugin);

describe('ascii emojis - input rules', () => {
  const editor = (doc: any) => makeEditor({
    doc,
    plugins,
  });

  const smileyEmoji = emojiNode({
    id: '1f603',
    shortName: ':smiley:',
    text: '😃'
  });
  const thumbsupEmoji = emojiNode({
    id: '1f44d',
    shortName: ':thumbsup:',
    text: '👍'
  });
  const sweatSmileEmoji = emojiNode({
    id: '1f605',
    shortName: ':sweat_smile:',
    text: '😅'
  });

  const assert = (what: string, docContents: any, expectation: (state) => void) => {
    return emojiProvider.then(() => {
      const { editorView, sel } = editor(doc(docContents));
      insertText(editorView, what, sel);

      const { state } = editorView;
      expectation(state);
      editorView.destroy();
    });
  };

  context('when an emoticon is preceded by a space character', () => {
    context('and starting with a colon character', () => {
      it('should replace a matching emoticon when followed by a space', () => {
        return assert('text :D ', p('{<>}'), (state) => {
          expect(state.doc.content.child(0)).to.deep.equal(p(textNode('text '), smileyEmoji, textNode(' ')));
        });
      });

      it('should not replace a matching emoticon if not followed by a space', () => {
        return assert('text :D', p('{<>}'), (state) => {
          expect(state.doc.content.child(0)).to.deep.equal(p('text :D'));
        });
      });
    });

    context('and not starting with a colon character', () => {
      it('should replace a matching emoticon', () => {
        return assert('text (y)', p('{<>}'), (state) => {
          expect(state.doc.content.child(0)).to.deep.equal(p(textNode('text '), thumbsupEmoji));
        });
      });

      it('should replace a matching emoticon even when containing a colon', () => {
        return assert(`text ':D`, p('{<>}'), (state) => {
          const emoji = emojiNode({
            id: '1f605',
            shortName: ':sweat_smile:',
            text: '😅'
          });
          expect(state.doc.content.child(0)).to.deep.equal(p(textNode('text '), emoji));
        });
      });
    });

    context('in unsupported content', () => {
      it('should not replace a matching emoticon in an unsupported node', () => {
        return assert('text :D ', code_block()('{<>}'), (state) => {
          expect(state.doc.content.child(0)).to.deep.equal(code_block()('text :D '));
        });
      });

      it('should not replace an emoticon in an unsupported mark', () => {
        return assert(' :D ', p(code('code{<>}')), (state) => {
          expect(state.doc.content.child(0)).to.deep.equal(p(code('code :D ')));
        });
      });
    });
  });

  context('when preceded by a tab character', () => {
    it('should replace a matching emoticon', () => {
      return assert('\t(y)', p('{<>}'), (state) => {
        expect(state.doc.content.child(0)).to.deep.equal(p(textNode('\t'), thumbsupEmoji));
      });
    });
  });

  context('when starting at the beginning of a line', () =>  {
    context('and starting with a colon character', () => {
      it('should replace a matching emoticon if followed by a space', () => {
        return assert(':D ', p('{<>}'), (state) => {
          expect(state.doc.content.child(0)).to.deep.equal(p(smileyEmoji, textNode(' ')));
        });
      });

      it('should not replace a matching emoticon if not followed by a space', () => {
        return assert(':D', p('{<>}'), (state) => {
          expect(state.doc.content.child(0)).to.deep.equal(p(':D'));
        });
      });
    });

    context('and not starting with a colon character', () => {
      it('should replace a matching emoticon', () => {
        return assert('(y)', p('{<>}'), (state) => {
          expect(state.doc.content.child(0)).to.deep.equal(p(thumbsupEmoji));
        });
      });
    });
  });

  context('when preceded by a hard break', () => {
    it('should replace a matching emoticon', () => {
      return assert('(y)', p(hardBreak(), '{<>}'), (state) => {
        expect(state.doc.content.child(0)).to.deep.equal(p(hardBreak(), thumbsupEmoji));
      });
    });
  });

  context('when preceded by another emoji', () => {
    it('should replace a matching emoticon starting with a colon', () => {
      return assert(':D ', p(thumbsupEmoji, '{<>}'), (state) => {
        expect(state.doc.content.child(0)).to.deep.equal(p(thumbsupEmoji, smileyEmoji, textNode(' ')));
      });
    });

    it('should replace a matching emoticon not starting with a colon', () => {
      return assert('(y)', p(smileyEmoji, '{<>}'), (state) => {
        expect(state.doc.content.child(0)).to.deep.equal(p(smileyEmoji, thumbsupEmoji));
      });
    });
  });

  context('when preceded by an opening round bracket', () => {
    it('should replace a matching emoticon starting with a colon', () => {
      return assert(':D ', p('({<>}'), (state) => {
        expect(state.doc.content.child(0)).to.deep.equal(p(textNode('('), smileyEmoji, textNode(' ')));
      });
    });

    it('should replace the thumbsup emoticon', () => {
      return assert('(y)', p('({<>}'), (state) => {
        expect(state.doc.content.child(0)).to.deep.equal(p(textNode('('), thumbsupEmoji));
      });
    });

    it('should replace a matching emoticon ending with a closing rounded bracket', () => {
      return assert('\'=)', p('({<>}'), (state) => {
        expect(state.doc.content.child(0)).to.deep.equal(p(textNode('('), sweatSmileEmoji));
      });
    });
  });

  context('when preceded by non-whitespace character', () => {
    it('should not replace a matching emoticon starting with a colon', () => {
      return assert('text:D ', p('{<>}'), (state) => {
        expect(state.doc.content.child(0)).to.deep.equal(p('text:D '));
      });
    });

    it('should not replace a matching emoticon not starting with a colon', () => {
      return assert('text(y)', p('{<>}'), (state) => {
        expect(state.doc.content.child(0)).to.deep.equal(p('text(y)'));
      });
    });
  });

  context('when there is already an emojiQuery mark', () => {
    it('it should replace a matching emoticon starting with a colon', () => {
      return assert(' ', p(emojiQuery(':D{<>}')), (state) => {
        expect(state.doc.content.child(0)).to.deep.equal(p(smileyEmoji, textNode(' ')));
      });
    });
  });

  context('recording emoji usage', () => {
    beforeEach(() => {
      return emojiProvider.then((provider) => {
        provider.recordedSelections = [];
      });
    });

    afterEach(() => {
      return emojiProvider.then((provider) => {
        provider.recordedSelections = [];
      });
    });

    it('it should record usage when an emoticon is matched', () => {
      return emojiProvider.then((resource) => {
        const { editorView, sel } = editor(doc(p('{<>}')));
        insertText(editorView, ':D ', sel);

        const selections: EmojiDescription[] = resource.recordedSelections;
        expect(selections).to.have.lengthOf(1);
        expect(selections[0].shortName).to.equal(smileyEmoji.attrs.shortName);
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
