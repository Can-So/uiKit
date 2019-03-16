import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  table {\n    border-collapse: collapse;\n    width: 100%;\n  }\n\n  thead,\n  tbody,\n  tfoot {\n    border-bottom: ", "px solid ", ";\n  }\n\n  td,\n  th {\n    border: none;\n    padding: ", "px ", "px;\n    text-align: left;\n  }\n\n  th {\n    vertical-align: top;\n  }\n\n  td:first-child,\n  th:first-child {\n    padding-left: 0;\n  }\n\n  td:last-child,\n  th:last-child {\n    padding-right: 0;\n  }\n\n  caption {\n    ", "\n    margin-bottom: ", "px;\n    text-align: left;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import { colors, gridSize, typography } from '@atlaskit/theme';
import evaluateInner from './utils/evaluate-inner';
var tableBorderWdth = 2;
export default evaluateInner(_templateObject(), tableBorderWdth, colors.N40, gridSize() / 2, gridSize(), typography.h600(), gridSize());