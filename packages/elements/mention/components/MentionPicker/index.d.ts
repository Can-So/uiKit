import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
import * as React from 'react';
import { MentionProvider } from '../../api/MentionResource';
import { PresenceProvider } from '../../api/PresenceResource';
import { OnMentionEvent } from '../../types';
export interface OnOpen {
    (): void;
}
export interface OnClose {
    (): void;
}
export declare type Position = 'above' | 'below' | 'auto';
export interface Props {
    resourceProvider: MentionProvider;
    presenceProvider?: PresenceProvider;
    query?: string;
    onSelection?: OnMentionEvent;
    onOpen?: OnOpen;
    onClose?: OnClose;
    target?: string;
    position?: Position;
    zIndex?: number | string;
    offsetX?: number;
    offsetY?: number;
}
export interface State {
    visible: boolean;
    info?: string;
}
/**
 * @class MentionPicker
 */
export declare class MentionPicker extends React.PureComponent<Props & WithAnalyticsEventProps, State> {
    private subscriberKey;
    private mentionListRef?;
    static defaultProps: {
        onSelection: () => void;
        onOpen: () => void;
        onClose: () => void;
    };
    constructor(props: Props & WithAnalyticsEventProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Props & WithAnalyticsEventProps): void;
    componentWillUnmount(): void;
    selectNext: () => void;
    selectPrevious: () => void;
    selectIndex: (index: number, callback?: (() => any) | undefined) => void;
    selectId: (id: string, callback?: (() => any) | undefined) => void;
    chooseCurrentSelection: () => void;
    mentionsCount: () => number;
    private applyPropChanges;
    private subscribeResourceProvider;
    private unsubscribeResourceProvider;
    /**
     * Called after the 'visible' state is changed to decide whether the onOpen or onClose
     * handlers should be called.
     *
     * It should be noted that the visible state of the component is not considered in
     * this function. Instead the old state and new state should be passed as parameters.
     */
    private onFilterVisibilityChange;
    private filterChange;
    private filterError;
    private filterInfo;
    private handleMentionListRef;
    render(): JSX.Element;
}
export declare const MentionPickerWithAnalytics: React.ComponentClass<Pick<Props & WithAnalyticsEventProps, "onSelection" | "resourceProvider" | "presenceProvider" | "query" | "target" | "offsetX" | "offsetY" | "zIndex" | "onOpen" | "onClose" | "position">, any>;
export declare type MentionPickerWithAnalytics = MentionPicker;
export default MentionPickerWithAnalytics;
