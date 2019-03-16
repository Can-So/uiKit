import { PureComponent } from 'react';
export interface Props {
    children?: JSX.Element | JSX.Element[];
}
export default class DecisionList extends PureComponent<Props, {}> {
    render(): JSX.Element | null;
}
