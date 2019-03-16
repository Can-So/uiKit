import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { gridSize, colors, themed } from '@findable/theme';
// tslint:disable-next-line:variable-name
export var EditorIconWrapper = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  flex: 0 0 16px;\n  height: 16px;\n  width: 16px;\n  color: ", ";\n  margin: 2px ", "px 0 0;\n\n  > span {\n    margin: -8px;\n  }\n"], ["\n  flex: 0 0 16px;\n  height: 16px;\n  width: 16px;\n  color: ",
    ";\n  margin: 2px ", "px 0 0;\n\n  > span {\n    margin: -8px;\n  }\n"])), function (props) {
    return props.showPlaceholder
        ? colors.N100
        : themed({ light: colors.G300, dark: colors.G200 });
}, gridSize);
var templateObject_1;
//# sourceMappingURL=DecisionItem.js.map