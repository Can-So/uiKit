export declare type CardAppearance = 'inline' | 'block';
export declare type CardType = 'smart-card' | 'custom' | 'unsupported';
export interface CardProvider {
    resolve(url: string, appearance: CardAppearance): Promise<any>;
}
export interface CardOptions {
    provider?: Promise<CardProvider>;
}
export declare type Request = {
    pos: number;
    url: string;
    appearance: CardAppearance;
};
export declare type CardPluginState = {
    requests: Request[];
    provider: CardProvider | null;
};
export declare type SetProvider = {
    type: 'SET_PROVIDER';
    provider: CardProvider | null;
};
export declare type Queue = {
    type: 'QUEUE';
    requests: Request[];
};
export declare type Resolve = {
    type: 'RESOLVE';
    url: string;
};
export declare type CardPluginAction = SetProvider | Queue | Resolve;
