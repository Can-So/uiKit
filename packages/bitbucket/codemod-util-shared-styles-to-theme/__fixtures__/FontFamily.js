// @flow
import { akFontFamily as font } from "@findable/util-shared-styles";
import { colors } from "@findable/theme";
import styled from "styled-components";

export const SourceLine = styled.td`
  background-color: ${colors.N0};
  font-family: ${font};
  vertical-align: top;
`;
//////
// @flow
import { colors, fontFamily } from "@findable/theme";
import styled from "styled-components";

export const SourceLine = styled.td`
  background-color: ${colors.N0};
  font-family: ${fontFamily()};
  vertical-align: top;
`;
