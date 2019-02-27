import { css } from 'styled-components';
import { borderRadius, colors, themed } from '@atlaskit/theme';
import {
  blockNodesVerticalMargin,
  akEditorTableCellMinWidth,
} from '@atlaskit/editor-common';
import { akEditorCodeFontFamily, akEditorCodeBlockPadding } from '../../styles';

export const codeBlockStyles = css`
  .ProseMirror .code-block {
    background: ${themed({ light: colors.N20, dark: colors.DN50 })}
    font-family: ${akEditorCodeFontFamily};
    border-radius: ${borderRadius()}px;
    font-size: 14px;
    line-height: 24px;
    margin: ${blockNodesVerticalMargin} 0 0 0;
    counter-reset: line;
    display: flex;
    min-width: ${akEditorTableCellMinWidth}px;

    .line-number-gutter {
      background-color: ${themed({
        light: 'rgba(9, 30, 66, 0.04)',
        dark: colors.DN40,
      })}
      color: ${colors.N300};
      text-align: right;
      user-select: none;
      padding: ${akEditorCodeBlockPadding} 8px;
      border-radius: ${borderRadius()}px;
      font-size: 12px;
      line-height: 24px;

      span {
        display: block;

        &::before {
          counter-increment: line;
          content: counter(line);
          display: inline-block;
        }
      }
    }

    .code-content {
      color: ${themed({ light: colors.N800, dark: colors.DN500 })}
      padding: ${akEditorCodeBlockPadding} 16px;
      overflow: auto;
      display: flex;
      flex: 1;

      pre {
        width: 100%;
      }
      code {
        display: inline-block;
        min-width: 100%;
        tab-size: 4;
      }
    }

    /* We render this as a basic box in IE11 because it can't handle scrolling */
    &.ie11 {
      display: block;
      .line-number-gutter {
        display: none;
      }
      .code-content {
        display: block;
        overflow: visible;

        pre {
          width: auto;
        }
        code {
          display: inline;
        }
      }
    }
  }
  .ProseMirror li > .code-block {
    margin: 0;
  }
`;
