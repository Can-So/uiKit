import * as tslib_1 from "tslib";
import { MediaSingleDimensionHelper, } from '@atlaskit/editor-common';
import styled from 'styled-components';
export var Wrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  & > div {\n    ", ";\n    position: relative;\n    z-index: 1;\n\n    > div {\n      position: absolute;\n      height: 100%;\n    }\n  }\n\n  & > div::after {\n    content: '';\n    display: block;\n    padding-bottom: ", "%;\n  }\n"], ["\n  & > div {\n    ", ";\n    position: relative;\n    z-index: 1;\n\n    > div {\n      position: absolute;\n      height: 100%;\n    }\n  }\n\n  & > div::after {\n    content: '';\n    display: block;\n    padding-bottom: ", "%;\n  }\n"])), MediaSingleDimensionHelper, function (p) { return (p.height / p.width) * 100; });
var templateObject_1;
//# sourceMappingURL=styled.js.map