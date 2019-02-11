export const enum EVENT_TYPE {
  UI = 'ui',
  TRACK = 'track',
}

export const enum ACTION {
  CLICKED = 'clicked',
  FORMATTED = 'formatted',
  INSERTED = 'inserted',
  INVOKED = 'invoked',
  OPENED = 'opened',
  STARTED = 'started',
  STOPPED = 'stopped',
  SUBSTITUTED = 'autoSubstituted',
}

export const enum INPUT_METHOD {
  FORMATTING = 'autoformatting',
  FLOATING_TB = 'floatingToolbar',
  KEYBOARD = 'keyboard',
  INSERT_MENU = 'insertMenu',
  QUICK_INSERT = 'quickInsert',
  SHORTCUT = 'shortcut',
  TOOLBAR = 'toolbar',
}

export const enum ACTION_SUBJECT {
  BUTTON = 'button',
  DOCUMENT = 'document',
  EDITOR = 'editor',
  PICKER = 'picker',
  TEXT = 'text',
  TYPEAHEAD = 'typeAhead',
}

export const enum ACTION_SUBJECT_ID {
  BUTTON_HELP = 'helpButton',
  BUTTON_FEEDBACK = 'feedbackButton',
  CANCEL = 'cancel',
  CODE_BLOCK = 'codeBlock',
  DIVIDER = 'divider',
  FORMAT_BLOCK_QUOTE = 'blockQuote',
  FORMAT_CODE = 'code',
  FORMAT_COLOR = 'color',
  FORMAT_CLEAR = 'clearFormatting',
  FORMAT_HEADING = 'heading',
  FORMAT_INDENT = 'indentation',
  FORMAT_ITALIC = 'italic',
  FORMAT_LIST_NUMBER = 'numberedList',
  FORMAT_LIST_BULLET = 'bulletedList',
  FORMAT_STRIKE = 'strike',
  FORMAT_STRONG = 'strong',
  FORMAT_SUB = 'subscript',
  FORMAT_SUPER = 'superscript',
  FORMAT_UNDERLINE = 'underline',
  PICKER_CLOUD = 'cloudPicker',
  PICKER_EMOJI = 'emojiPicker',
  PRODUCT_NAME = 'productName',
  PANEL = 'panel',
  PUNC = 'punctuation',
  SAVE = 'save',
  SYMBOL = 'symbol',
  TYPEAHEAD_EMOJI = 'emojiTypeAhead',
  TYPEAHEAD_LINK = 'linkTypeAhead',
  TYPEAHEAD_MENTION = 'mentionTypeAhead',
  TYPEAHEAD_QUICK_INSERT = 'quickInsertTypeAhead',
}
