import tasksAndDecisionsPlugins from '../../../src/plugins/tasks-and-decisions';
import { createPlugin as createSaveOnEnterPlugin } from '../../../src/editor/plugins/save-on-enter';
import { ProviderFactory } from '@atlaskit/editor-common';
import {
  makeEditor,
  doc,
  p,
  decisionList,
  decisionItem,
  sendKeyToPm,
  taskList,
  taskItem,
} from '@atlaskit/editor-test-helpers';
import { defaultSchema } from '@atlaskit/editor-test-helpers';
import { Plugin } from 'prosemirror-state';

describe('save on enter', () => {
  const onSaveSpy = jest.fn();

  beforeEach(() => {
    onSaveSpy.mockReset();
  });

  const editor = (doc: any) =>
    makeEditor({
      doc,
      plugins: [
        createSaveOnEnterPlugin(onSaveSpy) as Plugin,
        ...tasksAndDecisionsPlugins(defaultSchema, {}, new ProviderFactory()),
      ],
    });

  it('should trigger onSubmit when user presses Enter', () => {
    const { editorView } = editor(doc(p('1{<>}')));

    sendKeyToPm(editorView!, 'Enter');
    expect(onSaveSpy).toHaveBeenCalledWith(editorView);
  });

  it('should trigger onSubmit when user presses Enter in decisionItem', () => {
    const { editorView } = editor(doc(decisionList()(decisionItem()('1{<>}'))));
    sendKeyToPm(editorView!, 'Enter');
    expect(onSaveSpy).toHaveBeenCalledWith(editorView);
  });

  it('should trigger onSubmit when user presses Enter inside taskItem', () => {
    const { editorView } = editor(doc(taskList()(taskItem()('1{<>}'))));
    sendKeyToPm(editorView!, 'Enter');
    expect(onSaveSpy).toHaveBeenCalledWith(editorView);
  });
});
