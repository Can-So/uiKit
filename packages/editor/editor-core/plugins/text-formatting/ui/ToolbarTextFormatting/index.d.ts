import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import { TextFormattingState } from '../../pm-plugins/main';
export declare const messages: {
    bold: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    italic: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export interface Props {
    editorView: EditorView;
    textFormattingState: TextFormattingState;
    disabled?: boolean;
    isReducedSpacing?: boolean;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
