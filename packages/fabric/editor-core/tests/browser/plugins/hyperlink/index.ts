import * as chai from 'chai';
import { expect } from 'chai';
import { browser } from '@atlaskit/editor-common';
import {
  HyperlinkState,
  stateKey as hyperlinkStateKey,
} from '../../../../src/plugins/hyperlink';
import {
  img,
  strong,
  chaiPlugin,
  doc,
  insertText,
  a as link,
  createEditor,
  p as paragraph,
  dispatchPasteEvent,
  isMobileBrowser,
  sendKeyToPm,
} from '@atlaskit/editor-test-helpers';
import imageUpload from '../../../../src/editor/plugins/image-upload';

chai.use(chaiPlugin);

describe('hyperlink', () => {
  const editor = (doc: any) =>
    createEditor<HyperlinkState>({
      doc,
      editorPlugins: [imageUpload],
      pluginKey: hyperlinkStateKey,
    });

  if (!browser.ie && !isMobileBrowser()) {
    describe('paste', () => {
      describe('url link is at beginning of plain text', () => {
        it('should add link mark', function() {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, {
              plain: 'http://www.atlassian.com test',
            })
          ) {
            // This environment does not allow mocking paste events
            return this.skip();
          }
          expect(editorView.state.doc).to.deep.equal(
            doc(
              paragraph(
                link({ href: 'http://www.atlassian.com' })(
                  'http://www.atlassian.com',
                ),
                ' test',
              ),
            ),
          );
          editorView.destroy();
        });
      });

      describe('a string which is valid email is present in url', () => {
        it('should not create separate mail link for email', function() {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, {
              plain: 'http://www.atlassian.com/test@atlassian.com',
            })
          ) {
            // This environment does not allow mocking paste events
            return this.skip();
          }
          expect(editorView.state.doc).to.deep.equal(
            doc(
              paragraph(
                link({
                  href: 'http://www.atlassian.com/test@atlassian.com',
                })('http://www.atlassian.com/test@atlassian.com'),
              ),
            ),
          );
          editorView.destroy();
        });
      });

      describe('a string which is valid url is present in another url', () => {
        it('should not create separate mail link for email', function() {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, {
              plain: 'http://www.atlassian.com/www.temp.com',
            })
          ) {
            // This environment does not allow mocking paste events
            return this.skip();
          }
          expect(editorView.state.doc).to.deep.equal(
            doc(
              paragraph(
                link({
                  href: 'http://www.atlassian.com/www.temp.com',
                })('http://www.atlassian.com/www.temp.com'),
              ),
            ),
          );
          editorView.destroy();
        });
      });

      describe('url link is at end of html text', () => {
        it('should add link mark', function() {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, {
              html: '<a href="http://www.atlassian.com">Atlassian</a> test',
            })
          ) {
            // This environment does not allow mocking paste events
            return this.skip();
          }
          expect(editorView.state.doc).to.deep.equal(
            doc(
              paragraph(
                link({ href: 'http://www.atlassian.com' })('Atlassian'),
                ' test',
              ),
            ),
          );
          editorView.destroy();
        });
      });

      describe('url link without anchor tags in html', () => {
        it('should add link mark', function() {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, {
              html: 'http://www.atlassian.com test',
            })
          ) {
            // This environment does not allow mocking paste events
            return this.skip();
          }
          expect(editorView.state.doc).to.deep.equal(
            doc(
              paragraph(
                link({ href: 'http://www.atlassian.com' })(
                  'http://www.atlassian.com',
                ),
                ' test',
              ),
            ),
          );
          editorView.destroy();
        });
      });

      describe('url link without anchor tags in html in middle of other text', () => {
        it('should add link mark', function() {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, {
              html: 'testing http://www.atlassian.com test',
            })
          ) {
            // This environment does not allow mocking paste events
            return this.skip();
          }
          expect(editorView.state.doc).to.deep.equal(
            doc(
              paragraph(
                'testing ',
                link({ href: 'http://www.atlassian.com' })(
                  'http://www.atlassian.com',
                ),
                ' test',
              ),
            ),
          );
          editorView.destroy();
        });
      });

      describe('url link without anchor tags in html without other text', () => {
        it('should add link mark', function() {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, {
              html: 'http://www.atlassian.com',
            })
          ) {
            // This environment does not allow mocking paste events
            return this.skip();
          }
          expect(editorView.state.doc).to.deep.equal(
            doc(
              paragraph(
                link({ href: 'http://www.atlassian.com' })(
                  'http://www.atlassian.com',
                ),
              ),
            ),
          );
          editorView.destroy();
        });
      });

      describe('email link is at middle of plain text', () => {
        it('should add link mark', function() {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, {
              plain: 'test test@atlassian.com test',
            })
          ) {
            return this.skip();
          }
          expect(editorView.state.doc).to.deep.equal(
            doc(
              paragraph(
                'test ',
                link({ href: 'mailto:test@atlassian.com' })(
                  'test@atlassian.com',
                ),
                ' test',
              ),
            ),
          );
          editorView.destroy();
        });
      });

      describe('email link without anchor tags in html', () => {
        it('should add link mark', function() {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, { html: 'test@atlassian.com test' })
          ) {
            return this.skip();
          }
          expect(editorView.state.doc).to.deep.equal(
            doc(
              paragraph(
                link({ href: 'mailto:test@atlassian.com' })(
                  'test@atlassian.com',
                ),
                ' test',
              ),
            ),
          );
          editorView.destroy();
        });
      });

      describe('email link without anchor tags in html in middle of other text', () => {
        it('should add link mark', function() {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, {
              html: 'test test@atlassian.com test',
            })
          ) {
            return this.skip();
          }
          expect(editorView.state.doc).to.deep.equal(
            doc(
              paragraph(
                'test ',
                link({ href: 'mailto:test@atlassian.com' })(
                  'test@atlassian.com',
                ),
                ' test',
              ),
            ),
          );
          editorView.destroy();
        });
      });

      describe('email link is at end of html', () => {
        it('should add link mark', function() {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, {
              html: '<a href="mailto:test@atlassian.com">Atlassian</a> test',
            })
          ) {
            // This environment does not allow mocking paste events
            return this.skip();
          }
          expect(editorView.state.doc).to.deep.equal(
            doc(
              paragraph(
                link({ href: 'mailto:test@atlassian.com' })('Atlassian'),
                ' test',
              ),
            ),
          );
          editorView.destroy();
        });
      });

      describe('email link with inline style is pasted and then text is inserted', () => {
        it('should not apply inline style to inserted text', function() {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, {
              html: '<a href="mailto:test@atlassian.com"><b>Atlassian</b></a>',
            })
          ) {
            // This environment does not allow mocking paste events
            return this.skip();
          }
          insertText(editorView, 'abc', 10);
          expect(editorView.state.doc).to.deep.equal(
            doc(
              paragraph(
                link({ href: 'mailto:test@atlassian.com' })(
                  strong('Atlassian'),
                ),
                'abc',
              ),
            ),
          );
          editorView.destroy();
        });
      });
      describe('image content', () => {
        it('should not allow pasting of images with data URI src', () => {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, {
              html:
                '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAAFElEQVQYGWP8////fwYkwITEBjMBfegEAARi5UUAAAAASUVORK5CYII=" />',
            })
          ) {
            // This environment does not allow mocking paste events
            return this.skip();
          }
          expect(editorView.state.doc).to.deep.equal(doc(paragraph('')));
          editorView.destroy();
        });

        it('should allow pasting of images with url src', () => {
          const { editorView } = editor(doc(paragraph('{<>}')));
          if (
            !dispatchPasteEvent(editorView, {
              html:
                '<img src="http://atlassian.com/logo.png" alt="Atlassian" />',
            })
          ) {
            // This environment does not allow mocking paste events
            return this.skip();
          }
          expect(editorView.state.doc).to.deep.equal(
            doc(
              paragraph(
                img({
                  alt: 'Atlassian',
                  src: 'http://atlassian.com/logo.png',
                })(),
              ),
            ),
          );
          editorView.destroy();
        });
      });
    });

    describe('edit toolbar', () => {
      it('should be hidden when the esc key is pressed', async () => {
        const { editorView } = editor(
          doc(paragraph('http://www.atlassian.com')),
        );
        const hyperlinkState = hyperlinkStateKey.getState(editorView.state);
        hyperlinkState.active = true;
        sendKeyToPm(editorView, 'Esc');
        expect(
          hyperlinkState.active,
          'Hyperlink plugin state.active should be false',
        ).to.equal(false);
        editorView.destroy();
      });
    });
  }
});
