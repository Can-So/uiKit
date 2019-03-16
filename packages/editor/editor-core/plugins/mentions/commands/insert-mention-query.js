import { insertTypeAheadQuery } from '../../type-ahead/commands/insert-query';
import { withAnalytics, } from '../../analytics';
export function insertMentionQuery() {
    return withAnalytics({
        action: "invoked" /* INVOKED */,
        actionSubject: "typeAhead" /* TYPEAHEAD */,
        actionSubjectId: "mentionTypeAhead" /* TYPEAHEAD_MENTION */,
        attributes: { inputMethod: "toolbar" /* TOOLBAR */ },
        eventType: "ui" /* UI */,
    })(insertTypeAheadQuery('@'));
}
//# sourceMappingURL=insert-mention-query.js.map