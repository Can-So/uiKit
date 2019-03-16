import * as tslib_1 from "tslib";
import * as React from 'react';
import memoizeOne from 'memoize-one';
import { PopupSelect } from '@atlaskit/select';
import Trigger from './Trigger';
import * as components from './components';
import { name as packageName, version as packageVersion, } from '../version.json';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent, } from '@atlaskit/analytics-next';
import { ColorCardWrapper } from '../styled/ColorPicker';
var defaultPopperProps = {
    positionFixed: true,
    modifiers: { offset: { offset: "0, 8" } },
    placement: 'bottom-start',
};
var getOptions = memoizeOne(function (props) {
    var palette = props.palette, selectedColor = props.selectedColor;
    var focusedItemIndex = 0;
    var value = palette.find(function (color, index) {
        if (color.value === selectedColor) {
            focusedItemIndex = index;
            return true;
        }
        return false;
    }) || palette[0];
    return {
        options: palette,
        value: value,
        focusedItemIndex: focusedItemIndex,
    };
});
var ColorPickerWithoutAnalytics = /** @class */ (function (_super) {
    tslib_1.__extends(ColorPickerWithoutAnalytics, _super);
    function ColorPickerWithoutAnalytics() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
        _this.changeAnalyticsCaller = function () {
            var createAnalyticsEvent = _this.props.createAnalyticsEvent;
            if (createAnalyticsEvent) {
                return _this.createAndFireEventOnAtlaskit({
                    action: 'clicked',
                    actionSubject: 'color-picker',
                    attributes: {
                        componentName: 'color-picker',
                        packageName: packageName,
                        packageVersion: packageVersion,
                    },
                })(createAnalyticsEvent);
            }
            return undefined;
        };
        _this.onChange = function (option) {
            _this.props.onChange(option.value, _this.changeAnalyticsCaller());
        };
        return _this;
    }
    ColorPickerWithoutAnalytics.prototype.render = function () {
        var _a = this.props, checkMarkColor = _a.checkMarkColor, cols = _a.cols, _b = _a.popperProps, popperProps = _b === void 0 ? defaultPopperProps : _b, _c = _a.label, label = _c === void 0 ? 'Color picker' : _c;
        var _d = getOptions(this.props), options = _d.options, value = _d.value;
        var fullLabel = label + ", " + value.label + " selected";
        return (React.createElement(PopupSelect, { target: function (_a) {
                var ref = _a.ref, isOpen = _a.isOpen;
                return (React.createElement(ColorCardWrapper, { innerRef: ref },
                    React.createElement(Trigger, tslib_1.__assign({}, value, { label: fullLabel, expanded: isOpen }))));
            }, popperProps: popperProps, maxMenuWidth: "auto", minMenuWidth: "auto", options: options, "aria-label": fullLabel, value: value, components: components, onChange: this.onChange, 
            // never show search input
            searchThreshold: Number.MAX_VALUE, 
            // palette props
            cols: cols, checkMarkColor: checkMarkColor }));
    };
    return ColorPickerWithoutAnalytics;
}(React.Component));
export { ColorPickerWithoutAnalytics };
export default withAnalyticsContext({
    componentName: 'color-picker',
    packageName: packageName,
    packageVersion: packageVersion,
})(withAnalyticsEvents()(ColorPickerWithoutAnalytics));
//# sourceMappingURL=ColorPicker.js.map