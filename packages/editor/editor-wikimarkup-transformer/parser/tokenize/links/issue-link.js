import { buildInlineCard, getIssue } from '../issue-key';
export function issueLinkResolver(link, schema, context) {
    var originalLinkText = link.originalLinkText, linkTitle = link.linkTitle, notLinkBody = link.notLinkBody;
    if (linkTitle === 'smart-link') {
        return [
            schema.nodes.inlineCard.createChecked({
                url: notLinkBody,
            }),
        ];
    }
    var issue = getIssue(context, originalLinkText);
    if (issue) {
        return buildInlineCard(schema, issue);
    }
    return undefined;
}
//# sourceMappingURL=issue-link.js.map