import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
export interface StatusContainerProps {
    selected: boolean;
    placeholderStyle: boolean;
}
export declare const StatusContainer: import("styled-components").StyledComponentClass<React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & StatusContainerProps, any, React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & StatusContainerProps>;
export declare const messages: {
    placeholder: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export interface Props {
    node: PMNode;
    view: EditorView;
    getPos: () => number;
}
export interface State {
    selected: boolean;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
