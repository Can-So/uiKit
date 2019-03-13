import {
  addAnalytics,
  analyticsPluginKey,
  AnalyticsEventPayload,
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  EVENT_TYPE,
  ACTION_SUBJECT_ID,
} from '../../../../plugins/analytics';
import { EditorState, Transaction } from 'prosemirror-state';
import { createEditorFactory, doc, p } from '@atlaskit/editor-test-helpers';
import { CommandDispatch } from '../../../../types';

describe('analytics', () => {
  const createEditor = createEditorFactory();
  const payload: AnalyticsEventPayload = {
    action: ACTION.CLICKED,
    actionSubject: ACTION_SUBJECT.BUTTON,
    actionSubjectId: ACTION_SUBJECT_ID.BUTTON_HELP,
    attributes: { inputMethod: INPUT_METHOD.TOOLBAR },
    eventType: EVENT_TYPE.UI,
  };

  let createAnalyticsEvent;
  let fireMock;

  describe('addAnalytics', () => {
    let editorView;
    let dispatch: CommandDispatch;
    let state: EditorState;
    let tr: Transaction;

    const editor = (doc: any) => {
      fireMock = jest.fn();
      createAnalyticsEvent = jest.fn(() => ({ fire: fireMock }));
      return createEditor({
        doc,
        editorProps: {
          allowAnalyticsGASV3: true,
        },
        createAnalyticsEvent,
        pluginKey: analyticsPluginKey,
      });
    };

    beforeEach(() => {
      ({ editorView } = editor(doc(p('hello world'))));
      ({ dispatch, state } = editorView);
      tr = editorView.state.tr.insertText('hello ');
    });

    it('create analytics event with payload', () => {
      tr = addAnalytics(tr, payload);
      dispatch(tr);

      expect(createAnalyticsEvent).toHaveBeenCalledWith(payload);
    });

    it('fires analytics event for channel', () => {
      tr = addAnalytics(tr, payload, 'atlassian');
      dispatch(tr);

      expect(fireMock).toHaveBeenCalledWith('atlassian');
    });

    it('handles firing multiple analytics events for one transaction', () => {
      const secondPayload: AnalyticsEventPayload = {
        action: ACTION.STOPPED,
        actionSubject: ACTION_SUBJECT.EDITOR,
        actionSubjectId: ACTION_SUBJECT_ID.SAVE,
        attributes: {
          inputMethod: INPUT_METHOD.SHORTCUT,
          documentSize: state.doc.nodeSize,
        },
        eventType: EVENT_TYPE.UI,
      };

      tr = addAnalytics(tr, payload);
      tr = addAnalytics(tr, secondPayload);

      dispatch(tr);

      expect(createAnalyticsEvent).toHaveBeenCalledWith(payload);
      expect(createAnalyticsEvent).toHaveBeenCalledWith(secondPayload);
    });
  });
});
