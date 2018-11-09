import { CardProvider } from '@atlaskit/editor-core';

type CardAppearance = 'inline' | 'block';

export type ORSCheckResponse = {
  isSupported: boolean;
};

const ORS_CHECK_URL =
  'https://api-private.stg.atlassian.com/object-resolver/check';

export class EditorCardProvider implements CardProvider {
  async resolve(url: string, appearance: CardAppearance): Promise<any> {
    try {
      const result: ORSCheckResponse = await (await fetch(ORS_CHECK_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ resourceUrl: url }),
      })).json();

      if (result && result.isSupported) {
        return {
          type: appearance === 'inline' ? 'inlineCard' : 'blockCard',
          attrs: {
            url,
          },
        };
      }
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.warn(
        `Error when trying to check Smart Card url "${url} - ${
          e.prototype.name
        } ${e.message}`,
        e,
      );
    }

    return Promise.reject(undefined);
  }
}

export class EditorExampleCardProvider implements CardProvider {
  cardProvider = new EditorCardProvider();
  jiraUrlMatch = /https?\:\/\/hello\.atlassian\.net\/browse\/|https?\:\/\/product\-fabric\.atlassian\.net\/browse\//i;

  async resolve(url: string, appearance: CardAppearance): Promise<any> {
    if (url.match(this.jiraUrlMatch)) {
      return {
        type: 'inlineCard',
        attrs: {
          url,
        },
      };
    }

    return await this.cardProvider.resolve(url, appearance);
  }
}

export const cardProvider = new EditorExampleCardProvider();
