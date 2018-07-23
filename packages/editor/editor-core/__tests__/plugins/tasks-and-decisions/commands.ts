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
  br,
  panel,
} from '@atlaskit/editor-test-helpers';
import { uuid } from '@atlaskit/editor-common';
import { changeToTaskDecision } from '../../../src/plugins/tasks-and-decisions/commands';
import tasksAndDecisionsPlugin from '../../../src/plugins/tasks-and-decisions';
import mediaPlugin from '../../../src/plugins/media';
import panelPlugin from '../../../src/plugins/panel';

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
      editorPlugins: [tasksAndDecisionsPlugin, mediaPlugin(), panelPlugin],
    });

  describe('changeToTaskDecision', () => {
    it('can convert paragraph node to action/decision', () => {
      const { editorView } = editor(doc(p('Hello{<>} World')));
      expect(changeToTaskDecision(editorView, 'taskList')).toBe(true);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          taskList({ localId: 'local-highlight' })(
            taskItem({ localId: 'local-highlight', state: 'TODO' })(
              'Hello World',
            ),
          ),
        ),
      );
    });

    it('can convert decision item to action', () => {
      const { editorView } = editor(
        doc(
          decisionList({ localId: 'local-highlight' })(
            decisionItem({ localId: 'local-highlight' })('Hello World'),
          ),
        ),
      );
      expect(changeToTaskDecision(editorView, 'taskList')).toBe(true);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          taskList({ localId: 'local-highlight' })(
            taskItem({ localId: 'local-highlight', state: 'TODO' })(
              'Hello World',
            ),
          ),
        ),
      );
    });

    it('can convert action item to decision', () => {
      const { editorView } = editor(
        doc(
          taskList({ localId: 'local-highlight' })(
            taskItem({ localId: 'local-highlight' })('Hello World'),
          ),
        ),
      );
      expect(changeToTaskDecision(editorView, 'decisionList')).toBe(true);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          decisionList({ localId: 'local-highlight' })(
            decisionItem({ localId: 'local-highlight' })('Hello World'),
          ),
        ),
      );
    });

    it('can convert blockquote to action/decision', () => {
      const { editorView } = editor(doc(blockquote(p('Hello{<>} World'))));
      expect(changeToTaskDecision(editorView, 'taskList')).toBe(true);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          taskList({ localId: 'local-highlight' })(
            taskItem({ localId: 'local-highlight', state: 'TODO' })(
              'Hello World',
            ),
          ),
        ),
      );
    });

    it('can convert content with hardbreaks to action/decision', () => {
      const { editorView } = editor(doc(p('Hello', br(), ' World')));
      expect(changeToTaskDecision(editorView, 'taskList')).toBe(true);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          taskList({ localId: 'local-highlight' })(
            taskItem({ localId: 'local-highlight', state: 'TODO' })(
              'Hello',
              br(),
              ' World',
            ),
          ),
        ),
      );
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

    describe('when cursor is inside of a block node', () => {
      it('should append an empty task list after the parent block node', () => {
        const { editorView } = editor(doc(panel()(p('te{<>}xt'))));
        changeToTaskDecision(editorView, 'taskList');

        expect(editorView.state.doc).toEqualDocument(
          doc(
            panel()(p('text')),
            taskList({ localId: 'local-highlight' })(
              taskItem({ localId: 'local-highlight', state: 'TODO' })(''),
            ),
          ),
        );
      });
    });

    describe('when cursor is inside empty task item', () => {
      it('should not create another task item', () => {
        const { editorView } = editor(
          doc(
            taskList({ localId: 'local-highlight' })(
              taskItem({ localId: 'local-highlight', state: 'TODO' })('{<>}'),
            ),
          ),
        );
        changeToTaskDecision(editorView, 'taskList');

        expect(editorView.state.doc).toEqualDocument(
          doc(
            taskList({ localId: 'local-highlight' })(
              taskItem({ localId: 'local-highlight', state: 'TODO' })(),
            ),
          ),
        );
      });
    });

    describe('when cursor is inside non-empty task item', () => {
      it('should add a task item to task list', () => {
        const { editorView } = editor(
          doc(
            taskList({ localId: 'local-highlight' })(
              taskItem({ localId: 'local-highlight', state: 'TODO' })(
                'Hello World{<>}',
              ),
            ),
          ),
        );
        changeToTaskDecision(editorView, 'taskList');

        expect(editorView.state.doc).toEqualDocument(
          doc(
            taskList({ localId: 'local-highlight' })(
              taskItem({ localId: 'local-highlight', state: 'TODO' })(
                'Hello World',
              ),
              taskItem({ localId: 'local-highlight', state: 'TODO' })(''),
            ),
          ),
        );
      });
    });

    describe('switching back and forth between types is possible FS-2800', () => {
      it('should change p -> taskList -> decisionList -> taskList', () => {
        const { editorView } = editor(doc(p('Hello{<>}')));

        expect(changeToTaskDecision(editorView, 'taskList')).toBe(true);
        expect(editorView.state.doc).toEqualDocument(
          doc(
            taskList({ localId: 'local-highlight' })(
              taskItem({ localId: 'local-highlight', state: 'TODO' })('Hello'),
            ),
          ),
        );

        expect(changeToTaskDecision(editorView, 'decisionList')).toBe(true);
        expect(editorView.state.doc).toEqualDocument(
          doc(
            decisionList({ localId: 'local-highlight' })(
              decisionItem({ localId: 'local-highlight', state: 'DECIDED' })(
                'Hello',
              ),
            ),
          ),
        );

        expect(changeToTaskDecision(editorView, 'taskList')).toBe(true);
        expect(editorView.state.doc).toEqualDocument(
          doc(
            taskList({ localId: 'local-highlight' })(
              taskItem({ localId: 'local-highlight', state: 'TODO' })('Hello'),
            ),
          ),
        );
      });
    });

    it('should change p -> decisionList -> taskList -> decisionList', () => {
      const { editorView } = editor(doc(p('Hello{<>}')));

      expect(changeToTaskDecision(editorView, 'decisionList')).toBe(true);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          decisionList({ localId: 'local-highlight' })(
            decisionItem({ localId: 'local-highlight', state: 'DECIDED' })(
              'Hello',
            ),
          ),
        ),
      );

      expect(changeToTaskDecision(editorView, 'taskList')).toBe(true);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          taskList({ localId: 'local-highlight' })(
            taskItem({ localId: 'local-highlight', state: 'TODO' })('Hello'),
          ),
        ),
      );

      expect(changeToTaskDecision(editorView, 'decisionList')).toBe(true);
      expect(editorView.state.doc).toEqualDocument(
        doc(
          decisionList({ localId: 'local-highlight' })(
            decisionItem({ localId: 'local-highlight', state: 'DECIDED' })(
              'Hello',
            ),
          ),
        ),
      );
    });
  });
});
