import * as React from 'react';
import { Component, HTMLAttributes, ComponentClass } from 'react';
import styled from 'styled-components';

import Select from '@atlaskit/select';

export interface RenderOptionsPropsT<T> {
  hide: () => void;
  dispatchCommand: (command: T) => void;
}

export interface SelectOption {
  value: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

export type SelectOptions<T> =
  | Array<SelectOption>
  | {
      render: ((
        props: RenderOptionsPropsT<T>,
      ) => React.ReactElement<any> | null);
      height: number;
      width: number;
    };

export interface Props {
  hideExpandIcon?: boolean;
  options: SelectOptions<Function>;
  dispatchCommand: (command: Function) => void;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  defaultValue?: SelectOption;
  placeholder?: string;
  onChange?: (change: SelectOption) => void;
  width?: number;
}

export interface State {
  isOpen: boolean;
}

const SelectWrapper: ComponentClass<
  HTMLAttributes<{}> & { width: number }
> = styled.div`
  width: ${props => props.width}px;
`;

export default class Search extends Component<Props, State> {
  state: State = { isOpen: false };
  render() {
    const {
      options,
      onChange,
      defaultValue,
      placeholder,
      width = 200,
    } = this.props;
    return (
      <SelectWrapper width={width}>
        <Select
          options={options}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          spacing={'compact'}
          menuPlacement="auto"
        />
      </SelectWrapper>
    );
  }
}
