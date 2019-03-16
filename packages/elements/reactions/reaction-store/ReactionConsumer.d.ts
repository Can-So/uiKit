import * as React from 'react';
import { ReactionAction } from '../types';
import { ReactionsStore, State } from './ReactionsStore';
export declare type ReactionStoreProp = ReactionsStore | Promise<ReactionsStore>;
export declare type ReactionStoreState = State;
export declare type Actions = {
    getReactions: (containerId: string, aris: string) => void;
    toggleReaction: ReactionAction;
    addReaction: ReactionAction;
    getDetailedReaction: ReactionAction;
};
export declare type Props<PropsFromState extends {}, PropsFromActions extends {}> = {
    stateMapper?: (state: State) => PropsFromState;
    actionsMapper?: (actions: Actions) => PropsFromActions;
    children: (props: PropsFromState & PropsFromActions) => React.ReactNode;
    store: ReactionStoreProp;
};
declare type ConsumerState = {
    store?: ReactionsStore;
};
export declare class ReactionConsumer<PropsFromState extends {}, PropsFromActions extends {}> extends React.PureComponent<Props<PropsFromState, PropsFromActions>, ConsumerState> {
    private previousActions;
    private propsFromActions;
    constructor(props: Props<PropsFromState, PropsFromActions>);
    private getPropsFromActions;
    private getPropsFromState;
    private handleOnChange;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): {} | null | undefined;
}
export {};
