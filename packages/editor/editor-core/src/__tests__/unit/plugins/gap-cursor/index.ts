import { TextSelection } from 'prosemirror-state';
import {
  doc,
  createEditorFactory,
  p,
  blockquote,
  table,
  tr,
  td,
  tdCursor,
  sendKeyToPm,
  h1,
} from '@atlaskit/editor-test-helpers';

import { setTextSelection } from '../../../../index';
import { setGapCursorSelection } from '../../../../utils';
import gapCursorPlugin, {
  GapCursorSelection,
  Side,
} from '../../../../plugins/gap-cursor';
import { pluginKey } from '../../../../plugins/gap-cursor/pm-plugins/main';
import codeBlockPlugin from '../../../../plugins/code-block';
import rulePlugin from '../../../../plugins/rule';
import panelPlugin from '../../../../plugins/panel';
import tasksAndDecisionsPlugin from '../../../../plugins/tasks-and-decisions';
import tablesPlugin from '../../../../plugins/table';
import extensionPlugin from '../../../../plugins/extension';
import mediaPlugin from '../../../../plugins/media';

import {
  blockNodes,
  leafBlockNodes,
  BlockNodesKeys,
  LeafBlockNodesKeys,
} from './_utils';

describe('gap-cursor', () => {
  const createEditor = createEditorFactory();

  const editor = (doc: any, trackEvent?: () => {}) =>
    createEditor({
      doc,
      editorPlugins: [
        gapCursorPlugin,
        mediaPlugin({ allowMediaSingle: true }),
        extensionPlugin,
        tablesPlugin(),
        tasksAndDecisionsPlugin,
        codeBlockPlugin(),
        rulePlugin,
        panelPlugin,
      ],
      editorProps: {
        analyticsHandler: trackEvent,
      },
      pluginKey,
    });

  describe('when block nodes do not allow gap cursor', () => {
    describe('on specific nodes', () => {
      it('should not create a GapCursor selection for paragraph', () => {
        const { editorView } = editor(doc(p('{<>}')));
        sendKeyToPm(editorView, 'ArrowLeft');
        expect(editorView.state.selection instanceof TextSelection).toBe(true);
      });
      it('should not create a GapCursor selection for heading', () => {
        const { editorView } = editor(doc(h1('{<>}')));
        sendKeyToPm(editorView, 'ArrowLeft');
        expect(editorView.state.selection instanceof TextSelection).toBe(true);
      });
      it('should not create a GapCursor selection for blockquote', () => {
        const { editorView } = editor(doc(blockquote(p('{<>}'))));
        sendKeyToPm(editorView, 'ArrowLeft');
        expect(editorView.state.selection instanceof TextSelection).toBe(true);
      });
    });

    describe('when selection moving to preceding block node', () =>
      (Object.keys(blockNodes) as BlockNodesKeys).forEach(nodeName =>
        describe(nodeName, () =>
          it(`should create TextSelection on preceding ${nodeName}`, () => {
            const { editorView } = editor(
              doc(
                (blockNodes[nodeName] as any)(),
                (blockNodes[nodeName] as any)({ selected: true }),
              ),
            );
            sendKeyToPm(editorView, 'ArrowUp');
            expect(editorView.state.selection instanceof TextSelection).toBe(
              true,
            );
          }),
        ),
      ));

    describe('when selection moving to following block node', () =>
      (Object.keys(blockNodes) as BlockNodesKeys).forEach(nodeName =>
        describe(nodeName, () =>
          it(`should create TextSelection on following ${nodeName}`, () => {
            const { editorView } = editor(
              doc(
                (blockNodes[nodeName] as any)({ selected: true }),
                (blockNodes[nodeName] as any)(),
              ),
            );
            sendKeyToPm(editorView, 'ArrowDown');
            expect(editorView.state.selection instanceof TextSelection).toBe(
              true,
            );
          }),
        ),
      ));
  });

  describe('when block nodes allow gap cursor', () => {
    ['ArrowLeft', 'ArrowRight'].forEach(direction => {
      describe(`when pressing ${direction}`, () => {
        describe('when cursor is inside of a content block node', () => {
          (Object.keys(blockNodes) as BlockNodesKeys).forEach(nodeName => {
            describe(nodeName, () => {
              it('should set GapCursorSelection', () => {
                const { editorView } = editor(
                  doc((blockNodes[nodeName] as any)()),
                );
                sendKeyToPm(editorView, direction);
                expect(
                  editorView.state.selection instanceof GapCursorSelection,
                ).toBe(true);

                const expectedSide =
                  direction === 'ArrowLeft' ? Side.LEFT : Side.RIGHT;
                expect(
                  (editorView.state.selection as GapCursorSelection).side,
                ).toEqual(expectedSide);
              });
            });
          });
        });

        describe('when cursor is before or after a leaf block node', () => {
          (Object.keys(leafBlockNodes) as LeafBlockNodesKeys).forEach(
            nodeName => {
              describe(nodeName, () => {
                it('should set GapCursorSelection', () => {
                  const content =
                    direction === 'ArrowLeft'
                      ? doc(leafBlockNodes[nodeName], p('{<>}'))
                      : doc(p('{<>}'), leafBlockNodes[nodeName]);

                  const { editorView } = editor(content);
                  sendKeyToPm(editorView, direction);
                  expect(
                    editorView.state.selection instanceof GapCursorSelection,
                  ).toBe(true);

                  const expectedSide =
                    direction === 'ArrowLeft' ? Side.RIGHT : Side.LEFT;
                  expect(
                    (editorView.state.selection as GapCursorSelection).side,
                  ).toEqual(expectedSide);
                });
              });
            },
          );
        });
      });

      describe('when cursor is after a block node', () => {
        describe(`when pressing Backspace`, () => {
          (Object.keys(blockNodes) as BlockNodesKeys).forEach(nodeName => {
            describe(nodeName, () => {
              it(`should delete the ${nodeName}`, () => {
                const { editorView, refs } = editor(
                  doc((blockNodes[nodeName] as any)(), '{pos}'),
                );
                setGapCursorSelection(editorView, refs.pos, Side.RIGHT);
                sendKeyToPm(editorView, 'Backspace');

                expect(editorView.state.doc).toEqualDocument(doc(p('')));
                expect(
                  editorView.state.selection instanceof TextSelection,
                ).toBe(true);
              });
            });
          });
          (Object.keys(leafBlockNodes) as LeafBlockNodesKeys).forEach(
            nodeName => {
              describe(nodeName, () => {
                it(`should delete the ${nodeName}`, () => {
                  const { editorView, refs } = editor(
                    doc(leafBlockNodes[nodeName], '{pos}'),
                  );
                  setGapCursorSelection(editorView, refs.pos, Side.RIGHT);
                  sendKeyToPm(editorView, 'Backspace');

                  expect(editorView.state.doc).toEqualDocument(doc(p('')));
                  expect(
                    editorView.state.selection instanceof TextSelection,
                  ).toBe(true);
                });
              });
            },
          );
        });
      });

      describe('when cursor is before a block node', () => {
        describe(`when pressing Delete`, () => {
          (Object.keys(blockNodes) as BlockNodesKeys).forEach(nodeName => {
            describe(nodeName, () => {
              it(`should delete the ${nodeName}`, () => {
                const { editorView, refs } = editor(
                  doc('{pos}', (blockNodes[nodeName] as any)()),
                );
                setGapCursorSelection(editorView, refs.pos, Side.LEFT);
                sendKeyToPm(editorView, 'Delete');

                expect(editorView.state.doc).toEqualDocument(doc(p('')));
                expect(
                  editorView.state.selection instanceof TextSelection,
                ).toBe(true);
              });
            });
          });
          (Object.keys(leafBlockNodes) as LeafBlockNodesKeys).forEach(
            nodeName => {
              describe(nodeName, () => {
                it(`should delete the ${nodeName}`, () => {
                  const { editorView, refs } = editor(
                    doc('{pos}', leafBlockNodes[nodeName]),
                  );
                  setGapCursorSelection(editorView, refs.pos, Side.LEFT);
                  sendKeyToPm(editorView, 'Delete');

                  expect(editorView.state.doc).toEqualDocument(doc(p('')));
                  expect(
                    editorView.state.selection instanceof TextSelection,
                  ).toBe(true);
                });
              });
            },
          );
        });
      });
    });

    ['ArrowLeft', 'ArrowUp'].forEach(direction =>
      describe(`when pressing ${direction}`, () =>
        describe('when cursor is inside first content block node of document', () =>
          (Object.keys(blockNodes) as BlockNodesKeys).forEach(nodeName =>
            describe(nodeName, () =>
              it('should set GapCursorSelection', () => {
                const { editorView } = editor(
                  doc((blockNodes[nodeName] as any)()),
                );
                sendKeyToPm(editorView, direction);
                expect(
                  editorView.state.selection instanceof GapCursorSelection,
                ).toBe(true);
                expect(
                  (editorView.state.selection as GapCursorSelection).side,
                ).toEqual(Side.LEFT);
              }),
            ),
          ))),
    );
  });

  describe('when inside of a table', () => {
    describe('when cursor is at a cell to the right', () => {
      describe('when pressing ArrowLeft', () => {
        (Object.keys(blockNodes) as BlockNodesKeys).forEach(nodeName => {
          if (!/table|bodiedExtension/.test(nodeName)) {
            describe(nodeName, () => {
              it('should set GapCursorSelection', () => {
                const { editorView } = editor(
                  doc(
                    table()(
                      tr(td()((blockNodes[nodeName] as any)()), tdCursor),
                    ),
                  ),
                );
                sendKeyToPm(editorView, 'ArrowLeft');
                expect(
                  editorView.state.selection instanceof GapCursorSelection,
                ).toBe(true);
                expect(
                  (editorView.state.selection as GapCursorSelection).side,
                ).toEqual(Side.RIGHT);
              });
            });
          }
        });

        (Object.keys(leafBlockNodes) as LeafBlockNodesKeys).forEach(
          nodeName => {
            describe(nodeName, () => {
              it('should set GapCursorSelection', () => {
                const { editorView } = editor(
                  doc(table()(tr(td()(leafBlockNodes[nodeName]), tdCursor))),
                );
                sendKeyToPm(editorView, 'ArrowLeft');
                expect(
                  editorView.state.selection instanceof GapCursorSelection,
                ).toBe(true);
                expect(
                  (editorView.state.selection as GapCursorSelection).side,
                ).toEqual(Side.RIGHT);
              });
            });
          },
        );
      });
    });

    describe('when cursor is at a cell to the left', () => {
      describe('when pressing ArrowRight', () => {
        (Object.keys(blockNodes) as BlockNodesKeys).forEach(nodeName => {
          if (!/table|bodiedExtension/.test(nodeName)) {
            describe(nodeName, () => {
              it('should set GapCursorSelection', () => {
                const { editorView, refs } = editor(
                  doc(
                    table()(
                      tr(
                        td()(p('{nextPos}')),
                        td()((blockNodes[nodeName] as any)()),
                      ),
                    ),
                  ),
                );
                const { nextPos } = refs;
                setTextSelection(editorView, nextPos);
                sendKeyToPm(editorView, 'ArrowRight');
                expect(
                  editorView.state.selection instanceof GapCursorSelection,
                ).toBe(true);
                expect(
                  (editorView.state.selection as GapCursorSelection).side,
                ).toEqual(Side.LEFT);
              });
            });
          }
        });

        (Object.keys(leafBlockNodes) as LeafBlockNodesKeys).forEach(
          nodeName => {
            describe(nodeName, () => {
              it('should set GapCursorSelection', () => {
                const { editorView, refs } = editor(
                  doc(
                    table()(
                      tr(td()(p('{nextPos}')), td()(leafBlockNodes[nodeName])),
                    ),
                  ),
                );
                const { nextPos } = refs;
                setTextSelection(editorView, nextPos);
                sendKeyToPm(editorView, 'ArrowRight');
                expect(
                  editorView.state.selection instanceof GapCursorSelection,
                ).toBe(true);
                expect(
                  (editorView.state.selection as GapCursorSelection).side,
                ).toEqual(Side.LEFT);
              });
            });
          },
        );
      });
    });
  });

  describe('when hit backspace at the start of the node on the left', () => {
    it('should put gapcursor on the right of the previous node', () => {
      const { editorView } = editor(
        doc(
          blockNodes['decisionList'](),
          blockNodes['taskList']({ selected: true }),
        ),
      );
      sendKeyToPm(editorView, 'ArrowLeft');
      expect(editorView.state.selection instanceof GapCursorSelection).toBe(
        true,
      );
      expect((editorView.state.selection as GapCursorSelection).side).toEqual(
        Side.LEFT,
      );
      sendKeyToPm(editorView, 'Backspace');
      expect((editorView.state.selection as GapCursorSelection).side).toEqual(
        Side.RIGHT,
      );
    });
  });
});
