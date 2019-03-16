import { browser } from '@findable/editor-common';
export var toggleBold = makeKeyMapWithCommon('Bold', 'Mod-b');
export var toggleItalic = makeKeyMapWithCommon('Italic', 'Mod-i');
export var toggleUnderline = makeKeyMapWithCommon('Underline', 'Mod-u');
export var toggleStrikethrough = makeKeyMapWithCommon('Strikethrough', 'Mod-Shift-s');
export var toggleCode = makeKeyMapWithCommon('Code', 'Mod-Shift-m');
export var pastePlainText = makeKeyMapWithCommon('Paste Plain Text', 'Mod-Shift-v');
export var clearFormatting = makeKeyMapWithCommon('Clear formatting', 'Mod-\\');
export var setNormalText = makeKeymap('Normal text', '', 'Cmd-Alt-0');
export var toggleHeading1 = makeKeymap('Heading 1', '', 'Cmd-Alt-1');
export var toggleHeading2 = makeKeymap('Heading 2', '', 'Cmd-Alt-2');
export var toggleHeading3 = makeKeymap('Heading 3', '', 'Cmd-Alt-3');
export var toggleHeading4 = makeKeymap('Heading 4', '', 'Cmd-Alt-4');
export var toggleHeading5 = makeKeymap('Heading 5', '', 'Cmd-Alt-5');
export var toggleOrderedList = makeKeymap('Numbered list', '', 'Cmd-Shift-7');
export var toggleBulletList = makeKeymap('Bullet list', '', 'Cmd-Shift-8');
export var toggleBlockQuote = makeKeymap('Quote', '', 'Cmd-Alt-9');
export var insertNewLine = makeKeyMapWithCommon('Insert new line', 'Shift-Enter');
export var shiftBackspace = makeKeyMapWithCommon('Shift Backspace', 'Shift-Backspace');
export var splitCodeBlock = makeKeyMapWithCommon('Split code block', 'Enter');
export var splitListItem = makeKeyMapWithCommon('Split list item', 'Enter');
export var insertRule = makeKeyMapWithCommon('Insert horizontal rule', 'Mod-Shift--');
export var undo = makeKeyMapWithCommon('Undo', 'Mod-z');
export var moveUp = makeKeyMapWithCommon('Move up', 'ArrowUp');
export var moveDown = makeKeyMapWithCommon('Move down', 'ArrowDown');
export var moveLeft = makeKeyMapWithCommon('Move left', 'ArrowLeft');
export var moveRight = makeKeyMapWithCommon('Move right', 'ArrowRight');
export var indentList = makeKeyMapWithCommon('Indent List', 'Tab');
export var outdentList = makeKeyMapWithCommon('Outdent List', 'Shift-Tab');
export var redo = makeKeymap('Redo', 'Ctrl-y', 'Cmd-Shift-z');
export var redoBarred = makeKeymap('Redo Barred', 'Ctrl-Shift-z', 'Cmd-y');
export var openHelp = makeKeyMapWithCommon('Open Help', 'Mod-/');
export var addLink = makeKeyMapWithCommon('Link', 'Mod-k');
export var submit = makeKeyMapWithCommon('Submit Content', 'Mod-Enter');
export var enter = makeKeyMapWithCommon('Enter', 'Enter');
export var tab = makeKeyMapWithCommon('Tab', 'Tab');
export var indent = makeKeyMapWithCommon('Indent', 'Tab');
export var outdent = makeKeyMapWithCommon('Outdent', 'Shift-Tab');
export var backspace = makeKeyMapWithCommon('Backspace', 'Backspace');
export var deleteKey = makeKeyMapWithCommon('Delete', 'Delete');
export var space = makeKeyMapWithCommon('Space', 'Space');
export var escape = makeKeyMapWithCommon('Escape', 'Escape');
export var nextCell = makeKeyMapWithCommon('Next cell', 'Tab');
export var previousCell = makeKeyMapWithCommon('Previous cell', 'Shift-Tab');
export var toggleTable = makeKeyMapWithCommon('Table', 'Shift-Alt-t');
export var addRowBefore = makeKeyMapWithCommon('Add Row Above', 'Ctrl-Alt-ArrowUp');
export var addRowAfter = makeKeyMapWithCommon('Add Row Below', 'Ctrl-Alt-ArrowDown');
export var addColumnAfter = makeKeyMapWithCommon('Add Column After', 'Ctrl-Alt-ArrowRight');
export var addColumnBefore = makeKeyMapWithCommon('Add Column Before', 'Ctrl-Alt-ArrowLeft');
export var cut = makeKeyMapWithCommon('Cut', 'Mod-x');
export var copy = makeKeyMapWithCommon('Copy', 'Mod-c');
export var paste = makeKeyMapWithCommon('Paste', 'Mod-v');
export var altPaste = makeKeyMapWithCommon('Paste', 'Mod-Shift-v');
var arrowKeysMap = {
    // for reference: https://wincent.com/wiki/Unicode_representations_of_modifier_keys
    ARROWLEFT: '\u2190',
    ARROWRIGHT: '\u2192',
    ARROWUP: '\u2191',
    ARROWDOWN: '\u2193',
};
export function tooltip(keymap, description) {
    if (keymap) {
        var shortcut = void 0;
        if (browser.mac) {
            // for reference: https://wincent.com/wiki/Unicode_representations_of_modifier_keys
            shortcut = keymap.mac
                .replace(/Cmd/i, '\u2318')
                .replace(/Shift/i, '\u21E7')
                .replace(/Ctrl/i, '\u2303')
                .replace(/Alt/i, '\u2325');
        }
        else {
            shortcut = keymap.windows;
        }
        var keys = shortcut.split('-');
        var lastKey = keys[keys.length - 1].toUpperCase();
        keys[keys.length - 1] = arrowKeysMap[lastKey] || lastKey;
        shortcut = keys.join(browser.mac ? '' : '+');
        return description ? description + " " + shortcut : shortcut;
    }
}
export function findKeymapByDescription(description) {
    var matches = ALL.filter(function (keymap) { return keymap.description.toUpperCase() === description.toUpperCase(); });
    return matches[0];
}
export function findShortcutByDescription(description) {
    var keymap = findKeymapByDescription(description);
    if (keymap) {
        return findShortcutByKeymap(keymap);
    }
}
export function findShortcutByKeymap(keymap) {
    if (browser.mac) {
        return keymap.mac;
    }
    return keymap.windows;
}
var ALL = [
    toggleOrderedList,
    toggleBulletList,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    toggleStrikethrough,
    toggleCode,
    setNormalText,
    toggleHeading1,
    toggleHeading2,
    toggleHeading3,
    toggleHeading4,
    toggleHeading5,
    toggleBlockQuote,
    insertNewLine,
    insertRule,
    splitCodeBlock,
    splitListItem,
    redo,
    undo,
];
function makeKeymap(description, windows, mac, common) {
    return {
        description: description,
        windows: windows,
        mac: mac,
        common: common,
    };
}
function makeKeyMapWithCommon(description, common) {
    var windows = common.replace(/Mod/i, 'Ctrl');
    var mac = common.replace(/Mod/i, 'Cmd');
    return makeKeymap(description, windows, mac, common);
}
export function bindKeymapWithCommand(shortcut, cmd, keymap) {
    var oldCmd = keymap[shortcut];
    var newCmd = cmd;
    if (keymap[shortcut]) {
        newCmd = function (state, dispatch, editorView) {
            return oldCmd(state, dispatch) || cmd(state, dispatch, editorView);
        };
    }
    keymap[shortcut] = newCmd;
}
export function findKeyMapForBrowser(kayMap) {
    if (kayMap) {
        if (browser.mac) {
            return kayMap.mac;
        }
        return kayMap.windows;
    }
}
export var LEFT = 37;
export var RIGHT = 39;
export var UP = 38;
export var DOWN = 40;
//# sourceMappingURL=index.js.map