import * as tslib_1 from "tslib";
import * as React from 'react';
import * as debounce from 'lodash.debounce';
import styled from 'styled-components';
import AkAvatar from '@atlaskit/avatar';
import { Editor as AkEditor, EditorContext, WithEditorActions, CollapsedEditor, ToolbarFeedback, ToolbarHelp, name as packageName, version as packageVersion, } from '@atlaskit/editor-core';
var Container = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  /* -ms- properties are necessary until MS supports the latest version of the grid spec */\n  /* stylelint-disable value-no-vendor-prefix, declaration-block-no-duplicate-properties */\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: auto 1fr;\n  /* stylelint-enable */\n  grid-template:\n    'avatar-area editor-area'\n    / auto 1fr;\n  padding-top: 16px;\n  position: relative;\n\n  &:first-child,\n  &:first-of-type {\n    padding-top: 0;\n  }\n"], ["\n  /* -ms- properties are necessary until MS supports the latest version of the grid spec */\n  /* stylelint-disable value-no-vendor-prefix, declaration-block-no-duplicate-properties */\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: auto 1fr;\n  /* stylelint-enable */\n  grid-template:\n    'avatar-area editor-area'\n    / auto 1fr;\n  padding-top: 16px;\n  position: relative;\n\n  &:first-child,\n  &:first-of-type {\n    padding-top: 0;\n  }\n"])));
var AvatarSection = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  /* stylelint-disable value-no-vendor-prefix */\n  -ms-grid-row: 1;\n  -ms-grid-column: 1;\n  /* stylelint-enable */\n  grid-area: avatar-area;\n  margin-right: 8px;\n"], ["\n  /* stylelint-disable value-no-vendor-prefix */\n  -ms-grid-row: 1;\n  -ms-grid-column: 1;\n  /* stylelint-enable */\n  grid-area: avatar-area;\n  margin-right: 8px;\n"])));
var EditorSection = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  /* stylelint-disable value-no-vendor-prefix */\n  -ms-grid-row: 1;\n  -ms-grid-column: 2;\n  /* stylelint-enable */\n  grid-area: editor-area;\n"], ["\n  /* stylelint-disable value-no-vendor-prefix */\n  -ms-grid-row: 1;\n  -ms-grid-column: 2;\n  /* stylelint-enable */\n  grid-area: editor-area;\n"])));
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor(props) {
        var _this = _super.call(this, props) || this;
        _this.onFocus = function () {
            return _this.setState(function (prevState) { return ({ isExpanded: !prevState.isExpanded }); });
        };
        _this.onCancel = function () {
            if (_this.props.onCancel) {
                _this.props.onCancel();
            }
            _this.setState({
                isExpanded: false,
                isEditing: false,
            });
        };
        _this.onSave = function (actions) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var value;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.onSave) return [3 /*break*/, 2];
                        return [4 /*yield*/, actions.getValue()];
                    case 1:
                        value = _a.sent();
                        if (value &&
                            value.content.some(function (n) { return n.content && n.content.length; })) {
                            this.props.onSave(value);
                            actions.clear();
                        }
                        else {
                            this.onCancel();
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        this.setState({
                            isExpanded: false,
                            isEditing: false,
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onChange = function (actions) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var value;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.onChange) return [3 /*break*/, 2];
                        return [4 /*yield*/, actions.getValue()];
                    case 1:
                        value = _a.sent();
                        this.props.onChange(value);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        _this.renderEditor = function (actions) {
            var _a = _this.props, dataProviders = _a.dataProviders, renderEditor = _a.renderEditor, defaultValue = _a.defaultValue, placeholder = _a.placeholder, allowFeedbackAndHelpButtons = _a.allowFeedbackAndHelpButtons;
            var providers = {};
            // @TODO Remove and just pass the factory through once AkEditor is updated
            if (dataProviders) {
                dataProviders.providers.forEach(function (provider, key) {
                    providers[key] = provider;
                });
            }
            var defaultProps = tslib_1.__assign({ appearance: 'comment', shouldFocus: true, allowCodeBlocks: true, allowLists: true, onSave: function () { return _this.onSave(actions); }, onCancel: _this.onCancel, onChange: debounce(function () { return _this.onChange(actions); }, 250), defaultValue: defaultValue, allowHelpDialog: allowFeedbackAndHelpButtons, primaryToolbarComponents: allowFeedbackAndHelpButtons
                    ? [
                        React.createElement(ToolbarFeedback, { key: "feedback", packageName: packageName, packageVersion: packageVersion }),
                        React.createElement(ToolbarHelp, { key: "help" }),
                    ]
                    : undefined }, providers);
            return (React.createElement("div", null,
                React.createElement(CollapsedEditor, { placeholder: placeholder, isExpanded: _this.state.isExpanded, onFocus: _this.onFocus }, renderEditor ? (renderEditor(AkEditor, defaultProps)) : (React.createElement(AkEditor, tslib_1.__assign({}, defaultProps))))));
        };
        _this.state = {
            isExpanded: props.isExpanded,
            isEditing: props.isEditing,
        };
        return _this;
    }
    Editor.prototype.UNSAFE_componentWillUpdate = function (nextProps, nextState) {
        if (nextState.isExpanded && !this.state.isExpanded && this.props.onOpen) {
            this.props.onOpen();
        }
        else if (!nextState.isExpanded &&
            this.state.isExpanded &&
            this.props.onClose) {
            this.props.onClose();
        }
    };
    Editor.prototype.componentDidMount = function () {
        if (this.state.isExpanded && this.props.onOpen) {
            this.props.onOpen();
        }
    };
    Editor.prototype.componentWillUnmount = function () {
        if (this.props.onClose) {
            this.props.onClose();
        }
    };
    Editor.prototype.renderAvatar = function () {
        var isEditing = this.state.isEditing;
        var user = this.props.user;
        if (isEditing) {
            return null;
        }
        return (React.createElement(AvatarSection, null,
            React.createElement(AkAvatar, { src: user && user.avatarUrl })));
    };
    Editor.prototype.render = function () {
        var _this = this;
        return (React.createElement(EditorContext, null,
            React.createElement(Container, null,
                this.renderAvatar(),
                React.createElement(EditorSection, null,
                    React.createElement(WithEditorActions, { render: function (actions) { return _this.renderEditor(actions); } })))));
    };
    return Editor;
}(React.Component));
export default Editor;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Editor.js.map