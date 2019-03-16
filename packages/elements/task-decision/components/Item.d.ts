import { PureComponent } from 'react';
import { Appearance, ContentRef, Participant } from '../types';
export interface Props {
    icon: JSX.Element;
    children?: any;
    participants?: Participant[];
    appearance?: Appearance;
    contentRef?: ContentRef;
    placeholder?: string;
    showPlaceholder?: boolean;
    attribution?: string;
}
export default class Item extends PureComponent<Props, {}> {
    static defaultProps: Partial<Props>;
    private renderPlaceholder;
    renderParticipants(): JSX.Element | null;
    renderAttribution(): JSX.Element | null;
    renderCardAppearance(): JSX.Element;
    renderMessageAppearance(): JSX.Element;
    render(): JSX.Element;
}
