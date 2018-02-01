import * as sinon from 'sinon';

import { customCategory, customType } from '../constants';
import EmojiRepository from '../api/EmojiRepository';
import TokenManager from '../api/media/TokenManager';
import { denormaliseEmojiServiceResponse } from '../api/EmojiUtils';
import {
  EmojiDescription,
  EmojiDescriptionWithVariations,
  EmojiId,
  EmojiServiceDescription,
  EmojiServiceResponse,
  EmojiVariationDescription,
  MediaApiRepresentation,
  MediaApiToken,
} from '../types';
import { convertMediaToImageRepresentation } from '../type-helpers';
import { MockEmojiResourceConfig } from './support-types';
import {
  mockEmojiResourceFactory,
  mockNonUploadingEmojiResourceFactory,
  MockEmojiResource,
  emojiProviderFactory,
} from './MockEmojiResource';
import { EmojiProvider, UploadingEmojiProvider } from '../api/EmojiResource';

export const spriteEmoji: EmojiDescription = {
  id: 'grimacing',
  shortName: ':grimacing:',
  name: 'Grimacing',
  type: 'standard',
  category: 'PEOPLE',
  order: 666,
  representation: {
    sprite: {
      url: 'https://path-to-spritesheet.png',
      row: 6,
      column: 6,
      height: 1024,
      width: 1024,
    },
    xIndex: 1,
    yIndex: 1,
    x: 123,
    y: 456,
    height: 72,
    width: 72,
  },
  searchable: true,
};

export const imageEmoji: EmojiDescription = {
  id: 'grimacing',
  shortName: ':grimacing:',
  name: 'Grimacing',
  type: 'standard',
  category: 'PEOPLE',
  order: 777,
  representation: {
    imagePath: 'https://path-to-image.png',
    width: 24,
    height: 24,
  },
  altRepresentation: {
    imagePath: 'https://alt-path-to-image.png',
    width: 48,
    height: 48,
  },
  searchable: true,
};

export const siteUrl = 'https://emoji.example.com/emoji/site/blah';

export const mediaBaseUrl = 'https://media.example.com/';
export const mediaEmojiImagePath = `${mediaBaseUrl}path-to-image.png`;
export const mediaEmojiAlternateImagePath = `${mediaBaseUrl}alt-path-to-image.png`;

export const mediaServiceEmoji: EmojiServiceDescription = {
  id: 'media',
  shortName: ':media:',
  name: 'Media example',
  fallback: ':media:',
  type: customType,
  category: customCategory,
  order: -2,
  representation: {
    imagePath: mediaEmojiImagePath,
    width: 24,
    height: 24,
  },
  altRepresentations: {
    XHDPI: {
      imagePath: mediaEmojiAlternateImagePath,
      width: 48,
      height: 48,
    },
  },
  searchable: true,
};

export const mediaEmojiId: EmojiId = {
  id: 'media',
  shortName: ':media:',
  fallback: ':media:',
};

export const mediaEmoji: EmojiDescriptionWithVariations = {
  ...mediaEmojiId,
  name: 'Media example',
  type: customType,
  category: customCategory,
  order: -2,
  representation: {
    mediaPath: mediaEmojiImagePath,
    width: 24,
    height: 24,
  },
  altRepresentation: {
    mediaPath: mediaEmojiAlternateImagePath,
    width: 48,
    height: 48,
  },
  skinVariations: [],
  searchable: true,
};

export const loadedMediaEmoji: EmojiDescriptionWithVariations = {
  ...mediaEmoji,
  representation: {
    imagePath: 'data:;base64,', // assumes an empty result is returned (e.g. via fetchMock for the mediaPath)
    width: 24,
    height: 24,
  },
  altRepresentation: convertMediaToImageRepresentation(
    mediaEmoji.altRepresentation as MediaApiRepresentation,
  ),
};

export const loadedAltMediaEmoji: EmojiDescriptionWithVariations = {
  ...mediaEmoji,
  representation: convertMediaToImageRepresentation(
    mediaEmoji.representation as MediaApiRepresentation,
  ),
  altRepresentation: {
    imagePath: 'data:;base64,', // assumes an empty result is returned (e.g. via fetchMock for the mediaPath)
    width: 48,
    height: 48,
  },
};

const missingMediaId = 'some-new-emoji';

export const missingMediaEmojiId: EmojiId = {
  id: missingMediaId,
  shortName: `:${missingMediaId}:`,
  fallback: `:${missingMediaId}:`,
};

export const missingMediaServiceEmoji: EmojiServiceDescription = {
  ...mediaServiceEmoji,
  ...missingMediaEmojiId,
};

export const missingMediaEmoji: EmojiDescription = {
  ...(mediaEmoji as EmojiDescription),
  ...missingMediaEmojiId,
};

