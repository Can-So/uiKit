/**
 * Please note that this is not a complete implemention of composition events
 * but merely a workaround, until ProseMirror has some proper support for these events.
 *
 * Ideally this plugin should be deleted once Composition events are handled correctly.
 *
 * @see ED-5924
 * @see https://www.w3.org/TR/input-events-2/
 */
import { Plugin } from 'prosemirror-state';
import { PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
export declare const pluginKey: PluginKey<any>;
/**
 * FIXME: TS doesn't have a type for InputEvent yet since its not widely supported.
 * @see https://www.w3.org/TR/input-events-2/
 */
export interface InputEvent extends UIEvent {
    isComposing: boolean;
    inputType: 'deleteContentBackward' | 'insertText' | 'insertCompositionText';
    data: string | null;
}
export declare const createPlugin: () => Plugin<any>;
declare const compositionPlugin: EditorPlugin;
export default compositionPlugin;
