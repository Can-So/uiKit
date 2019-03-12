import styled from 'styled-components';
import { ComponentClass, HTMLAttributes, ImgHTMLAttributes } from 'react';

// TODO: Figure out a more scalable/responsive solution
// for vertical alignment.
// Current rationale: vertically positioned at the top of
// the smart card container (when set to 0). Offset this
// to position it with appropriate whitespace from the top.
export const Icon: ComponentClass<ImgHTMLAttributes<{}>> = styled.img`
  vertical-align: -1.5px;
  height: 12px;
  width: 12px;
  margin-right: 4px;
  margin-left: 2px;
  border-radius: 2px;
`;

// Used for 'untrue' icons which claim to be 16x16 but
// are less than that in height/width.
// TODO: Replace this override with proper AtlasKit solution.
export const AKIconWrapper: ComponentClass<HTMLAttributes<{}>> = styled.span`
  margin-right: -2px;
`;
