/* tslint:disable:variable-name */

import styled from 'styled-components';

import { HTMLAttributes, ComponentClass } from 'react';

export const CardSwitcherWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  display: flex;
`;

export const CardSwitcherBtn: ComponentClass<
  HTMLAttributes<{}>
> = styled.button`
  margin: 10px auto;
  display: block;
`;

export const CardSwitcherTitle: ComponentClass<HTMLAttributes<{}>> = styled.div`
  border-bottom: 1px solid;
  text-align: center;
`;

export const CardSwitcherRow: ComponentClass<HTMLAttributes<{}>> = styled.div`
  width: 300px;
  height: 400px;
  overflow: hidden;
  border: 1px solid;
`;

export const EditableCardOptions: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ccc;
  max-width: 700px;
`;

export const SliderWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  width: 50%;

  > * {
    flex: 1;
    margin: 10px;
  }
`;

export const EditableCardContent: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  /* Not making the wrapper fancier or center elements in order to have a more realistic scenario */
  padding: 20px;
  border: 2px dashed;
  margin: 0 10px 50px 10px;
  overflow: hidden;
  background: antiquewhite;
  box-sizing: border-box;
`;

export const OptionsWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;

  > * {
    flex: 1;
    margin: 10px;
  }
`;

export const CardDimensionsWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  margin: 10px 10px 20px 10px;
  display: flex;

  > div {
    border: 1px solid;
    margin: 5px;
    padding: 5px;
    border-radius: 3px;
  }
`;

export const MainWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
`;
export const CardPreviewWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  flex: 1;
`;
