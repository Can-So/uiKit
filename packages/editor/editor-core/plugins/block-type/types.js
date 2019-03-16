// The names of the blocks don't map precisely to schema nodes, because
// of concepts like "paragraph" <-> "Normal text" and "Unknown".
//
// (there are also different blocks for different types of panel, when
// they're really all just a panel node)
//
// Rather than half-match half-not, this plugin introduces its own
// nomenclature for what 'block type' is active.
import { defineMessages } from 'react-intl';
export var messages = defineMessages({
    normal: {
        id: 'fabric.editor.normal',
        defaultMessage: 'Normal text',
        description: 'This is the default text style',
    },
    heading1: {
        id: 'fabric.editor.heading1',
        defaultMessage: 'Heading 1',
        description: 'Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)',
    },
    heading2: {
        id: 'fabric.editor.heading2',
        defaultMessage: 'Heading 2',
        description: 'Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)',
    },
    heading3: {
        id: 'fabric.editor.heading3',
        defaultMessage: 'Heading 3',
        description: 'Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)',
    },
    heading4: {
        id: 'fabric.editor.heading4',
        defaultMessage: 'Heading 4',
        description: 'Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)',
    },
    heading5: {
        id: 'fabric.editor.heading5',
        defaultMessage: 'Heading 5',
        description: 'Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)',
    },
    heading6: {
        id: 'fabric.editor.heading6',
        defaultMessage: 'Heading 6',
        description: 'Used for the title of a section of your document, headings run from 1 (largest size) to 6 (smallest size)',
    },
    blockquote: {
        id: 'fabric.editor.blockquote',
        defaultMessage: 'Quote',
        description: 'Quote some text',
    },
    codeblock: {
        id: 'fabric.editor.codeblock',
        defaultMessage: 'Code snippet',
        description: 'Insert a snippet/segment of code (code block)',
    },
    panel: {
        id: 'fabric.editor.panel',
        defaultMessage: 'Panel',
        description: 'Visually distinguishes your text by adding a background colour (blue, purple, yellow, green, red)',
    },
    notePanel: {
        id: 'fabric.editor.notePanel',
        defaultMessage: 'Note panel',
        description: 'Visually distinguishes your text by adding a note panel',
    },
    successPanel: {
        id: 'fabric.editor.successPanel',
        defaultMessage: 'Success panel',
        description: 'Visually distinguishes your text by adding a success panel',
    },
    warningPanel: {
        id: 'fabric.editor.warningPanel',
        defaultMessage: 'Warning panel',
        description: 'Visually distinguishes your text by adding a warning panel',
    },
    errorPanel: {
        id: 'fabric.editor.errorPanel',
        defaultMessage: 'Error panel',
        description: 'Visually distinguishes your text by adding a error panel',
    },
    other: {
        id: 'fabric.editor.other',
        defaultMessage: 'Others...',
        description: 'Other text formatting',
    },
});
export var NORMAL_TEXT = {
    name: 'normal',
    title: messages.normal,
    nodeName: 'paragraph',
    tagName: 'p',
};
export var HEADING_1 = {
    name: 'heading1',
    title: messages.heading1,
    nodeName: 'heading',
    tagName: 'h1',
    level: 1,
};
export var HEADING_2 = {
    name: 'heading2',
    title: messages.heading2,
    nodeName: 'heading',
    tagName: 'h2',
    level: 2,
};
export var HEADING_3 = {
    name: 'heading3',
    title: messages.heading3,
    nodeName: 'heading',
    tagName: 'h3',
    level: 3,
};
export var HEADING_4 = {
    name: 'heading4',
    title: messages.heading4,
    nodeName: 'heading',
    tagName: 'h4',
    level: 4,
};
export var HEADING_5 = {
    name: 'heading5',
    title: messages.heading5,
    nodeName: 'heading',
    tagName: 'h5',
    level: 5,
};
export var HEADING_6 = {
    name: 'heading6',
    title: messages.heading6,
    nodeName: 'heading',
    tagName: 'h6',
    level: 6,
};
export var BLOCK_QUOTE = {
    name: 'blockquote',
    title: messages.blockquote,
    nodeName: 'blockquote',
};
export var CODE_BLOCK = {
    name: 'codeblock',
    title: messages.codeblock,
    nodeName: 'codeBlock',
};
export var PANEL = {
    name: 'panel',
    title: messages.panel,
    nodeName: 'panel',
};
export var OTHER = {
    name: 'other',
    title: messages.other,
    nodeName: '',
};
export var TEXT_BLOCK_TYPES = [
    NORMAL_TEXT,
    HEADING_1,
    HEADING_2,
    HEADING_3,
    HEADING_4,
    HEADING_5,
    HEADING_6,
];
export var WRAPPER_BLOCK_TYPES = [BLOCK_QUOTE, CODE_BLOCK, PANEL];
export var ALL_BLOCK_TYPES = TEXT_BLOCK_TYPES.concat(WRAPPER_BLOCK_TYPES);
export var HEADINGS_BY_LEVEL = TEXT_BLOCK_TYPES.reduce(function (acc, blockType) {
    if (blockType.level && blockType.nodeName === 'heading') {
        acc[blockType.level] = blockType;
    }
    return acc;
}, {});
export var HEADINGS_BY_NAME = TEXT_BLOCK_TYPES.reduce(function (acc, blockType) {
    if (blockType.level && blockType.nodeName === 'heading') {
        acc[blockType.name] = blockType;
    }
    return acc;
}, {});
//# sourceMappingURL=types.js.map