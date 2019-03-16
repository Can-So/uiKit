import * as React from 'react';
import { RendererContext } from '..';
import { Serializer } from '../..';
import { ExtensionLayout } from '@findable/adf-schema';
import { ExtensionHandlers } from '@findable/editor-common';
export interface Props {
    serializer: Serializer<any>;
    extensionHandlers?: ExtensionHandlers;
    rendererContext: RendererContext;
    extensionType: string;
    extensionKey: string;
    text?: string;
    parameters?: any;
    layout?: ExtensionLayout;
}
export declare const renderExtension: (content: any, layout: string) => JSX.Element;
declare const Extension: React.StatelessComponent<Props>;
export default Extension;
