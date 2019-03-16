import * as React from 'react';
import { CommonResultProps } from './types';
export declare type Props = CommonResultProps & {
    /** Name of the container. Provides the main text to be displayed as the item. */
    name: React.ReactNode;
    /** Text to appear to the right of the text. It has a lower font-weight. */
    caption?: string;
    /** Set whether to display a lock on the result's icon */
    isPrivate?: boolean;
    /** Text to be shown alongside the main `text`. */
    subText?: React.ReactNode;
};
/**
 * Generic result type for Atlassian containers.
 */
export default class ContainerResult extends React.PureComponent<Props> {
    getAvatar: () => {};
    render(): JSX.Element;
}
