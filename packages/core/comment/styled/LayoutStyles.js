import styled from 'styled-components';
import { colors, gridSize } from '@atlaskit/theme';
import { verticalPadding } from '../styled/constants';
var ThemeColor = {
  Highlight: {
    background: colors.N20A
  }
};
export var AvatarSectionDiv = styled.div.withConfig({
  displayName: "LayoutStyles__AvatarSectionDiv",
  componentId: "sc-14140bv-0"
})(["\n  /* -ms- properties are necessary until MS supports the latest version of the grid spec */\n  /* stylelint-disable value-no-vendor-prefix */\n  -ms-grid-row: 1;\n  -ms-grid-column: 1;\n  /* stylelint-enable */\n  grid-area: avatar-area;\n  /* Unfortunately it's still easier to use a margin here until MS supports grid-gap */\n  margin-right: ", "px;\n\n  [dir='rtl'] & {\n    margin-left: ", "px;\n    margin-right: 0;\n  }\n"], gridSize(), gridSize());
export var Container = styled.div.withConfig({
  displayName: "LayoutStyles__Container",
  componentId: "sc-14140bv-1"
})(["\n  /* stylelint-disable value-no-vendor-prefix, declaration-block-no-duplicate-properties */\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: auto 1fr;\n  /* stylelint-enable */\n  grid-template:\n    'avatar-area comment-area'\n    '. nested-comments-area'\n    / auto 1fr;\n  padding-top: ", "px;\n  position: relative;\n\n  /* We need both selectors as there is not a common wrapper component around\n  comments. We also provide isFirst as an escape hatch. */\n  &:first-child,\n  &:first-of-type {\n    padding-top: 0;\n  }\n"], verticalPadding);
export var ContentSectionDiv = styled.div.withConfig({
  displayName: "LayoutStyles__ContentSectionDiv",
  componentId: "sc-14140bv-2"
})(["\n  -ms-grid-row: 1;\n  -ms-grid-column: 2;\n  grid-area: comment-area;\n  margin-top: ", "px;\n  /* Required for word-wrap: break-word to work in a grid */\n  min-width: 0;\n  word-wrap: break-word;\n"], gridSize() * 0.25);
export var Highlight = styled.div.withConfig({
  displayName: "LayoutStyles__Highlight",
  componentId: "sc-14140bv-3"
})(["\n  background: ", ";\n  -ms-grid-row: 1;\n  -ms-grid-column: 1;\n  -ms-grid-column-span: 2;\n  grid-area: 1 / 1 / 2 / 3;\n  height: 100%;\n  padding: ", "px ", "px ", "px;\n  transform: translate(-", "px, -", "px);\n  width: 100%;\n\n  [dir='rtl'] & {\n    transform: translate(", "px, -", "px);\n  }\n  pointer-events: none;\n"], ThemeColor.Highlight.background, gridSize(), gridSize(), gridSize() / 2, gridSize(), gridSize(), gridSize(), gridSize());
export var NestedCommentsDiv = styled.div.withConfig({
  displayName: "LayoutStyles__NestedCommentsDiv",
  componentId: "sc-14140bv-4"
})(["\n  -ms-grid-row: 2;\n  -ms-grid-column: 2;\n  grid-area: nested-comments-area;\n  margin-top: ", "px;\n"], verticalPadding);