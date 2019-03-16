// @flow
import { akGridSizeUnitless } from "@findable/util-shared-styles";
import styled from "styled-components";

const blah = akGridSizeUnitless;
const MyDiv = styled.div`
  padding: ${akGridSizeUnitless}px;
`;
//////
// @flow
import { gridSize } from "@findable/theme";
import styled from "styled-components";

const blah = gridSize();
const MyDiv = styled.div`
  padding: ${gridSize()}px;
`;
