import * as React from 'react';
import { AnalyticsData, CommonResultProps } from './types';
import { ResultContextType } from '../context';
export declare type Props = CommonResultProps & {
    /** Type of the result. This is passed as a parameter to certain callbacks. */
    type: string;
    /** Main text to be displayed as the item. */
    text: React.ReactNode;
    /** Text to be shown alongside the main `text`. */
    subText?: React.ReactNode;
    /** Text to appear to the right of the text. It has a lower font-weight. */
    caption?: string;
    /** React element to appear to the left of the text. */
    icon?: React.ReactNode;
    /** The context provided by QuickSearch. */
    context?: ResultContextType;
};
declare type DefaultProps = {
    context: ResultContextType;
};
export declare class ResultBase extends React.PureComponent<DefaultProps & Props> {
    static defaultProps: Partial<Props>;
    state: {
        isMouseSelected: boolean;
    };
    registerResult(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    getAnalyticsData(): AnalyticsData;
    handleClick: (e: MouseEvent) => void;
    handleMouseEnter: (event: MouseEvent) => void;
    handleMouseLeave: () => void;
    render(): JSX.Element;
}
declare const _default: (props: Props) => JSX.Element;
export default _default;
