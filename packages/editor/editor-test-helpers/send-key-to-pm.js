import { browser } from '@findable/editor-common';
import keyCodes from './key-codes';
/**
 * Sends a key to ProseMirror content area, simulating user key press.
 * Accepts key descriptions similar to Keymap, i.e. 'Shift-Ctrl-L'
 */
export default function sendKeyToPm(editorView, keys) {
    var parts = keys.split(/-(?!'?$)/);
    var modKey = parts.indexOf('Mod') !== -1;
    var cmdKey = parts.indexOf('Cmd') !== -1;
    var ctrlKey = parts.indexOf('Ctrl') !== -1;
    var shiftKey = parts.indexOf('Shift') !== -1;
    var altKey = parts.indexOf('Alt') !== -1;
    var key = parts[parts.length - 1];
    // all of the browsers are using the same keyCode for alphabetical keys
    // and it's the uppercased character code in real world
    var code = keyCodes[key] ? keyCodes[key] : key.toUpperCase().charCodeAt(0);
    var event = new CustomEvent('keydown', {
        bubbles: true,
        cancelable: true,
    });
    event.key = key.replace(/Space/g, ' ');
    event.shiftKey = shiftKey;
    event.altKey = altKey;
    event.ctrlKey = ctrlKey || (!browser.mac && modKey);
    event.metaKey = cmdKey || (browser.mac && modKey);
    event.keyCode = code;
    event.which = code;
    event.view = window;
    // try {
    editorView.dispatchEvent(event);
    // } catch (error) {
    // throw new Error(error.message || error.name);
    // }
}
//# sourceMappingURL=send-key-to-pm.js.map