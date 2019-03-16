import * as tslib_1 from "tslib";
import Select, { CreatableSelect } from '@findable/select';
import * as React from 'react';
import { BaseUserPicker } from './BaseUserPicker';
import { getStyles } from './styles';
import { getComponents } from './components';
import { getCreatableProps } from './creatable';
var UserPicker = /** @class */ (function (_super) {
    tslib_1.__extends(UserPicker, _super);
    function UserPicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserPicker.prototype.render = function () {
        var _a = this.props, allowEmail = _a.allowEmail, isMulti = _a.isMulti, isValidEmail = _a.isValidEmail, anchor = _a.anchor;
        var width = this.props.width;
        var SelectComponent = allowEmail ? CreatableSelect : Select;
        var pickerProps = allowEmail ? getCreatableProps(isValidEmail) : {};
        return (React.createElement(BaseUserPicker, tslib_1.__assign({}, this.props, { width: width, SelectComponent: SelectComponent, styles: getStyles(width), components: getComponents(isMulti, anchor), pickerProps: pickerProps })));
    };
    UserPicker.defaultProps = {
        width: 350,
    };
    return UserPicker;
}(React.Component));
export { UserPicker };
//# sourceMappingURL=UserPicker.js.map