// export const loadedMissingMediaEmoji: EmojiDescription = {
//   ...mediaEmoji,
//   ...missingMediaEmojiId,
//   representation: {
//     imagePath: 'data:;base64,', // assumes an empty result is returned (e.g. via fetchMock for the mediaPath)
//     width: 24,
//     height: 24,
//   }
// };

export const fetchSiteEmojiUrl = (emojiId: EmojiId): string =>
  `${siteUrl}/../${emojiId.id}`;

export const siteServiceConfig = {
  url: siteUrl,
};

export const expiresAt = (offsetSeconds: number = 0): number =>
  Math.floor(Date.now() / 1000) + offsetSeconds;

export const defaultMediaApiToken = (): MediaApiToken => ({
  url: mediaBaseUrl,
  clientId: '1234',
  jwt: 'abcd',
  collectionName: 'emoji-collection',
  expiresAt: expiresAt(60), // seconds since Epoch UTC
});

export const createTokenManager = (
  getTokenReturn?: Promise<MediaApiToken>,
): TokenManager => {
  const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
  tokenManagerStub.getToken.returns(
    getTokenReturn || Promise.resolve(defaultMediaApiToken()),
  );
  return tokenManagerStub;
};

export const loadedMediaImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAETklEQVR4nO2XW4hVZRTHf+vb++x9rp2ZcdKZNLWSKbMoI4Ve6iFBMMhCu4BBhZkUVmQKRkqkL9qFtAS7UElPooT0VEE9SEGFUFDZeMlIrWnGcWYc54xnX87+Vg/7mI7KpNPAvMzeb3uvvb/fty7/9S3pOvaQMiaXIuLjqlbHZn0UsLggYwQAIJgxXB1gHGAcYBxgHAB3pB+qgq13ESMg5wmqtalNKrmCMRfajBhAFbK+4GbSP4ahEseKSPpOFfI5IZMRqD8LAiWKFHOezy8bQBUyGaH9QEhnVw2AthkeLS0ZokhxXfA94edfQ9oPhISBZUKTy223ZmltzTA4aId44rIBrIVcTvjk01Ps3N2PAOvXTWTxfR5RrCQJrN/YzedfVohrilowDjQ1OKxc0cz8eQUqg2c9MaIkVAXfF4pFQ7FoyLiCTVK3v/tBLzt3n8LzBN8TSiWD6woDFcuqtZ3s/aFKPm+w9n8AnIGwtp5sNg3L8eM1vtozSGOjQ8aF1c81s/2dydx/TwlVeOLRBqZd7RFF+m8YRlwFQ2AAx4X+U5YgSBNyxnSPhxeXCSPlqWUTWDC/xC03Z6kGZxMWRkkHBLAJlIoG3xM8T/j9SMyHH/cRVC3lsmHWzCy9fcmQxUcNAIEoVlomucy9PUd/f4LnCVu29bDsmQ527DpJ38mEhganrg2jDUAqMmGkrFjexJzZObpP1PB9w+E/IjZt7mHp03/x2RcDFAoyBGJUAeJYKZcdtrzWwoonmyhfYQgCJZ8zdPfUWPNyFzt29VMsGGyilw6gCknCBe67CAZBYHEcYfnSJj7aNpkXn2+mZZKDVSiXHd7f3sfRYxGeb7B6CQDWgusKDWWD40CSKNZeXNczGaFYTOM8MGDJ5gwPLirz3ltX0XadR5IolUFL+/4Q309DMSyAtVDIGyqVhFff7Kbj7xoTJ7rkc0KlLqkigusKAlQqCZu3nmD1S52oahqCUJk61eOaaR5hvf7DWNNhQIfRAWtTZftu7yAbNp3gz46YffsjHl/SQEdnzPd7q+RzhjhSpkzOALBuQxdff1ulVDI8u6qTRQtLNE9w+fGngD3fDFIspDkxdYpHrZZuf1ghshaaGl2iKE2kA4dCVq3tAtJ+0NObMO+uAjPbfMJIeeyRRg7+FlE5bWk/GPLKxgDHFZKaks0aevsS7l1Q4qZZPqcDi2OGCYExEITK9W0+W99o5YY2L2219TuKlLvvLLDmhStRoFq13DE3z9uvtzJndg7fE0SEWqwYI7guLHmgzJqVzdRqZ+cx6Ty6cNjcPtP94lj5ZV9AR2cNIzB1SoYbZ2axmpafMWml5HNpch06HHHkaEQ1UEpFw4xrPaZP86gGSpIoIulw+p8AKUS6i1xWcFwBhVpNqQZKOuXKEFsR+ffAIpI2qyhWwtAiIvUKqk/HlyIFZ3r34GlF62IgAub84805tkGo2EBBqVcLGOOcY6mA4R9UsuXGHAxHAwAAAABJRU5ErkJggg==';

