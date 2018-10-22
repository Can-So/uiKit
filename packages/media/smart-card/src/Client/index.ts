import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import fetch$ from './fetch';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { ObjectState, ObjectStatus, AuthService } from './types';
import { Store } from './store';
import { StateWatch } from './stateWatcher';

// TODO: add some form of caching so that urls not currently loaded will still be fast

const SERVICE_URL = 'https://api-private.stg.atlassian.com/object-resolver';

export type CustomFetch = (url: string) => Promise<ResolveResponse> | null;

export type CardUpdateCallback = (state: ObjectState) => void;

export type RemoteResourceAuthConfig = {
  key: string;
  displayName: string;
  url: string;
};

// @see https://product-fabric.atlassian.net/wiki/spaces/CS/pages/279347271/Object+Provider
export type ResolveResponse = {
  meta: {
    visibility: 'public' | 'restricted' | 'other' | 'not_found';
    access: 'granted' | 'unauthorized' | 'forbidden';
    auth: RemoteResourceAuthConfig[];
    definitionId: string;
  };
  data?: {
    [name: string]: any;
  };
};

const convertAuthToService = (auth: {
  key: string;
  displayName: string;
  url: string;
}): AuthService => ({
  id: auth.key,
  name: auth.displayName,
  startAuthUrl: auth.url,
});

const statusByAccess = (
  status: ObjectStatus,
  json: ResolveResponse,
): ObjectState => ({
  status: status,
  definitionId: json.meta.definitionId,
  services: json.meta.auth.map(convertAuthToService),
  data: json.data,
});

const responseToStateMapper = (json: ResolveResponse): ObjectState => {
  if (json.meta.visibility === 'not_found') {
    return {
      status: 'not-found',
      definitionId: undefined,
      services: [],
    };
  }
  switch (json.meta.access) {
    case 'forbidden':
      return statusByAccess('forbidden', json);
    case 'unauthorized':
      return statusByAccess('unauthorized', json);
    default:
      return statusByAccess('resolved', json);
  }
};

export type Options = {
  serviceUrl: string;
  objectUrl: string;
  definitionId?: string;
};

const filterCardsByDefId = (
  store: Store,
  defId: string,
  urls: string[],
): string[] =>
  urls.filter(url => {
    const entry = store.get(url);
    const entryDefId = entry && entry.getProp('definitionId');
    return entryDefId === defId;
  });

const unresolvedCards = (store: Store, urls: string[]): string[] =>
  urls.filter(url => {
    const entry = store.get(url);
    const entryStatus = entry && entry.getProp('status');
    return entryStatus !== 'resolved';
  });

const cardsWithoutDefinitionId = (store: Store, urls: string[]): string[] =>
  urls.filter(url => {
    const entry = store.get(url);
    const defId = entry && entry.getProp('definitionId');
    return defId === undefined;
  });

const getCardsToUpdate = (store: Store, definitionIdFromCard?: string) => {
  if (definitionIdFromCard) {
    return unresolvedCards(
      store,
      filterCardsByDefId(store, definitionIdFromCard, store.getAllUrls()),
    );
  } else {
    return cardsWithoutDefinitionId(store, store.getAllUrls());
  }
};

export interface Client {
  fetchData(url: string): Promise<ResolveResponse>;
}

export class Client implements Client {
  store: Store;

  constructor() {
    this.store = new Store();
  }

  fetchData(objectUrl: string): Promise<ResolveResponse> {
    return fetch$<ResolveResponse>('post', `${SERVICE_URL}/resolve`, {
      resourceUrl: encodeURI(objectUrl),
    }).toPromise();
  }

  startStreaming(objectUrl: string): Observable<ObjectState> {
    return fromPromise(this.fetchData(objectUrl)).pipe(
      map(responseToStateMapper),
      catchError(() => of({ status: 'errored', services: [] } as ObjectState)),
    );
  }

  /**
   * A card should register itself using this method.
   *
   * We're trying to match a DefinitionId to a bunch of URLs and each URL to a callback.
   *
   * As such, when a card gives us the URL we can fetch data+DefinitionId from the ORS,
   * then use that definitionId to find cards that has to be updated.
   *
   * @param url the url that card holds
   * @param fn the callback that can be called after the data has been resolved for that card.
   */
  register(url: string): StateWatch {
    if (!this.store.exists(url)) {
      return this.store.init(url);
    }

    return this.store.get(url)!;
  }

  // let's say when a card gets unmounted, we need to "clean-up"
  deregister(url: string, uuid: string): Client {
    const storeEntry = this.store.get(url);

    if (storeEntry) {
      storeEntry.unsubscribe(uuid);
    }

    return this;
  }

  resolve(url: string, cb?: () => void) {
    console.log(`[CLIENT] [resolve]`, url);

    if (!this.store.exists(url)) {
      throw new Error('Please, register a smart card before calling get()');
    }

    const entry = this.store.get(url);

    if (entry && entry.hasExpired(5000)) {
      console.log(`[CLIENT] [resolve] entry for ${url} has expired`);
      this.store.set(url, { status: 'resolving', services: [] });

      this.startStreaming(url).subscribe(orsResponse => {
        this.store.set(url, orsResponse);

        if (cb) {
          cb();
        }
      });
    } else {
      console.log(`[CLIENT] [resolve] entry for ${url} has NOT expired`);
    }
  }

  reload(url: string, definitionIdFromCard?: string) {
    this.store.get(url)!.invalidate();

    this.resolve(url, () => {
      getCardsToUpdate(this.store, definitionIdFromCard).forEach(url => {
        this.resolve(url);
      });
    });
  }
}

export { ObjectStatus, ObjectState, AuthService };
