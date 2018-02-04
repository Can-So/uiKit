import { NodeSelection } from 'prosemirror-state';
import {
  createEditor,
  doc,
  p,
  blockquote,
  decisionList,
  decisionItem,
  taskList,
  taskItem,
  mediaGroup,
  media,
} from '@atlaskit/editor-test-helpers';
import { uuid } from '@atlaskit/editor-common';
import { changeToTaskDecision } from '../../../src/plugins/tasks-and-decisions/commands';
import tasksAndDecisionsPlugin from '../../../src/editor/plugins/tasks-and-decisions';
import mediaPlugin from '../../../src/editor/plugins/media';
import hyperlinkPlugin from '../../../src/editor/plugins/hyperlink';

describe('tasks and decisions - commands', () => {
  beforeEach(() => {
    uuid.setStatic('local-highlight');
  });

  afterEach(() => {
    uuid.setStatic(false);
  });

  const editor = (doc: any) =>
    createEditor({
      doc,
      editorPlugins: [tasksAndDecisionsPlugin, mediaPlugin(), hyperlinkPlugin],
    });

  describe('changeToTaskDecision', () => {
    it('can convert paragraph node to action/decision', () => {
      const { editorView } = editor(doc(p('Hello World')));
      const { state } = editorView;
      const { tr } = state;
      tr.setSelection(new NodeSelection(tr.doc.resolve(1)));
      expect(changeToTaskDecision(editorView, 'taskList')).toBe(true);
    });

    it('can convert decision item to action', () => {
      const { editorView } = editor(
        doc(
          decisionList({ localId: 'local-highlight' })(
            decisionItem({ localId: 'local-highlight' })('Hello World'),
          ),
        ),
      );
      const { state } = editorView;
      const { tr } = state;
      tr.setSelection(new NodeSelection(tr.doc.resolve(1)));
      expect(changeToTaskDecision(editorView, 'taskList')).toBe(true);
    });

    it('can convert action item to decision', () => {
      const { editorView } = editor(
        doc(
          taskList({ localId: 'local-highlight' })(
            taskItem({ localId: 'local-highlight' })('Hello World'),
          ),
        ),
      );
      const { state } = editorView;
      const { tr } = state;
      tr.setSelection(new NodeSelection(tr.doc.resolve(1)));
      expect(changeToTaskDecision(editorView, 'decisionList')).toBe(true);
    });

    it('can convert blockquote to action/decision', () => {
      const { editorView } = editor(doc(blockquote(p('Text'))));
      const { state } = editorView;
      const { tr } = state;
      tr.setSelection(new NodeSelection(tr.doc.resolve(1)));
      expect(changeToTaskDecision(editorView, 'decisionList')).toBe(true);
    });

    it('cannot convert media node to action/decision', () => {
      const { editorView } = editor(
        doc(
          mediaGroup(
            media({
              id: 'test',
              type: 'file',
              collection: 'blah',
            })(),
          ),
        ),
      );
      const { state } = editorView;
      const { tr } = state;
      tr.setSelection(new NodeSelection(tr.doc.resolve(1)));
      expect(changeToTaskDecision(editorView, 'taskList')).toBe(false);
    });
  });
});
