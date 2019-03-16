import * as tslib_1 from "tslib";
import { mentionLinkResolver } from './mention-link';
import { attachmentLinkResolver } from './attachment-link';
import { urlLinkResolver } from './url-link';
import { issueLinkResolver } from './issue-link';
// jira-components/jira-core/src/main/resources/system-contentlinkresolvers-plugin.xml
// attachment resolver: 10
// anchor resolver: 20 - unsupported
// jiraissue resolver: 30 - unsupported
// user profile: 40
//
// Fall back to url link resolver
var linkResolverStrategies = [
    attachmentLinkResolver,
    mentionLinkResolver,
    issueLinkResolver,
    urlLinkResolver,
];
export function resolveLink(link, schema, context) {
    var e_1, _a;
    var length = link.originalLinkText.length + 2;
    try {
        for (var linkResolverStrategies_1 = tslib_1.__values(linkResolverStrategies), linkResolverStrategies_1_1 = linkResolverStrategies_1.next(); !linkResolverStrategies_1_1.done; linkResolverStrategies_1_1 = linkResolverStrategies_1.next()) {
            var resolver = linkResolverStrategies_1_1.value;
            var resolvedLink = resolver(link, schema, context);
            if (resolvedLink) {
                return {
                    length: length,
                    nodes: resolvedLink,
                    type: 'pmnode',
                };
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (linkResolverStrategies_1_1 && !linkResolverStrategies_1_1.done && (_a = linkResolverStrategies_1.return)) _a.call(linkResolverStrategies_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return {
        length: 1,
        type: 'text',
        text: "[",
    };
}
//# sourceMappingURL=link-resolver.js.map