import * as React from 'react';
import { Browser } from '../../../../components/types';
export interface LocalBrowserButtonProps {
    mpBrowser: Browser;
}
export interface LocalBrowserButtonDispatchProps {
    onClick: () => void;
}
export declare type Props = LocalBrowserButtonProps & LocalBrowserButtonDispatchProps;
export declare class LocalBrowserButton extends React.Component<Props> {
    private onUploadClick;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<Props, never> & LocalBrowserButtonProps, any> & {
    WrappedComponent: React.ComponentType<Props>;
};
export default _default;
