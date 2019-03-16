/// <reference types="react" />
import { ConfluenceObjectResult } from '../model/Result';
export interface ExtensionMatcher {
    regexp: RegExp;
    avatar: any;
}
export declare const getAvatarForConfluenceObjectResult: (result: ConfluenceObjectResult) => JSX.Element;
export declare const getMediaTypeAvatarForResult: (result: ConfluenceObjectResult) => JSX.Element;
