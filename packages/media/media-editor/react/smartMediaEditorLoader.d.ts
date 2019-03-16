import * as React from 'react';
import SmartMediaEditorType, { SmartMediaEditorProps } from './smartMediaEditor';
interface AsyncSmartMediaEditorState {
    SmartMediaEditor?: typeof SmartMediaEditorType;
}
export default class AsyncSmartMediaEditor extends React.PureComponent<SmartMediaEditorProps & AsyncSmartMediaEditorState, AsyncSmartMediaEditorState & {
    isErrored: boolean;
}> {
    static displayName: string;
    static SmartMediaEditor?: typeof SmartMediaEditorType;
    state: {
        SmartMediaEditor: typeof SmartMediaEditorType | undefined;
        isErrored: boolean;
    };
    componentWillMount(): Promise<void>;
    render(): JSX.Element | null;
}
export {};
