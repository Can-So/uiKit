import * as React from 'react';
import { SyntheticEvent } from 'react';
import { InjectedIntlProps } from 'react-intl';
export interface ButtonProps {
    type: 'row' | 'column';
    tableRef: HTMLElement;
    index: number;
    showInsertButton: boolean;
    onMouseDown: (event: SyntheticEvent<HTMLButtonElement>) => void;
}
declare const _default: React.ComponentClass<ButtonProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<ButtonProps & InjectedIntlProps>;
};
export default _default;
