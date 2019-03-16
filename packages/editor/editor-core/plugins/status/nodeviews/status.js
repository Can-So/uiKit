import * as tslib_1 from "tslib";
import * as React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Status } from '@atlaskit/status';
import { pluginKey } from '../plugin';
import { setStatusPickerAt } from '../actions';
import { colors } from '@atlaskit/theme';
var B100 = colors.B100;
export var StatusContainer = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  cursor: pointer;\n\n  display: inline-block;\n  border-radius: 5px;\n  max-width: 100%;\n\n  /* Prevent responsive layouts increasing height of container by changing\n     font size and therefore line-height. */\n  line-height: 0;\n\n  opacity: ", ";\n\n  border: 2px solid ", ";\n  }\n\n  * ::selection {\n    background-color: transparent;\n  }\n"], ["\n  cursor: pointer;\n\n  display: inline-block;\n  border-radius: 5px;\n  max-width: 100%;\n\n  /* Prevent responsive layouts increasing height of container by changing\n     font size and therefore line-height. */\n  line-height: 0;\n\n  opacity: ",
    ";\n\n  border: 2px solid ",
    ";\n  }\n\n  * ::selection {\n    background-color: transparent;\n  }\n"])), function (props) {
    return props.placeholderStyle ? 0.5 : 1;
}, function (props) {
    return props.selected ? B100 : 'transparent';
});
export var messages = defineMessages({
    placeholder: {
        id: 'fabric.editor.statusPlaceholder',
        defaultMessage: 'Set a status',
        description: 'Placeholder description for an empty (new) status item in the editor',
    },
});
var StatusNodeView = /** @class */ (function (_super) {
    tslib_1.__extends(StatusNodeView, _super);
    function StatusNodeView(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSelectionChange = function (newSelection, _prevSelection) {
            var getPos = _this.props.getPos;
            var from = newSelection.from, to = newSelection.to;
            var statusPos = getPos();
            var selected = from <= statusPos && to > statusPos;
            if (_this.state.selected !== selected) {
                _this.setState({
                    selected: selected,
                });
            }
        };
        _this.handleClick = function (event) {
            if (event.nativeEvent.stopImmediatePropagation) {
                event.nativeEvent.stopImmediatePropagation();
            }
            var _a = _this.props.view, state = _a.state, dispatch = _a.dispatch;
            setStatusPickerAt(state.selection.from)(state, dispatch);
        };
        _this.state = {
            selected: false,
        };
        return _this;
    }
    StatusNodeView.prototype.componentDidMount = function () {
        var view = this.props.view;
        var selectionChanges = pluginKey.getState(view.state).selectionChanges;
        if (selectionChanges) {
            selectionChanges.subscribe(this.handleSelectionChange);
        }
    };
    StatusNodeView.prototype.componentWillUnmount = function () {
        var view = this.props.view;
        var selectionChanges = pluginKey.getState(view.state).selectionChanges;
        if (selectionChanges) {
            selectionChanges.unsubscribe(this.handleSelectionChange);
        }
    };
    StatusNodeView.prototype.render = function () {
        var _a = this.props, _b = _a.node.attrs, text = _b.text, color = _b.color, localId = _b.localId, style = _b.style, formatMessage = _a.intl.formatMessage;
        var selected = this.state.selected;
        var statusText = text ? text : formatMessage(messages.placeholder);
        return (React.createElement(StatusContainer, { selected: selected, placeholderStyle: !text },
            React.createElement(Status, { text: statusText, color: color, localId: localId, style: style, onClick: this.handleClick })));
    };
    return StatusNodeView;
}(React.Component));
export default injectIntl(StatusNodeView);
var templateObject_1;
//# sourceMappingURL=status.js.map