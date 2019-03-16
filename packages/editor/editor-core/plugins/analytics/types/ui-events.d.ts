import { UIAEP } from './events';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, INPUT_METHOD } from './enums';
export declare const enum PLATFORMS {
    NATIVE = "mobileNative",
    HYBRID = "mobileHybrid",
    WEB = "web"
}
declare type ButtonAEP<ActionSubjectID, Attributes> = UIAEP<ACTION.CLICKED, ACTION_SUBJECT.BUTTON, ActionSubjectID, Attributes>;
declare type PickerAEP<ActionSubjectID, Attributes> = UIAEP<ACTION.OPENED, ACTION_SUBJECT.PICKER, ActionSubjectID, Attributes>;
declare type TypeAheadAEP<ActionSubjectID, Attributes> = UIAEP<ACTION.INVOKED, ACTION_SUBJECT.TYPEAHEAD, ActionSubjectID, Attributes>;
declare type EditorStartAEP = UIAEP<ACTION.STARTED, ACTION_SUBJECT.EDITOR, undefined, {
    platform: PLATFORMS.NATIVE | PLATFORMS.HYBRID | PLATFORMS.WEB;
}>;
declare type EditorStopAEP = UIAEP<ACTION.STOPPED, ACTION_SUBJECT.EDITOR, ACTION_SUBJECT_ID.SAVE | ACTION_SUBJECT_ID.CANCEL, {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.SHORTCUT;
    documentSize: number;
    nodeCount?: {
        tables: number;
        headings: number;
        lists: number;
        mediaSingles: number;
        mediaGroups: number;
        panels: number;
        extensions: number;
        decisions: number;
        actions: number;
        codeBlocks: number;
    };
}>;
declare type ButtonHelpAEP = ButtonAEP<ACTION_SUBJECT_ID.BUTTON_HELP, {
    inputMethod: INPUT_METHOD.SHORTCUT | INPUT_METHOD.TOOLBAR;
}>;
declare type ButtonFeedbackAEP = ButtonAEP<ACTION_SUBJECT_ID.BUTTON_FEEDBACK, undefined>;
declare type PickerEmojiAEP = PickerAEP<ACTION_SUBJECT_ID.PICKER_EMOJI, {
    inputMethod: INPUT_METHOD.TOOLBAR;
}>;
declare type PickerImageAEP = PickerAEP<ACTION_SUBJECT_ID.PICKER_CLOUD, {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.QUICK_INSERT;
}>;
declare type TypeAheadQuickInsertAEP = TypeAheadAEP<ACTION_SUBJECT_ID.TYPEAHEAD_QUICK_INSERT, {
    inputMethod: INPUT_METHOD.KEYBOARD;
}>;
declare type TypeAheadEmojiAEP = TypeAheadAEP<ACTION_SUBJECT_ID.TYPEAHEAD_EMOJI, {
    inputMethod: INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.KEYBOARD;
}>;
declare type TypeAheadLinkAEP = TypeAheadAEP<ACTION_SUBJECT_ID.TYPEAHEAD_LINK, {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.SHORTCUT;
}>;
declare type TypeAheadMentionAEP = TypeAheadAEP<ACTION_SUBJECT_ID.TYPEAHEAD_MENTION, {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.KEYBOARD;
}>;
export declare type UIEventPayload = EditorStartAEP | EditorStopAEP | ButtonHelpAEP | ButtonFeedbackAEP | PickerEmojiAEP | PickerImageAEP | TypeAheadQuickInsertAEP | TypeAheadEmojiAEP | TypeAheadLinkAEP | TypeAheadMentionAEP;
export {};
