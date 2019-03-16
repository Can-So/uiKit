import * as React from 'react';
import { FireAnalyticsEvent } from '@findable/analytics';
import { ResultData, SelectedResultId } from './Results/types';
import { ResultContextType } from './context';
import { ResultBase } from './Results/ResultBase';
export declare type Props = {
    /** Search results in the form of ResultItemGroups containing Result components */
    children: React.ReactNode;
    /** Set search loading state */
    isLoading?: boolean;
    /** onBlur callback for search input */
    onSearchBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /** onInput callback for search input */
    onSearchInput?: (event: React.FormEvent<HTMLInputElement>) => void;
    /** onKeyDown callback for search input */
    onSearchKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    /** Called when the user submits the search form without selecting a result */
    onSearchSubmit?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    /** Placeholder text for search input field */
    placeholder?: string;
    /** Value of the search input field */
    value?: string;
    /** Corresponds to the `resultId` of the selected result */
    selectedResultId?: SelectedResultId;
    /** Optional way of being notified when the selected result changes due to keyboard nav */
    onSelectedResultIdChanged?: (id: SelectedResultId) => void;
    firePrivateAnalyticsEvent?: FireAnalyticsEvent;
    /** React component to be used for rendering links */
    linkComponent?: React.ComponentType<any>;
};
export declare type State = {
    selectedResultId: SelectedResultId;
    context: ResultContextType;
};
export declare class QuickSearch extends React.Component<Props, State> {
    static defaultProps: {
        children: never[];
        firePrivateAnalyticsEvent: (_: any) => void;
        isLoading: boolean;
        onSearchBlur: (_: any) => void;
        onSearchKeyDown: (_: any) => void;
        onSearchSubmit: (_: any) => void;
        placeholder: string;
        value: string;
    };
    inputSearchRef: React.Ref<any>;
    flatResults: Array<ResultBase>;
    hasSearchQueryEventFired: boolean;
    hasKeyDownEventFired: boolean;
    lastKeyPressed: string;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    fireKeyboardControlEvent(selectedResultId: SelectedResultId): void;
    /**
     * Uses the virtual list, this.flatResults, to move the selection across grouped results as if
     * results were in a single, circular list.
     *
     * Process:
     * 1. Finds the index of the selected result in the flatResults array,
     * 2. Increments or decrements this index by the supplied adjustment amount,
     * 3. Sets the new selectedResultId based on the modifed index
     */
    adjustSelectedResultIndex: (adjustment: number) => void;
    /** Select next result */
    selectNext: () => void;
    /** Select previous result */
    selectPrevious: () => void;
    /**
     * Callback for register results in flatResults
     */
    handleRegisterResult: (result: ResultBase) => void;
    /**
     * Callback for unregister results in flatResults
     * It will reconcile a list of results for keyboard navigation after every update.
     * 1. Component starts with an empty list of results
     * 2. componentDidMount / componentDidUpdate lifecycle methods in ResultBase will be invoked
     * 3. All ResultBase components call registerResult() in order to register itself in quick search
     * 4. All ResultBase components call unregisterResult() in order to unregister itself in quick search
     */
    handleUnregisterResult: (result: ResultBase) => void;
    /**
     * Callback for mouseEnter events on individual results
     * Move selection to hovered result
     */
    handleResultMouseEnter: (resultData: ResultData) => void;
    /**
     * Callback for mouseLeave events on individual results
     * Clear result selection
     */
    handleResultMouseLeave: () => void;
    /**
     * Clear result selection when search input is blurred
     */
    handleSearchBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    /**
     * Keyboard controls
     * Up - Select previous result
     * Down - Select next result
     * Enter - Submit selected result
     */
    handleSearchKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    setSearchInputRef: (refs: any) => void;
    focusSearchInput: () => void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Props, any>;
/**
 * HOCs:
 * `decorateWithAnalyticsData` - Wrapper that decorates analytics events with additional data.
 * `withAnalytics` - Injects analytics firing methods that are picked up by
 * @findable/analytics/AnalyticsListener.
 */
export default _default;
