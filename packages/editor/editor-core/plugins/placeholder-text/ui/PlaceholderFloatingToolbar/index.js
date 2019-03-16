import * as tslib_1 from "tslib";
import * as React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PanelTextInput from '../../../../ui/PanelTextInput';
import FloatingToolbar, { handlePositionCalculatedWith, getOffsetParent, getNearestNonTextNode, } from '../../../../ui/FloatingToolbar';
export var messages = defineMessages({
    placeholderTextPlaceholder: {
        id: 'fabric.editor.placeholderTextPlaceholder',
        defaultMessage: 'Add placeholder text',
        description: '',
    },
});
var PlaceholderFloatingToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(PlaceholderFloatingToolbar, _super);
    function PlaceholderFloatingToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSubmit = function (value) {
            if (value) {
                _this.props.insertPlaceholder(value);
                _this.props.setFocusInEditor();
            }
            else {
                _this.props.hidePlaceholderFloatingToolbar();
            }
        };
        _this.handleBlur = function () {
            _this.props.hidePlaceholderFloatingToolbar();
        };
        return _this;
    }
    PlaceholderFloatingToolbar.prototype.render = function () {
        var _a = this.props, getNodeFromPos = _a.getNodeFromPos, showInsertPanelAt = _a.showInsertPanelAt, editorViewDOM = _a.editorViewDOM, popupsMountPoint = _a.popupsMountPoint, getFixedCoordinatesFromPos = _a.getFixedCoordinatesFromPos, popupsBoundariesElement = _a.popupsBoundariesElement, formatMessage = _a.intl.formatMessage;
        var target = getNodeFromPos(showInsertPanelAt);
        var offsetParent = getOffsetParent(editorViewDOM, popupsMountPoint);
        var getFixedCoordinates = function () {
            return getFixedCoordinatesFromPos(showInsertPanelAt);
        };
        var handlePositionCalculated = handlePositionCalculatedWith(offsetParent, target, getFixedCoordinates);
        return (React.createElement(FloatingToolbar, { target: getNearestNonTextNode(target), onPositionCalculated: handlePositionCalculated, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, fitHeight: 32, offset: [0, 12] },
            React.createElement(PanelTextInput, { placeholder: formatMessage(messages.placeholderTextPlaceholder), onSubmit: this.handleSubmit, onBlur: this.handleBlur, autoFocus: true, width: 300 })));
    };
    return PlaceholderFloatingToolbar;
}(React.Component));
export default injectIntl(PlaceholderFloatingToolbar);
//# sourceMappingURL=index.js.map