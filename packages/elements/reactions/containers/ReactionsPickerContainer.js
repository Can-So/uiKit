import * as tslib_1 from "tslib";
import * as React from 'react';
import { ReactionPicker } from '../components/ReactionPicker';
import { ReactionConsumer, } from '../reaction-store/ReactionConsumer';
var ReactionPickerContainer = /** @class */ (function (_super) {
    tslib_1.__extends(ReactionPickerContainer, _super);
    function ReactionPickerContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderChild = function (props) { return (React.createElement(ReactionPicker, tslib_1.__assign({}, _this.props, props))); };
        _this.actionsMapper = function (actions) { return ({
            onSelection: function (emojiId) {
                actions.addReaction(_this.props.containerAri, _this.props.ari, emojiId);
            },
        }); };
        return _this;
    }
    ReactionPickerContainer.prototype.render = function () {
        return (React.createElement(ReactionConsumer, { store: this.props.store, actionsMapper: this.actionsMapper }, this.renderChild));
    };
    return ReactionPickerContainer;
}(React.PureComponent));
export default ReactionPickerContainer;
//# sourceMappingURL=ReactionsPickerContainer.js.map