const fetch = require('node-fetch');

module.exports = function(body) {
  return fetch('https://analytics.atlassian.com/analytics/events', {
    method: 'POST',
    headers: {
      Accept: 'application/json, */*',
      'Content-Type': 'application/json',
    },
    body,
  });
};
