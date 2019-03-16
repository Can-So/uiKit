/// <reference types="react" />
import { EditorPlugin } from '../../types';
import { MediaState, MediaPluginState } from './pm-plugins/main';
import { CustomMediaPicker, MediaProvider } from './types';
export { MediaState, MediaProvider, CustomMediaPicker };
export interface MediaOptions {
    provider?: Promise<MediaProvider>;
    allowMediaSingle?: boolean | MediaSingleOptions;
    allowMediaGroup?: boolean;
    customDropzoneContainer?: HTMLElement;
    customMediaPicker?: CustomMediaPicker;
    allowResizing?: boolean;
    allowAnnotation?: boolean;
}
export interface MediaSingleOptions {
    disableLayout?: boolean;
}
export declare const renderSmartMediaEditor: (mediaState: MediaPluginState) => JSX.Element | null;
declare const mediaPlugin: (options?: MediaOptions | undefined, appearance?: "comment" | "full-page" | "chromeless" | "mobile" | undefined) => EditorPlugin;
export default mediaPlugin;
