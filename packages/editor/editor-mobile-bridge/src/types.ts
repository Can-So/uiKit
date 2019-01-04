export interface ElementsConfig {
  baseUrl: string;
  cloudId?: string;
}

export interface MediaAuthConfig {
  token: string;
  collectionName: string;
  clientId: string;
  baseUrl: string;
}

export interface NativeFetchResponse {
  response: string;
  status: number;
  statusText: string;
}
