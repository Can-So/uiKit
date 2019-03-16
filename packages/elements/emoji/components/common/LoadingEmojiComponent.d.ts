import { Component, ComponentClass } from 'react';
import { EmojiProvider } from '../../api/EmojiResource';
export interface Props {
    emojiProvider: Promise<EmojiProvider>;
}
export interface State {
    loadedEmojiProvider?: EmojiProvider;
    asyncLoadedComponent?: ComponentClass<any>;
}
/**
 * A base class for components that don't want to start rendering
 * until the EmojiProvider is resolved.
 * Notes: super.componentDidMount and super.componentWillUnmount will need to be
 * called explicitly if they are overridden on the child class.
 */
export default abstract class LoadingEmojiComponent<P extends Props, S extends State> extends Component<P, S> {
    private isUnmounted;
    constructor(props: P, state: S);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Readonly<P>): void;
    componentWillUnmount(): void;
    private loadEmojiProvider;
    private loaded;
    abstract asyncLoadComponent(): void;
    protected setAsyncState(asyncLoadedComponent: ComponentClass<any>): void;
    renderLoading(): JSX.Element | null;
    abstract renderLoaded(loadedEmojiProvider: EmojiProvider, asyncLoadedComponent: ComponentClass<any>): JSX.Element | null;
    render(): JSX.Element | null;
}
