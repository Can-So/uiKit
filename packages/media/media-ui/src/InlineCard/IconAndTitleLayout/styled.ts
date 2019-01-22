import styled from 'styled-components';
import { ImgHTMLAttributes, HTMLAttributes, ComponentClass } from 'react';

export const IconWrapper: ComponentClass<ImgHTMLAttributes<{}>> = styled.span`
  position: absolute;
  left: 0;
  top: 1px;
`;

export const IconTitleWrapper: ComponentClass<HTMLAttributes<{}>> = styled.span`
  position: relative;
  padding-left: 20px;
`;

export const OtherWrapper: ComponentClass<HTMLAttributes<{}>> = styled.span`
  margin-left: 4px;
  display: inline-block;
  vertical-align: text-bottom;
`;
