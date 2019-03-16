import { MentionDescription, AbstractMentionResource } from '@findable/mention';
export interface MockMentionConfig {
    minWait?: number;
    maxWait?: number;
}
export declare class MockMentionResource extends AbstractMentionResource {
    private config;
    private lastReturnedSearch;
    constructor(config: MockMentionConfig);
    filter(query: string): void;
    recordMentionSelection(mention: MentionDescription): void;
}
