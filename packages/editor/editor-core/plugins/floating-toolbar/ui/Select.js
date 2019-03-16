import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import Select from '@atlaskit/select';
var SelectWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  width: ", "px;\n"], ["\n  width: ", "px;\n"])), function (props) { return props.width; });
var Search = /** @class */ (function (_super) {
    tslib_1.__extends(Search, _super);
    function Search() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { isOpen: false };
        return _this;
    }
    Search.prototype.render = function () {
        var _a = this.props, options = _a.options, onChange = _a.onChange, defaultValue = _a.defaultValue, placeholder = _a.placeholder, _b = _a.width, width = _b === void 0 ? 200 : _b;
        return (React.createElement(SelectWrapper, { width: width },
            React.createElement(Select, { options: options, value: defaultValue, onChange: onChange, placeholder: placeholder, spacing: 'compact', menuPlacement: "auto" })));
    };
    return Search;
}(Component));
export default Search;
var templateObject_1;
//# sourceMappingURL=Select.js.map