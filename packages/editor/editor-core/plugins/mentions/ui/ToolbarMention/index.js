import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import MentionIcon from '@atlaskit/icon/glyph/editor/mention';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { insertMentionQuery } from '../../commands/insert-mention-query';
var ToolbarMention = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarMention, _super);
    function ToolbarMention() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleInsertMention = withAnalytics('atlassian.fabric.mention.picker.trigger.button', function () {
            if (!_this.props.editorView) {
                return false;
            }
            insertMentionQuery()(_this.props.editorView.state, _this.props.editorView.dispatch);
            return true;
        });
        return _this;
    }
    ToolbarMention.prototype.render = function () {
        return (React.createElement(ToolbarButton, { spacing: "none", onClick: this.handleInsertMention, disabled: this.props.isDisabled, title: "Mention @", iconBefore: React.createElement(MentionIcon, { label: "Mention" }) }));
    };
    return ToolbarMention;
}(PureComponent));
export default ToolbarMention;
//# sourceMappingURL=index.js.map