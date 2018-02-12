import { name } from '../../../package.json';
import { Selection } from 'prosemirror-state';
import { createEditor } from '@atlaskit/editor-test-helpers';
import {
  sortByRank,
  fixExcludes,
  createPMPlugins,
} from '../../../src/editor/create-editor/create-editor';

describe(name, () => {
  describe('create-editor', () => {
    describe('#sortByRank', () => {
      it('should correctly sort object with rank property', () => {
        const list = [
          { rank: 10 },
          { rank: 1 },
          { rank: 1000 },
          { rank: 30 },
          { rank: 100 },
          { rank: 40 },
        ];

        const result = [
          { rank: 1 },
          { rank: 10 },
          { rank: 30 },
          { rank: 40 },
          { rank: 100 },
          { rank: 1000 },
        ];

        list.sort(sortByRank);

        expect(list.sort(sortByRank)).toEqual(result);
      });
    });

    describe('#fixExcludes', () => {
      it('should remove all unused marks from exclude', () => {
        const marks = {
          code: {
            excludes: 'textStyle emojiQuery',
            group: 'code',
          },
          em: {
            excludes: 'code',
            group: 'textStyle',
          },
        };
        const result = {
          code: {
            excludes: 'textStyle',
            group: 'code',
          },
          em: {
            excludes: 'code',
            group: 'textStyle',
          },
        };

        expect(fixExcludes(marks)).toEqual(result);
      });
    });

    describe('#createPMPlugins', () => {
      it('should not add plugin if its factory returns falsy value', () => {
        const editorConfig = {
          pmPlugins: [
            { rank: 0, plugin: () => false },
            { rank: 100, plugin: () => true },
          ],
        };
        expect(
          createPMPlugins(
            editorConfig as any,
            {} as any,
            {} as any,
            () => {},
            {} as any,
            {} as any,
          ).length,
        ).toEqual(1);
      });
    });
  });

  describe('onChange', () => {
    it('should call onChange only when document changes', () => {
      const onChange = jest.fn();
      const editor = createEditor({ editorProps: { onChange } });
      const { editorView } = editor;
      editorView.dispatch(editorView.state.tr.insertText('hello'));
      expect(onChange).toHaveBeenCalledTimes(1);
      const { tr } = editorView.state;
      editorView.dispatch(tr.setSelection(Selection.near(tr.doc.resolve(1))));
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
