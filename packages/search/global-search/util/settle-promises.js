import * as tslib_1 from "tslib";
/**
 * Creates a Promise that is resolved with an array of results when all of the
 * provided Promises resolve OR reject.
 *
 * Any rejected promise will be of type Error where there the message is the
 * reason of the rejection.
 *
 * @param values An array of Promises.
 * @returns A new Promise.
 */
export default function settlePromises(values) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(values.map(function (p) { return p.catch(Error); }))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//# sourceMappingURL=settle-promises.js.map