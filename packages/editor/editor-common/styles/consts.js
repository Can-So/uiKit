import { codeFontFamily, layers, colors, fontSize as defaultFontSize, } from '@atlaskit/theme';
var B100 = colors.B100, B300 = colors.B300, B400 = colors.B400, B50 = colors.B50, B75 = colors.B75, N0 = colors.N0, N20 = colors.N20, N40 = colors.N40, N50 = colors.N50, N100 = colors.N100, N500 = colors.N500, N700 = colors.N700, N900 = colors.N900, R300 = colors.R300, R50 = colors.R50, R75 = colors.R75, DN50 = colors.DN50, DN70 = colors.DN70;
export var akEditorCodeFontFamily = codeFontFamily();
export var akEditorInactiveForeground = N500;
export var akEditorFocus = B100;
export var akEditorSubtleAccent = N40;
export var akEditorActiveBackground = N500;
export var akEditorActiveForeground = N0;
export var akEditorBlockquoteBorderColor = N40;
export var akEditorDropdownActiveBackground = N900;
export var akEditorPopupBackground = N700;
export var akEditorPopupText = B50;
export var akEditorPrimaryButton = B400;
export var akEditorCodeBackground = N20;
export var akEditorCodeBlockPadding = '12px';
export var akEditorCodeInlinePadding = '2px 4px';
export var akEditorUnitZIndex = 1;
export var akEditorSmallZIndex = 2;
export var akEditorGridLineZIndex = 9999;
// z-index for main menu bar -
// this is highest as it should be above anything else in editor below.
export var akEditorMenuZIndex = layers.blanket();
// z-index used for floating toolbars like code block, table etc
export var akEditorFloatingPanelZIndex = layers.layer();
// z-index used for pickers (date, emoji, mentions) and type-aheads, hyperlinks
export var akEditorFloatingDialogZIndex = akEditorFloatingPanelZIndex + 10;
// z-index used for floating toolbars table cell menu which are above block toolbars
export var akEditorFloatingOverlapPanelZIndex = akEditorFloatingPanelZIndex + 5;
export var akEditorMentionSelected = N100;
export var akEditorTableToolbarSize = 11;
export var akEditorTableBorder = N50;
export var akEditorTableBorderDark = DN70;
export var akEditorTableToolbar = N20;
export var akEditorTableToolbarDark = DN50;
export var akEditorTableFloatingControls = N20;
export var akEditorTableCellSelected = B75;
export var akEditorTableToolbarSelected = B100;
export var akEditorTableBorderSelected = B300;
export var akEditorTableCellDelete = R50;
export var akEditorTableBorderDelete = R300;
export var akEditorTableToolbarDelete = R75;
export var akEditorTableBorderRadius = '3px';
export var akEditorTableCellBackgroundOpacity = 0.5;
export var akEditorFullPageMaxWidth = 680;
export var akEditorDefaultLayoutWidth = 680;
export var akEditorWideLayoutWidth = 960;
export var akEditorFullWidthLayoutWidth = 1800;
export var akEditorTableNumberColumnWidth = 42;
export var akEditorBreakoutPadding = 96;
export var akEditorMobileBreakoutPoint = 720;
export var akEditorTableCellMinWidth = 48;
export var akEditorTableLegacyCellMinWidth = 128;
export var gridMediumMaxWidth = 1024;
export var breakoutWideScaleRatio = 1.33;
export var editorFontSize = function (_a) {
    var theme = _a.theme;
    return theme && theme.baseFontSize ? theme.baseFontSize : defaultFontSize();
};
export var relativeSize = function (multiplier) { return function (_a) {
    var theme = _a.theme;
    return editorFontSize({ theme: theme }) * multiplier;
}; };
// @see typography spreadsheet: https://docs.google.com/spreadsheets/d/1iYusRGCT4PoPfvxbJ8NrgjtfFgXLm5lpDWXzjua1W2E/edit#gid=93913128
export var blockNodesVerticalMargin = 1.143;
//# sourceMappingURL=consts.js.map