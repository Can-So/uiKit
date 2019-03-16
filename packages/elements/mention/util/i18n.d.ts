import * as React from 'react';
import { FormattedMessage, MessageValue } from 'react-intl';
export declare type Formatter<T extends {
    [k: string]: MessageValue;
}> = React.ComponentType<T & Partial<FormattedMessage.Props>>;
export declare const noPropFormatter: (messageDescriptor: FormattedMessage.MessageDescriptor) => React.ComponentType<Partial<FormattedMessage.Props>>;
export declare const NoAccessWarning: Formatter<{
    name: string;
}>;
export declare const NoAccessLabel: React.ComponentType<Partial<FormattedMessage.Props>>;
export declare const DefaultHeadline: React.ComponentType<Partial<FormattedMessage.Props>>;
export declare const DefaultAdvisedAction: React.ComponentType<Partial<FormattedMessage.Props>>;
export declare const LoginAgain: React.ComponentType<Partial<FormattedMessage.Props>>;
export declare const DifferentText: React.ComponentType<Partial<FormattedMessage.Props>>;
