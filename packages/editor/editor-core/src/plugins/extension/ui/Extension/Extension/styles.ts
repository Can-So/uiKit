import styled from 'styled-components';
import { colors, borderRadius } from '@atlaskit/theme';
import { blockNodesVerticalMargin } from '@atlaskit/editor-common';
import { Wrapper as WrapperDefault, padding } from '../styles';

export const Wrapper = styled(WrapperDefault)`
  margin: ${blockNodesVerticalMargin} 0;

  /* extension container breakout, only works on top level */
  .ProseMirror > [extensiontype] &[data-layout='full-width'],
  .ProseMirror > [extensiontype] &[data-layout='wide'] {
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .ProseMirror > * [extensiontype] &[data-layout='wide'],
  .ProseMirror > * [extensiontype] &[data-layout='wide'] {
    width: 100% !important;
  }
`;

export const Header = styled.div`
  cursor: pointer;
  padding: ${padding / 2}px ${padding / 2}px ${padding / 4}px;
  vertical-align: middle;

  &.with-children {
    padding: 0;
    background: white;
  }
`;

export const Content = styled.div`
  padding: ${padding}px;
  background: white;
  border: 1px solid ${colors.N30};
  border-radius: ${borderRadius()}px;
`;

export const ContentWrapper = styled.div`
  padding: 0 ${padding}px ${padding}px;
`;
