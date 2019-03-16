import * as tslib_1 from "tslib";
import * as React from 'react';
import baseItem, { withItemClick, withItemFocus } from '@findable/item';
import { ResultItemAfter, ResultItemAfterWrapper, ResultItemCaption, ResultItemIcon, ResultItemTextAfter, ResultItemSubText, } from './styled';
var Item = withItemClick(withItemFocus(baseItem));
var ResultItem = /** @class */ (function (_super) {
    tslib_1.__extends(ResultItem, _super);
    function ResultItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResultItem.prototype.render = function () {
        var icon = this.props.icon ? (React.createElement(ResultItemIcon, null, this.props.icon)) : null;
        var textAfter = this.props.textAfter ? (React.createElement(ResultItemTextAfter, null, this.props.textAfter)) : null;
        var after = this.props.textAfter || this.props.selectedIcon ? (React.createElement(ResultItemAfterWrapper, null,
            React.createElement(ResultItemAfter, { shouldTakeSpace: !!this.props.textAfter },
                textAfter,
                this.props.isSelected && !this.props.isMouseSelected
                    ? this.props.selectedIcon
                    : null))) : null;
        var wrappedCaption = this.props.caption ? (React.createElement(ResultItemCaption, null, this.props.caption)) : null;
        var wrappedSubText = this.props.subText ? (React.createElement(ResultItemSubText, null, this.props.subText)) : null;
        var interactiveWrapperProps = {
            onClick: this.props.onClick,
            onMouseEnter: this.props.onMouseEnter,
            onMouseLeave: this.props.onMouseLeave,
            href: this.props.href,
        };
        return (React.createElement(Item, tslib_1.__assign({ elemBefore: icon, elemAfter: after, description: wrappedSubText, isSelected: this.props.isSelected, isCompact: this.props.isCompact, target: this.props.target, linkComponent: this.props.linkComponent }, interactiveWrapperProps),
            this.props.text,
            wrappedCaption));
    };
    ResultItem.defaultProps = {
        isSelected: false,
        isMouseSelected: false,
    };
    return ResultItem;
}(React.PureComponent));
export default ResultItem;
//# sourceMappingURL=ResultItem.js.map