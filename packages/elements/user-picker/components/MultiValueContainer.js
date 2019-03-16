import * as tslib_1 from "tslib";
import { components } from '@findable/select';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { messages } from './i18n';
import { isChildInput } from './utils';
export var ScrollAnchor = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  align-self: flex-end;\n"], ["\n  align-self: flex-end;\n"])));
var MultiValueContainer = /** @class */ (function (_super) {
    tslib_1.__extends(MultiValueContainer, _super);
    function MultiValueContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.bottomAnchor = null;
        _this.handleBottomAnchor = function (ref) {
            _this.bottomAnchor = ref;
        };
        _this.showPlaceholder = function () {
            var value = _this.props.selectProps.value;
            return value && value.length > 0;
        };
        _this.addPlaceholder = function (placeholder) {
            return React.Children.map(_this.props.children, function (child) {
                return isChildInput(child) && _this.showPlaceholder()
                    ? React.cloneElement(child, { placeholder: placeholder })
                    : child;
            });
        };
        _this.renderChildren = function () {
            var _a = _this.props.selectProps, addMoreMessage = _a.addMoreMessage, isDisabled = _a.isDisabled;
            // Do not render "Add more..." message if picker is disabled
            if (isDisabled) {
                return _this.props.children;
            }
            if (addMoreMessage === undefined) {
                return (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.addMore), function (addMore) { return _this.addPlaceholder(addMore); }));
            }
            return _this.addPlaceholder(addMoreMessage);
        };
        _this.state = {
            valueSize: 0,
            previousValueSize: 0,
        };
        return _this;
    }
    MultiValueContainer.getDerivedStateFromProps = function (nextProps, prevState) {
        return {
            valueSize: nextProps.getValue ? nextProps.getValue().length : 0,
            previousValueSize: prevState.valueSize,
        };
    };
    MultiValueContainer.prototype.componentDidUpdate = function () {
        var _this = this;
        var _a = this.state, previousValueSize = _a.previousValueSize, valueSize = _a.valueSize;
        if (valueSize > previousValueSize) {
            window.setTimeout(function () { return _this.bottomAnchor && _this.bottomAnchor.scrollIntoView(); });
        }
    };
    MultiValueContainer.prototype.render = function () {
        var _a = this.props, children = _a.children, valueContainerProps = tslib_1.__rest(_a, ["children"]);
        return (React.createElement(components.ValueContainer, tslib_1.__assign({}, valueContainerProps),
            this.renderChildren(),
            React.createElement(ScrollAnchor, { innerRef: this.handleBottomAnchor })));
    };
    return MultiValueContainer;
}(React.PureComponent));
export { MultiValueContainer };
var templateObject_1;
//# sourceMappingURL=MultiValueContainer.js.map