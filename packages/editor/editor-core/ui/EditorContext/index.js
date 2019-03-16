import * as tslib_1 from "tslib";
import * as React from 'react';
import * as PropTypes from 'prop-types';
import EditorActions from '../../actions';
var EditorContext = /** @class */ (function (_super) {
    tslib_1.__extends(EditorContext, _super);
    function EditorContext(props) {
        var _this = _super.call(this, props) || this;
        _this.editorActions = props.editorActions || new EditorActions();
        return _this;
    }
    EditorContext.prototype.getChildContext = function () {
        return {
            editorActions: this.editorActions,
        };
    };
    EditorContext.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    EditorContext.childContextTypes = {
        editorActions: PropTypes.object,
    };
    return EditorContext;
}(React.Component));
export default EditorContext;
//# sourceMappingURL=index.js.map