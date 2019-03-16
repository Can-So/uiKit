import * as tslib_1 from "tslib";
import { css } from 'styled-components';
import { gridMediumMaxWidth } from '../consts';
var columnLayoutSharedStyle = css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  [data-layout-section] {\n    display: flex;\n    flex-direction: row;\n    & > * {\n      flex: 1;\n      min-width: 0;\n    }\n\n    @media screen and (max-width: ", "px) {\n      flex-direction: column;\n    }\n  }\n"], ["\n  [data-layout-section] {\n    display: flex;\n    flex-direction: row;\n    & > * {\n      flex: 1;\n      min-width: 0;\n    }\n\n    @media screen and (max-width: ", "px) {\n      flex-direction: column;\n    }\n  }\n"])), gridMediumMaxWidth);
export { columnLayoutSharedStyle };
var templateObject_1;
//# sourceMappingURL=column-layout.js.map