import { MentionUserType as UserType } from '@atlaskit/adf-schema';
import { PureComponent } from 'react';
import { MentionEventHandlers } from '../EventHandlers';
import { ProfilecardProvider } from './types';
import { default as ProviderFactory } from '../../providerFactory';
export interface MentionProps {
    id: string;
    providers?: ProviderFactory;
    eventHandlers?: MentionEventHandlers;
    text: string;
    accessLevel?: string;
    portal?: HTMLElement;
    userType?: UserType;
}
export interface MentionState {
    profilecardProvider: ProfilecardProvider | null;
}
export default class Mention extends PureComponent<MentionProps, {}> {
    private providerFactory;
    constructor(props: MentionProps);
    componentWillUnmount(): void;
    private renderWithProvider;
    render(): JSX.Element;
}
