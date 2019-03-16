import * as tslib_1 from "tslib";
import * as React from 'react';
import ChromeCollapsed from '../../ui/ChromeCollapsed';
var CollapsedEditor = /** @class */ (function (_super) {
    tslib_1.__extends(CollapsedEditor, _super);
    function CollapsedEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { editorModules: CollapsedEditor.editorModules };
        return _this;
    }
    CollapsedEditor.prototype.componentDidMount = function () {
        if (!this.state.editorModules) {
            this.loadEditorModules();
        }
    };
    CollapsedEditor.prototype.loadEditorModules = function () {
        var _this = this;
        import(/* webpackChunkName:"@atlaskit-internal_editor-core-async" */ '../../').then(function (modules) {
            CollapsedEditor.editorModules = modules;
            _this.setState({ editorModules: modules });
        });
    };
    CollapsedEditor.prototype.render = function () {
        if (!this.props.isExpanded) {
            return (React.createElement(ChromeCollapsed, { onFocus: this.props.onClickToExpand, text: this.props.placeholder }));
        }
        if (!this.state.editorModules) {
            // TODO: Proper loading state
            return React.createElement(ChromeCollapsed, { text: "Loading..." });
        }
        var _a = this.state.editorModules, Editor = _a.Editor, rest = tslib_1.__rest(_a, ["Editor"]);
        return this.props.renderEditor(Editor, rest);
    };
    return CollapsedEditor;
}(React.Component));
export default CollapsedEditor;
//# sourceMappingURL=index.js.map