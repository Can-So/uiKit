import { EditorCardProvider, CardAppearance } from '@atlaskit/smart-card';
export declare class EditorMobileCardProvider extends EditorCardProvider {
    resolve(url: string, appearance: CardAppearance): Promise<any>;
}
export declare const cardProvider: EditorMobileCardProvider;
