import { Context, isClientBasedAuth } from '@atlaskit/media-core';
import { stringify } from 'query-string';

export async function constructAuthTokenUrl(url: string, context: Context, collectionName?: string): Promise<string> {
  const host = context.config.serviceHost;
  const auth = await context.config.authProvider({ collectionName });
  if (isClientBasedAuth(auth)) {
    return buildClientBasedUrl(host, url, auth.token, auth.clientId, collectionName);
  } else {
    return buildIssuerBasedUrl(host, url, auth.token, auth.asapIssuer, collectionName);
  }
}

function buildClientBasedUrl(
  host: string,
  url: string,
  token: string,
  client: string,
  collection?: string
): string {
  return buildUrl(host, url, { client, collection, token });
}

function buildIssuerBasedUrl(
  host: string,
  url: string,
  token: string,
  issuer: string,
  collection?: string
): string {
  return buildUrl(host, url, { issuer, collection, token });
}

function buildUrl(host: string, url: string, query: Object) {
  return `${host}${url}?${stringify(query)}`;
}