import * as uuid from 'uuid/v1';
import { AbstractResource } from '@atlaskit/util-service-support';

import { customCategory, customType } from '../constants';
import {
  EmojiDescription,
  EmojiId,
  EmojiSearchResult,
  EmojiUpload,
  OptionalEmojiDescription,
  SearchOptions,
  ToneSelection,
  User,
  OptionalUser,
} from '../types';
import { selectedToneStorageKey } from '../constants';
import { EmojiProvider, UploadingEmojiProvider } from '../api/EmojiResource';
import EmojiRepository from '../api/EmojiRepository';
import debug from '../util/logger';

import { MockEmojiResourceConfig, PromiseBuilder } from './support-types';
import { loggedUser } from './story-data';

const emojiFromUpload = (upload: EmojiUpload) => {
  const { shortName, name, dataURL, height, width } = upload;
  return {
    id: uuid(),
    shortName,
    name,
    fallback: shortName,
    type: customType,
    category: customCategory,
    order: -1,
    creatorUserId: loggedUser,
    representation: {
      width,
      height,
      imagePath: dataURL,
    },
    searchable: true,
  };
};

export class MockNonUploadingEmojiResource extends AbstractResource<
  string,
  EmojiSearchResult,
  any,
  undefined,
  SearchOptions
> implements EmojiProvider {
  protected emojiRepository: EmojiRepository;
  protected promiseBuilder: PromiseBuilder<any>;
  protected lastQuery: string = '';
  protected selectedTone: ToneSelection;
  protected optimisticRendering?: boolean;
  protected currentUser?: User;

  recordedSelections: EmojiDescription[] = [];

  constructor(emojiService: EmojiRepository, config?: MockEmojiResourceConfig) {
    super();
    this.currentUser = (config && config.currentUser) || undefined;
    this.emojiRepository = emojiService;
    this.promiseBuilder = result => Promise.resolve(result);
    if (config) {
      if (config.promiseBuilder) {
        this.promiseBuilder = config.promiseBuilder;
      }
      this.optimisticRendering = config.optimisticRendering;
    }

    if (window.localStorage) {
      const storedTone = window.localStorage.getItem(selectedToneStorageKey);
      this.selectedTone = storedTone ? parseInt(storedTone, 10) : undefined;
    }
  }

  getCurrentUser(): OptionalUser {
    return this.currentUser;
  }

  filter(query?: string, options?: SearchOptions) {
    debug('MockNonUploadingEmojiResource.filter', query);
    if (query) {
      this.lastQuery = query;
    } else {
      this.lastQuery = '';
    }

    this.promiseBuilder(
      this.emojiRepository.search(query, options),
      'filter',
    ).then((result: EmojiSearchResult) => {
      this.notifyResult(result);
    });
  }

  findByShortName(shortName: string): Promise<OptionalEmojiDescription> {
    const emoji = this.emojiRepository.findByShortName(shortName);
    debug('MockEmojiResource.findByShortcut', shortName, emoji);
    return this.promiseBuilder(emoji, 'findByShortName');
  }

  findByEmojiId(
    emojiId: EmojiId,
  ): Promise<OptionalEmojiDescription> | OptionalEmojiDescription {
    const { id, shortName } = emojiId;
    if (id) {
      const emoji = this.emojiRepository.findById(id);
      debug('MockEmojiResource.findById', emojiId, emoji);
      return this.promiseBuilder(emoji, 'findByEmojiId');
    }
    debug('MockEmojiResource.findById; not id using shortName', emojiId);
    return this.emojiRepository.findByShortName(shortName);
  }

  findById(id: string): Promise<OptionalEmojiDescription> {
    const emoji = this.emojiRepository.findById(id);
    debug('MockEmojiResource.findById', id, emoji);
    return this.promiseBuilder(emoji, 'findById');
  }

  findInCategory(categoryId: string): Promise<EmojiDescription[]> {
    const emojis = this.emojiRepository.findInCategory(categoryId);
    return this.promiseBuilder(emojis, 'findInCategory');
  }

  getAsciiMap(): Promise<Map<string, EmojiDescription>> {
    return this.promiseBuilder(
      this.emojiRepository.getAsciiMap(),
      'getAsciiMap',
    );
  }

  getFrequentlyUsed(options?: SearchOptions): Promise<EmojiDescription[]> {
    return this.promiseBuilder(
      this.emojiRepository.getFrequentlyUsed(options),
      'getFrequentlyUsed',
    );
  }

  recordSelection?(emoji: EmojiDescription): Promise<any> {
    this.recordedSelections.push(emoji);
    this.emojiRepository.used(emoji);
    return this.promiseBuilder(undefined, 'recordSelection');
  }

  deleteSiteEmoji?(emoji: EmojiDescription): Promise<boolean> {
    this.emojiRepository.delete(emoji);
    return this.promiseBuilder(false, 'deleteSiteEmoji');
  }

  loadMediaEmoji(
    emoji: EmojiDescription,
  ): OptionalEmojiDescription | Promise<OptionalEmojiDescription> {
    return emoji;
  }

  optimisticMediaRendering(emoji: EmojiDescription) {
    return emoji && !!this.optimisticRendering;
  }

  getSelectedTone(): ToneSelection {
    return this.selectedTone;
  }

  setSelectedTone(tone: ToneSelection) {
    this.selectedTone = tone;
    if (window.localStorage) {
      try {
        window.localStorage.setItem(
          selectedToneStorageKey,
          tone ? tone.toString() : '',
        );
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error('failed to store selected emoji skin tone', e);
      }
    }
  }

  calculateDynamicCategories(): Promise<string[]> {
    if (!this.emojiRepository) {
      return Promise.resolve([]);
    }
    return Promise.resolve(this.emojiRepository.getDynamicCategoryList());
  }
}

