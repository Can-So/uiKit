import { PureComponent, ReactNode } from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
import { RendererContext } from '../';
export interface Props {
    localId: string;
    rendererContext?: RendererContext;
    state?: string;
    providers?: ProviderFactory;
    children?: ReactNode;
}
export default class TaskItem extends PureComponent<Props, {}> {
    private providerFactory;
    constructor(props: Props);
    componentWillUnmount(): void;
    private renderWithProvider;
    render(): JSX.Element;
}
