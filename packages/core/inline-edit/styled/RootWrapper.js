import styled, { css } from 'styled-components';
import { gridSize } from '@atlaskit/theme';
var RootWrapper = styled.div.withConfig({
  displayName: "RootWrapper",
  componentId: "sc-1va80k6-0"
})(["\n  display: flex;\n  flex-direction: column;\n  margin-left: -", "px;\n  width: 100%;\n\n  ", ";\n"], gridSize, function (props) {
  return !props.isEditing ? css(["\n          display: flex;\n          flex: 0 1 auto;\n          max-width: 100%;\n        "]) : null;
});
RootWrapper.displayName = 'RootWrapper';
export default RootWrapper;