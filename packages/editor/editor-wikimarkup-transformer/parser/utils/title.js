/**
 * This will return ADF to replace the titles in some macro
 * For example
 * {panel:title}aaa{panel}
 */
export function title(text, schema) {
    var mark = schema.marks.strong.create();
    var title = schema.text(text, [mark]);
    return schema.nodes.paragraph.createChecked({}, [title]);
}
//# sourceMappingURL=title.js.map