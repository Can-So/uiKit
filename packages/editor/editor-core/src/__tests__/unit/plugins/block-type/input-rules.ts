import {
  blockquote,
  br,
  code_block,
  doc,
  h1,
  h2,
  h3,
  insertText,
  createEditorFactory,
  p,
  code,
  hardBreak,
  a as link,
} from '@atlaskit/editor-test-helpers';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { analyticsService } from '../../../../analytics';
import codeBlockPlugin from '../../../../plugins/code-block';
import panelPlugin from '../../../../plugins/panel';
import listPlugin from '../../../../plugins/lists';
import {
  AnalyticsEventPayload,
  ACTION,
  ACTION_SUBJECT,
  EVENT_TYPE,
  ACTION_SUBJECT_ID,
  INPUT_METHOD,
} from '../../../../plugins/analytics';
import { HeadingLevels } from '../../../../plugins/block-type/types';

describe('inputrules', () => {
  const createEditor = createEditorFactory();

  let createAnalyticsEvent: CreateUIAnalyticsEventSignature;
  let trackEvent;

  const editor = (doc: any) => {
    createAnalyticsEvent = jest.fn(() => ({ fire() {} }));
    return createEditor({
      doc,
      editorPlugins: [listPlugin, codeBlockPlugin(), panelPlugin],
      editorProps: {
        analyticsHandler: trackEvent,
        allowAnalyticsGASV3: true,
      },
      createAnalyticsEvent,
    });
  };

  function insertAutoformatRule(format: string) {
    const setup = editor(doc(p('{<>}')));
    const { editorView, sel } = setup;

    insertText(editorView, `${format} `, sel);
    return setup;
  }

  beforeEach(() => {
    trackEvent = jest.fn();
    analyticsService.trackEvent = trackEvent;
  });

  describe('heading rule', () => {
    describe('Analytics', () => {
      function createHeadingPayload(
        newHeadingLevel: HeadingLevels,
        inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.FORMATTING,
      ): AnalyticsEventPayload {
        return {
          action: ACTION.FORMATTED,
          actionSubject: ACTION_SUBJECT.TEXT,
          eventType: EVENT_TYPE.TRACK,
          actionSubjectId: ACTION_SUBJECT_ID.FORMAT_HEADING,
          attributes: {
            inputMethod,
            newHeadingLevel,
          },
        };
      }

      type AutoFormatCase = {
        autoformatRule: string;
        headingLevel: HeadingLevels;
      };
      const autoFormatCases: AutoFormatCase[] = [
        { autoformatRule: '#', headingLevel: 1 },
        { autoformatRule: '##', headingLevel: 2 },
        { autoformatRule: '###', headingLevel: 3 },
        { autoformatRule: '####', headingLevel: 4 },
        { autoformatRule: '#####', headingLevel: 5 },
        { autoformatRule: '######', headingLevel: 6 },
      ];

      autoFormatCases.forEach(({ autoformatRule, headingLevel }) => {
        it(`should call Analytics GAS v3 with heading level ${headingLevel} for autoformatting '${autoformatRule}'`, () => {
          insertAutoformatRule(autoformatRule);

          expect(createAnalyticsEvent).toHaveBeenCalledWith(
            createHeadingPayload(headingLevel, INPUT_METHOD.FORMATTING),
          );
        });
      });
    });
    it('should convert "# " to heading 1', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '# ', sel);
      expect(editorView.state.doc).toEqualDocument(doc(h1()));
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.heading1.autoformatting',
      );
    });

    it('should convert "# " after shift+enter to heading 1', () => {
      const { editorView, sel } = editor(doc(p('test', hardBreak(), '{<>}')));

      insertText(editorView, '# ', sel);
      expect(editorView.state.doc).toEqualDocument(doc(p('test'), h1()));
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.heading1.autoformatting',
      );
    });

    it('should not convert "# " to heading 1 when inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '# ', sel);
      expect(editorView.state.doc).toEqualDocument(doc(code_block()('# ')));
    });

    it('should convert "## " to heading 2', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '## ', sel);
      expect(editorView.state.doc).toEqualDocument(doc(h2()));
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.heading2.autoformatting',
      );
    });

    it('should not convert "## " to heading 1 when inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '## ', sel);
      expect(editorView.state.doc).toEqualDocument(doc(code_block()('## ')));
    });

    it('should convert "### " to heading 3', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '### ', sel);
      expect(editorView.state.doc).toEqualDocument(doc(h3()));
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.heading3.autoformatting',
      );
    });

    it('should not convert "### " to heading 3 when inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '### ', sel);
      expect(editorView.state.doc).toEqualDocument(doc(code_block()('### ')));
    });
  });

  describe('blockquote rule', () => {
    describe('Analytics', () => {
      it(`should call analytics v3 with blockquote for autoformatting '>'`, () => {
        const greatherThanRule = '>';
        const expectedPayload: AnalyticsEventPayload = {
          action: ACTION.FORMATTED,
          actionSubject: ACTION_SUBJECT.TEXT,
          eventType: EVENT_TYPE.TRACK,
          actionSubjectId: ACTION_SUBJECT_ID.FORMAT_BLOCK_QUOTE,
          attributes: {
            inputMethod: INPUT_METHOD.FORMATTING,
          },
        };

        insertAutoformatRule(greatherThanRule);

        expect(createAnalyticsEvent).toHaveBeenCalledWith(expectedPayload);
      });
    });

    it('should convert "> " to a blockquote', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).toEqualDocument(doc(blockquote(p())));
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.blockquote.autoformatting',
      );
    });

    it('should convert "> " to a blockquote after shift+enter', () => {
      const { editorView, sel } = editor(doc(p('test', hardBreak(), '{<>}')));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).toEqualDocument(
        doc(p('test'), blockquote(p())),
      );
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.blockquote.autoformatting',
      );
    });

    it('should convert "> " to a blockquote after multiple shift+enter', () => {
      const { editorView, sel } = editor(
        doc(p('test', hardBreak(), hardBreak(), '{<>}test')),
      );

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).toEqualDocument(
        doc(p('test', hardBreak()), blockquote(p('test'))),
      );
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.blockquote.autoformatting',
      );
    });

    it('should convert "> " after shift+enter to blockquote for only current line', () => {
      const { editorView, sel } = editor(
        doc(p('test1', hardBreak(), '{<>}test2', hardBreak(), 'test3')),
      );

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).toEqualDocument(
        doc(p('test1'), blockquote(p('test2')), p('test3')),
      );
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.blockquote.autoformatting',
      );
    });

    it('should not convert "> " inside code mark to blockquote', () => {
      const { editorView, sel } = editor(doc(p(code('>{<>}'))));

      insertText(editorView, ' ', sel);
      expect(editorView.state.doc).toEqualDocument(doc(p(code('> '))));
    });

    it('should not convert "> " inside link to blockquote', () => {
      const { editorView, sel } = editor(
        doc(p(link({ href: 'http://www.atlassian.com' })('>{<>}'))),
      );
      insertText(editorView, ' ', sel);
      expect(editorView.state.doc).toEqualDocument(
        doc(p(link({ href: 'http://www.atlassian.com' })('>'), ' ')),
      );
    });

    it('should not convert "> " to a blockquote when inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).toEqualDocument(doc(code_block()('> ')));
    });
  });

  describe('codeblock rule', () => {
    const analyticsV2Event = 'atlassian.editor.format.codeblock.autoformatting';
    const analyticsV3Payload = {
      action: 'inserted',
      actionSubject: 'document',
      actionSubjectId: 'codeBlock',
      attributes: { inputMethod: 'autoformatting' },
      eventType: 'track',
    };
    let editorView;
    let sel;

    describe('typing "```" after text', () => {
      beforeEach(() => {
        ({ editorView, sel } = editor(doc(p('{<>}hello', br(), 'world'))));
        insertText(editorView, '```', sel);
      });

      it('should convert "```" to a code block', () => {
        expect(editorView.state.doc).toEqualDocument(
          doc(code_block()('hello\nworld')),
        );
      });

      it('should fire analytics event', () => {
        expect(trackEvent).toHaveBeenCalledWith(analyticsV2Event);
        expect(createAnalyticsEvent).toHaveBeenCalledWith(analyticsV3Payload);
      });
    });

    describe('typing "```" after shift+enter', () => {
      beforeEach(() => {
        ({ editorView, sel } = editor(doc(p('test', hardBreak(), '{<>}'))));
        insertText(editorView, '```', sel);
      });

      it('should convert "```" to a code block', () => {
        expect(editorView.state.doc).toEqualDocument(
          doc(p('test'), code_block()()),
        );
      });

      it('should fire analytics event', () => {
        expect(trackEvent).toHaveBeenCalledWith(analyticsV2Event);
        expect(createAnalyticsEvent).toHaveBeenCalledWith(analyticsV3Payload);
      });
    });

    describe('typing "```" in middle of paragraph', () => {
      beforeEach(() => {
        ({ editorView, sel } = editor(doc(p('code ``{<>}block!'))));
        insertText(editorView, '`', sel);
      });

      it('should convert "```" to a code block', () => {
        expect(editorView.state.doc).toEqualDocument(
          doc(p('code '), code_block()('block!')),
        );
      });

      it('should fire analytics event', () => {
        expect(trackEvent).toHaveBeenCalledWith(analyticsV2Event);
        expect(createAnalyticsEvent).toHaveBeenCalledWith(analyticsV3Payload);
      });
    });

    describe('typing "```" at end of paragraph', () => {
      beforeEach(() => {
        ({ editorView, sel } = editor(doc(p('code ``{<>}'))));
        insertText(editorView, '`', sel);
      });

      it('should convert "```" to a code block without preceeding content', () => {
        expect(editorView.state.doc).toEqualDocument(
          doc(p('code '), code_block()()),
        );
      });

      it('should fire analytics event', () => {
        expect(trackEvent).toHaveBeenCalledWith(analyticsV2Event);
        expect(createAnalyticsEvent).toHaveBeenCalledWith(analyticsV3Payload);
      });
    });

    describe('typing "```" after space', () => {
      beforeEach(() => {
        ({ editorView, sel } = editor(doc(p(' ``{<>}'))));
        insertText(editorView, '`', sel);
      });

      it('should convert "```" to a code block without first character', () => {
        expect(editorView.state.doc).toEqualDocument(
          doc(p(' '), code_block()()),
        );
      });

      it('should fire analytics event', () => {
        expect(trackEvent).toHaveBeenCalledWith(analyticsV2Event);
        expect(createAnalyticsEvent).toHaveBeenCalledWith(analyticsV3Payload);
      });
    });
  });
});
