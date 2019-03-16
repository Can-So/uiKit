import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { createParagraphAtEnd } from '../../../commands';
var ClickArea = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  flex-grow: 1;\n"], ["\n  flex-grow: 1;\n"])));
ClickArea.displayName = 'ClickArea';
var ClickAreaInline = /** @class */ (function (_super) {
    tslib_1.__extends(ClickAreaInline, _super);
    function ClickAreaInline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            var editorView = _this.props.editorView;
            if (editorView) {
                if (createParagraphAtEnd()(editorView.state, editorView.dispatch)) {
                    editorView.focus();
                    event.stopPropagation();
                }
            }
        };
        return _this;
    }
    ClickAreaInline.prototype.render = function () {
        return React.createElement(ClickArea, { onClick: this.handleClick });
    };
    return ClickAreaInline;
}(React.Component));
export default ClickAreaInline;
var templateObject_1;
//# sourceMappingURL=index.js.map