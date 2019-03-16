import * as tslib_1 from "tslib";
import { utils, } from '@findable/util-service-support';
// collector id for QS in Confluence = 'b7e38976';
// See: https://jira.atlassian.com/secure/ViewCollector!default.jspa?projectKey=FEEDBACK&collectorId=b7e38976
// Use collectorId = 'a0d6de4d' if you want to test the feedback component without submitting real feedback items
// See: https://jira.atlassian.com/secure/ViewCollector!default.jspa?projectKey=FEEDBACK&collectorId=a0d6de4d
var config = {
    url: 'https://pf-feedback-proxy.us-east-1.staging.public.atl-paas.net',
};
function webInfo() {
    return "\nDomain: " + window.location.hostname + "\nUser-Agent: " + navigator.userAgent + "\nScreen Resolution: " + screen.width + " x " + screen.height + "\n  ";
}
function truncate(text) {
    if (text.length < 50) {
        return text;
    }
    return text.substring(0, 49) + '...';
}
export default function sendFeedback(summary, collectorId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var data, options;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        collectorId: collectorId,
                        data: {
                            summary: truncate(summary),
                            description: summary,
                            webInfo: webInfo(),
                        },
                    };
                    options = {
                        path: 'api/feedback',
                        requestInit: {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            method: 'POST',
                            body: JSON.stringify(data),
                        },
                    };
                    return [4 /*yield*/, utils.requestService(config, options)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//# sourceMappingURL=feedback-client.js.map