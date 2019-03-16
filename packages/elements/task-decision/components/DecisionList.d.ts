import { PureComponent, ReactNode } from 'react';
export interface Props {
    children?: ReactNode;
}
export default class DecisionList extends PureComponent<Props, {}> {
    render(): JSX.Element | null;
}
