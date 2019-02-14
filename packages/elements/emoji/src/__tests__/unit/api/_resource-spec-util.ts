import { ServiceConfig } from '@atlaskit/util-service-support';
import { EmojiResource } from '../../../api/EmojiResource';
import { EmojiResponse } from '../../../types';

/**
 * #initSiteEmojiResource throws error
 */
export class ErrorEmojiResource extends EmojiResource {
  getActiveLoaders() {
    return this.activeLoaders;
  }

  initSiteEmojiResource(
    emojiResponse: EmojiResponse,
    provider: ServiceConfig,
  ): Promise<void> {
    throw new Error('Cannot initSiteEmojiResource');
  }
}
