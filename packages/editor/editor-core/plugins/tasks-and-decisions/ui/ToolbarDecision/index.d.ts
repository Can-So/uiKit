import * as React from 'react';
import { PureComponent } from 'react';
import { InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView?: EditorView;
    isDisabled?: boolean;
    isReducedSpacing?: boolean;
}
export interface State {
    disabled: boolean;
}
export declare class ToolbarDecision extends PureComponent<Props & InjectedIntlProps, State> {
    state: State;
    render(): JSX.Element;
    private handleInsertDecision;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
