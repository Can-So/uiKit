import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { createParagraphAtEnd } from '../../../commands';
import { setCursorForTopLevelBlocks } from '../../../plugins/gap-cursor';
import { closestElement } from '../../../utils';
var ClickWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  flex-grow: 1;\n  height: 100%;\n"], ["\n  flex-grow: 1;\n  height: 100%;\n"])));
ClickWrapper.displayName = 'ClickWrapper';
// we ignore all of the clicks made inside <div class="ak-editor-content-area" /> (but not clicks on the node itself)
var insideContentArea = function (ref) {
    while (ref) {
        if (ref.classList && ref.classList.contains('ak-editor-content-area')) {
            return true;
        }
        ref = ref.parentNode;
    }
    return false;
};
var ClickAreaBlock = /** @class */ (function (_super) {
    tslib_1.__extends(ClickAreaBlock, _super);
    function ClickAreaBlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            var view = _this.props.editorView;
            var contentArea = event.currentTarget.querySelector('.ak-editor-content-area');
            var editorFocused = view.hasFocus();
            var target = event.target;
            // @see https://product-fabric.atlassian.net/browse/ED-4287
            // click event gets triggered twice on a checkbox (on <label> first and then on <input>)
            // by the time it gets triggered on input, PM already re-renders nodeView and detaches it from DOM
            // which doesn't pass the check !contentArea.contains(event.target)
            var isInputClicked = target.nodeName === 'INPUT';
            // @see ED-5126
            var isPopupClicked = !!closestElement(target, '[data-editor-popup]');
            // Fixes issue when using a textarea for editor title in full page editor doesn't let user focus it.
            var isTextAreaClicked = target.nodeName === 'TEXTAREA';
            if ((!contentArea ||
                !insideContentArea(target.parentNode) ||
                editorFocused === false) &&
                !isInputClicked &&
                !isTextAreaClicked &&
                !isPopupClicked &&
                view) {
                var dispatch = view.dispatch, dom = view.dom;
                var bottomAreaClicked = event.clientY > dom.getBoundingClientRect().bottom;
                var isParagraphAppended = bottomAreaClicked
                    ? createParagraphAtEnd()(view.state, dispatch)
                    : false;
                var isGapCursorSet = setCursorForTopLevelBlocks(event, dom, view.posAtCoords.bind(view), editorFocused)(view.state, dispatch);
                if (isParagraphAppended || isGapCursorSet) {
                    view.focus();
                    event.stopPropagation();
                }
            }
        };
        return _this;
    }
    ClickAreaBlock.prototype.render = function () {
        return (React.createElement(ClickWrapper, { onClick: this.handleClick }, this.props.children));
    };
    return ClickAreaBlock;
}(React.Component));
export default ClickAreaBlock;
var templateObject_1;
//# sourceMappingURL=index.js.map