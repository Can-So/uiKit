import {
  doc,
  createEditorFactory,
  mediaGroup,
  media,
  p,
  h1,
  hr,
  ul,
  li,
  mention,
  code_block,
  panel,
} from '@atlaskit/editor-test-helpers';
import {
  insertMediaGroupNode,
  getPosInList,
} from '../../../../plugins/media/utils/media-files';
import { setNodeSelection } from '../../../../utils';
import mediaPlugin from '../../../../plugins/media';
import listsPlugin from '../../../../plugins/lists';
import mentionsPlugin from '../../../../plugins/mentions';
import codeBlockPlugin from '../../../../plugins/code-block';
import rulePlugin from '../../../../plugins/rule';
import { panelPlugin } from '../../../../plugins';
import {
  testCollectionName,
  temporaryMediaGroup,
  temporaryFileId,
  temporaryMedia,
  insertMediaGroupItem,
} from './_utils';

describe('media-files', () => {
  const createEditor = createEditorFactory();
  const editor = (doc: any, uploadErrorHandler?: () => void) =>
    createEditor({
      doc,
      editorPlugins: [
        mediaPlugin(),
        mentionsPlugin(),
        codeBlockPlugin(),
        rulePlugin,
        listsPlugin,
        panelPlugin,
      ],
    });

  describe('when cursor is at the end of a text block', () => {
    it('inserts media node into the document after current paragraph node', () => {
      const { editorView } = editor(doc(p('text{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(p('text'), temporaryMediaGroup, p()),
      );
    });

    it('puts cursor to the next paragraph after inserting media node', () => {
      const { editorView } = editor(doc(p('text{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
        testCollectionName,
      );

      const paragraphNodeSize = p('text')(editorView.state.schema).nodeSize;
      const mediaGroupNodeSize = temporaryMediaGroup(editorView.state.schema)
        .nodeSize;
      expect(editorView.state.selection.from).toEqual(
        paragraphNodeSize + mediaGroupNodeSize + 1,
      );
    });

    it('should prepend media node to existing media group after it', () => {
      const { editorView } = editor(doc(p('text{<>}'), temporaryMediaGroup));

      insertMediaGroupNode(
        editorView,
        [{ id: 'mock2', fileId: Promise.resolve('id') }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          p('text{<>}'),
          mediaGroup(
            media({
              id: 'mock2',
              __key: 'mock2',
              type: 'file',
              collection: testCollectionName,
            })(),
            temporaryMedia,
          ),
        ),
      );
    });
  });

  describe('when cursor is at the beginning of a text block', () => {
    it('should prepend media node to existing media group before it', () => {
      const { editorView } = editor(doc(temporaryMediaGroup, p('{<>}text')));

      insertMediaGroupNode(
        editorView,
        [{ id: 'mock2', fileId: Promise.resolve('id') }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          mediaGroup(
            media({
              id: 'mock2',
              __key: 'mock2',
              type: 'file',
              collection: testCollectionName,
            })(),
            temporaryMedia,
          ),
          p('text'),
        ),
      );
    });
  });

  describe('when cursor is in the middle of a text block', () => {
    describe('when inside a paragraph', () => {
      it('splits text', () => {
        const { editorView } = editor(doc(p('te{<>}xt')));

        insertMediaGroupNode(
          editorView,
          [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
          testCollectionName,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(p('te'), temporaryMediaGroup, p('xt')),
        );
      });

      it('moves cursor to the front of later part of the text', () => {
        const { editorView } = editor(doc(p('te{<>}xt')));

        const paragraphNodeSize = p('te')(editorView.state.schema).nodeSize;
        const mediaGroupNodeSize = temporaryMediaGroup(editorView.state.schema)
          .nodeSize;

        insertMediaGroupNode(
          editorView,
          [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
          testCollectionName,
        );

        expect(editorView.state.selection.from).toEqual(
          paragraphNodeSize + mediaGroupNodeSize + 1,
        );
      });
    });

    describe('when inside a heading', () => {
      it('preserves heading', () => {
        const { editorView } = editor(doc(h1('te{<>}xt')));

        insertMediaGroupNode(
          editorView,
          [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
          testCollectionName,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(h1('te'), temporaryMediaGroup, h1('xt')),
        );
      });
    });
  });
  describe('when selection is not empty', () => {
    describe('when selection is a text', () => {
      describe('when selection is in the middle of the text block', () => {
        it('replaces selection with a media node', () => {
          const { editorView } = editor(doc(p('te{<}x{>}t')));

          insertMediaGroupNode(
            editorView,
            [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
            testCollectionName,
          );

          expect(editorView.state.doc).toEqualDocument(
            doc(p('te'), temporaryMediaGroup, p('t')),
          );
        });
      });

      describe('when selection covers the whole text block', () => {
        describe('when there is no existing media group nearby', () => {
          describe('when inside a paragraph', () => {
            it('replaces selection with a media node', () => {
              const { editorView } = editor(doc(p('{<}text{>}')));

              insertMediaGroupNode(
                editorView,
                [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
                testCollectionName,
              );

              expect(editorView.state.doc).toEqualDocument(
                doc(temporaryMediaGroup, p()),
              );
            });
          });

          describe('when inside a heading', () => {
            it('replaces selection with a media node', () => {
              const { editorView } = editor(doc(h1('{<}text{>}')));

              insertMediaGroupNode(
                editorView,
                [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
                testCollectionName,
              );

              expect(editorView.state.doc).toEqualDocument(
                doc(h1(), temporaryMediaGroup, p()),
              );
            });
          });
        });

        describe('when there is an existing media group nearby', () => {
          it('prepend media to the media group after parent', () => {
            const { editorView } = editor(
              doc(temporaryMediaGroup, p('{<}text{>}'), temporaryMediaGroup),
            );

            const newMedia = insertMediaGroupItem(editorView, 'new one');

            expect(editorView.state.doc).toEqualDocument(
              doc(
                temporaryMediaGroup,
                p(),
                mediaGroup(newMedia, temporaryMedia),
              ),
            );
          });
        });
      });

      describe('when selection is at the end of the text block', () => {
        it('replaces selection with a media node', () => {
          const { editorView } = editor(doc(p('te{<}xt{>}')));

          insertMediaGroupNode(
            editorView,
            [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
            testCollectionName,
          );

          expect(editorView.state.doc).toEqualDocument(
            doc(p('te'), temporaryMediaGroup, p()),
          );
        });

        it('prepends to existing media group after parent', () => {
          const { editorView } = editor(
            doc(p('te{<}xt{>}'), temporaryMediaGroup),
          );

          insertMediaGroupNode(
            editorView,
            [{ id: 'new one', fileId: Promise.resolve('id') }],
            testCollectionName,
          );

          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('te'),
              mediaGroup(
                media({
                  id: 'new one',
                  __key: 'new one',
                  type: 'file',
                  collection: testCollectionName,
                })(),
                temporaryMedia,
              ),
            ),
          );
        });
      });
    });

    describe('when selection is a node', () => {
      describe('when selection is an inline node', () => {
        it('replaces selection with a media node', () => {
          const { editorView, sel } = editor(
            doc(p('text{<>}', mention({ id: 'foo1', text: '@bar1' })())),
          );
          setNodeSelection(editorView, sel);

          insertMediaGroupNode(
            editorView,
            [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
            testCollectionName,
          );

          expect(editorView.state.doc).toEqualDocument(
            doc(p('text'), temporaryMediaGroup, p()),
          );
        });
      });

      describe('when selection is a media node', () => {
        it('prepends to the existing media group', () => {
          const { editorView } = editor(doc(temporaryMediaGroup, p('text')));
          setNodeSelection(editorView, 1);

          insertMediaGroupNode(
            editorView,
            [{ id: 'new one', fileId: Promise.resolve('id') }],
            testCollectionName,
          );

          expect(editorView.state.doc).toEqualDocument(
            doc(
              mediaGroup(
                temporaryMedia,
                media({
                  id: 'new one',
                  __key: 'new one',
                  type: 'file',
                  collection: testCollectionName,
                })(),
              ),
              p('text'),
            ),
          );
        });

        it('prepends to the existing media group - w/o any following paragraph', () => {
          const { editorView } = editor(doc(temporaryMediaGroup));
          setNodeSelection(editorView, 1);

          insertMediaGroupNode(
            editorView,
            [{ id: 'new one', fileId: Promise.resolve('id') }],
            testCollectionName,
          );

          expect(editorView.state.doc).toEqualDocument(
            doc(
              mediaGroup(
                temporaryMedia,
                media({
                  id: 'new one',
                  __key: 'new one',
                  type: 'file',
                  collection: testCollectionName,
                })(),
              ),
            ),
          );
        });

        it('sets cursor to the paragraph after', () => {
          const { editorView } = editor(doc(temporaryMediaGroup, p('text')));
          setNodeSelection(editorView, 1);

          insertMediaGroupNode(
            editorView,
            [{ id: 'new one', fileId: Promise.resolve('id') }],
            testCollectionName,
          );
          const mediaGroupNodeSize = mediaGroup(
            media({
              id: 'new one',
              __key: 'new one',
              type: 'file',
              collection: testCollectionName,
            })(),
            temporaryMedia,
          )(editorView.state.schema).nodeSize;

          expect(editorView.state.selection.from).toEqual(
            mediaGroupNodeSize + 1,
          );
        });
      });

      describe('when selection is a non media block node', () => {
        describe('when no existing media group', () => {
          it('append a media node under selected node', () => {
            const { editorView } = editor(doc(hr()));
            setNodeSelection(editorView, 0);

            insertMediaGroupNode(
              editorView,
              [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
              testCollectionName,
            );

            expect(editorView.state.doc).toEqualDocument(
              doc(hr(), temporaryMediaGroup, p()),
            );
          });
        });

        describe('when there are exisiting media group', () => {
          describe('when media group is in the front of selected node', () => {
            it('append media below selected node', () => {
              const { editorView } = editor(doc(temporaryMediaGroup, hr()));
              const mediaGroupNodeSize = temporaryMediaGroup(
                editorView.state.schema,
              ).nodeSize;
              setNodeSelection(editorView, mediaGroupNodeSize);

              insertMediaGroupNode(
                editorView,
                [{ id: 'new one', fileId: Promise.resolve('id') }],
                testCollectionName,
              );

              expect(editorView.state.doc).toEqualDocument(
                doc(
                  temporaryMediaGroup,
                  hr(),
                  mediaGroup(
                    media({
                      id: 'new one',
                      __key: 'new one',
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                  ),
                  p(),
                ),
              );
            });
          });

          describe('when media group is at the end', () => {
            it('prepend media to the exisiting media group after', () => {
              const { editorView } = editor(doc(hr(), temporaryMediaGroup));
              setNodeSelection(editorView, 0);

              insertMediaGroupNode(
                editorView,
                [{ id: 'new one', fileId: Promise.resolve('id') }],
                testCollectionName,
              );

              expect(editorView.state.doc).toEqualDocument(
                doc(
                  hr(),
                  mediaGroup(
                    media({
                      id: 'new one',
                      __key: 'new one',
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                    temporaryMedia,
                  ),
                ),
              );
            });
          });

          describe('when both sides have media groups', () => {
            it('prepend media to the exisiting media group after', () => {
              const { editorView } = editor(
                doc(temporaryMediaGroup, hr(), temporaryMediaGroup),
              );
              const mediaGroupNodeSize = temporaryMediaGroup(
                editorView.state.schema,
              ).nodeSize;
              setNodeSelection(editorView, mediaGroupNodeSize);

              insertMediaGroupNode(
                editorView,
                [{ id: 'new one', fileId: Promise.resolve('id') }],
                testCollectionName,
              );

              expect(editorView.state.doc).toEqualDocument(
                doc(
                  temporaryMediaGroup,
                  hr(),
                  mediaGroup(
                    media({
                      id: 'new one',
                      __key: 'new one',
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                    temporaryMedia,
                  ),
                ),
              );
            });
          });
        });
      });
    });

    describe('when selection is at the beginning of the text block', () => {
      it('replaces selection with a media node', () => {
        const { editorView } = editor(doc(p('{<}te{>}xt')));

        insertMediaGroupNode(
          editorView,
          [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
          testCollectionName,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(temporaryMediaGroup, p('xt')),
        );
      });

      it('prepends to exisiting media group before parent', () => {
        const { editorView } = editor(
          doc(temporaryMediaGroup, p('{<}te{>}xt')),
        );

        insertMediaGroupNode(
          editorView,
          [{ id: 'new one', fileId: Promise.resolve('id') }],
          testCollectionName,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(
            mediaGroup(
              media({
                id: 'new one',
                __key: 'new one',
                type: 'file',
                collection: testCollectionName,
              })(),
              temporaryMedia,
            ),
            p('xt'),
          ),
        );
      });
    });
  });

  it(`should insert media node into the document after current heading node`, () => {
    const { editorView } = editor(doc(h1('text{<>}')));

    insertMediaGroupNode(
      editorView,
      [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
      testCollectionName,
    );

    expect(editorView.state.doc).toEqualDocument(
      doc(h1('text'), temporaryMediaGroup, p()),
    );
  });

  it(`should insert media node into the document after current codeblock node`, () => {
    const { editorView } = editor(doc(code_block()('text{<>}')));

    insertMediaGroupNode(
      editorView,
      [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
      testCollectionName,
    );

    expect(editorView.state.doc).toEqualDocument(
      doc(code_block()('text'), temporaryMediaGroup, p()),
    );
  });

  describe('inside empty block', () => {
    it('replaces empty paragraph with the media grroup in an empty document', () => {
      const { editorView } = editor(doc(p('{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(temporaryMediaGroup, p()),
      );
    });

    it('apends media group to empty paragraph in an empty code block', () => {
      const { editorView } = editor(doc(code_block()('{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(code_block()('{<>}'), temporaryMediaGroup, p()),
      );
    });

    it('apends media group to empty paragraph in an empty heading', () => {
      const { editorView } = editor(doc(h1('{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(h1('{<>}'), temporaryMediaGroup, p()),
      );
    });

    it('prepends media to existing media group before the empty paragraph', () => {
      const { editorView } = editor(doc(temporaryMediaGroup, p('{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: 'another one', fileId: Promise.resolve('id') }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          mediaGroup(
            media({
              id: 'another one',
              __key: 'another one',
              type: 'file',
              collection: testCollectionName,
            })(),
            temporaryMedia,
          ),
          p(),
        ),
      );
    });

    it('should replace empty paragraph with mediaGroup and preserve next empty paragraph', () => {
      const { editorView } = editor(doc(p('{<>}'), p()));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(temporaryMediaGroup, p()),
      );
    });

    it('should replace empty paragraph with mediaGroup and preserve previous empty paragraph', () => {
      const { editorView } = editor(doc(p(), p('{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(p(), temporaryMediaGroup, p()),
      );
    });

    it('should insert all media nodes on the same line', async () => {
      const { editorView } = editor(doc(p('{<>}')));

      insertMediaGroupNode(
        editorView,
        [
          { id: 'mock1', fileId: Promise.resolve('id') },
          { id: 'mock2', fileId: Promise.resolve('id') },
        ],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          mediaGroup(
            media({
              id: 'mock1',
              __key: 'mock1',
              type: 'file',
              collection: testCollectionName,
            })(),
            media({
              id: 'mock2',
              __key: 'mock2',
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
          p(),
        ),
      );
    });
  });

  describe('when selections is inside panel', () => {
    it('should append media below panel', () => {
      const panelDoc = doc(panel({})(p('{<>}')));
      const { editorView } = editor(panelDoc);
      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, fileId: Promise.resolve('id') }],
        testCollectionName,
      );
      expect(editorView.state.doc).toEqualDocument(
        doc(panel({})(p('')), temporaryMediaGroup, p('')),
      );
    });
  });

  describe('when inside a list', () => {
    it('should get pos after existing list', () => {
      const complexList = doc(
        ul(
          li(
            p('first'),
            ul(
              li(p('second')),
              li(p('thiird'), ul(li(p('fourth')), li(p('fifth{<>}')))),
            ),
          ),
        ),
      );

      const { editorView } = editor(complexList);
      const rootList = editorView.state.doc.nodeAt(0)!;
      const startPosition = 0;

      const endListPos = startPosition + rootList.nodeSize;

      const posInList = getPosInList(editorView.state);

      expect(posInList).not.toBeUndefined();
      expect(posInList).toEqual(endListPos);
    });

    it('should get pos in media group', () => {
      const complexList = doc(
        ul(
          li(
            p('first'),
            ul(
              li(p('second')),
              li(p('thiird'), ul(li(p('fourth')), li(p('fifth{<>}')))),
            ),
          ),
        ),
        mediaGroup(
          media({
            id: temporaryFileId,
            __key: temporaryFileId,
            type: 'file',
            collection: testCollectionName,
          })(),
        ),
        p(''),
      );

      const { editorView } = editor(complexList);
      const rootList = editorView.state.doc.nodeAt(0)!;
      const startPosition = 0;

      const endListPos = startPosition + rootList.nodeSize;

      const posInList = getPosInList(editorView.state);

      expect(posInList).not.toBeUndefined();
      expect(posInList).toEqual(endListPos + 1); // endListPos + 1 is the media group
    });
  });
});
