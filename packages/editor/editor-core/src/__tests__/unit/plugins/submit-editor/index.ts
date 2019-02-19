import {
  sendKeyToPm,
  createEditorFactory,
  doc,
  p,
} from '@atlaskit/editor-test-helpers';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import submitPlugin from '../../../../plugins/submit-editor';

describe('submit-editor', () => {
  const createEditor = createEditorFactory();

  let onSave;
  let createAnalyticsEvent: CreateUIAnalyticsEventSignature;

  const editor = (doc: any) => {
    createAnalyticsEvent = jest.fn().mockReturnValue({ fire() {} });
    return createEditor({
      doc,
      editorPlugins: [submitPlugin],
      editorProps: {
        onSave,
        allowAnalyticsGASV3: true,
      },
      createAnalyticsEvent,
    });
  };

  beforeEach(() => {
    onSave = jest.fn();
  });

  it('Mod-Enter should submit editor content', () => {
    const { editorView } = editor(doc(p('{<>}')));
    sendKeyToPm(editorView, 'Mod-Enter');
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('Mod-Enter should trigger editor stopped analytics event', () => {
    const { editorView } = editor(doc(p('1{<>}')));
    sendKeyToPm(editorView, 'Mod-Enter');
    expect(createAnalyticsEvent).toHaveBeenCalledWith({
      action: 'stopped',
      actionSubject: 'editor',
      actionSubjectId: 'save',
      attributes: expect.objectContaining({ inputMethod: 'shortcut' }),
      eventType: 'ui',
    });
  });
});
