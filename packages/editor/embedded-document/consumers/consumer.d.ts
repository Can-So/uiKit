import * as React from 'react';
import { PureComponent } from 'react';
import { Actions, State } from '../context/context';
export interface Props<PropsFromState extends {}, PropsFromActions extends {}, RenderProps extends {}> {
    stateMapper?: (state: State) => PropsFromState;
    actionsMapper?: (actions: Actions) => PropsFromActions;
    renderPropsMapper?: (renderProps: any) => RenderProps;
    children: (props: PropsFromState & PropsFromActions & RenderProps) => React.ReactNode;
}
export interface ConsumerProps<A, V, R> {
    actions: A;
    value: V;
    renderProps: R;
}
export declare class Consumer<PropsFromState extends {}, PropsFromActions extends {}, RenderProps extends {}> extends PureComponent<Props<PropsFromState, PropsFromActions, RenderProps>> {
    private previousActions;
    private propsFromActions;
    private getPropsFromActions;
    private getPropsFromState;
    private getRenderProps;
    private renderChildren;
    render(): JSX.Element;
}
