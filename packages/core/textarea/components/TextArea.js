import * as tslib_1 from "tslib";
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent, } from '@findable/analytics-next';
import GlobalTheme from '@findable/theme';
import * as React from 'react';
import { name as packageName, version as packageVersion, } from '../version.json';
import { Theme } from '../theme';
import { TextAreaWrapper } from '../styled';
import TextareaElement from './TextAreaElement';
import { withDefaultProps } from '@findable/type-helpers';
var defaultProps = {
    resize: 'smart',
    appearance: 'standard',
    isCompact: false,
    isRequired: false,
    isReadOnly: false,
    isDisabled: false,
    isInvalid: false,
    isMonospaced: false,
    minimumRows: 1,
    maxHeight: '50vh',
    forwardedRef: function () { },
};
var TextAreaWithoutForwardRef = /** @class */ (function (_super) {
    tslib_1.__extends(TextAreaWithoutForwardRef, _super);
    function TextAreaWithoutForwardRef() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isFocused: false,
        };
        _this.handleOnBlur = function (event) {
            var onBlur = _this.props.onBlur;
            _this.setState({ isFocused: false });
            if (onBlur) {
                onBlur(event);
            }
        };
        _this.handleOnFocus = function (event) {
            var onFocus = _this.props.onFocus;
            _this.setState({ isFocused: true });
            if (onFocus) {
                onFocus(event);
            }
        };
        return _this;
    }
    TextAreaWithoutForwardRef.prototype.render = function () {
        var _this = this;
        var _a = this.props, 
        // @ts-ignore
        createAnalyticsEvent = _a.createAnalyticsEvent, appearance = _a.appearance, resize = _a.resize, isCompact = _a.isCompact, isDisabled = _a.isDisabled, isInvalid = _a.isInvalid, isReadOnly = _a.isReadOnly, isMonospaced = _a.isMonospaced, isRequired = _a.isRequired, minimumRows = _a.minimumRows, maxHeight = _a.maxHeight, theme = _a.theme, forwardedRef = _a.forwardedRef, defaultValue = _a.defaultValue, rest = tslib_1.__rest(_a, ["createAnalyticsEvent", "appearance", "resize", "isCompact", "isDisabled", "isInvalid", "isReadOnly", "isMonospaced", "isRequired", "minimumRows", "maxHeight", "theme", "forwardedRef", "defaultValue"]);
        var isFocused = this.state.isFocused;
        return (React.createElement(GlobalTheme.Consumer, null, function (_a) {
            var mode = _a.mode;
            return (React.createElement(Theme.Provider, { value: theme },
                React.createElement(Theme.Consumer, { appearance: appearance, mode: mode }, function (tokens) { return (React.createElement(TextAreaWrapper, tslib_1.__assign({ resize: resize, maxHeight: maxHeight, appearance: appearance, isDisabled: isDisabled, isReadOnly: isReadOnly, isMonospaced: isMonospaced, isFocused: isFocused, isInvalid: isInvalid, minimumRows: minimumRows, forwardedRef: function () { } }, tokens),
                    React.createElement(TextareaElement, tslib_1.__assign({ forwardedRef: forwardedRef, resize: resize, disabled: isDisabled, readOnly: isReadOnly, required: isRequired }, rest, { onFocus: _this.handleOnFocus, onBlur: _this.handleOnBlur })))); })));
        }));
    };
    return TextAreaWithoutForwardRef;
}(React.Component));
var DefaultedTextAreaWithoutForwardRef = withDefaultProps(defaultProps, TextAreaWithoutForwardRef);
// $ExpectError flow-bin v0.74.0 doesn't know about forwardRef.
var TextArea = React.forwardRef(function (props, ref) { return (
// Once Extract React Types is fixed to read from default exports we can
// move textareaRef instantiation to after the spread.
// as of now we do this to reduce the chance of users being misled into a breaking configuration
// by our documentat.
React.createElement(DefaultedTextAreaWithoutForwardRef, tslib_1.__assign({ forwardedRef: ref }, props))); });
export { TextArea as TextAreaWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
    componentName: 'textArea',
    packageName: packageName,
    packageVersion: packageVersion,
})(withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
        action: 'blurred',
        actionSubject: 'textArea',
        attributes: {
            componentName: 'textArea',
            packageName: packageName,
            packageVersion: packageVersion,
        },
    }),
    onFocus: createAndFireEventOnAtlaskit({
        action: 'focused',
        actionSubject: 'textArea',
        attributes: {
            componentName: 'textArea',
            packageName: packageName,
            packageVersion: packageVersion,
        },
    }),
})(TextArea));
//# sourceMappingURL=TextArea.js.map