import * as React from 'react';
import { RendererContext } from '..';
import { Serializer } from '../..';
import { ExtensionHandlers } from '@atlaskit/editor-common';
export interface Props {
    serializer: Serializer<any>;
    extensionHandlers?: ExtensionHandlers;
    rendererContext: RendererContext;
    extensionType: string;
    extensionKey: string;
    originalContent?: any;
    parameters?: any;
    content?: any;
    layout?: string;
}
declare const BodiedExtension: React.StatelessComponent<Props>;
export default BodiedExtension;
