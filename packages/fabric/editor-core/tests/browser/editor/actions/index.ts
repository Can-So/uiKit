import { name } from '../../../../package.json';
import { expect } from 'chai';
import createEditor from '../../../helpers/create-editor';
import { doc, p, blockquote, decisionList, decisionItem, taskList, taskItem } from '@atlaskit/editor-test-helpers';
import { EditorView } from 'prosemirror-view';
import { JSONTransformer, Transformer } from '../../../../src/transformers';
import tasksAndDecisionsPlugin from '../../../../src/editor/plugins/tasks-and-decisions';
import EditorActions from '../../../../src/editor/actions';
import { toJSON } from '../../../../src/utils';

const jsonTransformer = new JSONTransformer();

const dummyTransformer: Transformer<string> = {
  parse: content => doc(blockquote(content)),
  encode: node => node.textContent,
};

describe(name, () => {
  describe('EditorActions', () => {
    let editorActions: EditorActions;
    let editorView: EditorView;
    beforeEach(() => {
      const editor = createEditor(
        [tasksAndDecisionsPlugin]
      );
      editorActions = new EditorActions();
      editorActions._privateRegisterEditor(editor.editorView);
      editorView = editor.editorView;
    });

    afterEach(() => {
      editorView.destroy();
    });

    describe('#focus', () => {
      it('should set focus to an editor', () => {
        expect(editorActions.focus()).to.equal(true);
        expect(editorView.hasFocus()).to.equal(true);
      });

      it('should not set focus if it has been already set', () => {
        editorActions.focus();
        expect(editorActions.focus()).to.equal(false);
        expect(editorView.hasFocus()).to.equal(true);
      });
    });

    describe('#blur', () => {
      it(`should not blur editor if it doesn't have focus`, () => {
        expect(editorActions.blur()).to.equal(false);
        expect(editorView.hasFocus()).to.equal(false);
      });

      // TODO: editor-migration - unskip
      it.skip('should blur editor if it has focus', () => {
        editorActions.focus();
        expect(editorActions.blur()).to.equal(true);
        expect(editorView.hasFocus()).to.equal(false);
      });
    });

    describe('#clear', () => {
      it('should remove all content from an editor', () => {
        const tr = editorView.state.tr;
        tr.insertText('some text', 1);
        editorView.dispatch(tr);
        expect(editorView.state.doc.nodeSize).to.be.gt(4);
        expect(editorActions.clear()).to.equal(true);
        expect(editorView.state.doc.nodeSize).to.equal(4);
      });
    });

    describe('#getValue', () => {
      it('should return current editor value', async () => {
        const result = doc(p('some text'));
        const tr = editorView.state.tr;
        tr.insertText('some text', 1);
        editorView.dispatch(tr);

        const val = await editorActions.getValue();
        expect(val).to.not.equal(undefined);
        expect(val).to.deep.equal(toJSON(result));
      });

      it('should filter out task and decision items', async () => {
        const decisionsAndTasks = doc(
          decisionList({})(decisionItem({})()),
          taskList({})(taskItem({})()),
          p('text')
        );
        const expected = toJSON(doc(p('text')));
        editorActions.replaceDocument(decisionsAndTasks);

        const actual = await editorActions.getValue();
        expect(actual).to.deep.equal(expected);
      });
    });

    describe('#replaceDocument', () => {
      const newDoc = doc(p('some new content'));
      beforeEach(() => {
        const tr = editorView.state.tr;
        tr.insertText('some text', 1);
        editorView.dispatch(tr);
      });

      it('should update the document using the transformer when a transformer is set', async () => {
        editorActions._privateRegisterEditor(editorView, dummyTransformer);

        const wasSuccessful = editorActions.replaceDocument('Hello World!');
        expect(wasSuccessful).to.equal(true);
        const actual = editorView.state.doc;
        const expected = doc(blockquote('Hello World!'));
        expect(actual!.toJSON()).to.deep.equal(expected.toJSON());
      });

      it('should accept a prosemirror node', async () => {
        editorActions.replaceDocument(newDoc);
        const val = await editorActions.getValue();
        expect(val).to.deep.equal(toJSON(newDoc));
      });

      it('should accept JSON version of a prosemirror node', async () => {
        editorActions.replaceDocument(newDoc.toJSON());
        const val = await editorActions.getValue();
        expect(val).to.deep.equal(toJSON(newDoc));
      });

      it('should accept stringified JSON version of a prosemirror node', async () => {
        editorActions.replaceDocument(JSON.stringify(newDoc.toJSON()));
        const val = await editorActions.getValue();
        expect(val).to.deep.equal(toJSON(newDoc));
      });

      it('should accept atlassian document format', async () => {
        const atlassianDoc = jsonTransformer.encode(newDoc);
        editorActions.replaceDocument(atlassianDoc);
        const val = await editorActions.getValue();
        expect(val).to.deep.equal(toJSON(newDoc));
      });

      it('should accept atlassian document format from a string', async () => {
        const atlassianDoc = jsonTransformer.encode(newDoc);
        editorActions.replaceDocument(JSON.stringify(atlassianDoc));
        const val = await editorActions.getValue();
        expect(val).to.deep.equal(toJSON(newDoc));
      });
    });

    describe('#appendText', () => {
      it('should append text to a document', async () => {
        const newDoc = doc(p('some text'));
        const expected = doc(p('some text appended'));
        editorActions.replaceDocument(newDoc);
        editorActions.appendText(' appended');
        const val = await editorActions.getValue();
        expect(val).to.deep.equal(toJSON(expected));
      });

      it('should append text to a complex document', async () => {
        const newDoc = doc(p('some text'), blockquote(p('some quote')), p(''));
        const expected = doc(p('some text'), blockquote(p('some quote')), p(' appended'));
        editorActions.replaceDocument(newDoc);
        editorActions.appendText(' appended');
        const val = await editorActions.getValue();
        expect(val).to.deep.equal(toJSON(expected));
      });

      it(`should return false if the last node of a document isn't a paragraph`, async () => {
        const newDoc = doc(p('some text'), blockquote(p('some quote')));
        editorActions.replaceDocument(newDoc);
        expect(editorActions.appendText(' appended')).to.equal(false);
      });
    });
  });
});
