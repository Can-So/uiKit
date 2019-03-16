import { InjectedIntl } from 'react-intl';
import { EditorState } from 'prosemirror-state';
import { FloatingToolbarConfig } from '../../../src/plugins/floating-toolbar/types';
export declare const messages: {
    block: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    inline: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    link: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export declare const floatingToolbar: (state: EditorState<any>, intl: InjectedIntl) => FloatingToolbarConfig | undefined;
