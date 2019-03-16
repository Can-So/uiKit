import * as React from 'react';
import { PureComponent } from 'react';
import { AlignmentState } from '../../../plugins/alignment/pm-plugins/main';
export interface Props {
    value: AlignmentState;
    label: string;
    isSelected?: boolean;
    onClick: (value: AlignmentState) => void;
    content: React.ReactElement<any>;
}
declare class AlignmentButton extends PureComponent<Props> {
    render(): JSX.Element;
    onClick: (e: any) => void;
}
export default AlignmentButton;
