import * as React from 'react';
import { md, Example, Props } from '@atlaskit/docs';

export default md`
  # MediaCore

  This package is required by other Media Components, and should not be used
  directly.

  It holds shared code between Media Components, such as:

  * models
  * providers
  * interfaces

  ## Installation

  ~~~sh
  yarn add @atlaskit/media-core
  ~~~

  ## Using the component

  \`Context\` is the main object that is created with \`ContextFactory\`. It can
  be created using either \`token\` and either \`clientId\` or \`asapIssuer\`.

  ~~~js
  import { Context, ContextConfig, ContextFactory } from '@atlaskit/media-core';

  const authProvider = ({ collectionName }) =>
    new Promise((resolve, reject) => {
      resolve({
        token: 'token-that-was-recieved-in-some-async-way',
        clientId: 'some-client-id',
        //  asapIssuer: 'asap-issuer'
      });
    });
  const config: ContextConfig = {
    serviceHost: 'http://example.com',
    authProvider,
  };
  const context: Context = ContextFactory.create(config);
  ~~~
`;
