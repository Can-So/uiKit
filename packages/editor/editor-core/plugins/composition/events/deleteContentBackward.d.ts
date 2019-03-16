import { EditorView } from 'prosemirror-view';
import { InputEvent } from '../index';
/**
 * This should be called on a `beforeinput` event.
 *
 * Android composition events aren't handled well by Prosemirror
 * We've added a couple of beforeinput hooks to help PM out when trying to delete
 * certain nodes. We can remove these when PM has better composition support.
 * @see https://github.com/ProseMirror/prosemirror/issues/543
 */
export declare const patchDeleteContentBackward: (view: EditorView<any>, event: InputEvent) => boolean;
