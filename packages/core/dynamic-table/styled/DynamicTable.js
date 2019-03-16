import styled, { css } from 'styled-components';
import { gridSize, math } from '@findable/theme';
export var Table = styled.table.withConfig({
  displayName: "DynamicTable__Table",
  componentId: "sc-1naczgt-0"
})(["\n  ", ";\n  border-collapse: collapse;\n  width: 100%;\n"], function (_ref) {
  var isFixedSize = _ref.isFixedSize;
  return isFixedSize && css(["\n      table-layout: fixed;\n    "]);
});
export var Caption = styled.caption.withConfig({
  displayName: "DynamicTable__Caption",
  componentId: "sc-1naczgt-1"
})(["\n  font-size: 1.42857143em;\n  /* there is a bug in Safari: if element which creates a new stacking context\n     is a child of a table, table caption re-renders in bad wrong position\n     https://stackoverflow.com/questions/44009186/safari-bug-translating-table-row-group-using-gsap-make-caption-jump-to-bottom\n  */\n  will-change: transform;\n  font-style: inherit;\n  font-weight: 500;\n  letter-spacing: -0.008em;\n  line-height: 1.2;\n  margin-bottom: ", "px;\n  margin-top: ", "px;\n  text-align: left;\n"], gridSize, math.multiply(gridSize, 3.5));
export var PaginationWrapper = styled.div.withConfig({
  displayName: "DynamicTable__PaginationWrapper",
  componentId: "sc-1naczgt-2"
})(["\n  display: flex;\n  justify-content: center;\n"]);