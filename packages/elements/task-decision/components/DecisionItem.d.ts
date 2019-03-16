import { PureComponent } from 'react';
import { Appearance, ContentRef, User } from '../types';
export interface Props {
    children?: any;
    contentRef?: ContentRef;
    placeholder?: string;
    showPlaceholder?: boolean;
    appearance?: Appearance;
    participants?: User[];
    showParticipants?: boolean;
    creator?: User;
    lastUpdater?: User;
}
export default class DecisionItem extends PureComponent<Props, {}> {
    static defaultProps: Partial<Props>;
    getAttributionText(): string | undefined;
    render(): JSX.Element;
}
