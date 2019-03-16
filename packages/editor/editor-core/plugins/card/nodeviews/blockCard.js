import * as tslib_1 from "tslib";
import * as React from 'react';
import { Card } from '@atlaskit/smart-card';
import * as PropTypes from 'prop-types';
import wrapComponentWithClickArea from '../../../nodeviews/legacy-nodeview-factory/ui/wrapper-click-area';
import { stateKey as ReactNodeViewState } from '../../../plugins/base/pm-plugins/react-nodeview';
var BlockCardNode = /** @class */ (function (_super) {
    tslib_1.__extends(BlockCardNode, _super);
    function BlockCardNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function () { };
        return _this;
    }
    BlockCardNode.prototype.render = function () {
        var _a = this.props, node = _a.node, selected = _a.selected;
        var _b = node.attrs, url = _b.url, data = _b.data;
        var cardContext = this.context.contextAdapter
            ? this.context.contextAdapter.card
            : undefined;
        // render an empty span afterwards to get around Webkit bug
        // that puts caret in next editable text element
        var cardInner = (React.createElement(React.Fragment, null,
            React.createElement(Card, { url: url, data: data, appearance: "block", isSelected: selected, onClick: this.onClick }),
            React.createElement("span", { contentEditable: true })));
        return (React.createElement("div", null, cardContext ? (React.createElement(cardContext.Provider, { value: cardContext.value }, cardInner)) : (cardInner)));
    };
    BlockCardNode.contextTypes = {
        contextAdapter: PropTypes.object,
    };
    return BlockCardNode;
}(React.Component));
var ClickableBlockCard = wrapComponentWithClickArea(BlockCardNode);
var WrappedInline = /** @class */ (function (_super) {
    tslib_1.__extends(WrappedInline, _super);
    function WrappedInline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WrappedInline.prototype.render = function () {
        return (React.createElement(ClickableBlockCard, tslib_1.__assign({}, this.props, { pluginState: ReactNodeViewState.getState(this.props.view.state) })));
    };
    return WrappedInline;
}(React.PureComponent));
export default WrappedInline;
//# sourceMappingURL=blockCard.js.map