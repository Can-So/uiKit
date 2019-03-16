import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { EventDispatcher } from '../../../event-dispatcher';
export interface Props {
    inviteToEditHandler?: (event: Event) => void;
    isInviteToEditButtonSelected?: boolean;
    editorView?: EditorView;
    eventDispatcher?: EventDispatcher;
}
export default class Avatars extends React.Component<Props, any> {
    private onAvatarClick;
    private renderAvatars;
    render(): JSX.Element;
}
