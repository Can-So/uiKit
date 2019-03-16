import * as tslib_1 from "tslib";
import { withAnalyticsEvents } from '@findable/analytics-next';
import * as debounce from 'lodash.debounce';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { cancelEvent, clearEvent, createAndFireEventInElementsChannel, deleteEvent, failedEvent, focusEvent, searchedEvent, selectEvent, startSession, } from '../analytics';
import { batchByKey } from './batch';
import { messages } from './i18n';
import { callCallback, extractOptionValue, getOptions, isIterable, isSingleValue, optionToSelectableOptions, isPopupUserPickerByComponent, } from './utils';
var UserPickerInternal = /** @class */ (function (_super) {
    tslib_1.__extends(UserPickerInternal, _super);
    function UserPickerInternal(props) {
        var _this = _super.call(this, props) || this;
        _this.withSelectRef = function (callback) { return function () {
            if (_this.selectRef) {
                callback(_this.selectRef.select.select);
            }
        }; };
        _this.nextOption = _this.withSelectRef(function (select) { return select.focusOption('down'); });
        _this.previousOption = _this.withSelectRef(function (select) {
            return select.focusOption('up');
        });
        _this.focus = function () {
            if (_this.selectRef && _this.selectRef.focus) {
                _this.selectRef.focus();
            }
        };
        _this.blur = function () {
            if (_this.selectRef && _this.selectRef.blur) {
                _this.selectRef.blur();
            }
        };
        _this.selectOption = _this.withSelectRef(function (select) {
            var focusedOption = select.state.focusedOption;
            select.selectOption(focusedOption);
        });
        _this.handleChange = function (value, _a) {
            var action = _a.action, removedValue = _a.removedValue, option = _a.option;
            if (removedValue && removedValue.data.fixed) {
                return;
            }
            _this.resetInputState();
            var _b = _this.props, onChange = _b.onChange, onSelection = _b.onSelection, onClear = _b.onClear, isMulti = _b.isMulti;
            callCallback(onChange, extractOptionValue(value), action);
            switch (action) {
                case 'select-option':
                    if (value && !Array.isArray(value)) {
                        callCallback(onSelection, value.data);
                    }
                    _this.fireEvent(selectEvent, isMulti ? option : value);
                    _this.session = isMulti ? startSession() : undefined;
                    break;
                case 'clear':
                    callCallback(onClear);
                    _this.fireEvent(clearEvent);
                    break;
                case 'remove-value':
                case 'pop-value':
                    _this.fireEvent(deleteEvent, removedValue && removedValue.data);
                    break;
            }
            if (!_this.props.value) {
                _this.setState({ value: value });
            }
        };
        _this.handleSelectRef = function (ref) {
            _this.selectRef = ref;
        };
        _this.addOptions = batchByKey(function (request, newOptions) {
            _this.setState(function (_a) {
                var inflightRequest = _a.inflightRequest, options = _a.options, count = _a.count;
                if (inflightRequest.toString() === request) {
                    return {
                        options: options.concat(newOptions.reduce(function (nextOptions, item) {
                            return Array.isArray(item)
                                ? nextOptions.concat(item[0])
                                : nextOptions.concat(item);
                        }, [])),
                        count: count - newOptions.length,
                    };
                }
                return null;
            });
        });
        _this.handleLoadOptionsError = function () {
            _this.fireEvent(failedEvent);
        };
        _this.executeLoadOptions = debounce(function (search) {
            var loadOptions = _this.props.loadOptions;
            if (loadOptions) {
                _this.setState(function (_a) {
                    var previousRequest = _a.inflightRequest;
                    var e_1, _b;
                    var inflightRequest = previousRequest + 1;
                    var result = loadOptions(search);
                    var addOptions = _this.addOptions.bind(_this, inflightRequest.toString());
                    var count = 0;
                    if (isIterable(result)) {
                        try {
                            for (var result_1 = tslib_1.__values(result), result_1_1 = result_1.next(); !result_1_1.done; result_1_1 = result_1.next()) {
                                var value = result_1_1.value;
                                Promise.resolve(value)
                                    .then(addOptions)
                                    .catch(_this.handleLoadOptionsError);
                                count++;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (result_1_1 && !result_1_1.done && (_b = result_1.return)) _b.call(result_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    else {
                        Promise.resolve(result)
                            .then(addOptions)
                            .catch(_this.handleLoadOptionsError);
                        count++;
                    }
                    return {
                        inflightRequest: inflightRequest,
                        count: count,
                        options: [],
                    };
                });
            }
        }, 200);
        _this.handleFocus = function (event) {
            var value = _this.state.value;
            callCallback(_this.props.onFocus);
            _this.setState({ menuIsOpen: true });
            if (!_this.props.isMulti && isSingleValue(value)) {
                var input_1 = event.target;
                _this.setState({ inputValue: value.label }, function () {
                    if (input_1 instanceof HTMLInputElement) {
                        input_1.select();
                    }
                });
            }
        };
        _this.resetInputState = function () {
            // Prevent filter if query typed, then blurred with no selection
            _this.setState({
                inputValue: '',
            });
            callCallback(_this.props.onInputChange, '');
            _this.executeLoadOptions('');
        };
        _this.handleBlur = function () {
            callCallback(_this.props.onBlur);
            if (isPopupUserPickerByComponent(_this.props.SelectComponent)) {
                return;
            }
            _this.resetInputState();
            _this.setState({
                menuIsOpen: false,
            });
        };
        _this.handleClose = function () {
            _this.resetInputState();
            callCallback(_this.props.onClose);
            _this.setState({
                menuIsOpen: false,
            });
        };
        _this.handleInputChange = function (search, _a) {
            var action = _a.action;
            if (action === 'input-change') {
                callCallback(_this.props.onInputChange, search);
                _this.setState({ inputValue: search });
                _this.executeLoadOptions(search);
            }
        };
        _this.fireEvent = function (eventCreator) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var createAnalyticsEvent = _this.props.createAnalyticsEvent;
            if (createAnalyticsEvent) {
                createAndFireEventInElementsChannel(eventCreator.apply(void 0, tslib_1.__spread([_this.props, _this.state, _this.session], args)))(createAnalyticsEvent);
            }
        };
        _this.startSession = function () {
            _this.session = startSession();
            _this.fireEvent(focusEvent);
        };
        _this.handleKeyDown = function (event) {
            // Escape
            if (event.keyCode === 27) {
                _this.blur();
            }
            // Space
            if (event.keyCode === 32 && !_this.state.inputValue) {
                event.preventDefault();
                _this.setState({ inputValue: ' ' });
            }
            if (_this.session) {
                _this.session.lastKey = event.keyCode;
                switch (event.keyCode) {
                    // KeyUp 38
                    case 38:
                        _this.session.upCount++;
                        break;
                    // KeyDown 40
                    case 40:
                        _this.session.downCount++;
                        break;
                }
            }
        };
        _this.handleClearIndicatorHover = function (hoveringClearIndicator) {
            _this.setState({ hoveringClearIndicator: hoveringClearIndicator });
        };
        _this.getOptions = function () { return getOptions(_this.state.options) || []; };
        _this.getAppearance = function () {
            return _this.props.appearance
                ? _this.props.appearance
                : _this.props.isMulti
                    ? 'compact'
                    : 'normal';
        };
        _this.state = {
            options: [],
            inflightRequest: 0,
            count: 0,
            hoveringClearIndicator: false,
            menuIsOpen: !!_this.props.open,
            inputValue: props.search || '',
        };
        return _this;
    }
    UserPickerInternal.getDerivedStateFromProps = function (nextProps, prevState) {
        var derivedState = {};
        if (nextProps.open !== undefined) {
            derivedState.menuIsOpen = nextProps.open;
        }
        if (nextProps.value !== undefined) {
            derivedState.value = optionToSelectableOptions(nextProps.value);
        }
        else if (nextProps.defaultValue && !prevState.value) {
            derivedState.value = optionToSelectableOptions(nextProps.defaultValue);
        }
        if (nextProps.search !== undefined &&
            nextProps.search !== prevState.inputValue) {
            derivedState.inputValue = nextProps.search;
        }
        if (nextProps.options !== undefined) {
            derivedState.options = nextProps.options;
        }
        return derivedState;
    };
    UserPickerInternal.prototype.componentDidMount = function () {
        var _a = this.props, open = _a.open, search = _a.search;
        // load options when the picker open
        if (open) {
            this.startSession();
            this.executeLoadOptions(search);
        }
    };
    UserPickerInternal.prototype.componentDidUpdate = function (_, prevState) {
        var _a = this.state, menuIsOpen = _a.menuIsOpen, options = _a.options;
        // load options when the picker open
        if (menuIsOpen && !prevState.menuIsOpen) {
            this.startSession();
            this.executeLoadOptions();
        }
        if (!menuIsOpen && prevState.menuIsOpen && this.session) {
            this.fireEvent(cancelEvent, prevState);
            this.session = undefined;
        }
        if (menuIsOpen &&
            ((!prevState.menuIsOpen && options.length > 0) ||
                options.length !== prevState.options.length)) {
            this.fireEvent(searchedEvent);
        }
        if (this.state.inputValue !== prevState.inputValue) {
            if (this.session) {
                this.session.inputChangeTime = Date.now();
            }
        }
    };
    UserPickerInternal.prototype.render = function () {
        var _a = this.props, isMulti = _a.isMulti, isLoading = _a.isLoading, subtle = _a.subtle, placeholder = _a.placeholder, isClearable = _a.isClearable, isDisabled = _a.isDisabled, clearValueLabel = _a.clearValueLabel, menuMinWidth = _a.menuMinWidth, menuPortalTarget = _a.menuPortalTarget, addMoreMessage = _a.addMoreMessage, noOptionsMessage = _a.noOptionsMessage, disableInput = _a.disableInput, components = _a.components, pickerProps = _a.pickerProps, SelectComponent = _a.SelectComponent, styles = _a.styles;
        var _b = this.state, count = _b.count, hoveringClearIndicator = _b.hoveringClearIndicator, menuIsOpen = _b.menuIsOpen, value = _b.value, inputValue = _b.inputValue;
        var appearance = this.getAppearance();
        return (React.createElement(SelectComponent, tslib_1.__assign({ enableAnimation: false, value: value, autoFocus: menuIsOpen, ref: this.handleSelectRef, isMulti: isMulti, options: this.getOptions(), onChange: this.handleChange, styles: styles, components: components, inputValue: inputValue, menuIsOpen: menuIsOpen, onFocus: this.handleFocus, onBlur: this.handleBlur, onClose: this.handleClose, isLoading: count > 0 || isLoading, onInputChange: this.handleInputChange, menuPlacement: "auto", placeholder: placeholder || React.createElement(FormattedMessage, tslib_1.__assign({}, messages.placeholder)), addMoreMessage: addMoreMessage, classNamePrefix: "fabric-user-picker", onClearIndicatorHover: this.handleClearIndicatorHover, hoveringClearIndicator: hoveringClearIndicator, appearance: appearance, isClearable: isClearable, subtle: isMulti ? false : subtle, blurInputOnSelect: !isMulti, closeMenuOnSelect: !isMulti, hideSelectedOptions: isMulti, noOptionsMessage: noOptionsMessage, openMenuOnFocus: true, onKeyDown: this.handleKeyDown, isDisabled: isDisabled, isFocused: menuIsOpen, backspaceRemovesValue: isMulti, filterOption: null, clearValueLabel: clearValueLabel, menuMinWidth: menuMinWidth, menuPortalTarget: menuPortalTarget, disableInput: disableInput }, pickerProps)));
    };
    UserPickerInternal.defaultProps = {
        isMulti: false,
        subtle: false,
        isClearable: true,
    };
    return UserPickerInternal;
}(React.Component));
export var BaseUserPicker = withAnalyticsEvents()(UserPickerInternal);
//# sourceMappingURL=BaseUserPicker.js.map