import styled, { css } from 'styled-components';
import { fontSizeSmall } from '@atlaskit/theme';
import { getThemeStyle, gridSize, themeNamespace } from '../util/theme';

var getPadding = function getPadding(_ref) {
  var isCompact = _ref.isCompact,
      theme = _ref.theme;
  var paddingType = isCompact ? 'compact' : 'default';

  var _getThemeStyle = getThemeStyle(theme[themeNamespace], paddingType, 'padding'),
      _getThemeStyle$bottom = _getThemeStyle.bottom,
      bottom = _getThemeStyle$bottom === void 0 ? 0 : _getThemeStyle$bottom,
      _getThemeStyle$left = _getThemeStyle.left,
      left = _getThemeStyle$left === void 0 ? 0 : _getThemeStyle$left,
      _getThemeStyle$right = _getThemeStyle.right,
      right = _getThemeStyle$right === void 0 ? 0 : _getThemeStyle$right,
      _getThemeStyle$top = _getThemeStyle.top,
      top = _getThemeStyle$top === void 0 ? 0 : _getThemeStyle$top;

  return css(["\n    padding: ", "px ", "px ", "px ", "px;\n  "], top, right, bottom, left);
}; // eslint-disable-next-line import/prefer-default-export


var GroupTitle = styled.div.withConfig({
  displayName: "ItemGroup__GroupTitle",
  componentId: "ofbfv9-0"
})(["\n  align-items: center;\n  color: ", ";\n  display: flex;\n  flex: 1 1 auto;\n  ", ";\n"], function (_ref2) {
  var theme = _ref2.theme;
  return getThemeStyle(theme[themeNamespace], 'secondaryText', 'default');
}, getPadding);
GroupTitle.displayName = 'ItemGroupTitle';
var GroupTitleAfter = styled.div.withConfig({
  displayName: "ItemGroup__GroupTitleAfter",
  componentId: "ofbfv9-1"
})(["\n  flex: 0 0 auto;\n  margin-right: -", "px;\n"], gridSize / 2);
GroupTitleAfter.displayName = 'ItemGroupTitleAfter';
var GroupTitleText = styled.div.withConfig({
  displayName: "ItemGroup__GroupTitleText",
  componentId: "ofbfv9-2"
})(["\n  flex: 1 1 auto;\n  font-size: ", "px;\n  line-height: 1;\n  text-transform: uppercase;\n  /* Required for children to truncate */\n  min-width: 0;\n"], fontSizeSmall);
GroupTitleText.displayName = 'ItemGroupTitleText';
export { GroupTitle, GroupTitleAfter, GroupTitleText };