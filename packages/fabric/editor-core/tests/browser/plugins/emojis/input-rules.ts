import * as chai from 'chai';
import { expect } from 'chai';
import emojiPlugins, { EmojiState } from '../../../../src/plugins/emojis';
import ProviderFactory from '../../../../src/providerFactory';
import {
  chaiPlugin,
  insertText,
  makeEditor,
  doc,
  p,
  code,
  hardBreak,
  emoji,
  mention,
  code_block,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { testData as emojiTestData } from '@atlaskit/emoji/dist/es5/support';

chai.use(chaiPlugin);

describe('emojis - input rules', () => {
  const providerFactory = new ProviderFactory();
  providerFactory.setProvider('emojiProvider', emojiTestData.getEmojiResourcePromise());
  const editor = (doc: any) => makeEditor<EmojiState>({
    doc,
    plugins: emojiPlugins(defaultSchema, providerFactory),
  });

  const assert = (what: string, expected: boolean, docContents?: any) => {
    const { editorView, pluginState, sel, refs } = editor(doc(docContents || p('{<>}')));
    (pluginState as any).emojiProvider = true;
    insertText(editorView, what, sel || refs['<']);
    const { emojiQuery } = editorView.state.schema.marks;
    const cursorFocus = editorView.state.selection.$to.nodeBefore!;
    expect(!!emojiQuery.isInSet(cursorFocus.marks)).to.equal(expected);
    editorView.destroy();
  };

  after(() => {
    providerFactory.destroy();
  });

  it('should replace a standalone ":" with emoji-query-mark', () => {
    assert('foo :', true);
  });

  it('should not replace a ":" when part of a word', () => {
    assert('foo:', false);
  });

  it('should not replace a ":" after the "`"', () => {
    assert('`:', false);
  });

  it('should replace ":" at the start of the content', () => {
    assert(':', true);
  });

  it('should replace ":" if there are multiple spaces in front of it', () => {
    assert('  :', true);
  });

  it('should replace ":" if there is a hardbreak node in front of it', () => {
    assert(':', true, p(hardBreak(), '{<>}'));
  });

  it('should replace ":" if there is another emoji node in front of it', () => {
    assert(':', true, p(emoji({ shortName: ':smiley:'}), '{<>}'));
  });

  it('should replace ":" if there is a mention node in front of it', () => {
    assert(':', true, p(mention({ id: '1234', text: '@SpongeBob' }), '{<>}'));
  });

  it('should not replace ":" when in an unsupported node', () => {
    assert(':', false, code_block()('{<>}'));
  });

  it('should not replace ": when there is an unsupported stored mark', () => {
    assert(':', false, p(code('{<>}some code')));
  });

  it('should replace non empty selection with emojiQuery mark', () => {
    assert(':', true, p('{<}text{>}'));
  });

  it('should not replace non empty selection with emojiQuery mark if selection starts with an excluding mark', () => {
    assert(':', false, p(code('{<}text{>}')));
  });

  it('should not replace a ":" preceded by a special character', () => {
    assert('>:', false);
  });

  it('should replace a ":" when preceded by an opening round bracket', () => {
    assert('(:', true);
  });
});
