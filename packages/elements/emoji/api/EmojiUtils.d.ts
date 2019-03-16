import { RequestServiceOptions, ServiceConfig } from '@atlaskit/util-service-support';
import { AltRepresentations, EmojiDescription, EmojiDescriptionWithVariations, EmojiMeta, EmojiRepresentation, EmojiResponse, EmojiServiceDescriptionWithVariations, EmojiServiceRepresentation, EmojiServiceResponse } from '../types';
export interface EmojiLoaderConfig extends ServiceConfig {
    getRatio?: () => number;
}
export declare const emojiRequest: (provider: EmojiLoaderConfig, options?: RequestServiceOptions | undefined) => Promise<EmojiServiceResponse>;
export declare const getPixelRatio: () => number;
export declare const getAltRepresentation: (reps: AltRepresentations) => EmojiServiceRepresentation;
export declare const isMediaApiUrl: (url: string, meta?: EmojiMeta | undefined) => boolean;
export declare const denormaliseServiceRepresentation: (representation: EmojiServiceRepresentation, meta?: EmojiMeta | undefined) => EmojiRepresentation;
export declare const denormaliseServiceAltRepresentation: (altReps?: AltRepresentations | undefined, meta?: EmojiMeta | undefined) => EmojiRepresentation;
export declare const denormaliseSkinEmoji: (emoji: EmojiServiceDescriptionWithVariations, meta?: EmojiMeta | undefined) => EmojiDescriptionWithVariations[];
/**
 * Denormalised an emoji response (emojis + sprite references) into an array of
 * emoji with local sprite definitions.
 */
export declare const denormaliseEmojiServiceResponse: (emojiData: EmojiServiceResponse) => EmojiResponse;
export declare const shouldUseAltRepresentation: (emoji: EmojiDescription, fitToHeight?: number | undefined) => boolean;
