import {
  insertText,
  sendKeyToPm,
  createEditorFactory,
  blockquote,
  code_block,
  doc,
  h1,
  mention,
  p,
  hr,
  ul,
  li,
  table,
  tr,
  tdEmpty,
  tdCursor,
} from '@atlaskit/editor-test-helpers';
import { analyticsService } from '../../../../analytics';
import { setNodeSelection } from '../../../../utils';

describe('codeBlock - keymaps', () => {
  const createEditor = createEditorFactory();

  let trackEvent;
  const editor = (doc: any) =>
    createEditor({
      doc,
      editorProps: {
        analyticsHandler: trackEvent,
        allowCodeBlocks: true,
        mentionProvider: new Promise(() => {}),
        allowLists: true,
        allowTables: true,
        allowRule: true,
      },
    });

  beforeEach(() => {
    trackEvent = jest.fn();
    analyticsService.trackEvent = trackEvent;
  });

  describe('keymap', () => {
    describe('when hits cmd-z', () => {
      it('should undo last autoformatting', () => {
        const { editorView, sel } = editor(doc(p('{<>}')));
        insertText(editorView, '# ', sel);
        expect(editorView.state.doc).toEqualDocument(doc(h1()));
        sendKeyToPm(editorView, 'Mod-z');
        expect(editorView.state.doc).toEqualDocument(doc(p('# ')));
        expect(trackEvent).toHaveBeenCalledWith(
          'atlassian.editor.undo.keyboard',
        );
      });
    });

    describe('when hits up', () => {
      describe('when on a text block', () => {
        describe('when selection is not empty', () => {
          it('does not create a new paragraph above', () => {
            const { editorView } = editor(doc(code_block()('{<}te{>}xt')));

            sendKeyToPm(editorView, 'ArrowUp');

            expect(editorView.state.doc).toEqualDocument(
              doc(code_block()('text')),
            );
          });
        });

        describe('when selection is empty', () => {
          describe('on a non nested structure', () => {
            describe('inside a paragraph', () => {
              it('does not create a new paragraph above', () => {
                const { editorView } = editor(doc(p('{<>}text')));

                sendKeyToPm(editorView, 'ArrowUp');

                expect(editorView.state.doc).toEqualDocument(doc(p('text')));
              });
            });

            describe('when cursor is in the middle of the first block node', () => {
              it('does not create a new paragraph above', () => {
                const { editorView } = editor(doc(code_block()('te{<>}xt')));

                sendKeyToPm(editorView, 'ArrowUp');

                expect(editorView.state.doc).toEqualDocument(
                  doc(code_block()('text')),
                );
              });
            });

            describe('when cursor is at the beginning of the second block node', () => {
              it('does not create a new paragraph above', () => {
                const { editorView } = editor(
                  doc(p('text'), code_block()('{<>}text')),
                );

                sendKeyToPm(editorView, 'ArrowUp');

                expect(editorView.state.doc).toEqualDocument(
                  doc(p('text'), code_block()('text')),
                );
              });
            });

            describe('when cursor is at the beginning of the whole content', () => {
              describe('on non list items', () => {
                it('does not ignore @mention', () => {
                  const { editorView } = editor(
                    doc(p(mention({ id: 'foo1', text: '@bar1' })())),
                  );

                  sendKeyToPm(editorView, 'ArrowUp');

                  expect(editorView.state.doc).toEqualDocument(
                    doc(p(mention({ id: 'foo1', text: '@bar1' })())),
                  );
                });
              });

              describe('list item', () => {
                it('creates a new paragraph below the ul', () => {
                  const { editorView } = editor(doc(ul(li(p('{<>}text')))));

                  sendKeyToPm(editorView, 'ArrowUp');

                  expect(editorView.state.doc).toEqualDocument(
                    doc(p(''), ul(li(p('text')))),
                  );
                });
              });
            });
          });

          describe('on a nested structure', () => {
            describe('when cursor is at the beginning of the nested structure', () => {
              describe('when there is still content before the nested block', () => {
                it('does not create a new paragraph above', () => {
                  const { editorView } = editor(
                    doc(p('text'), blockquote(p('{<>}text'))),
                  );

                  sendKeyToPm(editorView, 'ArrowUp');

                  expect(editorView.state.doc).toEqualDocument(
                    doc(p('text'), blockquote(p('text'))),
                  );
                });
              });

              describe('when there is no more content before the nested block', () => {
                it('creates a new paragraph above', () => {
                  const { editorView } = editor(doc(blockquote(p('{<>}text'))));

                  sendKeyToPm(editorView, 'ArrowUp');

                  expect(editorView.state.doc).toEqualDocument(
                    doc(p(''), blockquote(p('text'))),
                  );
                });
              });
            });
          });
        });
      });

      describe('when on a node selection', () => {
        describe('on a non nested structure', () => {
          describe('when selection is in the middle of the content', () => {
            it('does not create a paragraph', () => {
              const { editorView, sel } = editor(
                doc(p('text'), hr(), code_block()('{<>}text')),
              );
              setNodeSelection(editorView, sel - 1);

              sendKeyToPm(editorView, 'ArrowUp');

              expect(editorView.state.doc).toEqualDocument(
                doc(p('text'), hr(), code_block()('text')),
              );
            });
          });
        });

        describe('on a nested structure', () => {
          describe('when there is more content before the nested block', () => {
            it('does not create a paragraph', () => {
              const { editorView, sel } = editor(
                doc(p('text'), blockquote(p('text'), p('{<>}more text'))),
              );
              setNodeSelection(editorView, sel - 1);

              sendKeyToPm(editorView, 'ArrowUpv');

              expect(editorView.state.doc).toEqualDocument(
                doc(p('text'), blockquote(p('text'), p('more text'))),
              );
            });
          });

          describe('when there is no more content before the nested block', () => {
            it('creates a new paragraph above', () => {
              const { editorView } = editor(
                doc(blockquote(p('pre text'), p('{<>}text'))),
              );
              setNodeSelection(editorView, 1);

              sendKeyToPm(editorView, 'ArrowUp');

              expect(editorView.state.doc).toEqualDocument(
                doc(p(''), blockquote(p('pre text'), p('text'))),
              );
            });
          });
        });
      });
    });

    describe('when hits down', () => {
      describe('when on a text block', () => {
        describe('when selection is not empty', () => {
          it('does not create a new paragraph below', () => {
            const { editorView } = editor(doc(code_block()('te{<}xt{>}')));

            sendKeyToPm(editorView, 'ArrowDown');

            expect(editorView.state.doc).toEqualDocument(
              doc(code_block()('text')),
            );
          });
        });

        describe('when selection is empty', () => {
          describe('on a non nested structure', () => {
            describe('when cursor is in the middle of the first block node', () => {
              it('does not create a new paragraph below', () => {
                const { editorView } = editor(doc(code_block()('te{<>}xt')));

                sendKeyToPm(editorView, 'ArrowDown');

                expect(editorView.state.doc).toEqualDocument(
                  doc(code_block()('text')),
                );
              });
            });

            describe('when cursor is at the end of the second last block node', () => {
              it('does not create a new paragraph below', () => {
                const { editorView } = editor(
                  doc(code_block()('text{<>}'), p('text')),
                );

                sendKeyToPm(editorView, 'ArrowDown');

                expect(editorView.state.doc).toEqualDocument(
                  doc(code_block()('text'), p('text')),
                );
              });
            });

            describe('when cursor is at the end of the whole content', () => {
              describe('non list item', () => {
                it('creates a new paragraph below', () => {
                  const { editorView } = editor(doc(code_block()('text{<>}')));

                  sendKeyToPm(editorView, 'ArrowDown');

                  expect(editorView.state.doc).toEqualDocument(
                    doc(code_block()('text'), p('')),
                  );
                });
              });
              describe('list item', () => {
                it('creates a new paragraph below the ul', () => {
                  const { editorView } = editor(doc(ul(li(p('text{<>}')))));

                  sendKeyToPm(editorView, 'ArrowDown');

                  expect(editorView.state.doc).toEqualDocument(
                    doc(ul(li(p('text'))), p('')),
                  );
                });
              });
              describe('nested list item', () => {
                it('creates a new paragraph below at depth 0', () => {
                  const { editorView } = editor(
                    doc(ul(li(p('text'), ul(li(p('text{<>}')))))),
                  );

                  sendKeyToPm(editorView, 'ArrowDown');

                  expect(editorView.state.doc).toEqualDocument(
                    doc(ul(li(p('text'), ul(li(p('text'))))), p('')),
                  );
                });
              });
            });

            describe('when cursor is in the last cell of the table', () => {
              it('creates a new paragraph below the table', () => {
                const { editorView } = editor(
                  doc(table()(tr(tdEmpty, tdEmpty, tdCursor))),
                );

                sendKeyToPm(editorView, 'ArrowDown');

                expect(editorView.state.doc).toEqualDocument(
                  doc(table()(tr(tdEmpty, tdEmpty, tdEmpty)), p('')),
                );
              });
            });
          });
        });

        describe('on a nested structure', () => {
          describe('when cursor is at the end of the nested structure', () => {
            describe('when there is still content after the nested block', () => {
              it('does not create a new paragraph below', () => {
                const { editorView } = editor(
                  doc(blockquote(p('text{<>}')), p('text')),
                );

                sendKeyToPm(editorView, 'ArrowDown');

                expect(editorView.state.doc).toEqualDocument(
                  doc(blockquote(p('text')), p('text')),
                );
              });
            });

            describe('when there is no more content before the nested block', () => {
              it('creates a new paragraph below', () => {
                const { editorView } = editor(doc(blockquote(p('text{<>}'))));

                sendKeyToPm(editorView, 'ArrowDown');

                expect(editorView.state.doc).toEqualDocument(
                  doc(blockquote(p('text')), p('')),
                );
              });
            });
          });
        });
      });
    });

    describe('when on a node selection', () => {
      describe('on a non nested structure', () => {
        describe('when selection is in the middle of the content', () => {
          it('does not create a paragraph', () => {
            const { editorView, sel } = editor(
              doc(p('text{<>}'), hr(), code_block()('text')),
            );
            setNodeSelection(editorView, sel + 1);

            sendKeyToPm(editorView, 'ArrowDown');

            expect(editorView.state.doc).toEqualDocument(
              doc(p('text'), hr(), code_block()('text')),
            );
          });
        });
      });

      describe('on a nested structure', () => {
        describe('when there is more content after the nested block', () => {
          it('does not create a paragraph', () => {
            const { editorView, sel } = editor(
              doc(blockquote(p(''), p('{<>}text')), p('text')),
            );
            setNodeSelection(editorView, sel - 1);

            sendKeyToPm(editorView, 'ArrowDown');

            expect(editorView.state.doc).toEqualDocument(
              doc(blockquote(p(''), p('text')), p('text')),
            );
          });
        });

        describe('when there is no more content after the nested block', () => {
          it('creates a new paragraph below', () => {
            const { editorView, sel } = editor(
              doc(blockquote(p('text{<>}'), p(''))),
            );
            setNodeSelection(editorView, sel + 1);

            sendKeyToPm(editorView, 'ArrowDown');

            expect(editorView.state.doc).toEqualDocument(
              doc(blockquote(p('text'), p('')), p('')),
            );
            expect(trackEvent).toHaveBeenCalledWith(
              'atlassian.editor.movedown.keyboard',
            );
          });
        });
      });
    });
  });

  describe('when hits backspace', () => {
    it('should convert empty heading to paragraph', () => {
      const { editorView } = editor(doc(h1('{<>}')));
      sendKeyToPm(editorView, 'Backspace');
      expect(editorView.state.doc).toEqualDocument(doc(p('')));
    });

    it('should not convert heading with text to paragraph', () => {
      const { editorView } = editor(doc(h1('{<>}Content')));
      sendKeyToPm(editorView, 'Backspace');
      expect(editorView.state.doc).toEqualDocument(doc(h1('{<>}Content')));
    });
  });
});
