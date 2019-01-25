declare var global: any;
import { fetchJson } from '../fetch';

const REQUEST_URL = '/some/url';
const REQUEST_RESPONSE_DATA = {
  data: 'yay!',
};

describe('utils fetch', () => {
  beforeAll(() => {
    const responseObject = {
      json: () => Promise.resolve(REQUEST_RESPONSE_DATA),
    };
    global.fetch = () => Promise.resolve(responseObject);
  });

  it('should return response.json() for any fetch', done => {
    fetchJson(REQUEST_URL).then(jsonReponse => {
      expect(jsonReponse).toBe(REQUEST_RESPONSE_DATA);
      done();
    });
  });
});
