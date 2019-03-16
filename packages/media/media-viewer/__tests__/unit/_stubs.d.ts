/// <reference types="jest" />
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Context, ContextConfig, FileItem, Auth, FileState } from '@findable/media-core';
export declare class Stubs {
    static mediaViewer(overrides: any): {
        on: () => void;
        off: () => void;
        trigger: (event: string) => boolean;
        isOpen: jest.Mock<{}>;
        open: any;
        setFiles: any;
        getCurrent: jest.Mock<{}>;
        isShowingLastFile: jest.Mock<{}>;
    };
    static mediaViewerConstructor(overrides?: any): jest.Mock<{
        on: () => void;
        off: () => void;
        trigger: (event: string) => boolean;
        isOpen: jest.Mock<{}>;
        open: any;
        setFiles: any;
        getCurrent: jest.Mock<{}>;
        isShowingLastFile: jest.Mock<{}>;
    }>;
    static mediaItemProvider(subject?: Subject<FileItem>): {
        observable: jest.Mock<Subject<FileItem>>;
    };
    static context(config: ContextConfig, getFileState?: () => Observable<FileState>): Partial<Context>;
}
export interface CreateContextOptions {
    authPromise?: Promise<Auth>;
    getFileState?: () => Observable<FileState>;
    config?: ContextConfig;
}
export declare const createContext: (options?: CreateContextOptions | undefined) => Context;
