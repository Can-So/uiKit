import { Fragment, DOMSerializer, DOMParser, } from 'prosemirror-model';
export var fromHTML = function (html, schema) {
    var el = document.createElement('div');
    el.innerHTML = html;
    return DOMParser.fromSchema(schema).parse(el);
};
export var toDOM = function (node, schema) {
    var serializer = DOMSerializer.fromSchema(schema);
    return serializer.serializeFragment(Fragment.from(node));
};
export var toHTML = function (node, schema) {
    var el = document.createElement('div');
    el.appendChild(toDOM(node, schema));
    return el.innerHTML;
};
//# sourceMappingURL=html-helpers.js.map