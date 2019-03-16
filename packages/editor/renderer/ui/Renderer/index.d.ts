import * as React from 'react';
import { PureComponent } from 'react';
import { Schema } from 'prosemirror-model';
import { ADFStage, ProviderFactory, EventHandlers, ExtensionHandlers } from '@findable/editor-common';
import { RendererContext } from '../../';
import { RenderOutputStat } from '../../render-document';
export declare type RendererAppearance = 'comment' | 'full-page' | 'mobile' | undefined;
export interface Extension<T> {
    extensionKey: string;
    parameters?: T;
    content?: any;
}
export interface Props {
    document: any;
    dataProviders?: ProviderFactory;
    eventHandlers?: EventHandlers;
    extensionHandlers?: ExtensionHandlers;
    onComplete?: (stat: RenderOutputStat) => void;
    portal?: HTMLElement;
    rendererContext?: RendererContext;
    schema?: Schema;
    appearance?: RendererAppearance;
    adfStage?: ADFStage;
    disableHeadingIDs?: boolean;
    allowDynamicTextSizing?: boolean;
    maxHeight?: number;
    truncated?: boolean;
}
export default class Renderer extends PureComponent<Props, {}> {
    private providerFactory;
    private serializer;
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Props): void;
    private updateSerializer;
    render(): JSX.Element;
    componentWillUnmount(): void;
}
declare type RendererWrapperProps = {
    appearance: RendererAppearance;
    dynamicTextSizing: boolean;
} & {
    children?: React.ReactNode;
};
export declare function RendererWrapper({ appearance, children, dynamicTextSizing, }: RendererWrapperProps): JSX.Element;
export {};
