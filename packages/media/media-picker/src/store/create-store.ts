import { Context } from '@atlaskit/media-core';
import { applyMiddleware, createStore, Store, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { CloudService } from '../popup/services/cloud-service';
import { MediaApiFetcher } from '../popup/tools/fetcher/fetcher';
import { WsProvider } from '../popup/tools/websocket/wsProvider';
import reducers from '../popup/reducers/reducers';
import { State } from '../popup/domain';
import defaultState from '../popup/default_state';
import appConfig from '../config';
import changeAccount from '../popup/middleware/changeAccount';
import { changeService } from '../popup/middleware/changeService';
import { fetchNextCloudFilesPageMiddleware } from '../popup/middleware/fetchNextCloudFilesPage';
import { changeCloudAccountFolderMiddleware } from '../popup/middleware/changeCloudAccountFolder';
import startAppMiddleware from '../popup/middleware/startApp';
import { getConnectedRemoteAccounts } from '../popup/middleware/getConnectedRemoteAccounts';
import { getFilesInRecents } from '../popup/middleware/getFilesInRecents';
import { importFilesMiddleware } from '../popup/middleware/importFiles';
import { startCloudAccountOAuthFlow } from '../popup/middleware/startAuth';
import unlinkCloudAccount from '../popup/middleware/unlinkCloudAccount';
import { proxyUploadEvents } from '../popup/middleware/proxyUploadEvents';
import cancelUpload from '../popup/middleware/cancelUpload';
import { editRemoteImageMiddleware } from '../popup/middleware/editRemoteImage';
import finalizeUploadMiddleware from '../popup/middleware/finalizeUpload';
import getPreviewMiddleware from '../popup/middleware/getPreview';
import { handleCloudFetchingEvent } from '../popup/middleware/handleCloudFetchingEvent';
import searchGiphy from '../popup/middleware/searchGiphy';
import hidePopupMiddleware from '../popup/middleware/hidePopup';
import sendUploadEventMiddleware from '../popup/middleware/sendUploadEvent';
import { PopupConfig, PopupUploadEventEmitter } from '../components/popup';
import analyticsProcessing from '../popup/middleware/analyticsProcessing';

export default (
  eventEmitter: PopupUploadEventEmitter,
  tenantContext: Context,
  userContext: Context,
  config: Partial<PopupConfig>,
): Store<State> => {
  const userAuthProvider = userContext.config.authProvider;

  const redirectUrl = appConfig.html.redirectUrl;
  const fetcher = new MediaApiFetcher();
  const wsProvider = new WsProvider();
  const cloudService = new CloudService(userAuthProvider);
  const partialState: State = {
    ...defaultState,
    redirectUrl,
    tenantContext: tenantContext,
    userContext: userContext,
    config,
  };
  return createStore(
    reducers,
    partialState,
    composeWithDevTools(
      applyMiddleware(
        analyticsProcessing as Middleware,
        startAppMiddleware() as Middleware,
        getFilesInRecents() as Middleware,
        changeService as Middleware,
        changeAccount as Middleware,
        changeCloudAccountFolderMiddleware(fetcher) as Middleware,
        fetchNextCloudFilesPageMiddleware(fetcher) as Middleware,
        startCloudAccountOAuthFlow(fetcher, cloudService) as Middleware,
        unlinkCloudAccount(fetcher) as Middleware,
        getConnectedRemoteAccounts(fetcher) as Middleware,
        cancelUpload as Middleware,
        importFilesMiddleware(eventEmitter, wsProvider),
        editRemoteImageMiddleware(fetcher) as Middleware,
        getPreviewMiddleware(fetcher),
        finalizeUploadMiddleware(fetcher),
        proxyUploadEvents as Middleware,
        handleCloudFetchingEvent as Middleware,
        searchGiphy(fetcher) as Middleware,
        hidePopupMiddleware(eventEmitter) as Middleware,
        sendUploadEventMiddleware(eventEmitter),
      ),
    ),
  );
};
