import rafSchedule from 'raf-schd';
import { DOMSerializer } from 'prosemirror-model';
import { browser } from '@atlaskit/editor-common';
var MATCH_NEWLINES = new RegExp('\n', 'g');
// For browsers <= IE11, we apply style overrides to render a basic code box
var isIE11 = browser.ie && browser.ie_version <= 11;
var toDOM = function (node) {
    return [
        'div',
        { class: 'code-block' + (isIE11 ? ' ie11' : '') },
        ['div', { class: 'line-number-gutter', contenteditable: 'false' }],
        [
            'div',
            { class: 'code-content' },
            [
                'pre',
                [
                    'code',
                    { 'data-language': node.attrs.language || '', spellcheck: 'false' },
                    0,
                ],
            ],
        ],
    ];
};
var CodeBlockView = /** @class */ (function () {
    function CodeBlockView(node, view, getPos) {
        var _this = this;
        this.ensureLineNumbers = rafSchedule(function () {
            var lines = 1;
            _this.node.forEach(function (node) {
                var text = node.text;
                if (text) {
                    lines += (node.text.match(MATCH_NEWLINES) || []).length;
                }
            });
            while (_this.lineNumberGutter.childElementCount < lines) {
                _this.lineNumberGutter.appendChild(document.createElement('span'));
            }
            while (_this.lineNumberGutter.childElementCount > lines) {
                _this.lineNumberGutter.removeChild(_this.lineNumberGutter.lastChild);
            }
        });
        var _a = DOMSerializer.renderSpec(document, toDOM(node)), dom = _a.dom, contentDOM = _a.contentDOM;
        this.node = node;
        this.dom = dom;
        this.contentDOM = contentDOM;
        this.lineNumberGutter = this.dom.querySelector('.line-number-gutter');
        this.ensureLineNumbers();
    }
    CodeBlockView.prototype.update = function (node) {
        if (node.type !== this.node.type) {
            return false;
        }
        if (node !== this.node) {
            if (node.attrs.language !== this.node.attrs.language) {
                this.contentDOM.setAttribute('data-language', node.attrs.language || '');
            }
            this.node = node;
            this.ensureLineNumbers();
        }
        return true;
    };
    CodeBlockView.prototype.ignoreMutation = function (record) {
        // Ensure updating the line-number gutter doesn't trigger reparsing the codeblock
        return (record.target === this.lineNumberGutter ||
            record.target.parentNode === this.lineNumberGutter);
    };
    return CodeBlockView;
}());
export { CodeBlockView };
export default (function (node, view, getPos) {
    return new CodeBlockView(node, view, getPos);
});
//# sourceMappingURL=code-block.js.map