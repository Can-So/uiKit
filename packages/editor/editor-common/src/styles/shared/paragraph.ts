// @ts-ignore: unused variable
import { css, Styles, StyledComponentClass } from 'styled-components';
import { blockNodesVerticalMargin } from '../consts';

// @see typography spreadsheet: https://docs.google.com/spreadsheets/d/1iYusRGCT4PoPfvxbJ8NrgjtfFgXLm5lpDWXzjua1W2E/edit#gid=93913128
export const paragraphSharedStyles = css`
  div[class^='align'] {
    &:first-child p {
      margin-top: 0;
    }
  }

  div[class^='align'] p {
    margin-top: ${blockNodesVerticalMargin};
  }

  & p {
    font-size: 1em;
    line-height: 1.714;
    font-weight: normal;
    margin-top: ${blockNodesVerticalMargin};
    margin-bottom: 0;
    letter-spacing: -0.005em;

    &:first-child {
      margin-top: 0;
    }
  }
`;
