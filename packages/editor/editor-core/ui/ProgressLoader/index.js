import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Button from '@atlaskit/button';
import { Container, BackgroundWrapper, ProgressLoaderWrapper, LoaderStyle, } from './styles';
var ProgressLoader = /** @class */ (function (_super) {
    tslib_1.__extends(ProgressLoader, _super);
    function ProgressLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressLoader.prototype.render = function () {
        var _a = this.props, progress = _a.progress, maxWidth = _a.maxWidth, onCancel = _a.onCancel, cancelLabel = _a.cancelLabel;
        var maxLoaderWidth = maxWidth - 45;
        return (React.createElement(Container, null,
            React.createElement(ProgressLoaderWrapper, null,
                React.createElement(BackgroundWrapper, { maxWidth: maxLoaderWidth },
                    React.createElement(LoaderStyle, { progress: progress, maxWidth: maxLoaderWidth }))),
            onCancel && (React.createElement("div", { onClick: onCancel },
                React.createElement(Button, { appearance: "subtle" },
                    React.createElement(CrossIcon, { size: "small", label: cancelLabel || '' }))))));
    };
    return ProgressLoader;
}(PureComponent));
export default ProgressLoader;
//# sourceMappingURL=index.js.map