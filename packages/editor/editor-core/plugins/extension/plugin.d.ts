import { Plugin, PluginKey } from 'prosemirror-state';
import { Node as PMNode } from 'prosemirror-model';
import { ExtensionLayout } from '@atlaskit/adf-schema';
import { ProviderFactory, ExtensionHandlers } from '@atlaskit/editor-common';
import { Dispatch } from '../../event-dispatcher';
import { PortalProviderAPI } from '../../ui/PortalProvider';
import { ExtensionConfig } from '../../types';
export declare const pluginKey: PluginKey<any>;
export declare type ExtensionState = {
    element: HTMLElement | undefined;
    layout: ExtensionLayout;
    node: {
        pos: number;
        node: PMNode;
    };
    allowBreakout: boolean;
    stickToolbarToBottom: boolean;
};
declare const _default: (dispatch: Dispatch<any>, providerFactory: ProviderFactory, extensionHandlers: ExtensionHandlers, portalProviderAPI: PortalProviderAPI, allowExtension?: boolean | ExtensionConfig | undefined) => Plugin<any>;
export default _default;
