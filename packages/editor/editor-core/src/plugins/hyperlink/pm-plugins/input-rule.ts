import { inputRules, InputRule } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import { Plugin, EditorState } from 'prosemirror-state';
import { analyticsService } from '../../../analytics';
import { createInputRule } from '../../../utils/input-rules';
import { Match, LinkMatcher, normalizeUrl } from '../utils';

export function createLinkInputRule(
  regexp: RegExp,
  formatUrl: (url: string[]) => string,
): InputRule {
  return createInputRule(
    regexp,
    (state: EditorState, match: Match[], start: number, end: number) => {
      const { schema } = state;
      if (state.doc.rangeHasMark(start, end, schema.marks.link)) {
        return;
      }
      const [link] = match;

      const markType = schema.mark('link', { href: link.url });

      analyticsService.trackEvent(
        'atlassian.editor.format.hyperlink.autoformatting',
      );

      return state.tr
        .addMark(
          start - (link.input!.length - link.lastIndex),
          end - (link.input!.length - link.lastIndex),
          markType,
        )
        .insertText(' ');
    },
  );
}

export function createInputRulePlugin(schema: Schema): Plugin | undefined {
  if (!schema.marks.link) {
    return;
  }

  const urlWithASpaceRule = createLinkInputRule(
    new LinkMatcher() as RegExp,
    match => (match[3] ? match[1] : `http://${match[1]}`),
  );

  // [something](link) should convert to a hyperlink
  const markdownLinkRule = createInputRule(
    /(^|[^!])\[(.*?)\]\((\S+)\)$/,
    (state, match, start, end) => {
      const { schema } = state;
      const [, prefix, linkText, linkUrl] = match;
      const url = normalizeUrl(linkUrl);
      const markType = schema.mark('link', { href: url });

      // TODO: queue link card here?

      analyticsService.trackEvent(
        'atlassian.editor.format.hyperlink.autoformatting',
      );

      return state.tr.replaceWith(
        start + prefix.length,
        end,
        schema.text(linkText, [markType]),
      );
    },
  );

  return inputRules({
    rules: [urlWithASpaceRule, markdownLinkRule],
  });
}

export default createInputRulePlugin;
