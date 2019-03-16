import { Node as PmNode } from 'prosemirror-model';
import { ExtensionLayout } from '@atlaskit/adf-schema';
export declare type ExtensionType = 'extension' | 'bodiedExtension' | 'inlineExtension';
export interface MacroAttributes {
    type: ExtensionType;
    attrs: {
        extensionKey: string;
        extensionType: string;
        parameters?: {
            macroParams?: object;
            macroMetadata?: object;
        };
        layout?: ExtensionLayout;
        text?: string;
    };
    content?: any;
}
export interface MacroProvider {
    config: {};
    /**
     * If "macro" param is passed in, it will open macro browser for editing the macro
     */
    openMacroBrowser(macroNode?: PmNode): Promise<MacroAttributes>;
    autoConvert(link: String): MacroAttributes | null;
}
