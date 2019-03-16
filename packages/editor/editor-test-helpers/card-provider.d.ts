import { EditorCardProvider } from '@atlaskit/smart-card';
declare type CardAppearance = 'inline' | 'block';
export declare class EditorTestCardProvider extends EditorCardProvider {
    testUrlMatch: RegExp;
    resolve(url: string, appearance: CardAppearance): Promise<any>;
}
export declare const cardProvider: EditorTestCardProvider;
export {};
