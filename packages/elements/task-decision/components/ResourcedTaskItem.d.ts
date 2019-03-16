import { PureComponent } from 'react';
import { Appearance, ContentRef, TaskDecisionProvider, User } from '../types';
export interface Props {
    taskId: string;
    isDone?: boolean;
    onChange?: (taskId: string, isChecked: boolean) => void;
    contentRef?: ContentRef;
    children?: any;
    taskDecisionProvider?: Promise<TaskDecisionProvider>;
    objectAri?: string;
    containerAri?: string;
    showPlaceholder?: boolean;
    placeholder?: string;
    appearance?: Appearance;
    participants?: User[];
    showParticipants?: boolean;
    creator?: User;
    lastUpdater?: User;
    disabled?: boolean;
}
export interface State {
    isDone?: boolean;
    lastUpdater?: User;
}
export default class ResourcedTaskItem extends PureComponent<Props, State> {
    static defaultProps: Partial<Props>;
    private mounted;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    componentWillUnmount(): void;
    private subscribe;
    private unsubscribe;
    private onUpdate;
    private handleOnChange;
    render(): JSX.Element;
}
