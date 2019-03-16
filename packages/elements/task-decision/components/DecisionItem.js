import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import DecisionIcon from '@findable/icon/glyph/editor/decision';
import { EditorIconWrapper } from '../styled/DecisionItem';
import Item from './Item';
var DecisionItem = /** @class */ (function (_super) {
    tslib_1.__extends(DecisionItem, _super);
    function DecisionItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DecisionItem.prototype.getAttributionText = function () {
        var _a = this.props, creator = _a.creator, lastUpdater = _a.lastUpdater;
        var user = lastUpdater || creator;
        if (!user || !user.displayName) {
            return undefined;
        }
        return "Captured by " + user.displayName;
    };
    DecisionItem.prototype.render = function () {
        var _a = this.props, appearance = _a.appearance, children = _a.children, contentRef = _a.contentRef, participants = _a.participants, placeholder = _a.placeholder, showPlaceholder = _a.showPlaceholder;
        var icon = (React.createElement(EditorIconWrapper, { showPlaceholder: showPlaceholder },
            React.createElement(DecisionIcon, { label: "Decision", size: "large" })));
        return (React.createElement(Item, { appearance: appearance, contentRef: contentRef, icon: icon, participants: participants, placeholder: placeholder, showPlaceholder: showPlaceholder, attribution: this.getAttributionText() }, children));
    };
    DecisionItem.defaultProps = {
        appearance: 'inline',
    };
    return DecisionItem;
}(PureComponent));
export default DecisionItem;
//# sourceMappingURL=DecisionItem.js.map