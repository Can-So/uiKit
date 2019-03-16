import { MentionProvider, MentionContextIdentifier, ErrorCallback, InfoCallback, ResultCallback } from './MentionResource';
import { MentionDescription } from '../types';
export { MentionDescription };
export declare type MentionProviderFunctions = {
    [Key in keyof MentionProvider]: MentionProvider[Key] extends Function ? MentionProvider[Key] : never;
};
/**
 * This component is stateful and should be instantianted per contextIdentifiers.
 */
export default class ContextMentionResource implements MentionProvider {
    private mentionProvider;
    private contextIdentifier;
    constructor(mentionProvider: MentionProvider, contextIdentifier: MentionContextIdentifier);
    getContextIdentifier(): MentionContextIdentifier | undefined;
    callWithContextIds: <K extends "filter" | "recordMentionSelection" | "shouldHighlightMention" | "isFiltering" | "subscribe" | "unsubscribe">(f: K, declaredArgs: number) => MentionProvider[K];
    callDefault: <K extends "filter" | "recordMentionSelection" | "shouldHighlightMention" | "isFiltering" | "subscribe" | "unsubscribe">(f: K) => MentionProvider[K];
    subscribe: (key: string, callback?: ResultCallback<MentionDescription[]> | undefined, errCallback?: ErrorCallback | undefined, infoCallback?: InfoCallback | undefined, allResultsCallback?: ResultCallback<MentionDescription[]> | undefined) => void;
    unsubscribe: (key: string) => void;
    filter: (query?: string | undefined, contextIdentifier?: MentionContextIdentifier | undefined) => void;
    recordMentionSelection: (mention: MentionDescription, contextIdentifier?: MentionContextIdentifier | undefined) => void;
    shouldHighlightMention: (mention: MentionDescription) => boolean;
    isFiltering: (query: string) => boolean;
}
