import {
  doc,
  hr,
  createEditorFactory,
  p,
  sendKeyToPm,
  bodiedExtension,
  bodiedExtensionData,
} from '@atlaskit/editor-test-helpers';
import rulePlugin from '../../../../plugins/rule';
import extensionPlugin from '../../../../plugins/extension';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';

describe('rule', () => {
  const createEditor = createEditorFactory();

  let createAnalyticsEvent: CreateUIAnalyticsEventSignature;

  const editor = (doc: any, trackEvent = () => {}) => {
    createAnalyticsEvent = jest.fn(() => ({ fire() {} }));
    return createEditor({
      doc,
      editorPlugins: [rulePlugin, extensionPlugin],
      editorProps: {
        analyticsHandler: trackEvent,
        allowExtension: {
          allowBreakout: true,
        },
        allowAnalyticsGASV3: true,
      },
      createAnalyticsEvent,
    });
  };

  describe('keymap', () => {
    describe('when hits Shift-Ctrl--', () => {
      it('should create rule', () => {
        const { editorView } = editor(doc(p('text{<>}')));
        sendKeyToPm(editorView, 'Shift-Ctrl--');
        expect(editorView.state.doc).toEqualDocument(doc(p('text'), hr()));
      });

      it('should create rule inside bodied ext', () => {
        const extensionAttrs = bodiedExtensionData[1].attrs;
        const { editorView } = editor(
          doc(bodiedExtension(extensionAttrs)(p('{<>}'), p('text'))),
        );
        sendKeyToPm(editorView, 'Shift-Ctrl--');
        expect(editorView.state.doc).toEqualDocument(
          doc(bodiedExtension(extensionAttrs)(p('{<>}'), hr(), p('text'))),
        );
      });

      it('should fire analytics event when create rule', () => {
        const { editorView } = editor(doc(p('{<>}')));
        sendKeyToPm(editorView, 'Shift-Ctrl--');
        expect(createAnalyticsEvent).toHaveBeenCalledWith({
          action: 'inserted',
          actionSubject: 'document',
          actionSubjectId: 'divider',
          attributes: { inputMethod: 'shortcut' },
          eventType: 'track',
        });
      });
    });
  });
});
