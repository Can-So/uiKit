import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
export var OuterContainer = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: relative;\n  margin-right: ", "px;\n  > div {\n    display: flex;\n  }\n"], ["\n  position: relative;\n  margin-right: ",
    "px;\n  > div {\n    display: flex;\n  }\n"])), function (_a) {
    var width = _a.width;
    return !width || width === 'large' ? 0 : gridSize();
});
var templateObject_1;
//# sourceMappingURL=styles.js.map