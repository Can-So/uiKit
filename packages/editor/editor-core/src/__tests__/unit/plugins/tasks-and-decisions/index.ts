import {
  doc,
  createEditorFactory,
  p,
  sendKeyToPm,
  insertText,
  taskList,
  taskItem,
  decisionList,
  decisionItem,
} from '@atlaskit/editor-test-helpers';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { uuid } from '@atlaskit/adf-schema';
import tasksAndDecisionsPlugin from '../../../../plugins/tasks-and-decisions';
import quickInsertPlugin from '../../../../plugins/quick-insert';

describe('tasks and decisions', () => {
  const createEditor = createEditorFactory();

  const scenarios = [
    { name: 'action', menuItem: 'task', list: taskList, item: taskItem },
    {
      name: 'decision',
      menuItem: 'decision',
      list: decisionList,
      item: decisionItem,
    },
  ];

  let createAnalyticsEvent: CreateUIAnalyticsEventSignature;

  const editor = (doc: any) => {
    createAnalyticsEvent = jest.fn(() => ({ fire() {} }));
    return createEditor({
      doc,
      editorPlugins: [tasksAndDecisionsPlugin, quickInsertPlugin],
      editorProps: { allowAnalyticsGASV3: true },
      createAnalyticsEvent,
    });
  };

  beforeEach(() => {
    uuid.setStatic('local-uuid');
  });

  afterEach(() => {
    uuid.setStatic(false);
  });

  scenarios.forEach(scenario => {
    describe('quick insert', () => {
      let editorView;
      let sel;

      beforeEach(() => {
        ({ editorView, sel } = editor(doc(p('{<>}'))));
        insertText(editorView, `/${scenario.menuItem}`, sel);
        sendKeyToPm(editorView, 'Enter');
      });

      it('should insert item', () => {
        expect(editorView.state.doc).toEqualDocument(
          doc(
            scenario.list({ localId: 'local-uuid' })(
              scenario.item({ localId: 'local-uuid' })(),
            ),
          ),
        );
      });

      it(`should fire v3 analytics event when ${
        scenario.name
      } inserted`, () => {
        expect(createAnalyticsEvent).toHaveBeenCalledWith({
          action: 'inserted',
          actionSubject: 'document',
          actionSubjectId: scenario.name,
          attributes: expect.objectContaining({ inputMethod: 'quickInsert' }),
          eventType: 'track',
        });
      });
    });
  });
});
