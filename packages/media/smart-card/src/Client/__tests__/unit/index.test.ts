import 'whatwg-fetch';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import * as fetchMock from 'fetch-mock';
import { Client, RemoteResourceAuthConfig, ResolveResponse } from '../..';
import { ObjectState } from '../../types';
import { v4 } from 'uuid';

const RESOLVE_URL =
  'https://api-private.stg.atlassian.com/object-resolver/resolve';

const OBJECT_URL = 'http://example.com/foobar';

const remoteResourceMetaAuth: RemoteResourceAuthConfig[] = [];

const definitionId = 'abc-123';

const generator = {
  name: 'My App',
};

function mockResolvedFetchCall() {
  fetchMock.mock({
    name: 'resolved',
    matcher: `begin:${RESOLVE_URL}`,
    response: {
      status: 200,
      body: JSON.stringify({
        meta: {
          visibility: 'restricted',
          access: 'granted',
          auth: remoteResourceMetaAuth,
          definitionId,
        },
        data: {
          '@context': {},
          name: 'My Page',
          generator,
        },
      }),
    },
  });
}

function mockUnauthorizedFetchCall() {
  fetchMock.mock({
    matcher: `begin:${RESOLVE_URL}`,
    response: {
      status: 200,
      body: JSON.stringify({
        meta: {
          visibility: 'restricted',
          access: 'unauthorized',
          auth: remoteResourceMetaAuth,
          definitionId,
        },
        data: {
          '@context': {},
          generator,
        },
      }),
    },
  });
}

function mockRestrictedFetchCall() {
  fetchMock.mock({
    matcher: `begin:${RESOLVE_URL}`,
    response: {
      status: 200,
      body: JSON.stringify({
        meta: {
          visibility: 'restricted',
          access: 'forbidden',
          auth: remoteResourceMetaAuth,
          definitionId,
        },
        data: {
          '@context': {},
          generator,
        },
      }),
    },
  });
}

function mockErroredFetchCall() {
  fetchMock.mock({
    name: 'errored',
    matcher: `begin:${RESOLVE_URL}`,
    response: {
      status: 500,
      throws: 'Errored mock',
    },
  });
}

function mockNotFoundFetchCall() {
  fetchMock.mock({
    name: 'notfound',
    matcher: `begin:${RESOLVE_URL}`,
    response: {
      status: 200,
      body: JSON.stringify({
        meta: {
          visibility: 'not_found',
          access: 'granted',
          auth: remoteResourceMetaAuth,
          definitionId,
        },
      }),
    },
  });
}

function onNthState(
  cb: (x: any) => any,
  n: number,
): (s: [ObjectState | null, boolean]) => void {
  let stack: (ObjectState | null)[] = [];
  return (s: [ObjectState | null, boolean]) => {
    stack.push(s[0]);
    if (stack.length === n) {
      cb(stack);
    }
  };
}

