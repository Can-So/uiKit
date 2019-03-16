import * as React from 'react';
import { HighlightRange } from '../types';
export interface Props {
    highlights?: HighlightRange[];
    children: string;
}
export declare class HighlightText extends React.PureComponent<Props> {
    render(): (string | JSX.Element)[];
}
