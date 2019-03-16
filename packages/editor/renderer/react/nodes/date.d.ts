import { PureComponent } from 'react';
export interface Props {
    timestamp: string;
    parentIsIncompleteTask?: boolean;
}
export default class Date extends PureComponent<Props, {}> {
    render(): JSX.Element;
}
