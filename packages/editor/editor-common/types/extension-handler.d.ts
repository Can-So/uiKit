/// <reference types="react" />
import { ADNode } from '../';
export interface ExtensionParams<T> {
    extensionKey: string;
    extensionType: string;
    type?: 'extension' | 'inlineExtension' | 'bodiedExtension';
    parameters?: T;
    content?: Object | string;
}
export declare type ExtensionHandler<T> = (ext: ExtensionParams<T>, doc: Object) => JSX.Element | ADNode[] | null;
export interface ExtensionHandlers {
    [key: string]: ExtensionHandler<any>;
}
