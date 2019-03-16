import { Observable } from 'rxjs/Observable';
export declare const observableToPromise: <T>(observable: Observable<T>) => Promise<T>;
