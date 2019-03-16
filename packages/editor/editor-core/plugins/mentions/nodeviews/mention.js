import * as tslib_1 from "tslib";
import * as React from 'react';
import Mention from '../ui/Mention';
var MentionNode = /** @class */ (function (_super) {
    tslib_1.__extends(MentionNode, _super);
    function MentionNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MentionNode.prototype.render = function () {
        var _a = this.props, node = _a.node, providerFactory = _a.providerFactory, editorAppearance = _a.editorAppearance;
        var _b = node.attrs, id = _b.id, text = _b.text, accessLevel = _b.accessLevel;
        /**
         * Work around to bypass continuing a composition event.
         * @see ED-5924
         */
        var mentionText = text;
        if (text && editorAppearance === 'mobile') {
            mentionText = "\u200C\u200C " + mentionText + "\u200C\u200C ";
        }
        return (React.createElement(Mention, { id: id, text: mentionText, accessLevel: accessLevel, providers: providerFactory }));
    };
    return MentionNode;
}(React.PureComponent));
export default MentionNode;
//# sourceMappingURL=mention.js.map