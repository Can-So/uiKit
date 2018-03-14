import {
  doc,
  createEditor,
  mediaGroup,
  media,
  p,
  h1,
  hr,
  mention,
  code_block,
  randomId,
  decisionItem,
  decisionList,
  taskItem,
  taskList,
} from '@atlaskit/editor-test-helpers';
import { insertMediaGroupNode } from '../../../src/plugins/media/utils/media-files';
import { setNodeSelection } from '../../../src/utils';
import mediaPlugin from '../../../src/plugins/media';
import mentionsPlugin from '../../../src/plugins/mentions';
import codeBlockPlugin from '../../../src/plugins/code-block';
import rulePlugin from '../../../src/plugins/rule';
import tasksAndDecisionsPlugin from '../../../src/plugins/tasks-and-decisions';

const testCollectionName = `media-plugin-mock-collection-${randomId()}`;

describe('media-files', () => {
  const temporaryFileId = `temporary:${randomId()}`;
  const editor = (doc: any, uploadErrorHandler?: () => void) =>
    createEditor({
      doc,
      editorPlugins: [
        mediaPlugin(),
        mentionsPlugin,
        codeBlockPlugin,
        rulePlugin,
        tasksAndDecisionsPlugin,
      ],
    });

  describe('when cursor is at the end of a text block', () => {
    it('inserts media node into the document after current paragraph node', () => {
      const { editorView } = editor(doc(p('text{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, status: 'uploading' }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          p('text'),
          mediaGroup(
            media({
              id: temporaryFileId,
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
          p(),
        ),
      );
      editorView.destroy();
    });

    it('puts cursor to the next paragraph after inserting media node', () => {
      const { editorView } = editor(doc(p('text{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, status: 'uploading' }],
        testCollectionName,
      );

      const paragraphNodeSize = p('text')(editorView.state.schema).nodeSize;
      const mediaGroupNodeSize = mediaGroup(
        media({
          id: temporaryFileId,
          type: 'file',
          collection: testCollectionName,
        })(),
      )(editorView.state.schema).nodeSize;
      expect(editorView.state.selection.from).toEqual(
        paragraphNodeSize + mediaGroupNodeSize + 1,
      );
      editorView.destroy();
    });

    it('should prepend media node to existing media group after it', () => {
      const { editorView } = editor(
        doc(
          p('text{<>}'),
          mediaGroup(
            media({
              id: temporaryFileId,
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
        ),
      );

      insertMediaGroupNode(
        editorView,
        [{ id: 'mock2', status: 'uploading' }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          p('text{<>}'),
          mediaGroup(
            media({
              id: 'mock2',
              type: 'file',
              collection: testCollectionName,
            })(),
            media({
              id: temporaryFileId,
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
        ),
      );
      editorView.destroy();
    });
  });

  describe('when cursor is at the beginning of a text block', () => {
    it('should prepend media node to existing media group before it', () => {
      const { editorView } = editor(
        doc(
          mediaGroup(
            media({
              id: temporaryFileId,
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
          p('{<>}text'),
        ),
      );

      insertMediaGroupNode(
        editorView,
        [{ id: 'mock2', status: 'uploading' }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          mediaGroup(
            media({
              id: 'mock2',
              type: 'file',
              collection: testCollectionName,
            })(),
            media({
              id: temporaryFileId,
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
          p('text'),
        ),
      );
      editorView.destroy();
    });
  });

  describe('when cursor is in the middle of a text block', () => {
    describe('when inside a paragraph', () => {
      it('splits text', () => {
        const { editorView } = editor(doc(p('te{<>}xt')));

        insertMediaGroupNode(
          editorView,
          [{ id: temporaryFileId, status: 'uploading' }],
          testCollectionName,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(
            p('te'),
            mediaGroup(
              media({
                id: temporaryFileId,
                type: 'file',
                collection: testCollectionName,
              })(),
            ),
            p('xt'),
          ),
        );
        editorView.destroy();
      });

      it('moves cursor to the front of later part of the text', () => {
        const { editorView } = editor(doc(p('te{<>}xt')));

        const paragraphNodeSize = p('te')(editorView.state.schema).nodeSize;
        const mediaGroupNodeSize = mediaGroup(
          media({
            id: temporaryFileId,
            type: 'file',
            collection: testCollectionName,
          })(),
        )(editorView.state.schema).nodeSize;

        insertMediaGroupNode(
          editorView,
          [{ id: temporaryFileId, status: 'uploading' }],
          testCollectionName,
        );

        expect(editorView.state.selection.from).toEqual(
          paragraphNodeSize + mediaGroupNodeSize + 1,
        );
        editorView.destroy();
      });
    });

    describe('when inside a heading', () => {
      it('preserves heading', () => {
        const { editorView } = editor(doc(h1('te{<>}xt')));

        insertMediaGroupNode(
          editorView,
          [{ id: temporaryFileId, status: 'uploading' }],
          testCollectionName,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(
            h1('te'),
            mediaGroup(
              media({
                id: temporaryFileId,
                type: 'file',
                collection: testCollectionName,
              })(),
            ),
            h1('xt'),
          ),
        );
        editorView.destroy();
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
            [{ id: temporaryFileId, status: 'uploading' }],
            testCollectionName,
          );

          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('te'),
              mediaGroup(
                media({
                  id: temporaryFileId,
                  type: 'file',
                  collection: testCollectionName,
                })(),
              ),
              p('t'),
            ),
          );
          editorView.destroy();
        });
      });

      describe('when selection covers the whole text block', () => {
        describe('when there is no existing media group nearby', () => {
          describe('when inside a paragraph', () => {
            it('replaces selection with a media node', () => {
              const { editorView } = editor(doc(p('{<}text{>}')));

              insertMediaGroupNode(
                editorView,
                [{ id: temporaryFileId, status: 'uploading' }],
                testCollectionName,
              );

              expect(editorView.state.doc).toEqualDocument(
                doc(
                  mediaGroup(
                    media({
                      id: temporaryFileId,
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                  ),
                  p(),
                ),
              );
              editorView.destroy();
            });
          });

          describe('when inside a heading', () => {
            it('replaces selection with a media node', () => {
              const { editorView } = editor(doc(h1('{<}text{>}')));

              insertMediaGroupNode(
                editorView,
                [{ id: temporaryFileId, status: 'uploading' }],
                testCollectionName,
              );

              expect(editorView.state.doc).toEqualDocument(
                doc(
                  h1(),
                  mediaGroup(
                    media({
                      id: temporaryFileId,
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                  ),
                  p(),
                ),
              );
              editorView.destroy();
            });
          });
        });

        describe('when there is an existing media group nearby', () => {
          it('prepand media to the media group after parent', () => {
            const { editorView } = editor(
              doc(
                mediaGroup(
                  media({
                    id: temporaryFileId,
                    type: 'file',
                    collection: testCollectionName,
                  })(),
                ),
                p('{<}text{>}'),
                mediaGroup(
                  media({
                    id: temporaryFileId,
                    type: 'file',
                    collection: testCollectionName,
                  })(),
                ),
              ),
            );

            insertMediaGroupNode(
              editorView,
              [{ id: 'new one', status: 'uploading' }],
              testCollectionName,
            );

            expect(editorView.state.doc).toEqualDocument(
              doc(
                mediaGroup(
                  media({
                    id: temporaryFileId,
                    type: 'file',
                    collection: testCollectionName,
                  })(),
                ),
                p(),
                mediaGroup(
                  media({
                    id: 'new one',
                    type: 'file',
                    collection: testCollectionName,
                  })(),
                  media({
                    id: temporaryFileId,
                    type: 'file',
                    collection: testCollectionName,
                  })(),
                ),
              ),
            );
            editorView.destroy();
          });
        });
      });

      describe('when selection is at the end of the text block', () => {
        it('replaces selection with a media node', () => {
          const { editorView } = editor(doc(p('te{<}xt{>}')));

          insertMediaGroupNode(
            editorView,
            [{ id: temporaryFileId, status: 'uploading' }],
            testCollectionName,
          );

          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('te'),
              mediaGroup(
                media({
                  id: temporaryFileId,
                  type: 'file',
                  collection: testCollectionName,
                })(),
              ),
              p(),
            ),
          );
          editorView.destroy();
        });

        it('prepends to exisiting media group after parent', () => {
          const { editorView } = editor(
            doc(
              p('te{<}xt{>}'),
              mediaGroup(
                media({
                  id: temporaryFileId,
                  type: 'file',
                  collection: testCollectionName,
                })(),
              ),
            ),
          );

          insertMediaGroupNode(
            editorView,
            [{ id: 'new one', status: 'uploading' }],
            testCollectionName,
          );

          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('te'),
              mediaGroup(
                media({
                  id: 'new one',
                  type: 'file',
                  collection: testCollectionName,
                })(),
                media({
                  id: temporaryFileId,
                  type: 'file',
                  collection: testCollectionName,
                })(),
              ),
            ),
          );
          editorView.destroy();
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
            [{ id: temporaryFileId, status: 'uploading' }],
            testCollectionName,
          );

          expect(editorView.state.doc).toEqualDocument(
            doc(
              p('text'),
              mediaGroup(
                media({
                  id: temporaryFileId,
                  type: 'file',
                  collection: testCollectionName,
                })(),
              ),
              p(),
            ),
          );
          editorView.destroy();
        });
      });

      describe('when selection is a media node', () => {
        it('prepends to the existsing media group', () => {
          const { editorView } = editor(
            doc(
              mediaGroup(
                media({
                  id: temporaryFileId,
                  type: 'file',
                  collection: testCollectionName,
                })(),
              ),
              p('text'),
            ),
          );
          setNodeSelection(editorView, 1);

          insertMediaGroupNode(
            editorView,
            [{ id: 'new one', status: 'uploading' }],
            testCollectionName,
          );

          expect(editorView.state.doc).toEqualDocument(
            doc(
              mediaGroup(
                media({
                  id: 'new one',
                  type: 'file',
                  collection: testCollectionName,
                })(),
                media({
                  id: temporaryFileId,
                  type: 'file',
                  collection: testCollectionName,
                })(),
              ),
              p('text'),
            ),
          );
          editorView.destroy();
        });

        it('sets cursor to the paragraph after', () => {
          const { editorView } = editor(
            doc(
              mediaGroup(
                media({
                  id: temporaryFileId,
                  type: 'file',
                  collection: testCollectionName,
                })(),
              ),
              p('text'),
            ),
          );
          setNodeSelection(editorView, 0);

          insertMediaGroupNode(
            editorView,
            [{ id: 'new one', status: 'uploading' }],
            testCollectionName,
          );
          const mediaGroupNodeSize = mediaGroup(
            media({
              id: 'new one',
              type: 'file',
              collection: testCollectionName,
            })(),
            media({
              id: temporaryFileId,
              type: 'file',
              collection: testCollectionName,
            })(),
          )(editorView.state.schema).nodeSize;

          expect(editorView.state.selection.from).toEqual(mediaGroupNodeSize);
          editorView.destroy();
        });
      });

      describe('when selection is a non media block node', () => {
        describe('when no exisiting media group', () => {
          it('replaces selection with a media node', () => {
            const { editorView } = editor(doc(hr()));
            setNodeSelection(editorView, 0);

            insertMediaGroupNode(
              editorView,
              [{ id: temporaryFileId, status: 'uploading' }],
              testCollectionName,
            );

            expect(editorView.state.doc).toEqualDocument(
              doc(
                mediaGroup(
                  media({
                    id: temporaryFileId,
                    type: 'file',
                    collection: testCollectionName,
                  })(),
                ),
                p(),
              ),
            );
            editorView.destroy();
          });
        });

        describe('when there are exisiting media group', () => {
          describe('when media group is in the front', () => {
            it('prepend media to the exisiting media group before', () => {
              const { editorView } = editor(
                doc(
                  mediaGroup(
                    media({
                      id: temporaryFileId,
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                  ),
                  hr(),
                ),
              );
              const mediaGroupNodeSize = mediaGroup(
                media({
                  id: temporaryFileId,
                  type: 'file',
                  collection: testCollectionName,
                })(),
              )(editorView.state.schema).nodeSize;
              setNodeSelection(editorView, mediaGroupNodeSize);

              insertMediaGroupNode(
                editorView,
                [{ id: 'new one', status: 'uploading' }],
                testCollectionName,
              );

              expect(editorView.state.doc).toEqualDocument(
                doc(
                  mediaGroup(
                    media({
                      id: 'new one',
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                    media({
                      id: temporaryFileId,
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                  ),
                  p(),
                ),
              );
              editorView.destroy();
            });
          });

          describe('when media group is at the end', () => {
            it('prepend media to the exisiting media group after', () => {
              const { editorView } = editor(
                doc(
                  hr(),
                  mediaGroup(
                    media({
                      id: temporaryFileId,
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                  ),
                ),
              );
              setNodeSelection(editorView, 0);

              insertMediaGroupNode(
                editorView,
                [{ id: 'new one', status: 'uploading' }],
                testCollectionName,
              );

              expect(editorView.state.doc).toEqualDocument(
                doc(
                  mediaGroup(
                    media({
                      id: 'new one',
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                    media({
                      id: temporaryFileId,
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                  ),
                ),
              );
              editorView.destroy();
            });
          });

          describe('when both sides have media groups', () => {
            it('prepend media to the exisiting media group after', () => {
              const { editorView } = editor(
                doc(
                  mediaGroup(
                    media({
                      id: temporaryFileId,
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                  ),
                  hr(),
                  mediaGroup(
                    media({
                      id: temporaryFileId,
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                  ),
                ),
              );
              const mediaGroupNodeSize = mediaGroup(
                media({
                  id: temporaryFileId,
                  type: 'file',
                  collection: testCollectionName,
                })(),
              )(editorView.state.schema).nodeSize;
              setNodeSelection(editorView, mediaGroupNodeSize);

              insertMediaGroupNode(
                editorView,
                [{ id: 'new one', status: 'uploading' }],
                testCollectionName,
              );

              expect(editorView.state.doc).toEqualDocument(
                doc(
                  mediaGroup(
                    media({
                      id: temporaryFileId,
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                  ),
                  mediaGroup(
                    media({
                      id: 'new one',
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                    media({
                      id: temporaryFileId,
                      type: 'file',
                      collection: testCollectionName,
                    })(),
                  ),
                ),
              );
              editorView.destroy();
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
          [{ id: temporaryFileId, status: 'uploading' }],
          testCollectionName,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(
            mediaGroup(
              media({
                id: temporaryFileId,
                type: 'file',
                collection: testCollectionName,
              })(),
            ),
            p('xt'),
          ),
        );
        editorView.destroy();
      });

      it('prepends to exisiting media group before parent', () => {
        const { editorView } = editor(
          doc(
            mediaGroup(
              media({
                id: temporaryFileId,
                type: 'file',
                collection: testCollectionName,
              })(),
            ),
            p('{<}te{>}xt'),
          ),
        );

        insertMediaGroupNode(
          editorView,
          [{ id: 'new one', status: 'uploading' }],
          testCollectionName,
        );

        expect(editorView.state.doc).toEqualDocument(
          doc(
            mediaGroup(
              media({
                id: 'new one',
                type: 'file',
                collection: testCollectionName,
              })(),
              media({
                id: temporaryFileId,
                type: 'file',
                collection: testCollectionName,
              })(),
            ),
            p('xt'),
          ),
        );
        editorView.destroy();
      });
    });
  });
  it(`should insert media node into the document after current heading node`, () => {
    const { editorView } = editor(doc(h1('text{<>}')));

    insertMediaGroupNode(
      editorView,
      [{ id: temporaryFileId, status: 'uploading' }],
      testCollectionName,
    );

    expect(editorView.state.doc).toEqualDocument(
      doc(
        h1('text'),
        mediaGroup(
          media({
            id: temporaryFileId,
            type: 'file',
            collection: testCollectionName,
          })(),
        ),
        p(),
      ),
    );
    editorView.destroy();
  });

  it(`should insert media node into the document after current codeblock node`, () => {
    const { editorView } = editor(doc(code_block()('text{<>}')));

    insertMediaGroupNode(
      editorView,
      [{ id: temporaryFileId, status: 'uploading' }],
      testCollectionName,
    );

    expect(editorView.state.doc).toEqualDocument(
      doc(
        code_block()('text'),
        mediaGroup(
          media({
            id: temporaryFileId,
            type: 'file',
            collection: testCollectionName,
          })(),
        ),
        p(),
      ),
    );
    editorView.destroy();
  });

  describe('inside empty block', () => {
    it('replaces empty paragraph with the media grroup in an empty document', () => {
      const { editorView } = editor(doc(p('{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, status: 'uploading' }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          mediaGroup(
            media({
              id: temporaryFileId,
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
          p(),
        ),
      );
      editorView.destroy();
    });

    it('apends media group to empty paragraph in an empty code block', () => {
      const { editorView } = editor(doc(code_block()('{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, status: 'uploading' }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          code_block()('{<>}'),
          mediaGroup(
            media({
              id: temporaryFileId,
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
          p(),
        ),
      );
      editorView.destroy();
    });

    it('apends media group to empty paragraph in an empty heading', () => {
      const { editorView } = editor(doc(h1('{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, status: 'uploading' }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          h1('{<>}'),
          mediaGroup(
            media({
              id: temporaryFileId,
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
          p(),
        ),
      );
      editorView.destroy();
    });

    it('prepends media to existing media group before the empty paragraph', () => {
      const { editorView } = editor(
        doc(
          mediaGroup(
            media({
              id: temporaryFileId,
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
          p('{<>}'),
        ),
      );

      insertMediaGroupNode(
        editorView,
        [{ id: 'another one', status: 'uploading' }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          mediaGroup(
            media({
              id: 'another one',
              type: 'file',
              collection: testCollectionName,
            })(),
            media({
              id: temporaryFileId,
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
          p(),
        ),
      );
      editorView.destroy();
    });

    it('should replace empty paragraph with mediaGroup and preserve next empty paragraph', () => {
      const { editorView } = editor(doc(p('{<>}'), p()));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, status: 'uploading' }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          mediaGroup(
            media({
              id: temporaryFileId,
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
          p(),
        ),
      );
      editorView.destroy();
    });

    it('should replace empty paragraph with mediaGroup and preserve previous empty paragraph', () => {
      const { editorView } = editor(doc(p(), p('{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, status: 'uploading' }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          p(),
          mediaGroup(
            media({
              id: temporaryFileId,
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
          p(),
        ),
      );
      editorView.destroy();
    });

    it('should insert all media nodes on the same line', async () => {
      const { editorView } = editor(doc(p('{<>}')));

      insertMediaGroupNode(
        editorView,
        [{ id: 'mock1' }, { id: 'mock2' }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          mediaGroup(
            media({
              id: 'mock1',
              type: 'file',
              collection: testCollectionName,
            })(),
            media({
              id: 'mock2',
              type: 'file',
              collection: testCollectionName,
            })(),
          ),
          p(),
        ),
      );
      editorView.destroy();
    });
  });

  describe('when selection is in a task or decision block', () => {
    it('media insertion ignored for task item', () => {
      const itemDoc = doc(
        taskList({ localId: 'id' })(taskItem({ localId: 'id' })('{<>}')),
      );
      const { editorView } = editor(itemDoc);

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, status: 'uploading' }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(itemDoc);
      editorView.destroy();
    });

    it('media insertion ignored for decision item', () => {
      const decisionDoc = doc(
        decisionList({ localId: 'id' })(
          decisionItem({ localId: 'id' })('{<>}'),
        ),
      );
      const { editorView } = editor(decisionDoc);

      insertMediaGroupNode(
        editorView,
        [{ id: temporaryFileId, status: 'uploading' }],
        testCollectionName,
      );

      expect(editorView.state.doc).toEqualDocument(decisionDoc);
      editorView.destroy();
    });
  });
});
