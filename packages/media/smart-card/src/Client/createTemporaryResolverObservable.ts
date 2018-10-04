import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { ObjectState, TemporaryResolver } from './types';
import { ObjectStatus } from './index';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { merge } from 'rxjs/observable/merge';

const stateWithStatus = (status: ObjectStatus, data?: any): ObjectState => ({
  status: status,
  services: [],
  ...(data ? { data } : {}),
});

export function createTemporaryResolverObservable(
  url: string,
  resolver: TemporaryResolver,
): Observable<ObjectState> {
  return merge(
    of(stateWithStatus('resolving')),
    fromPromise<any>(resolver(url)).pipe(
      map(
        data =>
          data
            ? stateWithStatus('resolved', data)
            : stateWithStatus('not-found', data),
      ),
      catchError(() => of(stateWithStatus('errored'))),
    ),
  );
}
