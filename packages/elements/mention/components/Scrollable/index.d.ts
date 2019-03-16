import * as React from 'react';
import MentionItem from '../MentionItem';
export interface Props {
    children?: React.ReactNode | React.ReactNode[];
}
export default class Scrollable extends React.PureComponent<Props, {}> {
    private scrollableDiv?;
    reveal: (child: MentionItem) => void;
    private handleRef;
    render(): JSX.Element;
}
