import * as tslib_1 from "tslib";
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Card } from '@atlaskit/smart-card';
import wrapComponentWithClickArea from '../../../nodeviews/legacy-nodeview-factory/ui/wrapper-click-area';
import { stateKey as ReactNodeViewState } from '../../../plugins/base/pm-plugins/react-nodeview';
var InlineCardNode = /** @class */ (function (_super) {
    tslib_1.__extends(InlineCardNode, _super);
    function InlineCardNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () { };
        return _this;
    }
    InlineCardNode.prototype.render = function () {
        var _a = this.props, node = _a.node, selected = _a.selected;
        var _b = node.attrs, url = _b.url, data = _b.data;
        var cardContext = this.context.contextAdapter
            ? this.context.contextAdapter.card
            : undefined;
        var card = (React.createElement(Card, { url: url, data: data, appearance: "inline", isSelected: selected, onClick: this.onClick }));
        return cardContext ? (React.createElement(cardContext.Provider, { value: cardContext.value }, card)) : (card);
    };
    InlineCardNode.contextTypes = {
        contextAdapter: PropTypes.object,
    };
    return InlineCardNode;
}(React.PureComponent));
var ClickableInlineCard = wrapComponentWithClickArea(InlineCardNode, true);
var WrappedInline = /** @class */ (function (_super) {
    tslib_1.__extends(WrappedInline, _super);
    function WrappedInline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WrappedInline.prototype.render = function () {
        return (React.createElement(ClickableInlineCard, tslib_1.__assign({}, this.props, { pluginState: ReactNodeViewState.getState(this.props.view.state) })));
    };
    return WrappedInline;
}(React.PureComponent));
export default WrappedInline;
//# sourceMappingURL=inlineCard.js.map