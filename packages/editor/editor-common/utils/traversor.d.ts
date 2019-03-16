export declare type SubscriberCallback = (node: any) => void;
declare class ADFTraversor {
    private doc;
    private subscribers;
    constructor(doc: any);
    subscribe(type: string, callback: SubscriberCallback): void;
    exec(): void;
}
export default ADFTraversor;
