import { PureComponent } from 'react';
import { MentionProvider } from '@atlaskit/mention';
import { MentionUserType as UserType } from '@atlaskit/adf-schema';
import { MentionEventHandlers } from '../EventHandlers';
import { ProfilecardProvider } from './types';
export interface Props {
    id: string;
    text: string;
    accessLevel?: string;
    userType?: UserType;
    mentionProvider?: Promise<MentionProvider>;
    profilecardProvider?: Promise<ProfilecardProvider>;
    eventHandlers?: MentionEventHandlers;
    portal?: HTMLElement;
}
export interface State {
    profilecardProvider: ProfilecardProvider | null;
}
export default class MentionWithProviders extends PureComponent<Props, State> {
    state: State;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    private updateProfilecardProvider;
    render(): JSX.Element;
}
