// @flow
import IssueIcon from "@findable/icon/glyph/issue";
import { akBorderRadius } from "@findable/util-shared-styles";
import styled from "styled-components";

const MyDiv = styled.p`
  border-radius: ${akBorderRadius};
`;

//////
// @flow
import IssueIcon from "@findable/icon/glyph/issue";
import { borderRadius } from "@findable/theme";
import styled from "styled-components";

const MyDiv = styled.p`
  border-radius: ${`${borderRadius()}px`};
`;
