import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import Emoji from '../ui/Emoji';
// tslint:disable-next-line:variable-name
var Wrapper = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  user-select: all;\n"], ["\n  user-select: all;\n"])));
var EmojiNode = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiNode, _super);
    function EmojiNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmojiNode.prototype.render = function () {
        var _a = this.props, node = _a.node, providerFactory = _a.providerFactory;
        var _b = node.attrs, shortName = _b.shortName, id = _b.id, text = _b.text;
        return (React.createElement(Wrapper, null,
            React.createElement(Emoji, { providers: providerFactory, id: id, shortName: shortName, fallback: text })));
    };
    return EmojiNode;
}(React.PureComponent));
export default EmojiNode;
var templateObject_1;
//# sourceMappingURL=emoji.js.map