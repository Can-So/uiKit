import {
  compareSelection,
  createEditorFactory,
  doc,
  p,
  sendKeyToPm,
} from '@atlaskit/editor-test-helpers';
import tasksAndDecisionsPlugin from '../../../../plugins/tasks-and-decisions';

describe('Delete', () => {
  const createEditor = createEditorFactory();
  const editorFactory = (doc: any) =>
    createEditor({
      doc,
      editorPlugins: [tasksAndDecisionsPlugin],
    });

  it(`should merge paragraph and preserve content`, () => {
    const { editorView } = editorFactory(doc(p('Hello{<>}'), p('World')));

    sendKeyToPm(editorView, 'Delete');

    const expectedDoc = doc(p('Hello{<>}World'));
    expect(editorView.state.doc).toEqualDocument(expectedDoc);
    compareSelection(editorFactory, expectedDoc, editorView);
  });
});
