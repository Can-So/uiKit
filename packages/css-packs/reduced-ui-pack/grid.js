import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ak-grid {\n    align-content: flex-start;\n    align-items: flex-start;\n    display: flex;\n    flex-wrap: wrap;\n    margin: 0 auto;\n    max-width: 960px;\n    padding: 0 8px;\n    position: relative;\n  }\n  ak-grid[layout='fluid'] {\n    max-width: 100%;\n  }\n  ak-grid-column {\n    flex-grow: 1;\n    flex-shrink: 0;\n    flex-basis: auto;\n    margin: 0 8px;\n    max-width: calc(100% - 16px);\n    min-width: calc(99.9999% / 12 - 16px);\n    word-wrap: break-word;\n  }\n  ak-grid-column[size='1'] {\n    flex-basis: calc(99.9999% / 12 * 1 - 16px);\n    max-width: calc(99.9999% / 12 * 1 - 16px);\n  }\n  ak-grid-column[size='2'] {\n    flex-basis: calc(99.9999% / 12 * 2 - 16px);\n    max-width: calc(99.9999% / 12 * 2 - 16px);\n  }\n  ak-grid-column[size='3'] {\n    flex-basis: calc(99.9999% / 12 * 3 - 16px);\n    max-width: calc(99.9999% / 12 * 3 - 16px);\n  }\n  ak-grid-column[size='4'] {\n    flex-basis: calc(99.9999% / 12 * 4 - 16px);\n    max-width: calc(99.9999% / 12 * 4 - 16px);\n  }\n  ak-grid-column[size='5'] {\n    flex-basis: calc(99.9999% / 12 * 5 - 16px);\n    max-width: calc(99.9999% / 12 * 5 - 16px);\n  }\n  ak-grid-column[size='6'] {\n    flex-basis: calc(99.9999% / 12 * 6 - 16px);\n    max-width: calc(99.9999% / 12 * 6 - 16px);\n  }\n  ak-grid-column[size='7'] {\n    flex-basis: calc(99.9999% / 12 * 7 - 16px);\n    max-width: calc(99.9999% / 12 * 7 - 16px);\n  }\n  ak-grid-column[size='8'] {\n    flex-basis: calc(99.9999% / 12 * 8 - 16px);\n    max-width: calc(99.9999% / 12 * 8 - 16px);\n  }\n  ak-grid-column[size='9'] {\n    flex-basis: calc(99.9999% / 12 * 9 - 16px);\n    max-width: calc(99.9999% / 12 * 9 - 16px);\n  }\n  ak-grid-column[size='10'] {\n    flex-basis: calc(99.9999% / 12 * 10 - 16px);\n    max-width: calc(99.9999% / 12 * 10 - 16px);\n  }\n  ak-grid-column[size='11'] {\n    flex-basis: calc(99.9999% / 12 * 11 - 16px);\n    max-width: calc(99.9999% / 12 * 11 - 16px);\n  }\n  ak-grid-column[size='12'] {\n    flex-basis: calc(100% - 16px);\n    max-width: calc(100% - 16px);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import evaluateInner from './utils/evaluate-inner';
export default evaluateInner(_templateObject());