import * as tslib_1 from "tslib";
import * as React from 'react';
import { components } from '@atlaskit/select';
var Input = /** @class */ (function (_super) {
    tslib_1.__extends(Input, _super);
    function Input() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Input.prototype.render = function () {
        var selectProps = this.props.selectProps;
        return (React.createElement(components.Input, tslib_1.__assign({}, this.props, { innerRef: this.props.innerRef, disabled: selectProps && selectProps.disableInput })));
    };
    return Input;
}(React.Component));
export { Input };
//# sourceMappingURL=Input.js.map