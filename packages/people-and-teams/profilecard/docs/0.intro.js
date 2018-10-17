// @flow
import React from 'react';
import { md, Example, code } from '@atlaskit/docs';

export default md`
  # @atlaskit/profilecard

  ${(
    <Example
      packageName="@atlaskit/profilecard"
      Component={require('../examples/01-profilecard').default}
      title="Profilecard"
      source={require('!!raw-loader!../examples/01-profilecard')}
    />
  )}

  ${(
    <Example
      packageName="@atlaskit/profilecard"
      Component={require('../examples/02-profilecard-resourced').default}
      title="ProfilecardResourced"
      source={require('!!raw-loader!../examples/02-profilecard-resourced')}
    />
  )}

  ## Using the AkProfilecardClient

  ${code`
import AkProfilecardResourced, { AkProfileClient } from '@atlaskit/profilecard';

const profileClient = new AkProfilecardClient({
  url: 'https://directory-graphql-service/endpoint' // GraphQL service endpoint
});

const analytics = (eventname, attributes) => {
  // ...
}

<AkProfilecardResourced
  cloudId="DUMMY-10ae0bf3-157e-43f7-be45-f1bb13b39048"
  userId="638454:c8dddbde-3f65-4078-946e-8f9834a3c908"
  resourceClient={profileClient}
  actions={[
    {
      label: 'View profile',
      id: 'view-profile',
      callback: () => {}
    }
  ]},
  analytics={analytics}
/>
  `}

  ### Using the LRU cache of the \`AkProfilecardClient\`

  ${code`
import { AkProfileClient } from '@atlaskit/profilecard';

const profileClient = new AkProfilecardClient({
  url: 'https://directory-graphql-service/endpoint', // GraphQL service endpoint
  cacheSize: 10, // Max item capacity of the LRU cache
  cacheMaxAge: 5000, // Milliseconds
});
  `}

  ### Customising / Extending the \`AkProfilecardClient\`

  ${code`
import { AkProfileClient } from '@atlaskit/profilecard';

const getProfileDataFromSomewhereElse = (url, cloudId, userId) => {
  const fetchUrl = 'https://someservice.com/fetchuser?userId=' + userId;

  return fetch(fetchUrl, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
};

class CustomProfileClient extends ProfileClient {
  /**
   * @param {String} cloudId
   * @param {String} userId
   * @returns {Promise}
   */
  makeRequest(cloudId, userId) {
    // 'userId' and 'cloudId' are passed from 'AkProfilecardResourced'
    // component properties.
    // The string of 'cloudId/userId' is used as cache identifier.
    //
    // Inside 'makeRequest' the 'url' parameter the client was instantiated
    // with is accessible via 'this.config.url'.
    //
    // 'makeRequest' must return a Promise that resolves with an object
    // of the following structure:
    //
    // {
    //   "avatarUrl": string,
    //   "fullName": string,
    //   "nickname": string,
    //   "email": string,
    //   "location": string,
    //   "meta": string,
    //   "presence": oneOf(["none", "available", "busy", "unavailable"]),
    //   "timestring": string
    // }

    return getProfileDataFromSomewhereElse(this.config.url, cloudId, userId);
  }
}

const profileClient = new CustomProfileClient({
  url: 'https://rest-api/endpoint', // Custom REST API endpoint
  cacheSize: 10,
  cacheMaxAge: 5000,
});
  `}
`;
