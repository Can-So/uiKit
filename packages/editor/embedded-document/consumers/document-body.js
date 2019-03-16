import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { Consumer } from './consumer';
import { default as Document } from '../components/document';
var DocumentBody = /** @class */ (function (_super) {
    tslib_1.__extends(DocumentBody, _super);
    function DocumentBody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderChild = function (props) {
            return React.createElement(Document, tslib_1.__assign({}, _this.props, props));
        };
        _this.stateMapper = function (state) {
            var doc = state.doc, hasError = state.hasError, isLoading = state.isLoading, mode = state.mode;
            return {
                doc: doc,
                hasError: hasError,
                isLoading: isLoading,
                mode: mode,
            };
        };
        _this.renderPropsMapper = function (renderProps) {
            var renderTitle = renderProps.renderTitle, renderToolbar = renderProps.renderToolbar;
            return {
                renderTitle: renderTitle,
                renderToolbar: renderToolbar,
            };
        };
        return _this;
    }
    DocumentBody.prototype.render = function () {
        return (React.createElement(Consumer, { stateMapper: this.stateMapper, renderPropsMapper: this.renderPropsMapper }, this.renderChild));
    };
    return DocumentBody;
}(PureComponent));
export default DocumentBody;
//# sourceMappingURL=document-body.js.map