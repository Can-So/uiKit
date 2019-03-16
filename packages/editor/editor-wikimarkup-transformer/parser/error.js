export function error(message, input, line, column) {
    throw createError({
        message: message,
        line: line,
        column: column,
    });
}
function createError(props) {
    var err = Object.create(SyntaxError.prototype);
    Object.assign(err, props, {
        name: 'SyntaxError',
    });
    return err;
}
//# sourceMappingURL=error.js.map