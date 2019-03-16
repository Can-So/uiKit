import * as tslib_1 from "tslib";
import * as React from 'react';
import Editor from '../../editor';
import EditorWithActions from '../../labs/EditorWithActions';
import ChromeCollapsed from '../ChromeCollapsed';
var CollapsedEditor = /** @class */ (function (_super) {
    tslib_1.__extends(CollapsedEditor, _super);
    function CollapsedEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleEditorRef = function (editorRef, editorRefCallback) {
            if (editorRefCallback && typeof editorRefCallback === 'function') {
                editorRefCallback(editorRef);
            }
            _this.editorComponent = editorRef;
        };
        return _this;
    }
    CollapsedEditor.prototype.componentWillReceiveProps = function (nextProps) {
        if (!this.props.isExpanded && nextProps.isExpanded) {
            this.shouldTriggerExpandEvent = true;
        }
    };
    CollapsedEditor.prototype.componentDidUpdate = function () {
        if (this.shouldTriggerExpandEvent && this.editorComponent) {
            this.shouldTriggerExpandEvent = false;
            if (this.props.onExpand) {
                this.props.onExpand();
            }
        }
    };
    CollapsedEditor.prototype.render = function () {
        var _this = this;
        var child = React.Children.only(this.props.children);
        if (child.type !== Editor && child.type !== EditorWithActions) {
            throw new Error('Expected child to be of type `Editor`');
        }
        if (!this.props.isExpanded) {
            return (React.createElement(ChromeCollapsed, { onFocus: this.props.onFocus, text: this.props.placeholder }));
        }
        return React.cloneElement(child, {
            ref: function (editorComponent) {
                return _this.handleEditorRef(editorComponent, child.ref);
            },
        });
    };
    return CollapsedEditor;
}(React.Component));
export default CollapsedEditor;
//# sourceMappingURL=index.js.map