import * as React from 'react';
import { ComponentType } from 'react';
import { FireAnalyticsEvent } from '@atlaskit/analytics';
import { ResultData, ResultId, SelectedResultId } from './Results/types';
import { ResultBase } from './Results/ResultBase';
export declare type ResultContextType = {
    /** Register result as keyboard navigation target */
    registerResult: (result: ResultBase) => void;
    /** Unregister result as keyboard navigation target */
    unregisterResult: (result: ResultBase) => void;
    /** Triggered by mouseEnter event. */
    onMouseEnter: (resultData: ResultData) => void;
    /** Standard onMouseLeave event. */
    onMouseLeave: () => void;
    /** Fires an analytics event */
    sendAnalytics?: FireAnalyticsEvent;
    /** get the index of the search result in the list of result */
    getIndex: (resultId: ResultId) => number | null;
    /** React component to be used for rendering links */
    linkComponent?: ComponentType;
};
export declare const ResultContext: React.Context<ResultContextType>;
export declare const SelectedResultIdContext: React.Context<SelectedResultId>;
