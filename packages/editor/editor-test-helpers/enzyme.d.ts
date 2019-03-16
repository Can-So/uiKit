/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */
import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import { ReactElement } from 'react';
import { InjectedIntlProps } from 'react-intl';
export declare function shallowWithIntl<P>(node: ReactElement<P>, { context, ...additionalOptions }?: {
    context?: {} | undefined;
}): import("enzyme").ShallowWrapper<P & InjectedIntlProps, Readonly<{}>, React.Component<{}, {}, any>>;
export declare function mountWithIntl<P, S>(node: ReactElement<P>, { context, childContextTypes, ...additionalOptions }?: {
    context?: {} | undefined;
    childContextTypes?: {} | undefined;
}): ReactWrapper<P & InjectedIntlProps, S>;
