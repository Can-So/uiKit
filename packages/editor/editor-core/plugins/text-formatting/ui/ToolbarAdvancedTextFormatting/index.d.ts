import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import { TextFormattingState } from '../../pm-plugins/main';
import { ClearFormattingState } from '../../pm-plugins/clear-formatting';
export interface Props {
    isDisabled?: boolean;
    editorView: EditorView;
    textFormattingState?: TextFormattingState;
    clearFormattingState?: ClearFormattingState;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    isReducedSpacing?: boolean;
}
export declare const messages: {
    underline: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    strike: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    code: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    subscript: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    superscript: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    clearFormatting: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    moreFormatting: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export interface State {
    isOpen?: boolean;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
