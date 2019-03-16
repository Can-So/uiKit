import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .ak-lozenge {\n    border-radius: ", ";\n    box-sizing: border-box;\n    display: inline-flex;\n    font-size: ", "px;\n    font-weight: 700;\n    line-height: 1;\n    max-width: 200px;\n    overflow: hidden;\n    padding: 2px 4px 3px 4px;\n    text-transform: uppercase;\n    text-overflow: ellipsis;\n    vertical-align: baseline;\n    white-space: nowrap;\n  }\n  .ak-lozenge__appearance-default {\n    background-color: ", ";\n    color: ", ";\n  }\n  .ak-lozenge__appearance-default-bold {\n    background-color: ", ";\n    color: ", ";\n  }\n  .ak-lozenge__appearance-inprogress {\n    background-color: ", ";\n    color: ", ";\n  }\n  .ak-lozenge__appearance-inprogress-bold {\n    background-color: ", ";\n    color: ", ";\n  }\n  .ak-lozenge__appearance-moved {\n    background-color: ", ";\n    color: ", ";\n  }\n  .ak-lozenge__appearance-moved-bold {\n    background-color: ", ";\n    color: ", ";\n  }\n  .ak-lozenge__appearance-new {\n    background-color: ", ";\n    color: ", ";\n  }\n  .ak-lozenge__appearance-new-bold {\n    background-color: ", ";\n    color: ", ";\n  }\n  .ak-lozenge__appearance-removed {\n    background-color: ", ";\n    color: ", ";\n  }\n  .ak-lozenge__appearance-removed-bold {\n    background-color: ", ";\n    color: ", ";\n  }\n  .ak-lozenge__appearance-success {\n    background-color: ", ";\n    color: ", ";\n  }\n  .ak-lozenge__appearance-success-bold {\n    background-color: ", ";\n    color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import { colors, fontSizeSmall } from '@findable/theme';
import evaluateInner from './utils/evaluate-inner';
var lozengeBorderRadius = '3px';
export default evaluateInner(_templateObject(), lozengeBorderRadius, fontSizeSmall(), colors.N40, colors.N500, colors.N500, colors.N0, colors.B50, colors.B500, colors.B400, colors.N0, colors.Y75, colors.N800, colors.Y500, colors.N800, colors.P50, colors.P500, colors.P400, colors.N0, colors.R50, colors.R500, colors.R400, colors.N0, colors.G50, colors.G500, colors.G400, colors.N0);