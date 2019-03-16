import { Result } from '../model/Result';
import { Scope, ConfluenceItem } from './types';
export declare function removeHighlightTags(text: string): string;
export declare function mapConfluenceItemToResult(scope: Scope, item: ConfluenceItem, searchSessionId: string, experimentId?: string): Result;
