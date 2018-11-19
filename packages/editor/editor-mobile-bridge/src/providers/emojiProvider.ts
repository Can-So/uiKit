import { EmojiResource, EmojiResourceConfig } from '@atlaskit/emoji';
import { createPromise } from '../cross-platform-promise';
import { ElementsConfig, MediaAuthConfig } from '../types';

function createEmojiProvider() {
  return Promise.all([
    createPromise<ElementsConfig>('getConfig').submit(),
    createPromise<MediaAuthConfig>('getAuth').submit(),
  ]).then(([config, auth]) => {
    let { cloudId, baseUrl } = config;

    baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

    const emojiConfig: EmojiResourceConfig = {
      providers: [
        {
          url: `${baseUrl}emoji/standard`,
        },
        {
          url: `${baseUrl}emoji/atlassian`,
        },
      ],
    };

    if (cloudId) {
      const customEmojiConfig = {
        url: `${baseUrl}emoji/${cloudId}/site`,
        securityProvider: () => ({}),
      };

      if (auth && auth.token) {
        customEmojiConfig.securityProvider = () => ({
          headers: { Authorization: `Bearer ${auth.token}` },
        });
      }

      emojiConfig.providers.push(customEmojiConfig);
    }

    return new EmojiResource(emojiConfig);
  });
}

export default createEmojiProvider();
