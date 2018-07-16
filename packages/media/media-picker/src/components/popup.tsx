import { Context } from '@atlaskit/media-core';
import { Store } from 'redux';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import App from '../popup/components/app';
import { cancelUpload } from '../popup/actions/cancelUpload';
import { showPopup } from '../popup/actions/showPopup';
import { resetView } from '../popup/actions/resetView';
import { setTenant } from '../popup/actions/setTenant';
import { getFilesInRecents } from '../popup/actions/getFilesInRecents';
import { getConnectedRemoteAccounts } from '../popup/actions/getConnectedRemoteAccounts';
import { State } from '../popup/domain';
import { hidePopup } from '../popup/actions/hidePopup';
import { createStore } from '../store';
import { UploadComponent, UploadEventEmitter } from './component';

import { defaultUploadParams } from '../domain/uploadParams';
import { UploadParams } from '../domain/config';
import { UploadEventPayloadMap } from '../domain/uploadEvent';

export interface PopupConfig {
  readonly container?: HTMLElement;
  readonly uploadParams: UploadParams;
  readonly useNewUploadService?: boolean;
}

export const USER_RECENTS_COLLECTION = 'recents';

export interface PopupConstructor {
  new (context: Context, config: PopupConfig): Popup;
}

export type PopupUploadEventPayloadMap = UploadEventPayloadMap & {
  readonly closed: undefined;
};

export interface PopupUploadEventEmitter extends UploadEventEmitter {
  emitClosed(): void;
}

export class Popup extends UploadComponent<PopupUploadEventPayloadMap>
  implements PopupUploadEventEmitter {
  private readonly container: HTMLElement;
  private readonly store: Store<State>;
  private uploadParams: UploadParams;

  constructor(
    readonly context: Context,
    {
      container = document.body,
      uploadParams,
      useNewUploadService,
    }: PopupConfig,
  ) {
    super();

    this.store = createStore(this, context, useNewUploadService);

    this.uploadParams = {
      ...defaultUploadParams,
      ...uploadParams,
    };

    const popup = this.renderPopup();

    this.container = popup;
    container.appendChild(popup);
  }

  public show(): Promise<void> {
    return this.context.config
      .authProvider({
        collectionName: this.uploadParams.collection,
      })
      .then(auth => {
        this.store.dispatch(
          setTenant({
            auth,
            uploadParams: this.uploadParams,
          }),
        );

        this.store.dispatch(resetView());
        this.store.dispatch(getFilesInRecents());
        // TODO [MSW-466]: Fetch remote accounts only when needed
        this.store.dispatch(getConnectedRemoteAccounts());

        this.store.dispatch(showPopup());
      });
  }

  public cancel(uniqueIdentifier?: string): void {
    if (uniqueIdentifier === undefined) {
      // TODO Make popup able to accept undefined and cancel all the inflight uploads (MSW-691)
      throw new Error(
        "Popup doesn't support canceling without a unique identifier",
      );
    }
    this.store.dispatch(cancelUpload({ tenantUploadId: uniqueIdentifier }));
  }

  public teardown(): void {
    unmountComponentAtNode(this.container);
  }

  public hide(): void {
    this.store.dispatch(hidePopup());
  }

  public setUploadParams(uploadParams: UploadParams): void {
    this.uploadParams = {
      ...defaultUploadParams,
      ...uploadParams,
    };
  }

  public emitClosed(): void {
    this.emit('closed', undefined);
  }

  private renderPopup(): HTMLElement {
    const container = document.createElement('div');
    render(<App store={this.store} />, container);
    return container;
  }
}
