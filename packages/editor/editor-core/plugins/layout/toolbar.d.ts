import { InjectedIntl } from 'react-intl';
import { EditorState } from 'prosemirror-state';
import { FloatingToolbarConfig } from '../../../src/plugins/floating-toolbar/types';
export declare const messages: {
    twoColumns: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    threeColumns: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export declare const buildToolbar: (state: EditorState<any>, intl: InjectedIntl, pos: number, allowBreakout: boolean) => FloatingToolbarConfig | undefined;
