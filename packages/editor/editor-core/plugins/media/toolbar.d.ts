import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { EditorState } from 'prosemirror-state';
import { FloatingToolbarConfig } from '../../../src/plugins/floating-toolbar/types';
export declare type IconMap = Array<{
    value: string;
    icon: React.ComponentClass<any>;
} | {
    value: 'separator';
}>;
export declare const messages: {
    wrapLeft: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    wrapRight: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    annotate: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export declare const floatingToolbar: (state: EditorState<any>, intl: InjectedIntl, allowResizing?: boolean | undefined, allowAnnotation?: boolean | undefined, appearance?: "comment" | "full-page" | "chromeless" | "mobile" | undefined) => FloatingToolbarConfig | undefined;
