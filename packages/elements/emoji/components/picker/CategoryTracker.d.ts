import { List as VirtualList } from 'react-virtualized/dist/commonjs/List';
import { CategoryId } from './categories';
/**
 * Mapping between CategoryId and row
 *
 * Tracks which category is visible based on
 * scrollTop, and virtual rows.
 */
export default class CategoryTracker {
    private categoryToRow;
    private rowToCategory;
    constructor();
    reset(): void;
    add(category: CategoryId, row: number): void;
    getRow(category: CategoryId): number | undefined;
    findNearestCategoryAbove(startIndex: number, list?: VirtualList): CategoryId | undefined;
}
