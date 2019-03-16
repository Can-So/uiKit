import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import AkButton from '@atlaskit/button';
var FileChooser = /** @class */ (function (_super) {
    tslib_1.__extends(FileChooser, _super);
    function FileChooser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChooseFile = function () {
            var chooseFile = _this.refs['chooseFile'];
            if (chooseFile) {
                chooseFile.click();
            }
        };
        return _this;
    }
    FileChooser.prototype.render = function () {
        var _a = this.props, accept = _a.accept, ariaLabel = _a.ariaLabel, isDisabled = _a.isDisabled, label = _a.label, onChange = _a.onChange;
        return (React.createElement("span", null,
            React.createElement(AkButton, { onClick: this.onChooseFile, isDisabled: isDisabled, ariaLabel: ariaLabel || label }, label),
            React.createElement("input", { className: "emojiUploadFileInput", ref: "chooseFile", onChange: onChange, type: "file", accept: accept, style: { display: 'none' } })));
    };
    return FileChooser;
}(PureComponent));
export default FileChooser;
//# sourceMappingURL=FileChooser.js.map