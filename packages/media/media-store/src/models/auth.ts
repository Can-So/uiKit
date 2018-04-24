export interface ClientBasedAuth {
  readonly clientId: string;
  readonly token: string;
}

export interface AsapBasedAuth {
  readonly asapIssuer: string;
  readonly token: string;
}

export type Auth = ClientBasedAuth | AsapBasedAuth;

export function isClientBasedAuth(auth: Auth): auth is ClientBasedAuth {
  return !!(auth as ClientBasedAuth).clientId;
}

export function isAsapBasedAuth(auth: Auth): auth is AsapBasedAuth {
  return !!(auth as AsapBasedAuth).asapIssuer;
}

export interface ContextConfig {
  readonly serviceHost: string;
  readonly cacheSize?: number;
  readonly authProvider: AuthProvider;
  readonly userAuthProvider?: AuthProvider;
}

export interface AuthContext {
  readonly collectionName?: string;
}

export type AuthProvider = (context?: AuthContext) => Promise<Auth>;

export type MediaApiConfig = {
  serviceHost: string;
  authProvider: AuthProvider;
};
