/**
 * In order to enable mentions in Editor we must set both properties: allowMentions and mentionProvider.
 * So this type is supposed to be a stub version of mention provider. We don't actually need it.
 */
import { MentionResource } from '@atlaskit/mention';
import { createPromise } from '../cross-platform-promise';
function createMentionProvider() {
    return createPromise('getAccountId')
        .submit()
        .then(function (accountId) {
        return new MentionResource({
            // Required attrib. Requests will happen natively.
            url: 'http://',
            shouldHighlightMention: function (mention) {
                if (accountId && accountId === mention.id) {
                    return true;
                }
                return false;
            },
        });
    });
}
export default createMentionProvider();
//# sourceMappingURL=mentionProvider.js.map