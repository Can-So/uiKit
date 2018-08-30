import { ComponentClass } from 'react';
import styled from 'styled-components';
import {
  akBorderRadius,
  akColorN400,
  akColorN0,
  akColorN20,
  akColorN30,
  akColorN300,
} from '@atlaskit/util-shared-styles';
import { akEditorUnitZIndex } from '@atlaskit/editor-common';

export const Header: any = styled.div`
  z-index: ${akEditorUnitZIndex};
  min-height: 24px;
  padding: 20px 40px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${(props: any) =>
    props.showKeyline ? `0 2px 0 ${akColorN30}` : 'none'};
  color: ${akColorN400};
  background-color: ${akColorN0};
  border-radius: ${akBorderRadius};
`;

export const Footer: any = styled.div`
  z-index: ${akEditorUnitZIndex};
  font-size: 14px;
  line-height: 20px;
  color: ${akColorN300};
  padding: 24px;
  text-align: right;
  box-shadow: ${(props: any) =>
    props.showKeyline ? `0 -2px 0 ${akColorN30}` : 'none'};
`;

export const ContentWrapper: ComponentClass = styled.div`
  padding: 18px 20px;
  border-bottom-right-radius: ${akBorderRadius};
  overflow: auto;
  position: relative;
  color: ${akColorN400};
  background-color: ${akColorN0};
`;

export const Line: ComponentClass = styled.div`
  background: #fff;
  content: '';
  display: block;
  height: 2px;
  left: 0;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  min-width: 604px;
`;

export const Content: ComponentClass = styled.div`
  min-width: 524px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

export const ColumnLeft: ComponentClass = styled.div`
  width: 44%;
`;

export const ColumnRight: ComponentClass = styled.div`
  width: 44%;
`;

export const Row: ComponentClass = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
`;

export const Title: ComponentClass = styled.div`
  font-size: 18px;
  font-weight: 400;
`;

export const CodeSm: ComponentClass = styled.span`
  background-color: ${akColorN20};
  border-radius: ${akBorderRadius};
  width: 24px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  text-align: center;
`;

export const CodeMd: ComponentClass = styled.span`
  background-color: ${akColorN20};
  border-radius: ${akBorderRadius};
  display: inline-block;
  height: 24px;
  line-height: 24px;
  width: 50px;
  text-align: center;
`;

export const CodeLg: ComponentClass = styled.span`
  background-color: ${akColorN20};
  border-radius: ${akBorderRadius};
  display: inline-block;
  height: 24px;
  line-height: 24px;
  padding: 0 10px;
  text-align: center;
`;
