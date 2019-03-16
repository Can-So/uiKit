import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import { akEditorMenuZIndex } from '@atlaskit/editor-common';
import Avatars from '../../plugins/collab-edit/ui/avatars';
import PluginSlot from '../PluginSlot';
import Toolbar from '../Toolbar';
import ContentStyles from '../ContentStyles';
import { ClickAreaBlock } from '../Addon';
import { tableFullPageEditorStyles } from '../../plugins/table/ui/styles';
import { akEditorToolbarKeylineHeight } from '../../styles';
import rafSchedule from 'raf-schd';
import { scrollbarStyles } from '../styles';
import WidthEmitter from '../WidthEmitter';
var GUTTER_PADDING = 32;
var FullPageEditorWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  min-width: 340px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n"], ["\n  min-width: 340px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n"])));
FullPageEditorWrapper.displayName = 'FullPageEditorWrapper';
var ScrollContainer = styled(ContentStyles)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  flex-grow: 1;\n  overflow-y: scroll;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  scroll-behavior: smooth;\n  ", ";\n"], ["\n  flex-grow: 1;\n  overflow-y: scroll;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  scroll-behavior: smooth;\n  ", ";\n"])), scrollbarStyles);
ScrollContainer.displayName = 'ScrollContainer';
var ContentArea = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  line-height: 24px;\n  height: 100%;\n  width: 100%;\n  max-width: ", "px;\n  padding-top: 50px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  padding-bottom: 55px;\n\n  & .ProseMirror {\n    flex-grow: 1;\n    box-sizing: border-box;\n  }\n\n  && .ProseMirror {\n    & > * {\n      clear: both;\n    }\n    > p,\n    > ul,\n    > ol,\n    > h1,\n    > h2,\n    > h3,\n    > h4,\n    > h5,\n    > h6 {\n      clear: none;\n    }\n  }\n  ", ";\n"], ["\n  line-height: 24px;\n  height: 100%;\n  width: 100%;\n  max-width: ", "px;\n  padding-top: 50px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  padding-bottom: 55px;\n\n  & .ProseMirror {\n    flex-grow: 1;\n    box-sizing: border-box;\n  }\n\n  && .ProseMirror {\n    & > * {\n      clear: both;\n    }\n    > p,\n    > ul,\n    > ol,\n    > h1,\n    > h2,\n    > h3,\n    > h4,\n    > h5,\n    > h6 {\n      clear: none;\n    }\n  }\n  ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.layoutMaxWidth + GUTTER_PADDING * 2;
}, tableFullPageEditorStyles);
ContentArea.displayName = 'ContentArea';
var MainToolbar = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  position: relative;\n  align-items: center;\n  box-shadow: ", ";\n  transition: box-shadow 200ms;\n  z-index: ", ";\n  display: flex;\n  height: 80px;\n  flex-shrink: 0;\n\n  & object {\n    height: 0 !important;\n  }\n"], ["\n  position: relative;\n  align-items: center;\n  box-shadow: ",
    ";\n  transition: box-shadow 200ms;\n  z-index: ", ";\n  display: flex;\n  height: 80px;\n  flex-shrink: 0;\n\n  & object {\n    height: 0 !important;\n  }\n"])), function (props) {
    return props.showKeyline
        ? "0 " + akEditorToolbarKeylineHeight + "px 0 0 " + colors.N30
        : 'none';
}, akEditorMenuZIndex);
MainToolbar.displayName = 'MainToolbar';
var MainToolbarCustomComponentsSlot = styled.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: flex-end;\n  flex-grow: 1;\n"], ["\n  display: flex;\n  justify-content: flex-end;\n  flex-grow: 1;\n"])));
MainToolbarCustomComponentsSlot.displayName = 'MainToolbar';
var SecondaryToolbar = styled.div(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  box-sizing: border-box;\n  justify-content: flex-end;\n  align-items: center;\n  flex-shrink: 0;\n  display: flex;\n  padding: 24px 0;\n"], ["\n  box-sizing: border-box;\n  justify-content: flex-end;\n  align-items: center;\n  flex-shrink: 0;\n  display: flex;\n  padding: 24px 0;\n"])));
SecondaryToolbar.displayName = 'SecondaryToolbar';
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { showKeyline: false };
        _this.appearance = 'full-page';
        _this.stopPropagation = function (event) {
            return event.stopPropagation();
        };
        _this.scrollContainerRef = function (ref) {
            var previousScrollContainer = _this.scrollContainer;
            // remove existing handler
            if (previousScrollContainer) {
                previousScrollContainer.removeEventListener('scroll', _this.scheduleUpdateToolbarKeyline);
            }
            _this.scrollContainer = ref ? ref : undefined;
            if (_this.scrollContainer) {
                _this.scrollContainer.addEventListener('scroll', _this.scheduleUpdateToolbarKeyline, false);
                _this.updateToolbarKeyline();
            }
        };
        _this.updateToolbarKeyline = function () {
            if (!_this.scrollContainer) {
                return false;
            }
            var scrollTop = _this.scrollContainer.scrollTop;
            _this.setState({ showKeyline: scrollTop > akEditorToolbarKeylineHeight });
            return false;
        };
        _this.scheduleUpdateToolbarKeyline = rafSchedule(_this.updateToolbarKeyline);
        return _this;
    }
    Editor.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.scheduleUpdateToolbarKeyline, false);
    };
    Editor.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.scheduleUpdateToolbarKeyline);
        if (this.scheduledKeylineUpdate) {
            cancelAnimationFrame(this.scheduledKeylineUpdate);
        }
    };
    Editor.prototype.render = function () {
        var _a = this.props, editorDOMElement = _a.editorDOMElement, editorView = _a.editorView, editorActions = _a.editorActions, eventDispatcher = _a.eventDispatcher, providerFactory = _a.providerFactory, primaryToolbarComponents = _a.primaryToolbarComponents, contentComponents = _a.contentComponents, customPrimaryToolbarComponents = _a.customPrimaryToolbarComponents, customContentComponents = _a.customContentComponents, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, disabled = _a.disabled, collabEdit = _a.collabEdit, dispatchAnalyticsEvent = _a.dispatchAnalyticsEvent;
        var showKeyline = this.state.showKeyline;
        return (React.createElement(FullPageEditorWrapper, { className: "akEditor" },
            React.createElement(MainToolbar, { showKeyline: showKeyline },
                React.createElement(Toolbar, { editorView: editorView, editorActions: editorActions, eventDispatcher: eventDispatcher, providerFactory: providerFactory, appearance: this.appearance, items: primaryToolbarComponents, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, disabled: !!disabled, dispatchAnalyticsEvent: dispatchAnalyticsEvent }),
                React.createElement(MainToolbarCustomComponentsSlot, null,
                    React.createElement(Avatars, { editorView: editorView, eventDispatcher: eventDispatcher, inviteToEditHandler: collabEdit && collabEdit.inviteToEditHandler, isInviteToEditButtonSelected: collabEdit && collabEdit.isInviteToEditButtonSelected }),
                    customPrimaryToolbarComponents)),
            React.createElement(ScrollContainer, { innerRef: this.scrollContainerRef, className: "fabric-editor-popup-scroll-parent" },
                React.createElement(ClickAreaBlock, { editorView: editorView },
                    React.createElement(ContentArea, null,
                        React.createElement("div", { style: { padding: "0 " + GUTTER_PADDING + "px" }, className: "ak-editor-content-area" },
                            customContentComponents,
                            React.createElement(PluginSlot, { editorView: editorView, editorActions: editorActions, eventDispatcher: eventDispatcher, providerFactory: providerFactory, appearance: this.appearance, items: contentComponents, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, disabled: !!disabled, containerElement: this.scrollContainer, dispatchAnalyticsEvent: dispatchAnalyticsEvent }),
                            editorDOMElement)))),
            React.createElement(WidthEmitter, { editorView: editorView, contentArea: this.scrollContainer })));
    };
    Editor.displayName = 'FullPageEditor';
    return Editor;
}(React.Component));
export default Editor;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=FullPage.js.map