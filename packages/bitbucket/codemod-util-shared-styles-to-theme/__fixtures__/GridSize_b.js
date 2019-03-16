// @flow
import { akGridSizeUnitless as gridSize } from "@findable/util-shared-styles";
import styled from "styled-components";
import { colors } from "@findable/theme";

const blah = gridSize;
const MyDiv = styled.div`
  padding: ${gridSize}px;
`;
//////
// @flow
import styled from "styled-components";
import { colors, gridSize } from "@findable/theme";

const blah = gridSize();
const MyDiv = styled.div`
  padding: ${gridSize()}px;
`;
