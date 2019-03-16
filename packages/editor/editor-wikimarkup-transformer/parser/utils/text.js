/**
 * Check if the node has certain marks
 */
export function hasAnyOfMarks(node, types) {
    return (node.marks.findIndex(function (m) { return types.findIndex(function (t) { return m.type.name === t; }) !== -1; }) !== -1);
}
export function isDigit(value) {
    return !!value.match(/^\d$/);
}
export function isBlank(value) {
    return value === null || value.trim() === '';
}
export function isNotBlank(value) {
    return !isBlank(value);
}
var StringBuffer = /** @class */ (function () {
    function StringBuffer(buffer) {
        if (buffer === void 0) { buffer = ''; }
        this.buffer = buffer;
    }
    StringBuffer.prototype.indexOf = function (value) {
        return this.buffer.indexOf(value);
    };
    StringBuffer.prototype.lastIndexOf = function (value) {
        return this.buffer.lastIndexOf(value);
    };
    StringBuffer.prototype.charAt = function (index) {
        return this.buffer.charAt(index);
    };
    StringBuffer.prototype.length = function () {
        return this.buffer.length;
    };
    StringBuffer.prototype.delete = function (start, end) {
        this.buffer = this.buffer.substring(0, start) + this.buffer.substring(end);
    };
    StringBuffer.prototype.append = function (value) {
        this.buffer += value;
    };
    StringBuffer.prototype.substring = function (start, end) {
        return this.buffer.substring(start, end);
    };
    StringBuffer.prototype.deleteCharAt = function (index) {
        this.delete(index, index + 1);
    };
    StringBuffer.prototype.toString = function () {
        return this.buffer;
    };
    return StringBuffer;
}());
export { StringBuffer };
//# sourceMappingURL=text.js.map