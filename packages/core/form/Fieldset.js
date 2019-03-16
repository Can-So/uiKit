import React from 'react';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import { Label } from './styled/Field';
var FieldsetLabel = styled(Label).withConfig({
  displayName: "Fieldset__FieldsetLabel",
  componentId: "sc-1wgemvn-0"
})(["\n  margin-bottom: 0;\n"]);
var Fieldset = styled.fieldset.withConfig({
  displayName: "Fieldset",
  componentId: "sc-1wgemvn-1"
})(["\n  margin-top: ", "px;\n"], gridSize);
export default (function (_ref) {
  var children = _ref.children,
      legend = _ref.legend;
  return React.createElement(Fieldset, null, legend && React.createElement("legend", null, React.createElement(FieldsetLabel, null, legend)), children);
});