import { Component, ReactNode } from 'react';
import { ContextIdentifierProvider } from '@atlaskit/editor-common';
import { ContentRef, TaskDecisionProvider } from '@atlaskit/task-decision';
export interface Props {
    taskId: string;
    objectAri: string;
    containerAri: string;
    isDone: boolean;
    contentRef?: ContentRef;
    onChange?: (taskId: string, isChecked: boolean) => void;
    showPlaceholder?: boolean;
    children?: ReactNode;
    taskDecisionProvider?: Promise<TaskDecisionProvider>;
    contextIdentifierProvider?: Promise<ContextIdentifierProvider>;
}
export interface State {
    resolvedContextProvider?: ContextIdentifierProvider;
}
export default class TaskItemWithProviders extends Component<Props, State> {
    state: State;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    private updateContextIdentifierProvider;
    render(): JSX.Element;
}
