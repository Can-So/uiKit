import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
var ConfluenceInlineComment = /** @class */ (function (_super) {
    tslib_1.__extends(ConfluenceInlineComment, _super);
    function ConfluenceInlineComment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfluenceInlineComment.prototype.render = function () {
        var _a = this.props, reference = _a.reference, children = _a.children;
        return (React.createElement("span", { "data-mark-type": "confluenceInlineComment", "data-reference": reference }, children));
    };
    return ConfluenceInlineComment;
}(Component));
export default ConfluenceInlineComment;
//# sourceMappingURL=confluence-inline-comment.js.map