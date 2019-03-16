import { Transaction, EditorState } from 'prosemirror-state';
import { CardAppearance } from '../types';
import { Command } from '../../../types';
export declare const replaceQueuedUrlWithCard: (url: string, cardData: any) => Command;
export declare const queueCardsFromChangedTr: (state: EditorState<any>, tr: Transaction<any>, normalizeLinkText?: boolean) => Transaction<any>;
export declare const changeSelectedCardToLink: Command;
export declare const setSelectedCardAppearance: (appearance: CardAppearance) => Command;
