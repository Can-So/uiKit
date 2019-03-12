import { browser } from '@atlaskit/editor-common';
import {
  createEditorFactory,
  a as link,
  blockquote,
  code_block,
  code,
  doc,
  em,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  subsup,
  li,
  ol,
  p,
  panel,
  sendKeyToPm,
  strike,
  strong,
  underline,
  textColor,
} from '@atlaskit/editor-test-helpers';
import { pluginKey as clearFormattingPluginKey } from '../../../../plugins/text-formatting/pm-plugins/clear-formatting';
import codeBlockPlugin from '../../../../plugins/code-block';
import textColorPlugin from '../../../../plugins/text-color';
import listPlugin from '../../../../plugins/lists';
import panelPlugin from '../../../../plugins/panel';
import {
  clearFormatting,
  clearFormattingWithAnalytics,
} from '../../../../plugins/text-formatting/commands/clear-formatting';
import { checkFormattingIsPresent } from '../../../../plugins/text-formatting/utils';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { INPUT_METHOD } from '../../../../plugins/analytics';

describe('clear-formatting', () => {
  const createEditor = createEditorFactory();
  let createAnalyticsEvent: CreateUIAnalyticsEventSignature;

  const editor = (
    doc: any,
    { trackEvent }: { trackEvent: () => void } = { trackEvent: () => {} },
  ) => {
    createAnalyticsEvent = jest.fn(() => ({ fire() {} }));
    const editor = createEditor({
      doc,
      editorPlugins: [
        codeBlockPlugin(),
        textColorPlugin,
        listPlugin,
        panelPlugin,
      ],
      editorProps: {
        analyticsHandler: trackEvent,
        allowAnalyticsGASV3: true,
      },
      createAnalyticsEvent,
    });
    const pluginState = clearFormattingPluginKey.getState(
      editor.editorView.state,
    );
    return { ...editor, pluginState };
  };

  describe('formattingIsPresent', () => {
    it('should be true if some marks are present', () => {
      const { pluginState } = editor(doc(p(strong('t{<}ex{>}t'))));
      expect(pluginState.formattingIsPresent).toBe(true);
    });

    it('should be true if a header is present', () => {
      const { pluginState } = editor(doc(h1('t{<}ex{>}t')));
      expect(pluginState.formattingIsPresent).toBe(true);
    });

    it('should be true if a code blocks is present', () => {
      const { pluginState } = editor(
        doc(p('paragraph'), code_block({ language: 'java' })('code{<>}Block')),
      );
      expect(pluginState.formattingIsPresent).toBe(true);
    });

    it('should be true if blockquote is present', () => {
      const { pluginState } = editor(
        doc(p('paragraph'), blockquote(p('block{<>}quote'))),
      );
      expect(pluginState.formattingIsPresent).toBe(true);
    });

    it('should be false if panel is present', () => {
      const { pluginState } = editor(
        doc(p('paragraph'), panel()(p('panel{<>}node'))),
      );
      expect(pluginState.formattingIsPresent).toBe(false);
    });

    it('should be false if no marks or formatted blocks are present', () => {
      const { pluginState } = editor(doc(p('text')));
      expect(pluginState.formattingIsPresent).toBe(false);
    });

    it('should be false if all present marks are cleared', () => {
      const { editorView } = editor(doc(p(strong('{<}text{>}'))));

      clearFormatting()(editorView.state, editorView.dispatch);
      expect(checkFormattingIsPresent(editorView.state)).toBe(false);
    });

    it('should be false if all present blocks are cleared', () => {
      const { editorView } = editor(doc(code_block({})('code{<>}block')));
      clearFormatting()(editorView.state, editorView.dispatch);
      expect(checkFormattingIsPresent(editorView.state)).toBe(false);
    });
  });

  describe('clearFormatting', () => {
    [
      { nodeName: 'strong', nodeType: strong },
      { nodeName: 'italic', nodeType: em },
      { nodeName: 'underline', nodeType: underline },
      { nodeName: 'monospace', nodeType: code },
      { nodeName: 'strikeout', nodeType: strike },
    ].forEach(({ nodeName, nodeType }) => {
      it(`should clear ${nodeName} if present`, () => {
        const { editorView } = editor(doc(p(nodeType('t{<}ex{>}t'))));

        clearFormatting()(editorView.state, editorView.dispatch);
        expect(editorView.state.doc).toEqualDocument(
          doc(p(nodeType('t'), 'ex', nodeType('t'))),
        );
      });
    });

    it(`should clear text color if present`, () => {
      const blackText = textColor({ color: '#FFFFFF' });
      const { editorView } = editor(doc(p(blackText('t{<}ex{>}t'))));

      clearFormatting()(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(p(blackText('t'), 'ex', blackText('t'))),
      );
    });

    it('should remove heading blocks if present', () => {
      const { editorView } = editor(doc(h1('te{<>}xt')));

      clearFormatting()(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));
    });

    it('should remove superscript if present', () => {
      const { editorView } = editor(
        doc(p(subsup({ type: 'sup' })('{<}text{>}'))),
      );
      clearFormatting()(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));
    });

    it('should remove blockquote if present', () => {
      const { editorView } = editor(doc(blockquote(p('te{<>}xt'))));

      clearFormatting()(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));
    });

    it('should not remove panel if present', () => {
      const { editorView } = editor(doc(panel()(p(code('{<}text{>}')))));

      clearFormatting()(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(panel()(p('{<}text{>}'))),
      );
    });

    it('should remove superscript if present', () => {
      const { editorView } = editor(
        doc(p(subsup({ type: 'sup' })('{<}text{>}'))),
      );

      clearFormatting()(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));
    });

    it('should remove subscript if present', () => {
      const { editorView } = editor(
        doc(p(subsup({ type: 'sub' })('{<}text{>}'))),
      );

      clearFormatting()(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));
    });

    it('should not remove link if present', () => {
      const { editorView } = editor(
        doc(p(link({ href: 'http://www.atlassian.com' })('t{<}ex{>}t'))),
      );

      clearFormatting()(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(
        doc(p(link({ href: 'http://www.atlassian.com' })('text'))),
      );
    });

    it('should not remove ordered list item if present', () => {
      const { editorView } = editor(doc(ol(li(p('te{<>}xt')))));

      clearFormatting()(editorView.state, editorView.dispatch);
      expect(editorView.state.doc).toEqualDocument(doc(ol(li(p('text')))));
    });

    describe('Analytics GAS V3', () => {
      function createClearFormattingPayloadWithAttributes(attributes) {
        return {
          action: 'formatted',
          actionSubject: 'text',
          actionSubjectId: 'clearFormatting',
          eventType: 'track',
          attributes,
        };
      }
      const inputMethodToolbar = INPUT_METHOD.TOOLBAR;
      [
        { formattingName: 'strong', nodeType: strong },
        { formattingName: 'italic', nodeType: em },
        { formattingName: 'underline', nodeType: underline },
        { formattingName: 'code', nodeType: code },
        { formattingName: 'strike', nodeType: strike },
        { formattingName: 'subsup', nodeType: subsup({ type: 'sub' }) },
        { formattingName: 'subsup', nodeType: subsup({ type: 'sup' }) },
        { formattingName: 'color', nodeType: textColor({ color: '#FFFFFF' }) },
      ].forEach(({ formattingName, nodeType }) => {
        it(`should create analytics with ${formattingName} format cleared`, () => {
          const { editorView } = editor(doc(p(nodeType('t{<}ex{>}t'))));

          clearFormattingWithAnalytics(inputMethodToolbar)(
            editorView.state,
            editorView.dispatch,
          );

          expect(createAnalyticsEvent).toHaveBeenCalledWith(
            createClearFormattingPayloadWithAttributes({
              inputMethod: inputMethodToolbar,
              formattingCleared: [formattingName],
            }),
          );
        });
      });

      // Check headings events have been created
      [
        { level: 1, nodeType: h1 },
        { level: 2, nodeType: h2 },
        { level: 3, nodeType: h3 },
        { level: 4, nodeType: h4 },
        { level: 5, nodeType: h5 },
        { level: 6, nodeType: h6 },
      ].forEach(({ level, nodeType }) => {
        it(`should create analytics for heading format cleared, if has heading level ${level}`, () => {
          const { editorView } = editor(doc(nodeType('t{<}ex{>}t')));

          clearFormattingWithAnalytics(inputMethodToolbar)(
            editorView.state,
            editorView.dispatch,
          );

          expect(createAnalyticsEvent).toHaveBeenCalledWith(
            createClearFormattingPayloadWithAttributes({
              inputMethod: inputMethodToolbar,
              formattingCleared: ['heading'],
            }),
          );
        });
      });

      it(`should create analytics for codeBlock format cleared`, () => {
        const { editorView } = editor(
          doc(code_block({ language: 'java' })('t{<}ex{>}t')),
        );

        clearFormattingWithAnalytics(inputMethodToolbar)(
          editorView.state,
          editorView.dispatch,
        );

        expect(createAnalyticsEvent).toHaveBeenCalledWith(
          createClearFormattingPayloadWithAttributes({
            inputMethod: inputMethodToolbar,
            formattingCleared: ['codeBlock'],
          }),
        );
      });

      it(`should create analytics for block quote format cleared`, () => {
        const { editorView } = editor(doc(blockquote(p('t{<}ex{>}t'))));

        clearFormattingWithAnalytics(inputMethodToolbar)(
          editorView.state,
          editorView.dispatch,
        );

        expect(createAnalyticsEvent).toHaveBeenCalledWith(
          createClearFormattingPayloadWithAttributes({
            inputMethod: inputMethodToolbar,
            formattingCleared: ['blockquote'],
          }),
        );
      });
    });
  });

  describe('keymap', () => {
    it('should clear formatting', () => {
      const trackEvent = jest.fn();
      const { editorView } = editor(doc(p(strong('t{<}ex{>}t'))), {
        trackEvent,
      });
      expect(checkFormattingIsPresent(editorView.state)).toBe(true);

      if (browser.mac) {
        sendKeyToPm(editorView, 'Cmd-\\');
      } else {
        sendKeyToPm(editorView, 'Ctrl-\\');
      }

      expect(checkFormattingIsPresent(editorView.state)).toBe(false);
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.clear.keyboard',
      );
    });
  });
});
