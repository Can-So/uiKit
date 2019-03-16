export interface ScreenCounter {
    getCount(): number;
    increment(): any;
}
export declare class SearchScreenCounter implements ScreenCounter {
    count: number;
    getCount(): number;
    increment(): void;
}
