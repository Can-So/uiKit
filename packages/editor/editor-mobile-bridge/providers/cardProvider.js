import * as tslib_1 from "tslib";
import { EditorCardProvider } from '@findable/smart-card';
import { createPromise } from '../cross-platform-promise';
var EditorMobileCardProvider = /** @class */ (function (_super) {
    tslib_1.__extends(EditorMobileCardProvider, _super);
    function EditorMobileCardProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorMobileCardProvider.prototype.resolve = function (url, appearance) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var getLinkResolve;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createPromise('getLinkResolve', JSON.stringify({ url: url, appearance: appearance })).submit()];
                    case 1:
                        getLinkResolve = _a.sent();
                        if (typeof getLinkResolve === 'object') {
                            return [2 /*return*/, getLinkResolve];
                        }
                        else {
                            return [2 /*return*/, _super.prototype.resolve.call(this, url, appearance)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return EditorMobileCardProvider;
}(EditorCardProvider));
export { EditorMobileCardProvider };
export var cardProvider = new EditorMobileCardProvider();
//# sourceMappingURL=cardProvider.js.map