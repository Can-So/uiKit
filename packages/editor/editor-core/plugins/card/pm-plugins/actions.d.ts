import { CardProvider, CardPluginAction, Request } from '../types';
import { Transaction } from 'prosemirror-state';
export declare const cardAction: (tr: Transaction<any>, action: CardPluginAction) => Transaction<any>;
export declare const resolveCard: (url: string) => (tr: Transaction<any>) => Transaction<any>;
export declare const queueCards: (requests: Request[]) => (tr: Transaction<any>) => Transaction<any>;
export declare const setProvider: (cardProvider: CardProvider | null) => (tr: Transaction<any>) => Transaction<any>;
