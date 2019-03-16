import { PureComponent } from 'react';
import { MentionUserType as UserType } from '@atlaskit/adf-schema';
import { MentionProvider } from '@atlaskit/mention';
import { ProfilecardProvider } from './types';
import { MentionEventHandler } from '../EventHandlers';
export interface Props {
    id: string;
    text: string;
    accessLevel?: string;
    userType?: UserType;
    mentionProvider?: Promise<MentionProvider>;
    portal?: HTMLElement;
    profilecardProvider: ProfilecardProvider;
    onClick: MentionEventHandler;
    onMouseEnter: MentionEventHandler;
    onMouseLeave: MentionEventHandler;
}
export declare type PopupAlignX = 'left' | 'right';
export declare type PopupAlignY = 'top' | 'bottom';
export interface State {
    target: HTMLElement | null;
    visible: boolean;
    popupAlignX: PopupAlignX;
    popupAlignY: PopupAlignY;
}
export default class MentionWithProfileCard extends PureComponent<Props, State> {
    private domNode;
    state: State;
    private handleRef;
    private calculateLayerPosition;
    private handleMentionNodeRef;
    private getDomNodeCenterCoords;
    private getVisibleAreaCentreCoords;
    private getActions;
    private showProfilecard;
    private hideProfilecard;
    render(): JSX.Element;
}
