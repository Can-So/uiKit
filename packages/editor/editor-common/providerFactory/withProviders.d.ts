import { PureComponent } from 'react';
import ProviderFactory from './';
import { Providers } from '../types';
export interface Props {
    providerFactory: ProviderFactory;
    providers: string[];
    renderNode: (providers: Providers) => JSX.Element;
}
export declare class WithProviders extends PureComponent<Props, {
    providers: any;
}> {
    constructor(props: Props);
    componentWillMount(): void;
    componentWillUnmount(): void;
    handleProvider: (name: string, provider?: Promise<any> | undefined) => void;
    render(): JSX.Element;
}
