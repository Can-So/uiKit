import { PureComponent } from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
import { MediaCardProps } from '../../ui/MediaCard';
export interface MediaProps extends MediaCardProps {
    providers?: ProviderFactory;
}
export default class Media extends PureComponent<MediaProps, {}> {
    private renderCard;
    render(): JSX.Element;
}
