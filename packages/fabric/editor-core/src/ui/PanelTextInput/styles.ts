import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, InputHTMLAttributes, ComponentClass } from 'react';
import { akColorN400 } from '@atlaskit/util-shared-styles';

export const Input: ComponentClass<
  InputHTMLAttributes<{}> & { innerRef?: any }
> = styled.input`
  /* Normal .className gets overridden by input[type=text] hence this hack to produce input.className */
  input& {
    background: transparent;
    border: 0;
    border-radius: 0;
    box-sizing: content-box;
    color: ${akColorN400};
    flex-grow: 1;
    font-size: 13px;
    line-height: 20px;
    padding: 0;
    ${props => (props.width ? `width: ${props.width}px` : '')} height: 20px;
    min-width: 145px;

    /* Hides IE10+ built-in [x] clear input button */
    &::-ms-clear {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${akColorN400};
      opacity: 0.5;
    }
  }
`;
