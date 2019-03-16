export { WithProviders } from './withProviders';
export { Providers } from '../types';
export declare type ProviderHandler = (name: string, provider?: Promise<any>) => void;
export default class ProviderFactory {
    private providers;
    private subscribers;
    static create(providers: {
        [name: string]: Promise<any>;
    }): ProviderFactory;
    destroy(): void;
    isEmpty(): boolean;
    setProvider(name: string, provider?: Promise<any>): void;
    removeProvider(name: string): void;
    subscribe(name: string, handler: ProviderHandler): void;
    unsubscribe(name: string, handler: ProviderHandler): void;
    unsubscribeAll(name: string): void;
    hasProvider(name: string): boolean;
    private notifyUpdated;
}
