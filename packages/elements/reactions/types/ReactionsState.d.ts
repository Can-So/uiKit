import { ReactionStatus } from './ReactionStatus';
import { ReactionSummary } from './ReactionSummary';
export declare type ReactionsState = ReactionsNotLoaded | ReactionsLoading | ReactionsReadyState | ReactionsError;
export declare type ReactionsReadyState = {
    readonly status: ReactionStatus.ready;
    readonly reactions: ReactionSummary[];
};
export declare type ReactionsLoading = {
    readonly status: ReactionStatus.loading;
};
export declare type ReactionsError = {
    readonly status: ReactionStatus.error;
    readonly message: string;
};
export declare type ReactionsNotLoaded = {
    readonly status: ReactionStatus.notLoaded;
};