export interface UploadDetail {
  upload: EmojiUpload;
  emoji: EmojiDescription;
}

export class MockEmojiResource extends MockNonUploadingEmojiResource
  implements UploadingEmojiProvider {
  private uploads: UploadDetail[] = [];
  private uploadSupported: boolean;
  private uploadError?: string;

  constructor(emojiService: EmojiRepository, config?: MockEmojiResourceConfig) {
    super(emojiService, config);
    this.uploadSupported = false;
    if (config) {
      this.uploadSupported = !!config.uploadSupported;
      this.uploadError = config.uploadError;
    }
  }

  isUploadSupported(): Promise<boolean> {
    return this.promiseBuilder(this.uploadSupported, 'isUploadSupported');
  }

  uploadCustomEmoji(upload: EmojiUpload) {
    if (this.uploadError) {
      return Promise.reject(this.uploadError);
    }
    const emoji = emojiFromUpload(upload);
    this.uploads.push({
      upload,
      emoji,
    });
    this.emojiRepository.addUnknownEmoji(emoji);
    this.filter(this.lastQuery);
    return this.promiseBuilder(emoji, 'uploadCustomEmoji');
  }

  getUploads(): UploadDetail[] {
    return this.uploads;
  }

  prepareForUpload() {}

  // Make public for testing
  notifyNotReady() {
    super.notifyNotReady();
  }

  loadMediaEmoji(emoji: EmojiDescription) {
    if (this.promiseBuilder) {
      return this.promiseBuilder(emoji, 'loadMediaEmoji');
    }
    return emoji;
  }
}

class UsageClearEmojiRepository extends EmojiRepository {
  constructor(emojis: EmojiDescription[]) {
    super(emojis);
  }

  clear() {
    this.usageTracker.clear();
  }
}

const isUsageClearEmojiRepository = (
  object: any,
): object is UsageClearEmojiRepository => {
  return 'clear' in object;
};

/**
 * An EmojiResource used in storybooks to allow a user a mechanism for clearing their frequently used emoji.
 */
export class UsageClearEmojiResource extends MockNonUploadingEmojiResource {
  constructor(emojis: EmojiDescription[]) {
    super(new UsageClearEmojiRepository(emojis));
  }

  clearFrequentlyUsed() {
    if (isUsageClearEmojiRepository(this.emojiRepository)) {
      this.emojiRepository.clear();
    }
  }
}

export const mockNonUploadingEmojiResourceFactory = (
  emojiRepository: EmojiRepository,
  config?: MockEmojiResourceConfig,
  promiseBuilder?: PromiseBuilder<MockNonUploadingEmojiResource>,
) => {
  const mockEmojiResource = new MockNonUploadingEmojiResource(
    emojiRepository,
    config,
  );
  if (promiseBuilder) {
    return promiseBuilder(
      mockEmojiResource,
      'mockNonUploadingEmojiResourceFactory',
    );
  }
  return Promise.resolve(mockEmojiResource);
};

export const mockEmojiResourceFactory = (
  emojiRepository: EmojiRepository,
  config?: MockEmojiResourceConfig,
  promiseBuilder?: PromiseBuilder<MockEmojiResource>,
) => {
  const mockEmojiResource = new MockEmojiResource(emojiRepository, config);
  if (promiseBuilder) {
    return promiseBuilder(mockEmojiResource, 'mockEmojiResourceFactory');
  }
  return Promise.resolve(mockEmojiResource);
};

// Wrapper to explicitly return promise as EmojiProvider
export const emojiProviderFactory = (
  emojiRepository: EmojiRepository,
  config?: MockEmojiResourceConfig,
  promiseBuilder?: PromiseBuilder<UploadingEmojiProvider>,
): Promise<UploadingEmojiProvider> => {
  const mockEmojiResource = new MockEmojiResource(emojiRepository, config);
  if (promiseBuilder) {
    return promiseBuilder(mockEmojiResource, 'mockEmojiResourceFactory');
  }
  return Promise.resolve(mockEmojiResource) as Promise<UploadingEmojiProvider>;
};
