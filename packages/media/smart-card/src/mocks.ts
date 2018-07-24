import mock, { delay } from 'xhr-mock';

const resolveUrl =
  'https://api-private.stg.atlassian.com/object-resolver/resolve';

const context = '';

const serviceAuth = {
  key: 'default',
  displayName: 'Google',
  url:
    'https://outbound-auth-flow.ap-southeast-2.dev.atl-paas.net/start?containerId=f4d9cdf9-9977-4c40-a4d2-968a4986ade0&serviceKey=default',
};

const generator = {
  name: 'Google Drive',
  icon:
    'https://ssl.gstatic.com/docs/doclist/images/infinite_arrow_favicon_5.ico',
};

const resolvedBody = {
  meta: {
    visibility: 'restricted',
    access: 'granted',
    auth: [serviceAuth],
  },
  data: {
    '@context': context,
    generator,
    name: 'Getting Started',
  },
};

const unauthorisedBody = {
  meta: {
    visibility: 'restricted',
    access: 'unauthorised',
    auth: [serviceAuth],
  },
  data: {
    '@context': context,
    generator,
  },
};

const forbiddenBody = {
  meta: {
    visibility: 'restricted',
    access: 'forbidden',
    auth: [serviceAuth],
  },
  data: {
    '@context': context,
    generator,
  },
};

const flowResponsesByUrl = {
  'public-happy': [
    {
      status: 200,
      body: resolvedBody,
    },
  ],
  'private-happy': [
    {
      status: 200,
      body: unauthorisedBody,
    },
    {
      status: 200,
      body: resolvedBody,
    },
  ],
  'private-forbidden': [
    {
      status: 200,
      body: unauthorisedBody,
    },
    {
      status: 200,
      body: forbiddenBody,
    },
  ],
  'not-found': [
    {
      status: 404,
    },
  ],
  error: [
    {
      status: 500,
    },
  ],
};

const flowIndiciesByUrl = {};

mock.setup();

mock.post(
  `${resolveUrl}`,
  delay((req, res) => {
    const url = JSON.parse(req.body()).resourceUrl;
    const response =
      flowResponsesByUrl[url] &&
      flowResponsesByUrl[url][flowIndiciesByUrl[url] || 0];
    if (response) {
      flowIndiciesByUrl[url] = (flowIndiciesByUrl[url] || 0) + 1;
      if (flowIndiciesByUrl[url] >= flowResponsesByUrl[url].length) {
        flowIndiciesByUrl[url] = 0;
      }
      if (response.status) res.status(response.status);
      if (response.headers) res.headers(response.headers);
      if (response.body) res.body(JSON.stringify(response.body));
      return res;
    } else {
      res.status(404);
      return res;
    }
  }, 900),
);
