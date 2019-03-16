import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { setNodeSelection } from '../../../utils';
var BlockWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
BlockWrapper.displayName = 'BlockWrapperClickArea';
var InlineWrapper = styled.span(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""])));
InlineWrapper.displayName = 'InlineWrapperClickArea';
// tslint:disable-next-line:variable-name
export default function wrapComponentWithClickArea(ReactComponent, inline) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(WrapperClickArea, _super);
        function WrapperClickArea() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = { selected: false };
            _this.handleDocumentSelectionChange = function (fromPos, toPos) {
                var _a = _this.props, getPos = _a.getPos, onSelection = _a.onSelection;
                var nodePos = getPos();
                var selected = nodePos >= fromPos && nodePos < toPos;
                var oldSelected = _this.state.selected;
                _this.setState({ selected: selected }, function () {
                    if (onSelection && selected !== oldSelected) {
                        onSelection(selected);
                    }
                });
            };
            _this.onClick = function () {
                var _a = _this.props, getPos = _a.getPos, view = _a.view;
                setNodeSelection(view, getPos());
            };
            return _this;
        }
        WrapperClickArea.prototype.componentDidMount = function () {
            var pluginState = this.props.pluginState;
            pluginState.subscribe(this.handleDocumentSelectionChange);
        };
        WrapperClickArea.prototype.componentWillUnmount = function () {
            var pluginState = this.props.pluginState;
            pluginState.unsubscribe(this.handleDocumentSelectionChange);
        };
        WrapperClickArea.prototype.render = function () {
            var Wrapper = inline ? InlineWrapper : BlockWrapper;
            return (React.createElement(Wrapper, { onClick: this.onClick },
                React.createElement(ReactComponent, tslib_1.__assign({}, this.props, { selected: this.state.selected }))));
        };
        return WrapperClickArea;
    }(PureComponent));
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=wrapper-click-area.js.map