import styled, { css } from 'styled-components';
import { fontSize, fontSizeSmall } from '@atlaskit/theme';
import { getThemeStyle, themeNamespace, compactSmallFontSize, compactLineHeight } from '../util/theme'; // Checkbox/Radio wrapper -- sits left of the children

export var InputWrapper = styled.span.withConfig({
  displayName: "ItemParts__InputWrapper",
  componentId: "sc-14xek3m-0"
})(["\n  display: flex;\n  margin: 0 2px;\n"]); // Elements injected before/after the children

var BeforeAfterBase = styled.span.withConfig({
  displayName: "ItemParts__BeforeAfterBase",
  componentId: "sc-14xek3m-1"
})(["\n  align-items: center;\n  display: flex;\n  flex-shrink: 0;\n  /* Fix windows line-height issue */\n  padding-bottom: 1px;\n"]);

var getBeforeSpacing = function getBeforeSpacing(_ref) {
  var isCompact = _ref.isCompact,
      theme = _ref.theme;
  var spaceKey = isCompact ? 'compact' : 'default';
  var space = getThemeStyle(theme[themeNamespace], spaceKey, 'beforeItemSpacing');
  return css(["\n    margin-right: ", "px;\n  "], space);
};

export var Before = styled(BeforeAfterBase).withConfig({
  displayName: "ItemParts__Before",
  componentId: "sc-14xek3m-2"
})(["\n  ", ";\n"], getBeforeSpacing);

var getAfterSpacing = function getAfterSpacing(_ref2) {
  var isCompact = _ref2.isCompact,
      theme = _ref2.theme;
  var spaceKey = isCompact ? 'compact' : 'default';
  var space = getThemeStyle(theme[themeNamespace], spaceKey, 'afterItemSpacing');
  return css(["\n    margin-left: ", "px;\n  "], space);
};

export var After = styled(BeforeAfterBase).withConfig({
  displayName: "ItemParts__After",
  componentId: "sc-14xek3m-3"
})(["\n  ", ";\n"], getAfterSpacing); // Alignment and layout for the children

export var ContentWrapper = styled.span.withConfig({
  displayName: "ItemParts__ContentWrapper",
  componentId: "sc-14xek3m-4"
})(["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  margin: 0;\n  overflow: hidden;\n\n  &:first-child {\n    margin: 0;\n  }\n"]);
export var Content = styled.span.withConfig({
  displayName: "ItemParts__Content",
  componentId: "sc-14xek3m-5"
})(["\n  display: block;\n  flex: 1 1 auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: ", ";\n  line-height: ", ";\n  /* Fix windows line-height issue */\n  padding-bottom: 1px;\n"], function (_ref3) {
  var allowMultiline = _ref3.allowMultiline;
  return allowMultiline ? 'normal' : 'nowrap';
}, 16 / fontSize());

var getColorStyle = function getColorStyle(_ref4) {
  var isDisabled = _ref4.isDisabled,
      theme = _ref4.theme;

  if (isDisabled) {
    return css(["\n      color: ", ";\n    "], getThemeStyle(theme[themeNamespace], 'secondaryText', 'disabled'));
  }

  return css(["\n    color: ", ";\n\n    /* This detects hover on the grandparent. Saves us having to maintain isHovered\n       state in the grandparent. */\n    *:hover > * > & {\n      color: ", ";\n    }\n\n    *:active > * > & {\n      color: ", ";\n    }\n  "], getThemeStyle(theme[themeNamespace], 'secondaryText', 'default'), function () {
    return getThemeStyle(theme[themeNamespace], 'secondaryText', 'hover');
  }, function () {
    return getThemeStyle(theme[themeNamespace], 'secondaryText', 'active');
  });
};

var getDescriptionFontStyles = function getDescriptionFontStyles(_ref5) {
  var isCompact = _ref5.isCompact;
  var descriptionFontSize = isCompact ? compactSmallFontSize : fontSizeSmall();
  var lineHeight = isCompact ? compactLineHeight : 14 / descriptionFontSize;
  return css(["\n    font-size: ", "px;\n    line-height: ", ";\n    /* Fix windows line-height issue */\n    padding-bottom: 1px;\n  "], descriptionFontSize, lineHeight);
}; // Description is a block element below the children, like a subtitle


export var Description = styled.span.withConfig({
  displayName: "ItemParts__Description",
  componentId: "sc-14xek3m-6"
})(["\n  flex: 1 1 auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  ", " ", ";\n"], getColorStyle, getDescriptionFontStyles);