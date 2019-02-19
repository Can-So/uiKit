import {
  doc,
  p,
  blockquote,
  mediaSingle,
  code_block,
  sendKeyToPm,
} from '@atlaskit/editor-test-helpers';

import codeBlockPlugin from '../../../../plugins/code-block';
import { temporaryMedia, mediaEditor } from './_utils';

describe('mediaSingle - keymap', () => {
  it('should remove the empty paragraph on backspace', () => {
    const { editorView } = mediaEditor(
      doc(
        p(''),
        mediaSingle({ layout: 'wrap-right' })(temporaryMedia),
        p('{<>}Hello World!'),
      ),
    );

    sendKeyToPm(editorView, 'Backspace');

    expect(editorView.state.doc).toEqualDocument(
      doc(
        mediaSingle({ layout: 'wrap-right' })(temporaryMedia),
        p('Hello World!'),
      ),
    );
  });

  it('should remove the empty blockquote on backspace', () => {
    const { editorView } = mediaEditor(
      doc(
        blockquote(p('')),
        mediaSingle({ layout: 'wrap-right' })(temporaryMedia),
        p('{<>}Hello World!'),
      ),
    );

    sendKeyToPm(editorView, 'Backspace');

    expect(editorView.state.doc).toEqualDocument(
      doc(
        mediaSingle({ layout: 'wrap-right' })(temporaryMedia),
        p('Hello World!'),
      ),
    );
  });

  it('should remove the empty codeBlock on backspace', () => {
    const { editorView } = mediaEditor(
      doc(
        code_block({})(''),
        mediaSingle({ layout: 'wrap-right' })(temporaryMedia),
        p('{<>}Hello World!'),
      ),
      [codeBlockPlugin()],
    );

    sendKeyToPm(editorView, 'Backspace');

    expect(editorView.state.doc).toEqualDocument(
      doc(
        mediaSingle({ layout: 'wrap-right' })(temporaryMedia),
        p('Hello World!'),
      ),
    );
  });

  it('should not remove anything on backspace if the paragraph before is not empty', () => {
    const { editorView } = mediaEditor(
      doc(
        p('Hey!'),
        mediaSingle({ layout: 'wrap-right' })(temporaryMedia),
        p('{<>}Hello World!'),
      ),
    );

    sendKeyToPm(editorView, 'Backspace');

    expect(editorView.state.doc).toEqualDocument(
      doc(
        p('Hey!'),
        mediaSingle({ layout: 'wrap-right' })(temporaryMedia),
        p('Hello World!'),
      ),
    );
  });

  it('should not remove the first empty paragraph on backspace if the selection is not empty', () => {
    const { editorView } = mediaEditor(
      doc(
        p(''),
        mediaSingle({ layout: 'wrap-right' })(temporaryMedia),
        p('{<}Hello World!{>}'),
      ),
    );

    sendKeyToPm(editorView, 'Backspace');

    expect(editorView.state.doc).toEqualDocument(
      doc(p(''), mediaSingle({ layout: 'wrap-right' })(temporaryMedia), p('')),
    );
  });

  it('should not remove the first empty paragraph on backspace if mediaSingle is not wrap-right', () => {
    const { editorView } = mediaEditor(
      doc(
        p(''),
        mediaSingle({ layout: 'center' })(temporaryMedia),
        p('{<>}Hello World!'),
      ),
    );

    sendKeyToPm(editorView, 'Backspace');

    expect(editorView.state.doc).toEqualDocument(
      doc(
        p(''),
        mediaSingle({ layout: 'center' })(temporaryMedia),
        p('Hello World!'),
      ),
    );
  });
});
