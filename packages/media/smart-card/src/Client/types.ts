export type GetNowTimeFn = () => number;

export type ObjectStatus =
  | 'resolving'
  | 'not-found'
  | 'resolved'
  | 'unauthorized'
  | 'forbidden'
  | 'errored';

export interface AuthService {
  id: string;
  name: string;
  startAuthUrl: string;
}

export interface ObjectState {
  status: ObjectStatus;
  definitionId?: string;
  services: AuthService[];
  data?: { [name: string]: any };
}

export type CardUpdateCallback<T> = (state: [T | null, boolean]) => void;
