import * as tslib_1 from "tslib";
import * as React from 'react';
import { ResultBase } from '@atlaskit/quick-search';
import Return from '../assets/Return';
var AdvancedSearchResult = /** @class */ (function (_super) {
    tslib_1.__extends(AdvancedSearchResult, _super);
    function AdvancedSearchResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdvancedSearchResult.prototype.getElemAfter = function () {
        var showKeyboardLozenge = this.props.showKeyboardLozenge;
        if (!showKeyboardLozenge) {
            return null;
        }
        // Supposed to render ReturnHighlighted when the result isSelected, but that doesn't work anymore. See QS-281.
        return React.createElement(Return, null);
    };
    AdvancedSearchResult.prototype.render = function () {
        var _a = this.props, showKeyboardLozenge = _a.showKeyboardLozenge, baseProps = tslib_1.__rest(_a, ["showKeyboardLozenge"]);
        return (React.createElement(ResultBase, tslib_1.__assign({}, baseProps, { elemAfter: this.getElemAfter(), onClick: this.props.onClick })));
    };
    AdvancedSearchResult.defaultProps = {
        showKeyboardLozenge: false,
    };
    return AdvancedSearchResult;
}(React.Component));
export default AdvancedSearchResult;
//# sourceMappingURL=AdvancedSearchResult.js.map