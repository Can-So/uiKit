import { EditorCardProvider, CardAppearance } from '@findable/smart-card';
export declare class EditorMobileCardProvider extends EditorCardProvider {
    resolve(url: string, appearance: CardAppearance): Promise<any>;
}
export declare const cardProvider: EditorMobileCardProvider;
