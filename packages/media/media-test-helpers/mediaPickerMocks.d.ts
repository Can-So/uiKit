/// <reference types="jest" />
/// <reference types="react" />
import { State } from '@findable/media-picker/src/popup/domain';
import { Store } from 'react-redux';
export declare const mockState: State;
export declare const mockStore: (state?: Partial<State> | undefined) => {
    dispatch: jest.Mock<{}>;
    getState: () => State;
    subscribe: jest.Mock<{}>;
    replaceReducer: jest.Mock<{}>;
};
export declare const mockChannel: () => {
    listen: jest.Mock<{}>;
    send: jest.Mock<{}>;
    ready: jest.Mock<{}>;
    destroy: jest.Mock<{}>;
};
export declare const mockProvider: jest.Mock<{
    observable: () => any;
}>;
export declare const mockAuthProvider: jest.Mock<{}>;
export declare const mockFetcher: () => {
    fetchCloudAccountFolder: jest.Mock<{}>;
    pollFile: jest.Mock<{}>;
    getPreview: jest.Mock<{}>;
    getImage: jest.Mock<{}>;
    getServiceList: jest.Mock<{}>;
    getRecentFiles: jest.Mock<{}>;
    unlinkCloudAccount: jest.Mock<{}>;
    fetchCloudAccountFile: jest.Mock<{}>;
    copyFile: jest.Mock<{}>;
    fetchTrendingGifs: jest.Mock<{}>;
    fetchGifsRelevantToSearch: jest.Mock<{}>;
};
export declare const mockIsWebGLNotAvailable: () => void;
export declare const mockWsConnectionHolder: () => {
    openConnection: jest.Mock<{}>;
    send: jest.Mock<{}>;
};
export declare const mockEventEmiter: () => {
    once: jest.Mock<{}>;
    on: jest.Mock<{}>;
    onAny: jest.Mock<{}>;
    addListener: jest.Mock<{}>;
    off: jest.Mock<{}>;
    removeListener: jest.Mock<{}>;
    removeAllListeners: jest.Mock<{}>;
    emit: jest.Mock<{}>;
};
export declare const mockPopupUploadEventEmitter: () => {
    emitReady: jest.Mock<{}>;
    emitClosed: jest.Mock<{}>;
    emitUploadsStart: jest.Mock<{}>;
    emitUploadProgress: jest.Mock<{}>;
    emitUploadPreviewUpdate: jest.Mock<{}>;
    emitUploadProcessing: jest.Mock<{}>;
    emitUploadEnd: jest.Mock<{}>;
    emitUploadError: jest.Mock<{}>;
};
export interface PropsWithStore {
    store?: Store<any>;
}
/**
 * Connected (react-redux) components allow to provide "store" as prop directly (without specifying
 * store Provider wrapper). But current type definition doesn't allow for that.
 * This function takes React Component class and return one identical, but with additional store prop)
 */
export declare function getComponentClassWithStore<P>(componentClass: React.ComponentClass<P>): React.ComponentClass<P & PropsWithStore>;
