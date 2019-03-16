import * as React from 'react';
import { CommonResultProps } from './types';
export declare type Props = CommonResultProps & {
    /** Name of the container. Provides the main text to be displayed as the item. */
    name: React.ReactNode;
    /** A user's custom handle. Appears to the right of their `name`. It has a lower font-weight. */
    mentionName?: string;
    /** A character with which to prefix the `mentionName`. Defaults to '@' */
    mentionPrefix?: string;
    /** Text to be shown alongside the main `text`. */
    presenceMessage?: string;
    /** Sets the appearance of the presence indicator */
    presenceState?: 'online' | 'busy' | 'offline' | null;
};
export default class PersonResult extends React.PureComponent<Props> {
    static defaultProps: Partial<Props>;
    getMention: () => string | undefined;
    getAvatar: () => {};
    render(): JSX.Element;
}
