import { ServiceConfig } from '@atlaskit/util-service-support';
import { Transaction, EditorState } from 'prosemirror-state';
import { Step } from 'prosemirror-transform';
import {
  InitData,
  ConnectionData,
  RemoteData,
  TelepointerData,
  PresenceData,
  Participant,
} from '../types';

export { TelepointerData, Participant };

export type CollabEvent =
  | 'init'
  | 'connected'
  | 'data'
  | 'telepointer'
  | 'presence'
  | 'error';

export interface CollabEventData {
  init: InitData;
  connected: ConnectionData;
  data: RemoteData;
  telepointer: TelepointerData;
  presensense: PresenceData;
  error: any;
}

export interface CollabEditProvider {
  initialize(getState: () => any, createStep: (json: object) => Step): this;
  send(tr: Transaction, oldState: EditorState, newState: EditorState): void;
  on(evt: CollabEvent, handler: (...args) => void): this;
  sendMessage<T extends keyof CollabEventData>(
    data: { type: T } & CollabEventData[T],
  );
}

export interface DocumentResponse {
  version: number;
  doc: any;
}

export interface StepResponse {
  version: number;
  steps: any[];
}

export interface Config extends ServiceConfig {
  docId: string;
  userId: string;
}

/**
 * Same as PubSub client types (don't want a direct dep though)
 */

export type ARI = string;
export type AVI = string;

export interface PubSubOnEvent<T = any> {
  (event: string, data: T): void;
}

export interface PubSubClient {
  on(eventAvi: string, listener: PubSubOnEvent): PubSubClient;

  off(eventAvi: string, listener: PubSubOnEvent): PubSubClient;

  join(aris: ARI[]): Promise<PubSubClient>;

  leave(aris: ARI[]): Promise<PubSubClient>;
}

export enum PubSubSpecialEventType {
  ERROR = 'ERROR',
  CONNECTED = 'CONNECTED',
  RECONNECT = 'RECONNECT',
}
