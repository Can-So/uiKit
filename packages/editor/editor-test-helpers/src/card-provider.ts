import { EditorCardProvider } from '@atlaskit/smart-card';

type CardAppearance = 'inline' | 'block';

export class EditorTestCardProvider extends EditorCardProvider {
  testUrlMatch = new RegExp('^https?://([a-z_-]*.)?atlassian.com');

  async resolve(url: string, appearance: CardAppearance): Promise<any> {
    if (url.match(this.testUrlMatch)) {
      return {
        type: appearance === 'inline' ? 'inlineCard' : 'blockCard',
        attrs: {
          data: {
            '@context': 'https://www.w3.org/ns/activitystreams',
            '@type': 'Document',
            name: 'Welcome to Atlassian!',
            url: 'http://www.atlassian.com',
          },
        },
      };
    } else {
      return super.resolve(url, appearance);
    }
  }
}

export const cardProvider = new EditorTestCardProvider();