declare var require: {
  <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
export const standardServiceEmojis: EmojiServiceResponse = require('./json-data/test-emoji-standard.json') as EmojiServiceResponse;
// tslint:disable-next-line:no-var-requires
export const atlassianServiceEmojis: EmojiServiceResponse = require('./json-data/test-emoji-atlassian.json') as EmojiServiceResponse;
export const siteServiceEmojis = (): EmojiServiceResponse => ({
  emojis: [mediaServiceEmoji],
  meta: {
    mediaApiToken: defaultMediaApiToken(),
  },
});

export const filterToSearchable = (
  emojis: EmojiDescription[],
): EmojiDescription[] => {
  return emojis.filter(emoji => emoji.searchable);
};

export const standardEmojis: EmojiDescription[] = denormaliseEmojiServiceResponse(
  standardServiceEmojis,
).emojis;
export const atlassianEmojis: EmojiDescription[] = denormaliseEmojiServiceResponse(
  atlassianServiceEmojis,
).emojis;
export const siteEmojis: EmojiDescription[] = [mediaEmoji];
export const emojis: EmojiDescription[] = [
  ...standardEmojis,
  ...atlassianEmojis,
  ...siteEmojis,
];
export const searchableEmojis: EmojiDescription[] = filterToSearchable(emojis);

export const newEmojiRepository = () => new EmojiRepository(emojis);
export const newSiteEmojiRepository = () => new EmojiRepository(siteEmojis);

const defaultEmojiRepository = newEmojiRepository();

export const smileyEmoji = defaultEmojiRepository.findByShortName(
  ':smiley:',
) as EmojiDescriptionWithVariations;
export const openMouthEmoji = defaultEmojiRepository.findByShortName(
  ':open_mouth:',
) as EmojiDescriptionWithVariations;
export const grinEmoji = defaultEmojiRepository.findByShortName(
  ':grin:',
) as EmojiDescriptionWithVariations;
export const evilburnsEmoji = defaultEmojiRepository.findByShortName(
  ':evilburns:',
) as EmojiDescriptionWithVariations;
export const thumbsupEmoji = defaultEmojiRepository.findByShortName(
  ':thumbsup:',
) as EmojiDescriptionWithVariations;
export const thumbsdownEmoji = defaultEmojiRepository.findByShortName(
  ':thumbsdown:',
) as EmojiDescriptionWithVariations;
export const standardBoomEmoji = defaultEmojiRepository.findById(
  '1f4a5',
) as EmojiDescriptionWithVariations;
export const atlassianBoomEmoji = defaultEmojiRepository.findById(
  'atlassian-boom',
) as EmojiDescriptionWithVariations;
export const blackFlagEmoji = defaultEmojiRepository.findByShortName(
  ':flag_black:',
) as EmojiDescriptionWithVariations;
export const congoFlagEmoji = defaultEmojiRepository.findByShortName(
  ':flag_cg:',
) as EmojiDescriptionWithVariations;

export const getNonUploadingEmojiResourcePromise = (
  config?: MockEmojiResourceConfig,
): Promise<EmojiProvider> =>
  mockNonUploadingEmojiResourceFactory(newEmojiRepository(), config);

export const getEmojiResourcePromise = (
  config?: MockEmojiResourceConfig,
): Promise<UploadingEmojiProvider> =>
  emojiProviderFactory(newEmojiRepository(), config);

export const getMockEmojiResourcePromise = (
  config?: MockEmojiResourceConfig,
): Promise<MockEmojiResource> =>
  mockEmojiResourceFactory(newEmojiRepository(), config);

export const getEmojiResourcePromiseFromRepository = (
  repo: EmojiRepository,
  config?: MockEmojiResourceConfig,
): Promise<UploadingEmojiProvider> => emojiProviderFactory(repo, config);

export const generateSkinVariation = (
  base: EmojiDescription,
  idx: number,
): EmojiVariationDescription => {
  const { id, shortName, name } = base;
  if (!id) {
    throw new Error('An id is required for generating a skin variation');
  }

  return {
    id: `${id}-${idx}`,
    baseId: id,
    shortName: `${shortName.substring(0, shortName.length - 1)}-${idx}:`,
    name: `${name} ${idx}`,
    type: 'SITE',
    category: 'CHEESE',
    representation: {
      imagePath: `https://path-to-skin-variation-tone${idx}.png`,
      width: 24,
      height: 24,
    },
    searchable: false,
  };
};

export const blobResponse = (blob: Blob) => ({
  body: blob,
  sendAsJson: false,
});

export const base64png =
  'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA7dpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NTE4ODgxMzUyODIwNjgxMTgyMkFEMUQyMTg1MTNDMzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTFCQjBERDZCNzUxMTFFMkJCRTZBQjk5NUM3RDg3QzMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTFCQjBERDVCNzUxMTFFMkJCRTZBQjk5NUM3RDg3QzMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZGODVCQjMzMzAyMDY4MTE4MjJBRUQ0QThBMzUzM0M5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUxODg4MTM1MjgyMDY4MTE4MjJBRDFEMjE4NTEzQzM2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+i3bCIwAABOlJREFUeNrsV91PW2UY//W0p6enFFY+u/JdIPI1FgwLGORCpl4sUy/m7nZlvPMPmJlGQ2bUZfHGZDHRLBpj4o1LFqIRDdnGlsnUiXPraAdjQMpHgVL6fdqej9bnHKACK0Vg0Qt9k7enfXnP83t/z/O8v+dBl06n8W8M3X8TWKfTbbuhrvs0R48XODPfJ8YTbbT/Ev3+gaaLZoCmlWaVjmGa06nUL5PD54d2AtUwtwITkIEeh8lQt5E3vSqLUmdRpT1V237IMn3HKfimZ8xZGeh0itlakJCTojspxM/Q0hU6RDoncPOLfWcYhnklpShVUlK0WYqscVt9LV9cXWEoLD8IPWvQXiCjuH35e2Fl1rsJ3MCyifbjz5tsDQ74pjwYH74dEYLhcEpWzsmS9CUdIJIVuLH3nYCjo80qhCKIhyNoPdqDgrKSbV0VmFtAaGkZiighr8iKUkcV9AbDpj1hnx/TI/cS3vFHCqPXf0th+ogOMLIJuOnou9GW3u48dXOcwOu7nobVbnsiSaR66cpnX4HljIIiyYuKLH8wPvT+RWZ9A2viQPEEl2eGyvxJDSmZhMmSh8rWRrO9sd5BSxe08KxRT3H0RyEYghqn6EogpzEhFMbIN/3QMwxMvAn2thbYDzVn3bswMYUyRzVWKDyNPV2YGx1PqesaY0oel5RIIuIPoKC0GJQ8WY2o6zN3R+HsH8DbbxzDzUun8dqJTiSjsW0POet8gJLaKsQCIaRTCvRGdioDTO74ZPp3p2Crr0FkeQVRmtN37sPvmcsYiAWCcA0M4pkyBhc/PIWTx4/AxLEIReJg+Kw3DEuTHhg4DkHvEsqbGjA7OpakhPw0A0xp/3VgfmHRNzUjuK8Pi3Qp3WM3fv7Rc88VXTdCiYG6WhveJKZtTZUZ4/NLYS2GG8eM0435BxNwXbsJR8dheMhL9qfq4B17JNL1+jwDTGkuk6u7EtHYkZSS4t2DfS204Zwsikom+ejkk55ltB87i7Mff5cBmVsMgrNsZuwcvKG4rv10WRQSvrsDVyVruQ3uoVsCidJbhBXNJNcauI8evo0G6BCZ7/yBfPS8fkpjIsnRv9zpD6NhC2O9QZ+gw59YU8LOwKxXlTDv2NX3LmREZ9fXIxpFdWtR5ncwJMBo5jfLJ8PIGwj9So/nttphcmCI2RYVIYaKg9bVQ0gKtikyup0I5GKc9WUxEtWAZr0BxBMiLBSCrYNCZNwPMEsue2zRXFqC818MaVmuKAoKqyqy1R/sB5gzGNnHkKs7O+izI6dRKhjSTsC5YmyO+gP8wsMpTeh322BQNuv3yriYNZkY79gE7g9eh6rlqpzm06R6Dc5sBjUK0OkZksK0KvgQEwmIQpxirKh21eAHdw1Mxd2ekmWmlAS+pfdZkKAgtODTNNc7PqnpsyIr5I3kqusMek1k1q7W3rOaYQ12viBfK/oPb/2m5cs649KaSq18qqWUoQaAei1tqoWG2h5Qe0T0pYI9Maas7ffPzL1EANYa6rfyS4p0qnFqaRDwLiIZE1YzW5LWei4GLE+MeR7URqmMC2l69tNldlIsT9LVepkqS7WpwCIRc9ZsPWAixgxlfqbTIK2XqBIJoSWfkQpPN6nWH3+7y8w16BDqRrUiqG7kyBs8vWs0cEaGkipOfVWc1lUhDxKosmN7+/+/MP/E+FOAAQARPXdAJPf5fAAAAABJRU5ErkJggg==';

export const pngDataURL = `data:image/png;base64,${base64png}`;

export const createPngFile = () => {
  const byteString = atob(base64png);
  const buf = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(buf);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([buf], 'playasateam.png', { type: 'image/png' });
};

export const pngFileUploadData = {
  width: 30,
  height: 30,
  filename: 'playasateam.png',
  dataURL: pngDataURL,
};
