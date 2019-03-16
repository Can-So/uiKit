import * as tslib_1 from "tslib";
import { EditorCardProvider } from '@atlaskit/smart-card';
var EditorTestCardProvider = /** @class */ (function (_super) {
    tslib_1.__extends(EditorTestCardProvider, _super);
    function EditorTestCardProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.testUrlMatch = new RegExp('^https?://([a-z_-]*.)?atlassian.com');
        return _this;
    }
    EditorTestCardProvider.prototype.resolve = function (url, appearance) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (url.match(this.testUrlMatch)) {
                    return [2 /*return*/, {
                            type: appearance === 'inline' ? 'inlineCard' : 'blockCard',
                            attrs: {
                                data: {
                                    '@context': 'https://www.w3.org/ns/activitystreams',
                                    '@type': 'Document',
                                    name: 'Welcome to Atlassian!',
                                    url: 'http://www.atlassian.com',
                                },
                            },
                        }];
                }
                else {
                    return [2 /*return*/, _super.prototype.resolve.call(this, url, appearance)];
                }
                return [2 /*return*/];
            });
        });
    };
    return EditorTestCardProvider;
}(EditorCardProvider));
export { EditorTestCardProvider };
export var cardProvider = new EditorTestCardProvider();
//# sourceMappingURL=card-provider.js.map