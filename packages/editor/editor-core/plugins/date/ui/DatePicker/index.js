import * as tslib_1 from "tslib";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Popup, timestampToUTCDate, timestampToIsoFormat, akEditorFloatingDialogZIndex, } from '@atlaskit/editor-common';
import Calendar from '@atlaskit/calendar';
import { colors, borderRadius } from '@atlaskit/theme';
import withOuterListeners from '../../../../ui/with-outer-listeners';
var PopupWithListeners = withOuterListeners(Popup);
var calendarStyle = {
    padding: borderRadius(),
    borderRadius: borderRadius(),
    boxShadow: "0 4px 8px -2px " + colors.N60A + ", 0 0 1px " + colors.N60A,
    backgroundColor: colors.N0,
};
var DatePicker = /** @class */ (function (_super) {
    tslib_1.__extends(DatePicker, _super);
    function DatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (_a) {
            var day = _a.day, month = _a.month, year = _a.year;
            _this.setState({
                day: day,
                month: month,
                year: year,
            });
        };
        _this.handleRef = function (ref) {
            var elm = ref && ReactDOM.findDOMNode(ref);
            if (elm) {
                elm.focus();
            }
        };
        var timestamp = props.element.getAttribute('timestamp');
        if (timestamp) {
            var _a = timestampToUTCDate(timestamp), day = _a.day, month = _a.month, year = _a.year;
            _this.state = {
                selected: [timestampToIsoFormat(timestamp)],
                day: day,
                month: month,
                year: year,
            };
        }
        return _this;
    }
    DatePicker.prototype.render = function () {
        var _a = this.props, element = _a.element, closeDatePicker = _a.closeDatePicker, onSelect = _a.onSelect;
        var timestamp = element.getAttribute('timestamp');
        if (!timestamp) {
            return null;
        }
        return (React.createElement(PopupWithListeners, { target: element, offset: [0, 8], fitHeight: 327, fitWidth: 340, handleClickOutside: closeDatePicker, handleEscapeKeydown: closeDatePicker, zIndex: akEditorFloatingDialogZIndex },
            React.createElement(Calendar, tslib_1.__assign({ onChange: this.handleChange, onSelect: onSelect }, this.state, { ref: this.handleRef, innerProps: { style: calendarStyle } }))));
    };
    return DatePicker;
}(React.Component));
export default DatePicker;
//# sourceMappingURL=index.js.map