import {
  code_block,
  strong,
  em,
  doc,
  p,
  h1,
  code,
  mediaGroup,
  media,
  mediaSingle,
  panel,
  createEditorFactory,
  dispatchPasteEvent,
  bodiedExtension,
  inlineExtension,
  a as link,
  ol,
  li,
  taskList,
  taskItem,
  decisionList,
  decisionItem,
  insertText,
  table,
  tr,
  th,
  td,
  tdCursor,
  hardBreak,
  a,
  MockMacroProvider,
} from '@atlaskit/editor-test-helpers';
import { TextSelection } from 'prosemirror-state';
import mediaPlugin from '../../../../plugins/media';
import codeBlockPlugin from '../../../../plugins/code-block';
import extensionPlugin from '../../../../plugins/extension';
import listPlugin from '../../../../plugins/lists';
import tablesPlugin from '../../../../plugins/table';
import macroPlugin, { setMacroProvider } from '../../../../plugins/macro';
import { uuid } from '@atlaskit/adf-schema';
import tasksAndDecisionsPlugin from '../../../../plugins/tasks-and-decisions';
import { panelPlugin } from '../../../../plugins';

describe('paste plugins', () => {
  const createEditor = createEditorFactory();

  const editor = (doc: any) =>
    createEditor({
      doc,
      editorPlugins: [
        mediaPlugin({ allowMediaSingle: true }),
        macroPlugin,
        codeBlockPlugin(),
        extensionPlugin,
        listPlugin,
        panelPlugin,
        tasksAndDecisionsPlugin,
        tablesPlugin(),
      ],
    });

  describe('handlePaste', () => {
    const mediaHtml = (fileMimeType: string) => `
      <div
      data-id="af9310df-fee5-459a-a968-99062ecbb756"
      data-node-type="media" data-type="file"
      data-collection="MediaServicesSample"
      title="Attachment"
      data-file-mime-type="${fileMimeType}"></div>`;

    describe('editor', () => {
      describe('when message is a media image node', () => {
        it('paste as mediaSingle', () => {
          const { editorView } = editor(doc(p('{<>}')));
          dispatchPasteEvent(editorView, {
            html: mediaHtml('image/jpeg'),
          });
          expect(editorView.state.doc).toEqualDocument(
            doc(
              mediaSingle({ layout: 'center' })(
                media({
                  id: 'af9310df-fee5-459a-a968-99062ecbb756',
                  type: 'file',
                  collection: 'MediaServicesSample',
                  __fileMimeType: 'image/jpeg',
                })(),
              ),
              p(),
            ),
          );
        });
      });

      describe('when an external image is copied', () => {
        const externalMediaHtml = `
         <meta charset='utf-8'><img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80" alt="Image result for cat"/>
        `;

        it('should insert as external media single', () => {
          const { editorView } = editor(doc(p('{<>}')));
          dispatchPasteEvent(editorView, {
            html: externalMediaHtml,
          });

          expect(editorView.state.doc).toEqualDocument(
            doc(
              mediaSingle({ layout: 'center' })(
                media({
                  type: 'external',
                  url:
                    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
                })(),
              ),
              p(),
            ),
          );
        });
      });

      describe('when message is not a media image node', () => {
        it('does nothing', () => {
          const { editorView } = editor(doc(p('{<>}')));
          dispatchPasteEvent(editorView, {
            html: mediaHtml('pdf'),
          });

          expect(editorView.state.doc).toEqualDocument(
            doc(
              p(),
              mediaGroup(
                media({
                  id: 'af9310df-fee5-459a-a968-99062ecbb756',
                  type: 'file',
                  collection: 'MediaServicesSample',
                  __fileMimeType: 'pdf',
                })(),
              ),
              p(),
            ),
          );
        });
      });
    });

    describe('paste in code-block', () => {
      it('should not create paragraph when plain text is copied in code-block', () => {
        const { editorView } = editor(doc(code_block()('{<>}')));
        dispatchPasteEvent(editorView, { plain: 'plain text' });
        expect(editorView.state.doc).toEqualDocument(
          doc(code_block()('plain text')),
        );
      });

      it('should create paragraph when plain text is not copied in code-block', () => {
        const { editorView } = editor(doc(p('{<>}')));
        dispatchPasteEvent(editorView, { plain: 'plain text' });
        expect(editorView.state.doc).toEqualDocument(doc(p('plain text')));
      });
    });

    describe('paste inline text', () => {
      it('should preserve marks when pasting inline text into empty text selection', () => {
        const { editorView } = editor(doc(p(strong(em('this is {<>}')))));
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'>strong em text</p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(p(strong(em('this is strong em text{<>}')))),
        );
      });

      it('should preserve marks when pasting inline text into text selection', () => {
        const { editorView } = editor(
          doc(p(strong(em('this is strong em text')))),
        );
        editorView.dispatch(
          editorView.state.tr.setSelection(
            TextSelection.create(editorView.state.doc, 1, 8),
          ),
        );
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'>this is another</p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(p(strong(em('this is another strong em text')))),
        );
      });

      it('should preserve marks when pasting inline text into action/decision', () => {
        const { editorView } = editor(
          doc(
            decisionList({ localId: 'local-decision' })(
              decisionItem({ localId: 'local-decision' })(
                strong(em('this is a {<>}text')),
              ),
            ),
          ),
        );
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'>strong em </p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(
            decisionList({ localId: 'local-decision' })(
              decisionItem({ localId: 'local-decision' })(
                strong(em('this is a strong em {<>}text')),
              ),
            ),
          ),
        );
      });

      it('should preserve marks when pasting inline text into panel', () => {
        const { editorView } = editor(
          doc(panel()(p(strong(em('this is a {<>}text'))))),
        );
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'>strong em </p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(panel()(p(strong(em('this is a strong em {<>}text'))))),
        );
      });

      it('should preserve marks when pasting inline text into heading', () => {
        const { editorView } = editor(
          doc(h1(strong(em('this is a {<>}text')))),
        );
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'>strong em </p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(h1(strong(em('this is a strong em {<>}text')))),
        );
      });

      it('should preserve marks when pasting inline text into list', () => {
        const { editorView } = editor(
          doc(ol(li(p(strong(em('this is a {<>}text')))))),
        );
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'>strong em </p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(ol(li(p(strong(em('this is a strong em {<>}text')))))),
        );
      });

      it('should preserve marks + link when pasting URL', () => {
        const href = 'http://www.google.com';
        const { editorView } = editor(
          doc(panel()(p(strong(em('this is a {<>}text'))))),
        );
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'><a href='http://www.google.com'>www.google.com</a></p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(
            panel()(
              p(
                strong(em('this is a ')),
                link({ href })(strong(em('www.google.com'))),
                strong(em('text')),
              ),
            ),
          ),
        );
      });

      it('should preserve marks + link when pasting plain text', () => {
        const href = 'http://www.google.com';
        const { editorView } = editor(
          doc(p(link({ href })('www.google{<>}.com'))),
        );
        dispatchPasteEvent(editorView, {
          html: "<meta charset='utf-8'><p data-pm-slice='1 1 []'>doc</p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(p(link({ href })('www.googledoc.com'))),
        );
      });

      it('should filter link mark when pasting URL into code mark', () => {
        const { editorView } = editor(
          doc(panel()(p(code('code line 1: {<>}')))),
        );
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'><a href='http://www.google.com'>www.google.com</a></p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(panel()(p(code('code line 1: www.google.com')))),
        );
      });
    });

    describe('paste paragraphs', () => {
      it('should preserve marks when pasting paragraphs into empty text selection', () => {
        const { editorView } = editor(doc(p(strong(em('this is {<>}')))));
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'>strong em text</p><p>this is another paragraph</p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(
            p(strong(em('this is strong em text{<>}'))),
            p(strong(em('this is another paragraph'))),
          ),
        );
      });

      it('should preserve marks when pasting paragraphs into text selection', () => {
        const { editorView } = editor(
          doc(p(strong(em('this is strong em text')))),
        );
        editorView.dispatch(
          editorView.state.tr.setSelection(
            TextSelection.create(editorView.state.doc, 1, 8),
          ),
        );
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'>this is another</p><p>hello</p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(
            p(strong(em('this is another'))),
            p(strong(em('hello strong em text'))),
          ),
        );
      });

      it('should preserve marks when pasting paragraphs into action/decision', () => {
        const { editorView } = editor(
          doc(
            decisionList({ localId: 'local-decision' })(
              decisionItem({ localId: 'local-decision' })(
                strong(em('this is a {<>}text')),
              ),
            ),
          ),
        );
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'>strong em </p><p>hello </p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(
            decisionList({ localId: 'local-decision' })(
              decisionItem({ localId: 'local-decision' })(
                strong(em('this is a strong em {<>}')),
                hardBreak(),
                strong(em('hello text')),
              ),
            ),
          ),
        );
      });

      it('should preserve marks when pasting paragraphs into panel', () => {
        const { editorView } = editor(
          doc(panel()(p(strong(em('this is a {<>}text'))))),
        );
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'>strong em </p><p>hello </p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(
            panel()(
              p(strong(em('this is a strong em {<>}'))),
              p(strong(em('hello text'))),
            ),
          ),
        );
      });

      it('should preserve marks when pasting paragraphs into heading', () => {
        const { editorView } = editor(
          doc(h1(strong(em('this is a {<>}text')))),
        );
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'>strong em </p><p>hello </p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(
            h1(strong(em('this is a strong em {<>}'))),
            p(strong(em('hello text'))),
          ),
        );
      });

      it('should preserve marks when pasting paragraphs into list', () => {
        const { editorView } = editor(
          doc(ol(li(p(strong(em('this is a {<>}text')))))),
        );
        dispatchPasteEvent(editorView, {
          html:
            "<meta charset='utf-8'><p data-pm-slice='1 1 []'>strong em </p><p>hello </p>",
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(
            ol(
              li(
                p(strong(em('this is a strong em {<>}'))),
                p(strong(em('hello text'))),
              ),
            ),
          ),
        );
      });
    });

    describe('hyperlink as a plain text', () => {
      it('should linkify hyperlink if it contains "..."', () => {
        const { editorView } = editor(doc(p('{<>}')));
        const href = 'http://example.com/...blabla';
        dispatchPasteEvent(editorView, { plain: href });
        expect(editorView.state.doc).toEqualDocument(
          doc(p(link({ href })(href))),
        );
      });

      it('should linkify pasted hyperlink if it contains "---"', () => {
        const { editorView } = editor(doc(p('{<>}')));
        const href = 'http://example.com/---blabla';
        dispatchPasteEvent(editorView, { plain: href });
        expect(editorView.state.doc).toEqualDocument(
          doc(p(link({ href })(href))),
        );
      });

      it('should linkify pasted hyperlink if it contains "~~~"', () => {
        const { editorView } = editor(doc(p('{<>}')));
        const href = 'http://example.com/~~~blabla';
        dispatchPasteEvent(editorView, { plain: href });
        expect(editorView.state.doc).toEqualDocument(
          doc(p(link({ href })(href))),
        );
      });

      it('should linkify pasted hyperlink if it contains combination of "~~~", "---" and "..."', () => {
        const { editorView } = editor(doc(p('{<>}')));
        const href = 'http://example.com/~~~bla...bla---bla';
        dispatchPasteEvent(editorView, { plain: href });
        expect(editorView.state.doc).toEqualDocument(
          doc(p(link({ href })(href))),
        );
      });

      it('should parse Urls with nested parentheses', () => {
        const { editorView } = editor(doc(p('{<>}')));
        const href = 'http://example.com/?jql=(foo())bar';
        const text = `**Hello** ${href} _World_`;
        dispatchPasteEvent(editorView, { plain: text });
        expect(editorView.state.doc).toEqualDocument(
          doc(p(strong('Hello'), ' ', link({ href })(href), ' ', em('World'))),
        );
      });

      it('should not create code block for whitespace pre-wrap css', () => {
        const { editorView } = editor(doc(p('{<>}')));
        const href = 'http://example.com/__text__/something';
        const text = `text ${href} text`;
        dispatchPasteEvent(editorView, { plain: text });
        expect(editorView.state.doc).toEqualDocument(
          doc(p('text ', link({ href })(href), ' text')),
        );
      });

      it('should parse Urls with "**text**"', () => {
        const { editorView } = editor(doc(p('{<>}')));
        const href = 'http://example.com/**text**/something';
        const text = `text ${href} text`;
        dispatchPasteEvent(editorView, { plain: text });
        expect(editorView.state.doc).toEqualDocument(
          doc(p('text ', link({ href })(href), ' text')),
        );
      });

      it('should parse Urls with "~~text~~"', () => {
        const { editorView } = editor(doc(p('{<>}')));
        const href = 'http://example.com/~~text~~/something';
        const text = `text ${href} text`;
        dispatchPasteEvent(editorView, { plain: text });
        expect(editorView.state.doc).toEqualDocument(
          doc(p('text ', link({ href })(href), ' text')),
        );
      });

      describe('if pasted markdown followed by hyperlink', () => {
        it('should parse markdown and create a hyperlink', () => {
          const { editorView } = editor(doc(p('{<>}')));
          const href = 'http://example.com/?...jql=(foo())bar';
          const text = `**Hello** ${href} _World_`;
          dispatchPasteEvent(editorView, { plain: text });
          expect(editorView.state.doc).toEqualDocument(
            doc(
              p(strong('Hello'), ' ', link({ href })(href), ' ', em('World')),
            ),
          );
        });
      });
    });

    it('should create code-block for multiple lines of code copied', () => {
      const { editorView } = editor(doc(p('{<>}')));
      dispatchPasteEvent(editorView, {
        plain: 'code line 1\ncode line 2',
        html: '<pre>code line 1\ncode line 2</pre>',
      });
      expect(editorView.state.doc).toEqualDocument(
        doc(code_block()('code line 1\ncode line 2'), p('')),
      );
    });

    it('should create code-mark for single lines of code copied', () => {
      const { editorView } = editor(doc(p('{<>}')));
      dispatchPasteEvent(editorView, {
        plain: 'code line 1',
        html: '<pre>code line 1</pre>',
      });
      expect(editorView.state.doc).toEqualDocument(doc(p(code('code line 1'))));
    });

    it('should remove single preceding backtick', () => {
      const { editorView } = editor(doc(p('`{<>}')));
      dispatchPasteEvent(editorView, {
        plain: 'code line 1',
        html: '<pre>code line 1</pre>',
      });
      expect(editorView.state.doc).toEqualDocument(doc(p(code('code line 1'))));
    });

    it('should join adjacent code-blocks', () => {
      const { editorView } = editor(doc(p('{<>}')));
      dispatchPasteEvent(editorView, {
        plain: 'code line 1\ncode line 2\ncode line 3',
        html: '<pre>code line 1\ncode line 2</pre><pre>code line 3</pre>',
      });
      expect(editorView.state.doc).toEqualDocument(
        doc(code_block()('code line 1\ncode line 2\ncode line 3'), p('')),
      );
    });

    it('should not create paragraph when code is copied inside existing code-block', () => {
      const { editorView } = editor(doc(code_block()('code\n{<>}\ncode')));
      dispatchPasteEvent(editorView, {
        plain: 'code line 1\ncode line 2',
        html: '<pre>code line 1\ncode line 2</pre>',
      });
      expect(editorView.state.doc).toEqualDocument(
        doc(code_block()('code\ncode line 1\ncode line 2\ncode')),
      );
    });

    it('should create paragraph when code block is pasted inside table at end in a table cell', () => {
      const { editorView } = editor(doc(table()(tr(tdCursor))));
      dispatchPasteEvent(editorView, {
        plain: 'code line 1\ncode line 2',
        html: '<pre>code line 1\ncode line 2</pre>',
      });
      expect(editorView.state.doc).toEqualDocument(
        doc(
          table()(tr(td({})(code_block()('code line 1\ncode line 2'), p('')))),
        ),
      );
    });

    it('should move selection out of code mark if new code mark is created by pasting', () => {
      const { editorView } = editor(doc(p('{<>}')));
      dispatchPasteEvent(editorView, {
        plain: 'code single line',
        html: '<pre>code single line</pre>',
      });
      expect(editorView.state.storedMarks!.length).toEqual(0);
    });

    it('should not handle events with Files type', () => {
      const { editorView } = editor(doc(p('{<>}')));
      dispatchPasteEvent(editorView, {
        plain: 'my-awesome-mug.png',
        types: ['text/plain', 'Files'],
      });
      expect(editorView.state.doc).toEqualDocument(doc(p('')));
    });

    it('should work properly when pasting multiple link markdowns', () => {
      const { editorView } = editor(doc(p('{<>}')));
      dispatchPasteEvent(editorView, {
        plain:
          '[commit #1 title](https://bitbucket.org/SOME/REPO/commits/commit-id-1)\n' +
          '[commit #2 title](https://bitbucket.org/SOME/REPO/commits/commit-id-2)\n' +
          '[commit #3 title](https://bitbucket.org/SOME/REPO/commits/commit-id-3)\n' +
          '[commit #4 title](https://bitbucket.org/SOME/REPO/commits/commit-id-4)',
      });
      expect(editorView.state.doc).toEqualDocument(
        doc(
          p(
            link({
              href: 'https://bitbucket.org/SOME/REPO/commits/commit-id-1',
            })('commit #1 title'),
            hardBreak(),
            link({
              href: 'https://bitbucket.org/SOME/REPO/commits/commit-id-2',
            })('commit #2 title'),
            hardBreak(),
            link({
              href: 'https://bitbucket.org/SOME/REPO/commits/commit-id-3',
            })('commit #3 title'),
            hardBreak(),
            link({
              href: 'https://bitbucket.org/SOME/REPO/commits/commit-id-4',
            })('commit #4 title'),
          ),
        ),
      );
    });

    describe('actions and decisions', () => {
      beforeEach(() => {
        uuid.setStatic('local-decision');
      });

      afterEach(() => {
        uuid.setStatic(false);
      });

      it('pastes plain text into an action', () => {
        const { editorView, sel } = editor(doc(p('{<>}')));
        insertText(editorView, '[] ', sel);
        dispatchPasteEvent(editorView, { plain: 'plain text' });
        expect(editorView.state.doc).toEqualDocument(
          doc(
            taskList({ localId: 'local-decision' })(
              taskItem({ localId: 'local-decision' })('plain text'),
            ),
          ),
        );
      });

      it('pastes plain text into a decision', () => {
        const { editorView, sel } = editor(doc(p('{<>}')));
        insertText(editorView, '<> ', sel);
        dispatchPasteEvent(editorView, { plain: 'plain text' });
        expect(editorView.state.doc).toEqualDocument(
          doc(
            decisionList({ localId: 'local-decision' })(
              decisionItem({ localId: 'local-decision' })('plain text'),
            ),
          ),
        );
      });

      it('linkifies text pasted into a decision', () => {
        const { editorView, sel } = editor(doc(p('{<>}')));
        insertText(editorView, '<> ', sel);
        dispatchPasteEvent(editorView, { plain: 'google.com' });
        expect(editorView.state.doc).toEqualDocument(
          doc(
            decisionList({ localId: 'local-decision' })(
              decisionItem({ localId: 'local-decision' })(
                a({ href: 'http://google.com' })('google.com'),
              ),
            ),
          ),
        );
      });
    });
  });

  describe('macroPlugin', () => {
    const attrs = {
      extensionType: 'com.atlassian.confluence.macro.core',
      extensionKey: 'dumbMacro',
      parameters: {
        macroParams: { paramA: { value: 'CFE' } },
        macroMetadata: {
          macroId: { value: 12345 },
          placeholder: [
            {
              data: { url: '' },
              type: 'icon',
            },
          ],
        },
      },
    };

    describe('should convert pasted content to inlineExtension (confluence macro)', () => {
      it('from plain text url', async () => {
        const macroProvider = Promise.resolve(new MockMacroProvider({}));
        const { editorView } = editor(doc(p('{<>}')));
        await setMacroProvider(macroProvider)(editorView);

        dispatchPasteEvent(editorView, {
          plain: 'http://www.dumbmacro.com?paramA=CFE',
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(p(inlineExtension(attrs)())),
        );
      });

      it('from url in pasted html', async () => {
        const macroProvider = Promise.resolve(new MockMacroProvider({}));
        const { editorView } = editor(doc(p('{<>}')));
        await setMacroProvider(macroProvider)(editorView);

        dispatchPasteEvent(editorView, {
          plain: 'http://www.dumbmacro.com?paramA=CFE',
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
          <html>
          <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta http-equiv="Content-Style-Type" content="text/css">
          <title></title>
          <meta name="Generator" content="Cocoa HTML Writer">
          <meta name="CocoaVersion" content="1561.6">
          <style type="text/css">
          p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 26.0px 'Helvetica Neue'; color: #000000}
          </style>
          </head>
          <body>
          <p class="p1">http://www.dumbmacro.com?paramA=CFE</p>
          </body>
          </html>
          `,
        });
        expect(editorView.state.doc).toEqualDocument(
          doc(p(inlineExtension(attrs)())),
        );
      });
    });
  });

  describe('paste bodiedExtension inside another bodiedExtension', () => {
    it('should remove bodiedExtension from the pasted content, paste only content', () => {
      const attrs = {
        extensionType: 'com.atlassian.confluence.macro.core',
        extensionKey: 'expand',
      };
      const { editorView } = editor(doc(bodiedExtension(attrs)(p('{<>}'))));
      dispatchPasteEvent(editorView, {
        html: `<meta charset='utf-8'><p data-pm-context="[]">text</p><div data-node-type="bodied-extension" data-extension-type="com.atlassian.confluence.macro.core" data-extension-key="expand" data-parameters="{&quot;macroMetadata&quot;:{&quot;macroId&quot;:{&quot;value&quot;:1521116439714},&quot;schemaVersion&quot;:{&quot;value&quot;:&quot;2&quot;},&quot;placeholder&quot;:[{&quot;data&quot;:{&quot;url&quot;:&quot;//pug.jira-dev.com/wiki/plugins/servlet/confluence/placeholder/macro?definition=e2V4cGFuZH0&amp;locale=en_GB&amp;version=2&quot;},&quot;type&quot;:&quot;image&quot;}]}}"><p>content</p></div>`,
      });
      expect(editorView.state.doc).toEqualDocument(
        doc(bodiedExtension(attrs)(p('text'), p('content'))),
      );
    });
  });

  describe('paste part of bodied extension as test', () => {
    it('should remove bodiedExtension from the pasted content, paste only text', () => {
      const attrs = {
        extensionType: 'com.atlassian.confluence.macro.core',
        extensionKey: 'expand',
      };
      const { editorView } = editor(
        doc(bodiedExtension(attrs)(p('Hello')), p('{<>}')),
      );

      dispatchPasteEvent(editorView, {
        html: `<meta charset='utf-8'><p data-pm-slice=1 1 [&quot;bodiedExtension&quot;,null]>llo</p>`,
      });

      expect(editorView.state.doc).toEqualDocument(
        doc(bodiedExtension(attrs)(p('Hello')), p('llo')),
      );
    });
  });

  describe('panel copy-paste', () => {
    it('should paste a panel when it is copied from editor / renderer', () => {
      const html = `
        <meta charset='utf-8'>
          <p>hello</p>
          <div class="ak-editor-panel" data-panel-type="info"><span class="ak-editor-panel__icon"><span class="Icon__IconWrapper-dyhwwi-0 bcqBjl" aria-label="Panel info"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M12 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-8.5a1 1 0 0 0-1 1V15a1 1 0 0 0 2 0v-2.5a1 1 0 0 0-1-1zm0-1.125a1.375 1.375 0 1 0 0-2.75 1.375 1.375 0 0 0 0 2.75z" fill="currentColor" fill-rule="evenodd"></path></svg></span></span><div class="ak-editor-panel__content"><p>Inside panel</p></div></div>
          <p>world</p>
      `;

      const { editorView } = editor(doc(p('{<>}')));
      dispatchPasteEvent(editorView, { html });
      expect(editorView.state.doc).toEqualDocument(
        doc(p('hello'), panel()(p('Inside panel')), p('world')),
      );
    });
  });

  describe('table copy-paste', () => {
    it('should handle numbered table copied inside editor', () => {
      const { editorView } = editor(doc(p('{<>}')));

      const html = `<meta charset='utf-8'><table data-number-column="true" data-layout="default" data-autosize="false" data-pm-slice="1 1 []"><tbody><tr><th><p>One</p></th><th><p>Two</p></th></tr><tr><td><p>Three</p></td><td><p>Four</p></td></tr><tr><td><p>Five</p></td><td><p>Six</p></td></tr></tbody></table>`;

      dispatchPasteEvent(editorView, { html });

      expect(editorView.state.doc).toEqualDocument(
        doc(
          table({ isNumberColumnEnabled: true })(
            tr(th()(p('One')), th()(p('Two'))),
            tr(td()(p('Three')), td()(p('Four'))),
            tr(td()(p('Five')), td()(p('Six'))),
          ),
        ),
      );
    });

    it('should handle numbered table copied from renderer', () => {
      const { editorView } = editor(doc(p('{<>}')));

      const html = `<meta charset='utf-8'><div class="pm-table-container " data-layout="default" style="margin: 0px auto 16px; padding: 0px; position: relative; box-sizing: border-box; transition: all 0.1s linear 0s; clear: both; color: rgb(23, 43, 77); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; width: inherit;"><div class="pm-table-wrapper" style="margin: 0px; padding: 0px; overflow-x: auto;"><table data-number-column="true" style="margin: 24px 0px 0px; border-collapse: collapse; width: 654px; border: 1px solid rgb(193, 199, 208); table-layout: fixed; font-size: 14px;"><colgroup style="box-sizing: border-box;"><col style="box-sizing: border-box; width: 42px;"><col style="box-sizing: border-box;"><col style="box-sizing: border-box;"></colgroup><tbody style="border-bottom: none; box-sizing: border-box;"><tr style="box-sizing: border-box;"><td class="ak-renderer-table-number-column" style="border-width: 1px 1px 0px; border-style: solid; border-color: rgb(193, 199, 208); border-image: initial; padding: 10px; text-align: center; box-sizing: border-box; min-width: 48px; height: 3em; vertical-align: top; background-clip: padding-box; background-color: rgb(244, 245, 247); width: 42px; color: rgb(107, 119, 140); font-size: 14px;"></td><th rowspan="1" colspan="1" style="border-width: 1px 0px 0px 1px; border-style: solid; border-color: rgb(193, 199, 208); border-image: initial; padding: 10px; text-align: left; vertical-align: top; box-sizing: border-box; min-width: 48px; height: 3em; background-clip: padding-box; background-color: rgb(244, 245, 247);"><p style="margin: 0px; padding: 0px; font-size: 1em; line-height: 1.714; font-weight: normal; letter-spacing: -0.005em; box-sizing: border-box;">One</p></th><th rowspan="1" colspan="1" style="border-width: 1px 0px 0px 1px; border-style: solid; border-color: rgb(193, 199, 208); border-image: initial; padding: 10px; text-align: left; vertical-align: top; box-sizing: border-box; min-width: 48px; height: 3em; background-clip: padding-box; background-color: rgb(244, 245, 247);"><p style="margin: 0px; padding: 0px; font-size: 1em; line-height: 1.714; font-weight: normal; letter-spacing: -0.005em; box-sizing: border-box;">Two</p></th></tr><tr style="box-sizing: border-box;"><td class="ak-renderer-table-number-column" style="border-width: 1px 1px 0px; border-style: solid; border-color: rgb(193, 199, 208); border-image: initial; padding: 10px; text-align: center; box-sizing: border-box; min-width: 48px; height: 3em; vertical-align: top; background-clip: padding-box; background-color: rgb(244, 245, 247); width: 42px; color: rgb(107, 119, 140); font-size: 14px;">1</td><td rowspan="1" colspan="1" style="border-width: 1px 0px 0px 1px; border-style: solid; border-color: rgb(193, 199, 208); border-image: initial; padding: 10px; text-align: left; box-sizing: border-box; min-width: 48px; height: 3em; vertical-align: top; background-clip: padding-box;"><p style="margin: 0px; padding: 0px; font-size: 1em; line-height: 1.714; font-weight: normal; letter-spacing: -0.005em; box-sizing: border-box;">Three</p></td><td rowspan="1" colspan="1" style="border-width: 1px 0px 0px 1px; border-style: solid; border-color: rgb(193, 199, 208); border-image: initial; padding: 10px; text-align: left; box-sizing: border-box; min-width: 48px; height: 3em; vertical-align: top; background-clip: padding-box;"><p style="margin: 0px; padding: 0px; font-size: 1em; line-height: 1.714; font-weight: normal; letter-spacing: -0.005em; box-sizing: border-box;">Four</p></td></tr><tr style="box-sizing: border-box;"><td class="ak-renderer-table-number-column" style="border-width: 1px 1px 0px; border-style: solid; border-color: rgb(193, 199, 208); border-image: initial; padding: 10px; text-align: center; box-sizing: border-box; min-width: 48px; height: 3em; vertical-align: top; background-clip: padding-box; background-color: rgb(244, 245, 247); width: 42px; color: rgb(107, 119, 140); font-size: 14px;">2</td><td rowspan="1" colspan="1" style="border-width: 1px 0px 0px 1px; border-style: solid; border-color: rgb(193, 199, 208); border-image: initial; padding: 10px; text-align: left; box-sizing: border-box; min-width: 48px; height: 3em; vertical-align: top; background-clip: padding-box;"><p style="margin: 0px; padding: 0px; font-size: 1em; line-height: 1.714; font-weight: normal; letter-spacing: -0.005em; box-sizing: border-box;">Five</p></td><td rowspan="1" colspan="1" style="border-width: 1px 0px 0px 1px; border-style: solid; border-color: rgb(193, 199, 208); border-image: initial; padding: 10px; text-align: left; box-sizing: border-box; min-width: 48px; height: 3em; vertical-align: top; background-clip: padding-box;"><p style="margin: 0px; padding: 0px; font-size: 1em; line-height: 1.714; font-weight: normal; letter-spacing: -0.005em; box-sizing: border-box;">Six</p></td></tr></tbody></table></div></div>`;

      dispatchPasteEvent(editorView, { html });

      expect(editorView.state.doc).toEqualDocument(
        doc(
          table({ isNumberColumnEnabled: true })(
            tr(th()(p('One')), th()(p('Two'))),
            tr(td()(p('Three')), td()(p('Four'))),
            tr(td()(p('Five')), td()(p('Six'))),
          ),
        ),
      );
    });
  });
});