describe('Client', () => {
  afterEach(() => fetchMock.restore());

  it('should call update function two times', async () => {
    mockResolvedFetchCall();

    const client = new Client();

    let stack: (ObjectState | null)[] = [];

    const result = await new Promise(resolve => {
      const mockCardUpdateFunction = (s: [ObjectState | null, boolean]) => {
        const [state] = s;
        stack.push(state);
        if (stack.length === 3) {
          resolve(stack);
        }
      };
      client.register(OBJECT_URL).subscribe(v4(), mockCardUpdateFunction);
      client.resolve(OBJECT_URL);
    });

    expect(result).toMatchObject([
      null,
      { status: 'resolving' },
      { status: 'resolved', definitionId: definitionId },
    ]);
  });

  it('should invoke different callbacks for the same URL', async () => {
    mockResolvedFetchCall();

    const result = await new Promise<any[]>(resolve => {
      const client = new Client();

      let stack: (ObjectState | null)[] = [];

      const theUrl = 'TEST.COM/test-case-123';

      const card1 = {
        url: theUrl,
        uuid: v4(),
        update: (state: [ObjectState | null, boolean]) => {
          stack.push(state[0]);
        },
      };
      const card2 = {
        url: theUrl,
        uuid: v4(),
        update: (state: [ObjectState | null, boolean]) => {
          stack.push(state[0]);
          if (stack.length === 5) {
            return resolve(stack);
          }
        },
      };

      client.register(card1.url).subscribe(card1.uuid, card1.update);
      client.resolve(card1.url);

      client.register(card2.url).subscribe(card2.uuid, card2.update);
      client.resolve(card2.url);
    });

    expect(result.length).toEqual(5);

    expect(result).toMatchObject([
      null,
      { status: 'resolving' },
      { status: 'resolving' },
      { status: 'resolved', definitionId },
      { status: 'resolved', definitionId },
    ]);
  });

  it('should be not-found when the object cannot be found', async () => {
    mockNotFoundFetchCall();

    const result = await new Promise(resolve => {
      const mockCardUpdateFunction = onNthState(resolve, 3);
      const uuid = v4();
      const client = new Client();
      client.register(OBJECT_URL).subscribe(uuid, mockCardUpdateFunction);
      client.resolve(OBJECT_URL);
    });

    expect(result).toMatchObject([
      null,
      { status: 'resolving' },
      { status: 'not-found', definitionId: undefined },
    ]);
  });

  it('should be unauthorized when the object cannot be accessed by the current user', async () => {
    mockUnauthorizedFetchCall();

    const result = await new Promise<ObjectState[]>(resolve => {
      const mockCardUpdateFunction = onNthState(resolve, 3);
      const uuid = v4();
      const client = new Client();
      client.register(OBJECT_URL).subscribe(uuid, mockCardUpdateFunction);
      client.resolve(OBJECT_URL);
    });

    expect(result[2].status).toEqual('unauthorized');
    expect(result[2].services).toEqual([]);
    expect(result[2].data).toEqual({
      '@context': {},
      generator,
    });
  });

  it('should be forbidden when the object cannot be accessed by the current user', async () => {
    mockRestrictedFetchCall();

    const result = await new Promise<ObjectState[]>(resolve => {
      const mockCardUpdateFunction = onNthState(resolve, 3);
      const uuid = v4();
      const client = new Client();
      client.register(OBJECT_URL).subscribe(uuid, mockCardUpdateFunction);
      client.resolve(OBJECT_URL);
    });

    expect(result[2].status).toEqual('forbidden');
    expect(result[2].services).toEqual([]);
    expect(result[2].data).toEqual({
      '@context': {},
      generator,
    });
  });

  it('should be errored when the object cannot be retrieved', async () => {
    mockErroredFetchCall();

    const result = await new Promise<ObjectState[]>(resolve => {
      const mockCardUpdateFunction = onNthState(resolve, 3);
      const uuid = v4();
      const client = new Client();
      client.register(OBJECT_URL).subscribe(uuid, mockCardUpdateFunction);
      client.resolve(OBJECT_URL);
    });

    expect(result[2].status).toEqual('errored');
    expect(result[2].services).toEqual([]);
    expect(result[2].data).toBeUndefined();
  });

  it('should send proper sequense of states when reload with the same definitionId', async () => {
    mockResolvedFetchCall();

    const result = await new Promise<(ObjectState | null)[]>(resolve => {
      const client = new Client();
      const stack: (ObjectState | null)[] = [];
      const uuid = v4();
      const cardUpdateFn = (state: [ObjectState | null, boolean]) => {
        stack.push(state[0]);
        if (stack.length === 3) {
          client.reload(OBJECT_URL);
        }
        if (stack.length === 5) {
          resolve(stack);
        }
      };
      client.register(OBJECT_URL).subscribe(uuid, cardUpdateFn);
      client.resolve(OBJECT_URL);
    });

    expect(result).toMatchObject([
      null,
      { status: 'resolving' },
      { status: 'resolved', definitionId },
      { status: 'resolving' },
      { status: 'resolved', definitionId },
    ]);
  });

  it('should be possible to extend the functionality of the default client', async () => {
    mockResolvedFetchCall();

    const specialCaseUrl = 'http://some.jira.com/board/ISS-1234';

    const customResponse = {
      meta: {
        visibility: 'public',
        access: 'granted',
        auth: [],
        definitionId: 'custom-def',
      },
      data: {
        name: 'Doc 1',
      },
    } as ResolveResponse;

    const callHistory = await new Promise<(ObjectState | null)[]>(resolve => {
      class CustomClient extends Client {
        fetchData(url: string) {
          if (url === specialCaseUrl) {
            return Promise.resolve(customResponse);
          }
          return super.fetchData(url);
        }
      }
      const customClient = new CustomClient();
      const stack: (ObjectState | null)[] = [];

      const specialCardUUID = v4();
      const callbackForSpecialCase = (s: [ObjectState | null, boolean]) => {
        stack.push(s[0]);
      };

      const normalCardUUID = v4();
      const callbackForNormalCase = (s: [ObjectState | null, boolean]) => {
        stack.push(s[0]);
        if (stack.length === 5) {
          resolve(stack);
        }
      };

      customClient
        .register(specialCaseUrl)
        .subscribe(specialCardUUID, callbackForSpecialCase);
      customClient
        .register(OBJECT_URL)
        .subscribe(normalCardUUID, callbackForNormalCase);

      customClient.resolve(OBJECT_URL);
      customClient.resolve(specialCaseUrl);
    });

    expect(callHistory).toMatchObject([
      null,
      { status: 'resolving' },
      { status: 'resolving' },
      {
        status: 'resolved',
        definitionId: 'custom-def',
        data: { name: 'Doc 1' },
      },
      { status: 'resolved', definitionId },
    ]);
  });

  it('should not reload resolved card with the same definition id', async () => {
    mockResolvedFetchCall();

    const card1 = {
      url: 'http://drive.google.com/doc/1',
      uuid: v4(),
      definitionId: undefined,
      updateFn: jest.fn().mockImplementation((state: ObjectState) => {
        if (state.definitionId) {
          card1.definitionId = state.definitionId as any;
        }
      }),
    };

    const card2 = {
      url: 'http://drive.google.com/doc/2',
      uuid: v4(),
      definitionId: undefined,
      updateFn: jest.fn().mockImplementation((state: ObjectState) => {
        if (state.definitionId) {
          card1.definitionId = state.definitionId as any;
        }
      }),
    };

    const customFetchMock = jest.fn().mockImplementation((url: string) => {
      if (url === card1.url) {
        return Promise.resolve(<ResolveResponse>{
          meta: {
            visibility: 'public',
            access: 'granted',
            auth: [],
            definitionId: 'google',
          },
          data: {
            name: 'Doc for Card 1',
          },
        });
      } else if (url === card2.url) {
        return Promise.resolve(<ResolveResponse>{
          meta: {
            visibility: 'public',
            access: 'granted',
            auth: [],
            definitionId: 'google',
          },
          data: {
            name: 'Doc for Card 2',
          },
        });
      }
    });

    class CustomClient extends Client {
      fetchData(url: string): Promise<ResolveResponse> {
        return customFetchMock(url);
      }
    }

    const client = new CustomClient();

    client.register(card1.url).subscribe(card1.uuid, card1.updateFn);
    client.register(card2.url).subscribe(card2.uuid, card2.updateFn);

    client.resolve(card1.url);
    client.resolve(card2.url);

    await new Promise(res => setTimeout(res, 1));

    expect(customFetchMock.mock.calls).toEqual([[card1.url], [card2.url]]);

    expect(card1.updateFn).toHaveBeenCalledTimes(2);
    expect(card2.updateFn).toHaveBeenCalledTimes(2);
  });

  it('should not reload card that has already been resolved', async () => {
    mockResolvedFetchCall();

    const theUrl = 'http://drive.google.com/doc/1';

    const card1 = {
      url: theUrl,
      uuid: v4(),
      definitionId: undefined,
      updateFn: jest.fn().mockImplementation((state: ObjectState) => {
        if (state.definitionId) {
          card1.definitionId = state.definitionId as any;
        }
      }),
    };

    const card2 = {
      url: theUrl,
      uuid: v4(),
      definitionId: undefined,
      updateFn: jest.fn().mockImplementation((state: ObjectState) => {
        if (state.definitionId) {
          card2.definitionId = state.definitionId as any;
        }
      }),
    };

    const customFetchMock = jest.fn().mockImplementation(() => {
      return Promise.resolve(<ResolveResponse>{
        meta: {
          visibility: 'public',
          access: 'granted',
          auth: [],
          definitionId: 'google',
        },
        data: {
          name: 'Doc for Card 1',
        },
      });
    });

    class CustomClient extends Client {
      fetchData(url: string): Promise<ResolveResponse> {
        return customFetchMock(url);
      }
    }

    const client = new CustomClient();

    // First url has been pasted and a card has been added

    client.register(card1.url).subscribe(card1.uuid, card1.updateFn);
    // client.resolve(card1.url);

    await new Promise(res => setTimeout(res, 1));

    expect(customFetchMock.mock.calls).toEqual([[theUrl]]);

    expect(card1.updateFn).toHaveBeenCalledTimes(2);
    expect(card2.updateFn).toHaveBeenCalledTimes(0);

    // The same url has been pasted and another card has been added

    // client.register(card2.url).subscribe(card2.uuid, card2.updateFn);
    // // client.resolve(card2.url);

    // await new Promise(res => setTimeout(res, 1));

    // expect(customFetchMock.mock.calls).toEqual([[theUrl]]);

    // expect(card1.updateFn).toHaveBeenCalledTimes(2);
    // expect(card2.updateFn).toHaveBeenCalledTimes(1);
  });
});
