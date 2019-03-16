import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import PluginSlot from '../PluginSlot';
import WithPluginState from '../WithPluginState';
import ContentStyles from '../ContentStyles';
import { pluginKey as maxContentSizePluginKey, } from '../../plugins/max-content-size';
import { scrollbarStyles } from '../styles';
import WithFlash from '../WithFlash';
// tslint:disable-next-line:variable-name
var ChromelessEditor = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  line-height: 20px;\n  height: auto;\n  min-height: 30px;\n  ", " overflow-x: hidden;\n  overflow-y: auto;\n  ", " max-width: inherit;\n  box-sizing: border-box;\n  word-wrap: break-word;\n\n  div > .ProseMirror {\n    outline: none;\n    white-space: pre-wrap;\n    padding: 0;\n    margin: 0;\n  }\n"], ["\n  line-height: 20px;\n  height: auto;\n  min-height: 30px;\n  ",
    " overflow-x: hidden;\n  overflow-y: auto;\n  ", " max-width: inherit;\n  box-sizing: border-box;\n  word-wrap: break-word;\n\n  div > .ProseMirror {\n    outline: none;\n    white-space: pre-wrap;\n    padding: 0;\n    margin: 0;\n  }\n"])), function (props) {
    return props.maxHeight
        ? 'max-height: ' + props.maxHeight + 'px;'
        : '';
}, scrollbarStyles);
ChromelessEditor.displayName = 'ChromelessEditor';
// tslint:disable-next-line:variable-name
var ContentArea = styled(ContentStyles)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""])));
ContentArea.displayName = 'ContentArea';
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appearance = 'chromeless';
        _this.renderChrome = function (_a) {
            var maxContentSize = _a.maxContentSize;
            var _b = _this.props, editorDOMElement = _b.editorDOMElement, editorView = _b.editorView, editorActions = _b.editorActions, eventDispatcher = _b.eventDispatcher, providerFactory = _b.providerFactory, contentComponents = _b.contentComponents, customContentComponents = _b.customContentComponents, maxHeight = _b.maxHeight, popupsMountPoint = _b.popupsMountPoint, popupsBoundariesElement = _b.popupsBoundariesElement, popupsScrollableElement = _b.popupsScrollableElement, disabled = _b.disabled, dispatchAnalyticsEvent = _b.dispatchAnalyticsEvent;
            var maxContentSizeReached = maxContentSize && maxContentSize.maxContentSizeReached;
            return (React.createElement(WithFlash, { animate: maxContentSizeReached },
                React.createElement(ChromelessEditor, { maxHeight: maxHeight, innerRef: function (ref) {
                        return (_this.containerElement = ref);
                    } },
                    React.createElement(ContentArea, null,
                        customContentComponents,
                        React.createElement(PluginSlot, { editorView: editorView, editorActions: editorActions, eventDispatcher: eventDispatcher, providerFactory: providerFactory, appearance: _this.appearance, items: contentComponents, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, containerElement: _this.containerElement, disabled: !!disabled, dispatchAnalyticsEvent: dispatchAnalyticsEvent }),
                        editorDOMElement))));
        };
        return _this;
    }
    Editor.prototype.render = function () {
        return (React.createElement(WithPluginState, { plugins: { maxContentSize: maxContentSizePluginKey }, render: this.renderChrome }));
    };
    Editor.displayName = 'ChromelessEditorAppearance';
    return Editor;
}(React.Component));
export default Editor;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Chromeless.js.map