import { browser } from '@atlaskit/editor-common';
import {
  createEditor,
  a as link,
  blockquote,
  code_block,
  code,
  doc,
  em,
  h1,
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
import { stateKey as clearFormattingPluginKey } from '../../../src/plugins/clear-formatting';
import codeBlockPlugin from '../../../src/editor/plugins/code-block';
import textColorPlugin from '../../../src/editor/plugins/text-color';
import listPlugin from '../../../src/editor/plugins/lists';
import panelPlugin from '../../../src/editor/plugins/panel';

describe('clear-formatting', () => {
  const editor = (
    doc: any,
    { trackEvent }: { trackEvent: () => void } = { trackEvent: () => {} },
  ) => {
    const editor = createEditor({
      doc,
      editorPlugins: [
        codeBlockPlugin,
        textColorPlugin,
        listPlugin,
        panelPlugin,
      ],
      editorProps: {
        analyticsHandler: trackEvent,
      },
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

    it('should be true if panel is present', () => {
      const { pluginState } = editor(
        doc(p('paragraph'), panel()(p('panel{<>}node'))),
      );
      expect(pluginState.formattingIsPresent).toBe(true);
    });

    it('should be false if no marks or formatted blocks are present', () => {
      const { pluginState } = editor(doc(p('text')));
      expect(pluginState.formattingIsPresent).toBe(false);
    });

    it('should be false if all present marks are cleared', () => {
      const { editorView, pluginState } = editor(doc(p(strong('{<}text{>}'))));

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).toBe(false);
      editorView.destroy();
    });

    it('should be false if all present blocks are cleared', () => {
      const { editorView, pluginState } = editor(
        doc(code_block({})('code{<>}block')),
      );
      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).toBe(false);
      editorView.destroy();
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
        const { editorView, pluginState } = editor(
          doc(p(nodeType('t{<}ex{>}t'))),
        );

        pluginState.clearFormatting(editorView);
        expect(editorView.state.doc).toEqualDocument(
          doc(p(nodeType('t'), 'ex', nodeType('t'))),
        );

        editorView.destroy();
      });
    });

    it(`should clear text color if present`, () => {
      const blackText = textColor({ color: '#FFFFFF' });
      const { editorView, pluginState } = editor(
        doc(p(blackText('t{<}ex{>}t'))),
      );

      pluginState.clearFormatting(editorView);
      expect(editorView.state.doc).toEqualDocument(
        doc(p(blackText('t'), 'ex', blackText('t'))),
      );

      editorView.destroy();
    });

    it('should remove heading blocks if present', () => {
      const { editorView, pluginState } = editor(doc(h1('te{<>}xt')));

      pluginState.clearFormatting(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));

      editorView.destroy();
    });

    it('should remove superscript if present', () => {
      const { editorView, pluginState } = editor(
        doc(p(subsup({ type: 'sup' })('{<}text{>}'))),
      );
      pluginState.clearFormatting(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));
      editorView.destroy();
    });

    it('should remove blockquote if present', () => {
      const { editorView, pluginState } = editor(
        doc(blockquote(p('te{<>}xt'))),
      );

      pluginState.clearFormatting(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));

      editorView.destroy();
    });

    it('should remove panel if present', () => {
      const { editorView, pluginState } = editor(doc(panel()(p('te{<>}xt'))));

      pluginState.clearFormatting(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));

      editorView.destroy();
    });

    it('should remove superscript if present', () => {
      const { editorView, pluginState } = editor(
        doc(p(subsup({ type: 'sup' })('{<}text{>}'))),
      );

      pluginState.clearFormatting(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));

      editorView.destroy();
    });

    it('should remove subscript if present', () => {
      const { editorView, pluginState } = editor(
        doc(p(subsup({ type: 'sub' })('{<}text{>}'))),
      );

      pluginState.clearFormatting(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(p('text')));

      editorView.destroy();
    });

    it('should not remove link if present', () => {
      const { editorView, pluginState } = editor(
        doc(p(link({ href: 'http://www.atlassian.com' })('t{<}ex{>}t'))),
      );

      pluginState.clearFormatting(editorView);
      expect(editorView.state.doc).toEqualDocument(
        doc(p(link({ href: 'http://www.atlassian.com' })('text'))),
      );

      editorView.destroy();
    });

    it('should not remove ordered list item if present', () => {
      const { editorView, pluginState } = editor(doc(ol(li(p('te{<>}xt')))));

      pluginState.clearFormatting(editorView);
      expect(editorView.state.doc).toEqualDocument(doc(ol(li(p('text')))));

      editorView.destroy();
    });
  });

  describe('keymap', () => {
    it('should clear formatting', () => {
      const trackEvent = jest.fn();
      const { editorView, pluginState } = editor(doc(p(strong('t{<}ex{>}t'))), {
        trackEvent,
      });
      expect(pluginState.formattingIsPresent).toBe(true);

      if (browser.mac) {
        sendKeyToPm(editorView, 'Cmd-\\');
      } else {
        sendKeyToPm(editorView, 'Ctrl-\\');
      }

      expect(pluginState.formattingIsPresent).toBe(false);
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.clear.keyboard',
      );
      editorView.destroy();
    });
  });
});
