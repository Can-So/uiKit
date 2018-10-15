// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass, InterpolationFunction, ThemeProps } from 'styled-components';
import { gridSize, borderRadius } from '@atlaskit/theme';
import { relativeSize, akEditorElementMinWidth } from '../consts';

export const panelSharedStyles = css`
  & .ak-editor-panel {
    border-radius: ${borderRadius()}px;
    margin: ${relativeSize(1.142)}px 0;
    padding: ${gridSize()}px;
    min-width: ${akEditorElementMinWidth}px;
    display: flex;
    align-items: baseline;

    .ak-editor-panel__icon {
      display: block;
      height: ${gridSize() * 3}px;
      width: ${gridSize() * 3}px;
      padding-right: ${gridSize()}px;

      > span {
        vertical-align: middle;
        display: inline;
      }
    }

    .ak-editor-panel__content {
      margin: 1px 0 1px;
    }
  }
`;
