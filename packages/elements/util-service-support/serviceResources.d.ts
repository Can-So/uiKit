import { OnProviderChange, Provider } from './types';
export declare abstract class AbstractResource<Q, R, E, I, O> implements Provider<Q, R, E, I, O> {
    private lastResult;
    private listeners;
    abstract filter(query?: Q, options?: O): void;
    subscribe(onChange: OnProviderChange<R, E, I>): void;
    unsubscribe(onChange: OnProviderChange<R, E, I>): void;
    protected notifyResult(result: R): void;
    protected notifyError(error: E): void;
    protected notifyInfo(info: I): void;
    protected notifyNotReady(): void;
}
