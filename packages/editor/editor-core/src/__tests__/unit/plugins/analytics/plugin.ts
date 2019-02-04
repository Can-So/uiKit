const mockFireAnalyticsEventPayload = jest.fn(() => () => null);
const mockFireAnalyticsEvent = jest.fn(() => mockFireAnalyticsEventPayload);
jest.mock('../../../../plugins/analytics/utils', () => ({
  fireAnalyticsEvent: mockFireAnalyticsEvent,
}));

import analyticsPlugin, {
  addAnalytics,
  analyticsPluginKey,
  AnalyticsEventPayload,
} from '../../../../plugins/analytics';
import { createEditorFactory, doc, p } from '@atlaskit/editor-test-helpers';

describe('analytics', () => {
  const createEditor = createEditorFactory();
  const payload: AnalyticsEventPayload = {
    action: 'clicked',
    actionSubject: 'button',
    actionSubjectId: 'helpButton',
    attributes: { inputMethod: 'toolbar' },
    eventType: 'ui',
  };

  const mockCreateAnalyticsEvent = jest.fn();

  describe('addAnalytics', () => {
    let editorView;
    let dispatch;
    let state;
    let tr;

    const editor = (doc: any) =>
      createEditor({
        doc,
        editorPlugins: [analyticsPlugin(mockCreateAnalyticsEvent)],
        pluginKey: analyticsPluginKey,
      });

    beforeEach(() => {
      ({ editorView } = editor(doc(p('hello world'))));
      ({ dispatch, state } = editorView);
      tr = editorView.state.tr.insertText('hello ');
    });

    it('fires analytics event with payload', () => {
      tr = addAnalytics(tr, payload);
      dispatch(tr);

      expect(mockFireAnalyticsEventPayload).toHaveBeenCalledWith({
        payload,
      });
    });

    it('fires analytics event for channel', () => {
      tr = addAnalytics(tr, payload, 'atlassian');
      dispatch(tr);

      expect(mockFireAnalyticsEventPayload).toHaveBeenCalledWith({
        payload,
        channel: 'atlassian',
      });
    });

    it('handles firing multiple analytics events for one transaction', () => {
      const secondPayload: AnalyticsEventPayload = {
        action: 'stopped',
        actionSubject: 'editor',
        actionSubjectId: 'save',
        attributes: {
          inputMethod: 'shortcut',
          documentSize: state.doc.nodeSize,
        },
        eventType: 'ui',
      };
      tr = addAnalytics(tr, payload);
      tr = addAnalytics(tr, secondPayload);
      dispatch(tr);

      expect(mockFireAnalyticsEventPayload).toHaveBeenCalledWith({
        payload,
      });
      expect(mockFireAnalyticsEventPayload).toHaveBeenCalledWith({
        payload: secondPayload,
      });
    });
  });
});
