// @flow
import { akFontSizeDefault as fontSize } from "@findable/util-shared-styles";
import { colors } from "@findable/theme";
import styled from "styled-components";

export const SourceLine = styled.td`
  background-color: ${colors.N0};
  font-size: ${fontSize};
  vertical-align: top;
`;
//////
// @flow
import { colors, fontSize } from "@findable/theme";
import styled from "styled-components";

export const SourceLine = styled.td`
  background-color: ${colors.N0};
  font-size: ${fontSize() + "px"};
  vertical-align: top;
`;