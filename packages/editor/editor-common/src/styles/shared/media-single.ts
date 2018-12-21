// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass } from 'styled-components';

const mediaSingleSharedStyle = css`
  li .media-single {
    margin: 0;
  }

  table .media-single {
    margin: 0;
  }

  .media-single.image-wrap-left + .media-single.image-wrap-right,
  .media-single.image-wrap-right + .media-single.image-wrap-left,
  .media-single.image-wrap-left + .media-single.image-wrap-left,
  .media-single.image-wrap-right + .media-single.image-wrap-right {
    margin-right: 0;
    margin-left: 0;
  }
`;

export { mediaSingleSharedStyle };
