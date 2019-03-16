import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { AnalyticsEventPayload } from './types';
import { Transaction, EditorState } from 'prosemirror-state';
import { Command } from '../../types';
import { InputRuleWithHandler } from '../../utils/input-rules';
export declare function addAnalytics(tr: Transaction, payload: AnalyticsEventPayload, channel?: string): Transaction;
export declare type HigherOrderCommand = (command: Command) => Command;
export declare function withAnalytics(payload: AnalyticsEventPayload, channel?: string): HigherOrderCommand;
export declare function ruleWithAnalytics(getPayload: (state: EditorState, match: string[], start: number, end: number) => AnalyticsEventPayload): (rule: InputRuleWithHandler) => InputRuleWithHandler;
export declare const fireAnalyticsEvent: (createAnalyticsEvent?: CreateUIAnalyticsEventSignature | undefined) => ({ payload, channel, }: {
    payload: AnalyticsEventPayload;
    channel?: string | undefined;
}) => void | undefined;
