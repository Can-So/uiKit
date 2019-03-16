import { PureComponent } from 'react';
import { ProviderFactory, EventHandlers } from '@atlaskit/editor-common';
export interface Props {
    id: string;
    providers?: ProviderFactory;
    eventHandlers?: EventHandlers;
    text: string;
    accessLevel?: string;
    portal?: HTMLElement;
}
export default class MentionItem extends PureComponent<Props, {}> {
    render(): JSX.Element;
}
