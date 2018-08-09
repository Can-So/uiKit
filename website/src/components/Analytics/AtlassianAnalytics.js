class AtlassianAnalyticsClient {
  constructor(options) {
    this.payload = [];
    this.version = options.version;
  }

  addEvent(eventName, properties = {}) {
    if (
      // Make sure our JSON object is flat
      Object.values(properties).some(key => typeof properties[key] === 'object')
    ) {
      console.warn('Analytic properties are expected to be a flat JSON object');
    }
    this.payload.push({ name: eventName, properties });
    return this.payload;
  }

  async send() {
    return fetch('https://analytics.atlassian.com/analytics/events', {
      method: 'POST',
      headers: {
        Accept: 'application/json, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events: this.payload.map(event => ({
          name: event.name,
          properties: event.properties,
          server: WEBSITE_ENV, //Set by webpack
          product: 'atlaskit',
          subproduct: 'website',
          version: this.version,
          user: '-',
          serverTime: Date.now(),
        })),
      }),
    });
  }
}

function getAtlassianAnalyticsClient(options) {
  return new AtlassianAnalyticsClient(options);
}

module.exports = getAtlassianAnalyticsClient;
