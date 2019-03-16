import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { AkCodeBlock } from '@findable/code';
import overflowShadow from '../../ui/overflow-shadow';
function identity(text) {
    return text;
}
var CodeBlock = /** @class */ (function (_super) {
    tslib_1.__extends(CodeBlock, _super);
    function CodeBlock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CodeBlock.prototype.render = function () {
        var _a = this.props, children = _a.children, language = _a.language, handleRef = _a.handleRef, shadowClassNames = _a.shadowClassNames;
        var codeProps = {
            language: language,
            text: React.Children.map(children, identity).join(''),
        };
        return (React.createElement("div", { className: "CodeBlock " + shadowClassNames, ref: handleRef },
            React.createElement(AkCodeBlock, tslib_1.__assign({}, codeProps))));
    };
    return CodeBlock;
}(PureComponent));
export default overflowShadow(CodeBlock, {
    overflowSelector: 'span',
    scrollableSelector: 'code',
});
//# sourceMappingURL=codeBlock.js.map