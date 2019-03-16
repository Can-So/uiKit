import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import * as ReactDOM from 'react-dom';
import { Popup } from '@findable/editor-common';
import EmojiIcon from '@findable/icon/glyph/editor/emoji';
import { EmojiPicker as AkEmojiPicker, } from '@findable/emoji';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { OuterContainer } from './styles';
/**
 * Checks if an element is detached (i.e. not in the current document)
 */
var isDetachedElement = function (el) { return !document.body.contains(el); };
var ToolbarEmojiPicker = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarEmojiPicker, _super);
    function ToolbarEmojiPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
        };
        _this.handleEscape = function (e) {
            // ESC key pressed
            if (_this.state.isOpen && (e.which === 27 || e.keyCode === 27)) {
                _this.close();
            }
        };
        _this.handlePluginStateChange = function (pluginState) {
            var disabled = !pluginState.isEnabled();
            var newState = {
                disabled: disabled,
            };
            if (disabled) {
                // Ensure closed if disabled, so it does reappear later
                newState.isOpen = false;
            }
            _this.setState(newState);
        };
        _this.handleButtonRef = function (ref) {
            _this.buttonRef = ref;
        };
        _this.onPickerRef = function (ref) {
            if (ref) {
                document.addEventListener('click', _this.handleClickOutside);
            }
            else {
                document.removeEventListener('click', _this.handleClickOutside);
            }
            _this.pickerRef = ref;
        };
        _this.close = function () {
            _this.setState({
                isOpen: false,
            });
        };
        _this.toggleOpen = function () {
            var isOpen = _this.state.isOpen;
            _this.setState({
                isOpen: !isOpen,
            });
        };
        _this.handleClickOutside = function (e) {
            if (!_this.pickerRef) {
                return;
            }
            var picker = ReactDOM.findDOMNode(_this.pickerRef);
            // Ignore click events for detached elements.
            // Workaround for FS-1322 - where two onClicks fire - one when the upload button is
            // still in the document, and one once it's detached. Does not always occur, and
            // may be a side effect of a react render optimisation
            if (!picker ||
                (e.target instanceof HTMLElement &&
                    !isDetachedElement(e.target) &&
                    !picker.contains(e.target))) {
                _this.close();
            }
        };
        _this.handleSelectedEmoji = withAnalytics('atlassian.editor.emoji.button', function (emojiId) {
            if (_this.state.isOpen && _this.pluginState) {
                _this.pluginState.insertEmoji(emojiId);
                _this.close();
                return true;
            }
            return false;
        });
        return _this;
    }
    ToolbarEmojiPicker.prototype.componentWillMount = function () {
        this.setPluginState(this.props);
    };
    ToolbarEmojiPicker.prototype.componentDidMount = function () {
        this.state.button = this.buttonRef
            ? ReactDOM.findDOMNode(this.buttonRef)
            : undefined;
        if (this.pluginState) {
            this.pluginState.subscribe(this.handlePluginStateChange);
        }
        // Keymapping must be added here at the document level as editor focus is lost
        // when the picker opens so plugins/emojis/keymaps.ts will not register ESC
        document.addEventListener('keydown', this.handleEscape);
    };
    ToolbarEmojiPicker.prototype.componentWillReceiveProps = function (props) {
        if (!this.pluginState && props.pluginKey) {
            this.setPluginState(props);
        }
    };
    ToolbarEmojiPicker.prototype.componentDidUpdate = function () {
        var button = this.state.button;
        if (!button || !button.getBoundingClientRect().width) {
            this.state.button = this.buttonRef
                ? ReactDOM.findDOMNode(this.buttonRef)
                : undefined;
        }
    };
    ToolbarEmojiPicker.prototype.componentWillUnmount = function () {
        document.removeEventListener('keydown', this.handleEscape);
        if (this.pluginState) {
            this.pluginState.unsubscribe(this.handlePluginStateChange);
        }
    };
    ToolbarEmojiPicker.prototype.setPluginState = function (props) {
        var editorView = props.editorView, pluginKey = props.pluginKey;
        if (!editorView) {
            return;
        }
        var pluginState = pluginKey.getState(editorView.state);
        if (pluginState) {
            this.pluginState = pluginState;
            pluginState.subscribe(this.handlePluginStateChange);
            this.handlePluginStateChange(pluginState);
        }
    };
    ToolbarEmojiPicker.prototype.renderPopup = function () {
        var _a = this.state, disabled = _a.disabled, isOpen = _a.isOpen, button = _a.button;
        var _b = this.props, popupsMountPoint = _b.popupsMountPoint, popupsBoundariesElement = _b.popupsBoundariesElement, popupsScrollableElement = _b.popupsScrollableElement, emojiProvider = _b.emojiProvider;
        if (disabled || !isOpen || !button) {
            return null;
        }
        return (React.createElement(Popup, { target: button, fitHeight: 350, fitWidth: 350, offset: [0, 3], mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement },
            React.createElement(AkEmojiPicker, { emojiProvider: emojiProvider, onSelection: this.handleSelectedEmoji, onPickerRef: this.onPickerRef })));
    };
    ToolbarEmojiPicker.prototype.render = function () {
        var _a = this.props, isDisabled = _a.isDisabled, isReducedSpacing = _a.isReducedSpacing;
        var _b = this.state, isOpen = _b.isOpen, disabled = _b.disabled;
        var toolbarButton = (React.createElement(ToolbarButton, { selected: isOpen, disabled: disabled || isDisabled, onClick: this.toggleOpen, iconBefore: React.createElement(EmojiIcon, { label: "Emoji" }), ref: this.handleButtonRef, title: "Emoji :", hideTooltip: isOpen, spacing: isReducedSpacing ? 'none' : 'default' }));
        return (React.createElement(OuterContainer, { width: isReducedSpacing ? 'large' : 'small' },
            toolbarButton,
            this.renderPopup()));
    };
    return ToolbarEmojiPicker;
}(PureComponent));
export default ToolbarEmojiPicker;
//# sourceMappingURL=index.js.map