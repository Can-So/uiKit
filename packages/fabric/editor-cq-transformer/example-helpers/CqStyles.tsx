import styled from 'styled-components';
export default styled.div`
  .ProseMirror {
    /**/
    /* OVERRIDES FOR AK-CSS-RESET */
    /* Since confluence doesn't use ak-css-reset need to override some rules in order to look more confluenceish */
    /**/

    blockquote:before,
    blockquote:after {
      content: '';
    }

    blockquote > :last-child {
      display: block;
    }

    /**/
    /* STYLES FROM CONFLUENCE QUESTIONS */
    /**/

    blockquote {
      margin-top: 10px;
      margin-left: 19px;
      padding: 10px 20px;

      color: #707070;
      border-left: 1px solid #ccc;
    }

    li > ul,
    li > ol,
    ul > ul,
    ol > ol {
      margin-top: 0;
    }

    ul {
      list-style-type: disc;
    }

    ol,
    ol ol ol ol,
    ol ol ol ol ol ol ol,
    ol ol ol ol ol ol ol ol ol ol {
      list-style-type: decimal;
    }

    ol ol,
    ol ol ol ol ol,
    ol ol ol ol ol ol ol ol,
    ol ol ol ol ol ol ol ol ol ol ol {
      list-style-type: lower-alpha;
    }

    ol ol ol,
    ol ol ol ol ol ol,
    ol ol ol ol ol ol ol ol ol,
    ol ol ol ol ol ol ol ol ol ol ol ol {
      list-style-type: lower-roman;
    }

    h1 {
      font-size: 24px;
      font-weight: normal;
      line-height: 1.25;

      margin: 30px 0 0 0;
    }

    h2 {
      font-size: 20px;
      font-weight: normal;
      line-height: 1.5;

      margin: 30px 0 0 0;
    }

    h3 {
      font-size: 16px;
      line-height: 1.5;

      margin: 30px 0 0 0;
    }

    h4 {
      font-size: 14px;
      line-height: 1.42857142857143;

      margin: 20px 0 0 0;
    }

    h5 {
      font-size: 12px;
      line-height: 1.66666666666667;

      margin: 20px 0 0 0;

      text-transform: uppercase;

      color: #707070;
    }

    h6 {
      font-size: 12px;
      line-height: 1.66666666666667;

      margin: 20px 0 0 0;

      color: #707070;
    }

    h1:first-child,
    h2:first-child,
    h3:first-child,
    h4:first-child,
    h5:first-child,
    h6:first-child {
      margin-top: 0;
    }

    h1 + h2,
    h2 + h3,
    h3 + h4,
    h4 + h5,
    h5 + h6 {
      margin-top: 10px;
    }

    h3 {
      font-weight: bold;
    }

    h5 {
      font-size: 14px;
    }

    h5,
    h6 {
      text-transform: none;
    }

    h1 + h1,
    h2 + h2,
    h3 + h3,
    h4 + h4,
    h5 + h5,
    h6 + h6 {
      margin-top: 10px;
    }

    pre {
      margin: 10px 0 0 0;
    }

    pre:first-child {
      margin-top: 0;
    }

    code,
    pre {
      font-family: 'Consolas', 'Bitstream Vera Sans Mono', 'Courier New',
        Courier, monospace;
      font-size: 14px;
      line-height: 1.4;
      color: #000;
    }

    pre {
      overflow-x: auto;

      padding: 10px 15px;

      word-wrap: normal;

      border: 1px solid #ccc;
      border-radius: 3px;
      background: #fff;
    }

    pre > code {
      margin: 0;
      padding: 1px 3px;

      border: none;
    }

    code {
      display: inline-block;
      overflow-x: auto;

      box-sizing: border-box;
      max-width: 100%;

      vertical-align: bottom;
      white-space: nowrap;
    }
  }
`;
