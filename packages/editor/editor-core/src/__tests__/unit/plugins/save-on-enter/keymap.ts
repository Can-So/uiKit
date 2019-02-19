import {
  createEditorFactory,
  doc,
  p,
  decisionList,
  decisionItem,
  sendKeyToPm,
  taskList,
  taskItem,
} from '@atlaskit/editor-test-helpers';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import saveOnEnterPlugin from '../../../../plugins/save-on-enter';
import tasksAndDecisionsPlugin from '../../../../plugins/tasks-and-decisions';

describe('save on enter', () => {
  const createEditor = createEditorFactory();

  const onSaveSpy = jest.fn();
  let createAnalyticsEvent: CreateUIAnalyticsEventSignature;

  beforeEach(() => {
    onSaveSpy.mockReset();
  });

  const editor = (doc: any) => {
    createAnalyticsEvent = jest.fn().mockReturnValue({ fire() {} });
    return createEditor({
      doc,
      editorPlugins: [saveOnEnterPlugin, tasksAndDecisionsPlugin],
      editorProps: {
        onSave: onSaveSpy,
        allowAnalyticsGASV3: true,
      },
      createAnalyticsEvent,
    });
  };

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

  it('should not trigger onSubmit when user presses Enter in empty decisionItem', () => {
    const { editorView } = editor(doc(decisionList()(decisionItem()('{<>}'))));
    sendKeyToPm(editorView!, 'Enter');
    expect(onSaveSpy).not.toHaveBeenCalledWith(editorView);
  });

  it('should not trigger onSubmit when user presses Enter inside empty taskItem', () => {
    const { editorView } = editor(doc(taskList()(taskItem()('{<>}'))));
    sendKeyToPm(editorView!, 'Enter');
    expect(onSaveSpy).not.toHaveBeenCalledWith(editorView);
  });

  it('should trigger editor stopped analytics event', () => {
    const { editorView } = editor(doc(p('1{<>}')));
    sendKeyToPm(editorView, 'Enter');
    expect(createAnalyticsEvent).toHaveBeenCalledWith({
      action: 'stopped',
      actionSubject: 'editor',
      actionSubjectId: 'save',
      attributes: expect.objectContaining({ inputMethod: 'shortcut' }),
      eventType: 'ui',
    });
  });
});
