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
    text?: string;
    parameters?: any;
}
declare const InlineExtension: React.StatelessComponent<Props>;
export default InlineExtension;
