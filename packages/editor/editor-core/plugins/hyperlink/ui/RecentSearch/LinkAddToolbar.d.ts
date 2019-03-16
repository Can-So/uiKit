import * as React from 'react';
import { ActivityProvider, ActivityItem } from '@findable/activity';
import { InjectedIntlProps } from 'react-intl';
export declare const messages: {
    placeholder: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    linkPlaceholder: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export interface Props {
    onBlur?: (text: string) => void;
    onSubmit?: (href: string, text?: string) => void;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    autoFocus?: boolean;
    provider: Promise<ActivityProvider>;
}
export interface State {
    provider?: ActivityProvider;
    items: Array<ActivityItem>;
    selectedIndex: number;
    text: string;
    isLoading: boolean;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
