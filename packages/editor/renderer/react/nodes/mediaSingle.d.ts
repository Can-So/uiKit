import { Component, ReactElement } from 'react';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import { RendererAppearance } from '../../ui/Renderer';
export interface Props {
    children: ReactElement<any>;
    layout: MediaSingleLayout;
    width?: number;
    allowDynamicTextSizing?: boolean;
    rendererAppearance: RendererAppearance;
}
export interface State {
    width?: number;
    height?: number;
}
export default class MediaSingle extends Component<Props, State> {
    constructor(props: Props);
    private onExternalImageLoaded;
    render(): JSX.Element;
}
