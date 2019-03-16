import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { codeFontFamily, borderRadius, gridSize, fontSize } from '@atlaskit/theme';
import { defaultColors } from './defaultTheme';
var codeContainerStyle = {
  fontFamily: codeFontFamily,
  fontSize: '12px',
  lineHeight: 20 / 12,
  padding: gridSize()
};

var lineNumberContainerStyle = function lineNumberContainerStyle(theme) {
  return {
    fontSize: "".concat(fontSize(), "px"),
    lineHeight: 20 / 14,
    color: theme.lineNumberColor,
    backgroundColor: theme.lineNumberBgColor,
    flexShrink: 0,
    padding: gridSize(),
    textAlign: 'right',
    userSelect: 'none'
  };
};

var sharedCodeStyle = function sharedCodeStyle(theme) {
  return {
    key: {
      color: theme.keywordColor,
      fontWeight: 'bolder'
    },
    keyword: {
      color: theme.keywordColor,
      fontWeight: 'bolder'
    },
    'attr-name': {
      color: theme.attributeColor
    },
    selector: {
      color: theme.selectorTagColor
    },
    comment: {
      color: theme.commentColor,
      fontFamily: "SFMono-MediumItalic, ".concat(codeFontFamily()),
      fontStyle: 'italic'
    },
    'block-comment': {
      color: theme.commentColor,
      fontFamily: "SFMono-MediumItalic, ".concat(codeFontFamily()),
      fontStyle: 'italic'
    },
    'function-name': {
      color: theme.sectionColor
    },
    'class-name': {
      color: theme.sectionColor
    },
    doctype: {
      color: theme.docTagColor
    },
    substr: {
      color: theme.substringColor
    },
    namespace: {
      color: theme.nameColor
    },
    builtin: {
      color: theme.builtInColor
    },
    entity: {
      color: theme.literalColor
    },
    bullet: {
      color: theme.bulletColor
    },
    code: {
      color: theme.codeColor
    },
    addition: {
      color: theme.additionColor
    },
    regex: {
      color: theme.regexpColor
    },
    symbol: {
      color: theme.symbolColor
    },
    variable: {
      color: theme.variableColor
    },
    url: {
      color: theme.linkColor
    },
    'selector-attr': {
      color: theme.selectorAttributeColor
    },
    'selector-pseudo': {
      color: theme.selectorPseudoColor
    },
    type: {
      color: theme.typeColor
    },
    string: {
      color: theme.stringColor
    },
    quote: {
      color: theme.quoteColor
    },
    tag: {
      color: theme.templateTagColor
    },
    deletion: {
      color: theme.deletionColor
    },
    title: {
      color: theme.titleColor
    },
    section: {
      color: theme.sectionColor
    },
    'meta-keyword': {
      color: theme.metaKeywordColor
    },
    meta: {
      color: theme.metaColor
    },
    italic: {
      fontStyle: 'italic'
    },
    bold: {
      fontWeight: 'bolder'
    },
    function: {
      color: theme.functionColor
    },
    number: {
      color: theme.numberColor
    }
  };
};

var codeStyle = function codeStyle(theme) {
  return {
    fontFamily: codeFontFamily,
    fontSize: '12px',
    background: theme.backgroundColor,
    color: theme.textColor,
    borderRadius: borderRadius(),
    display: 'flex',
    lineHeight: 20 / 12,
    overflowX: 'auto',
    whiteSpace: 'pre'
  };
};

var codeBlockStyle = function codeBlockStyle(theme) {
  return _objectSpread({
    'pre[class*="language-"]': codeStyle(theme)
  }, sharedCodeStyle(theme));
};

var inlineCodeStyle = function inlineCodeStyle(theme) {
  return _objectSpread({
    'pre[class*="language-"]': _objectSpread({}, codeStyle(theme), {
      padding: '2px 4px',
      display: 'inline',
      whiteSpace: 'pre-wrap'
    })
  }, sharedCodeStyle(theme));
};

export function applyTheme() {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var newTheme = _objectSpread({}, defaultColors(theme), theme);

  return {
    lineNumberContainerStyle: lineNumberContainerStyle(newTheme),
    codeBlockStyle: codeBlockStyle(newTheme),
    inlineCodeStyle: inlineCodeStyle(newTheme),
    codeContainerStyle: codeContainerStyle
  };
}