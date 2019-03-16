import { parse as parseQuery } from 'querystring';
export function parseAttrs(str, sep) {
    if (sep === void 0) { sep = '|'; }
    var output = parseQuery(str, sep);
    // take only first value of the same keys
    Object.keys(output).forEach(function (key) {
        if (Array.isArray(output[key])) {
            output[key] = output[key][0];
        }
    });
    return output;
}
//# sourceMappingURL=attrs.js.map