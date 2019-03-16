import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /* IE11 doesn't support <template> elements which shouldn't be displayed */\n  template {\n    display: none;\n  }\n\n  /* IE11 and some older browsers don't support these elements yet and treat them as display: inline; */\n  article,\n  aside,\n  details,\n  figcaption,\n  figure,\n  footer,\n  header,\n  hgroup,\n  main,\n  menu,\n  nav,\n  section {\n    display: block;\n  }\n\n  /* Suppress the ugly broken image styling in Firefox */\n  @-moz-document url-prefix() {\n    img {\n      font-size: 0;\n    }\n    img:-moz-broken {\n      font-size: inherit;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import evaluateInner from './utils/evaluate-inner';
export default evaluateInner(_templateObject());