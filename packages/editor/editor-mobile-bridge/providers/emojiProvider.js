import { EmojiResource } from '@atlaskit/emoji';
import { createPromise } from '../cross-platform-promise';
import { mockFetchFor } from './utils';
var elementsConfigPromise = createPromise('getConfig');
function createEmojiProvider() {
    return elementsConfigPromise.submit().then(function (config) {
        var cloudId = config.cloudId, baseUrl = config.baseUrl;
        baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + "/";
        var emojiConfig = {
            providers: [
                {
                    url: baseUrl + "emoji/standard",
                },
                {
                    url: baseUrl + "emoji/atlassian",
                },
            ],
        };
        if (cloudId) {
            emojiConfig.providers.push({
                url: baseUrl + "emoji/" + cloudId + "/site",
            });
        }
        /**
         * iOS has no stable APIs to intercept requests.
         * So we mock out fetch for specific URLs and send them to native.
         * This bypasses a number of issues introduced when working via the
         * file protocol (CORS, cookie support, null origin etc).
         * TODO: We should send all fetch requests to iOS for processing,
         *       to be as consistent as possible.
         */
        if (window.webkit) {
            mockFetchFor(emojiConfig.providers.map(function (p) { return p.url; }));
        }
        return new EmojiResource(emojiConfig);
    });
}
export default createEmojiProvider();
//# sourceMappingURL=emojiProvider.js.map