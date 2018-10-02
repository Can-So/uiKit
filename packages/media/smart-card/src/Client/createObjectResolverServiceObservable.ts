import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { startWith } from 'rxjs/operators/startWith';
import { refCount } from 'rxjs/operators/refCount';
import { publishReplay } from 'rxjs/operators/publishReplay';
import { Command, ObjectState, AuthService } from './types';
import fetch$ from './fetch';

export type RemoteResourceAuthConfig = {
  key: string;
  displayName: string;
  url: string;
};

// @see https://product-fabric.atlassian.net/wiki/spaces/CS/pages/279347271/Object+Provider
interface ResolveResponse {
  meta: {
    visibility: 'public' | 'restricted' | 'other' | 'not_found';
    access: 'granted' | 'unauthorized' | 'forbidden';
    auth: RemoteResourceAuthConfig[];
    definitionId: string;
  };
  data?: {
    [name: string]: any;
  };
}

function convertAuthToService(auth: {
  key: string;
  displayName: string;
  url: string;
}): AuthService {
  return {
    id: auth.key,
    name: auth.displayName,
    startAuthUrl: auth.url,
  };
}

export type Options = {
  serviceUrl: string;
  objectUrl: string;
  $commands: Subject<Command>;
};

export function createObjectResolverServiceObservable(options: Options) {
  const { serviceUrl, objectUrl, $commands } = options;

  let provider: string | undefined;

  return $commands.pipe(
    startWith({
      type: 'init',
    }),
    mergeMap((cmd: Command) => {
      // ignore reloads for other providers
      if (cmd.type === 'reload' && cmd.provider !== provider) {
        return empty();
      }

      return fetch$<ResolveResponse>('post', `${serviceUrl}/resolve`, {
        resourceUrl: encodeURI(objectUrl),
      }).pipe(
        map<ResolveResponse, ObjectState>(json => {
          if (json.meta.visibility === 'not_found') {
            return {
              status: 'not-found',
              provider,
              services: [],
            };
          }
          provider = json.meta.definitionId;
          switch (json.meta.access) {
            case 'forbidden':
              return {
                status: 'forbidden',
                provider,
                services: json.meta.auth.map(convertAuthToService),
                data: json.data,
              };

            case 'unauthorized':
              return {
                status: 'unauthorized',
                provider,
                services: json.meta.auth.map(convertAuthToService),
                data: json.data,
              };

            default:
              return {
                status: 'resolved',
                provider,
                services: json.meta.auth.map(convertAuthToService),
                data: json.data,
              };
          }
        }),
        startWith<ObjectState>({
          status: 'resolving',
          services: [],
        }),
      );
    }),
    catchError(() =>
      of<ObjectState>({
        status: 'errored',
        services: [],
      }),
    ),
    publishReplay(1),
    refCount(),
  );
}
