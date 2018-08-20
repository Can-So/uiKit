import { utils } from '@atlaskit/util-service-support';
import { EventEmitter2 } from 'eventemitter2';
import { getVersion, sendableSteps } from 'prosemirror-collab';
import {
  Config,
  CollabEvent,
  PubSubClient,
  DocumentResponse,
  StepResponse,
} from './types';
import { logger } from './';

export interface RequestOptions {
  method: 'GET' | 'POST';
  body?: string;
  headers?: any;
}

export class Channel {
  private eventEmitter: EventEmitter2 = new EventEmitter2();
  private pubSubClient: PubSubClient;
  private config: Config;
  private isSending: boolean;
  private debounced?: number;

  constructor(config: Config, pubSubClient: PubSubClient) {
    this.config = config;
    this.pubSubClient = pubSubClient;
  }

  /**
   * Get initial document from service
   */
  async getDocument(): Promise<DocumentResponse> {
    try {
      const { doc, version } = await utils.requestService<DocumentResponse>(
        this.config,
        {
          path: `document/${this.config.docId}`,
        },
      );

      return {
        doc,
        version,
      };
    } catch (err) {
      logger(
        `Collab-Edit: Document "${
          this.config.docId
        }" does not exist. Creating one locally.`,
      );
      return {
        doc: {},
        version: 1,
      };
    }
  }

  /**
   * Connect to pubsub to start receiving events
   */
  async connect() {
    const { docId } = this.config;
    const { doc, version } = await this.getDocument();

    this.pubSubClient.on('CONNECT', () => {
      logger('Connected to FPS-service');
    });

    this.pubSubClient.join([`ari:cloud::fabric:collab-service/${docId}`]);
    this.pubSubClient.on(
      'avi:pf-collab-service:steps:created',
      (event: string, payload: any) => {
        logger('Received FPS-payload', { payload });
        this.emit('data', payload);
      },
    );

    this.eventEmitter.emit('connected', {
      doc,
      version,
    });
  }

  private debounce(getState: any) {
    logger(`Debouncing steps`);

    if (this.debounced) {
      clearTimeout(this.debounced);
    }

    this.debounced = setTimeout(() => {
      logger(`Sending debounced`);
      this.sendSteps(getState(), getState);
    }, 250);
  }

  /**
   * Send steps to service
   */
  async sendSteps(state: any, getState: () => any) {
    if (this.isSending) {
      this.debounce(getState);
      return;
    }

    const version = getVersion(state);

    // Don't send any steps before we're ready.
    if (typeof version === undefined) {
      return;
    }

    const steps = (sendableSteps(state).steps || []).map(step => step.toJSON());

    if (steps.length === 0) {
      logger(`No steps to send. Aborting.`);
      return;
    }

    this.isSending = true;

    try {
      const response = await utils.requestService<StepResponse>(this.config, {
        path: `document/${this.config.docId}/steps`,
        requestInit: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            version,
            steps,
          }),
        },
      });

      this.isSending = false;
      logger(`Steps sent and accepted by service.`);
      this.emit('data', response);
    } catch (err) {
      this.isSending = false;
      logger(`Error sending steps: "${err}"`);
    }
  }

  /**
   * Get steps from version x to latest
   */
  async getSteps(version: number) {
    try {
      const response = await utils.requestService<DocumentResponse>(
        this.config,
        {
          path: `document/${this.config.docId}/steps`,
          queryParams: {
            version,
          },
        },
      );

      this.emit('data', response);
    } catch (err) {
      logger(`Unable to get latest steps: ${err}`);
    }
  }

  /**
   * Subscribe to events emitted by this channel
   */
  on(evt: CollabEvent, handler: (...args) => void) {
    this.eventEmitter.on(evt, handler);
    return this;
  }

  /**
   * Unsubscribe from events emitted by this channel
   */
  off(evt: CollabEvent, handler: (...args) => void) {
    this.eventEmitter.off(evt, handler);
    return this;
  }

  /**
   * Emit events to subscribers
   */
  private emit(evt: CollabEvent, data: any) {
    this.eventEmitter.emit(evt, data);
    return this;
  }
}
