import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { TextColorPluginState } from '../../pm-plugins/main';
import { EditorView } from 'prosemirror-view';
export declare const messages: {
    textColor: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export interface State {
    isOpen: boolean;
}
export interface Props {
    pluginState: TextColorPluginState;
    editorView: EditorView;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    isReducedSpacing?: boolean;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
