/* tslint:disable:variable-name */
import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import { centerX } from '../../../styles';
import { center, borderRadius, size } from '@atlaskit/media-ui';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { colors, themed } from '@atlaskit/theme';

const imgSize = 4 * akGridSizeUnitless;

export const RoundedBackground: ComponentClass<HTMLAttributes<{}>> = styled.div`
  ${centerX} ${borderRadius} min-width: ${imgSize}px;
  height: inherit;
  overflow: hidden;
`;

export const LoadingPlaceholder: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  ${center} ${size()} color: #cfd4db;
  background-color: ${themed({ light: colors.N20, dark: colors.DN50 })};
`;

export const EmptyPlaceholder: ComponentClass<HTMLAttributes<{}>> = styled.div`
  ${size(imgSize)} ${center} color: #cfd4db;
  background-color: ${themed({ light: colors.N30, dark: colors.DN50 })};
`;
