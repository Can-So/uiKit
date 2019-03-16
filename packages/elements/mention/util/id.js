import * as uuid from 'uuid';
export default (function (prefix) {
    if (prefix === void 0) { prefix = ''; }
    return prefix + "_" + uuid();
});
//# sourceMappingURL=id.js.map