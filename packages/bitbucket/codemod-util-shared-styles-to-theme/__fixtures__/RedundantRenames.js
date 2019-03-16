// @flow
import {
  akTypographyMixins as typo,
  akGridSizeUnitless as gridSize,
} from "@findable/util-shared-styles";
import styled from "styled-components";
const gridSizePx = `${gridSize}px`;
const Fonty = styled.div`
  font-size: ${gridSizePx};
  ${typo.h100};
`;
//////
// @flow
import { gridSize, typography } from "@findable/theme";
import styled from "styled-components";
const gridSizePx = `${gridSize()}px`;
const Fonty = styled.div`
  font-size: ${gridSizePx};
  ${typography.h100()};
`;
