export function createTextNode(input, schema, marks) {
    if (input === '') {
        return [];
    }
    var node = schema.text(input, marks || []);
    return [node];
}
//# sourceMappingURL=text.js.map