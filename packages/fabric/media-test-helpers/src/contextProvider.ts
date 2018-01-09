import { StoryBookAuthProvider } from './authProvider';
import { collectionNames } from './collectionNames';
import { ContextFactory, Context } from '@atlaskit/media-core';

export const defaultServiceHost =
  'https://dt-api-filestore.internal.app.dev.atlassian.io';

export const defaultParams = {
  clientId: '5a9812fc-d029-4a39-8a46-d3cc36eed7ab',
  asapIssuer: 'micros/media-playground',
  serviceHost: defaultServiceHost,
};

export interface AuthParameter {
  serviceHost: string;
  authType: 'client' | 'asap';
}

const defaultAuthParameter: AuthParameter = {
  serviceHost: defaultParams.serviceHost,
  authType: 'client',
};

/**
 * Creates and returns `Context` (from `media-core`) based on the data provided in parameter object.
 *
 * @param {AuthParameter} authParameter specifies serviceName and whatever auth should be done with clientId or asapIssuer
 * @returns {Context}
 */
export const createStorybookContext = (
  authParameter: AuthParameter = defaultAuthParameter,
): Context => {
  const scopes = {
    'urn:filestore:file:*': ['read'],
    'urn:filestore:chunk:*': ['read'],
  };
  collectionNames.forEach(c => {
    scopes[`urn:filestore:collection:${c}`] = ['read', 'update'];
  });

  const isAsapEnvironment = authParameter.authType === 'asap';
  const authProvider = StoryBookAuthProvider.create(isAsapEnvironment, scopes);

  return ContextFactory.create({
    serviceHost: authParameter.serviceHost,
    authProvider,
  });
};
