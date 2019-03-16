import * as React from 'react';
import EditorViewType, { EditorViewProps } from './editorView';
interface AsyncEditorViewState {
    EditorView?: typeof EditorViewType;
}
export default class AsyncEditorView extends React.PureComponent<EditorViewProps & AsyncEditorViewState, AsyncEditorViewState> {
    static displayName: string;
    static EditorView?: typeof EditorViewType;
    state: {
        EditorView: (React.ComponentClass<EditorViewProps, any> & {
            WrappedComponent: ReactIntl.ComponentConstructor<EditorViewProps & ReactIntl.InjectedIntlProps>;
        }) | undefined;
    };
    componentWillMount(): Promise<void>;
    render(): JSX.Element;
}
export {};
