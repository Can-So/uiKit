import * as React from 'react';
import { ReactElement } from 'react';
import { InjectedIntlProps } from 'react-intl';
import { BlockTypeState } from '../../pm-plugins/main';
import { BlockType } from '../../types';
export declare const messages: {
    textStyles: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export declare type DropdownItem = {
    content: ReactElement<any>;
    key: string;
    value: BlockType;
    isActive: boolean;
};
export interface Props {
    isDisabled?: boolean;
    isSmall?: boolean;
    isReducedSpacing?: boolean;
    pluginState: BlockTypeState;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    setBlockType: (type: string) => void;
}
export interface State {
    active: boolean;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
