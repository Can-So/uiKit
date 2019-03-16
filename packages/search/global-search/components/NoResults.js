import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';
import NoResultsImage from '../assets/NoResultsImage';
var NoResultsWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  text-align: center;\n  margin-top: ", "px;\n  margin-bottom: 0;\n"], ["\n  text-align: center;\n  margin-top: ", "px;\n  margin-bottom: 0;\n"])), math.multiply(gridSize, 15));
var NoResults = /** @class */ (function (_super) {
    tslib_1.__extends(NoResults, _super);
    function NoResults() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoResults.prototype.render = function () {
        var _a = this.props, title = _a.title, body = _a.body;
        return (React.createElement(NoResultsWrapper, null,
            React.createElement(NoResultsImage, null),
            React.createElement("h3", null, title),
            React.createElement("p", null, body)));
    };
    return NoResults;
}(React.Component));
export default NoResults;
var templateObject_1;
//# sourceMappingURL=NoResults.js.map