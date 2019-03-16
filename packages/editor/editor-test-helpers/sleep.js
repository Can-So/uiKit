import * as tslib_1 from "tslib";
export default function sleep(time) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return window.setTimeout(resolve, time); })];
        });
    });
}
//# sourceMappingURL=sleep.js.map