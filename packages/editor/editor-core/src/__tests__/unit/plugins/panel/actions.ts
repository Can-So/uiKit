import {
  createEditorFactory,
  doc,
  panel,
  p,
} from '@atlaskit/editor-test-helpers';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import {
  removePanel,
  changePanelType,
} from '../../../../plugins/panel/actions';
import { panelPlugin } from '../../../../plugins';
import { PanelType } from '../../../../../../adf-schema';

describe('panel actions', () => {
  const createEditor = createEditorFactory();
  let createAnalyticsEvent: CreateUIAnalyticsEventSignature;

  const editor = (doc: any) => {
    createAnalyticsEvent = jest.fn().mockReturnValue({ fire() {} });
    return createEditor({
      doc,
      editorProps: { allowAnalyticsGASV3: true },
      editorPlugins: [panelPlugin],
      createAnalyticsEvent,
    });
  };

  it('trigger GAS3 analytics when deleted via toolbar', () => {
    const { editorView } = editor(
      doc(panel({ panelType: 'info' })(p('text{<>}'))),
    );

    removePanel()(editorView.state, editorView.dispatch);
    expect(createAnalyticsEvent).toHaveBeenCalledWith({
      action: 'deleted',
      actionSubject: 'panel',
      attributes: { inputMethod: 'toolbar' },
      eventType: 'track',
    });
  });

  // Postponing as deletion of panels via keyboard is broken: https://product-fabric.atlassian.net/browse/ED-6504
  it.skip('trigger GAS3 analytics when deleted via keyboard', () => {
    const { editorView } = editor(
      doc(panel({ panelType: 'info' })(p('text{<>}'))),
    );

    removePanel()(editorView.state, editorView.dispatch);
    expect(createAnalyticsEvent).toHaveBeenCalledWith({
      action: 'deleted',
      actionSubject: 'panel',
      attributes: { inputMethod: 'keyboard' },
      eventType: 'track',
    });
  });

  describe('change panel type', () => {
    const panelTypes: PanelType[] = [
      'info',
      'note',
      'tip',
      'warning',
      'error',
      'success',
    ];

    panelTypes.forEach(type => {
      it(`trigger GAS3 analytics when changing panel type to ${type}`, () => {
        let startType = type === 'info' ? 'note' : 'info';
        const { editorView } = editor(
          doc(panel({ panelType: startType })(p('text{<>}'))),
        );

        changePanelType(type)(editorView.state, editorView.dispatch);
        expect(createAnalyticsEvent).toHaveBeenCalledWith({
          action: 'changedType',
          actionSubject: 'panel',
          attributes: { newType: type, previousType: startType },
          eventType: 'track',
        });
      });
    });
  });
});
