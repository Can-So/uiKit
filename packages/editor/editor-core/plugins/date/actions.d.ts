import { EditorState, Transaction } from 'prosemirror-state';
import { DateType } from './index';
import { Command } from '../../types';
export declare const insertDate: (date?: DateType | undefined) => (state: EditorState<any>, dispatch: (tr: Transaction<any>) => void) => boolean;
export declare const setDatePickerAt: (showDatePickerAt: number | null) => (state: EditorState<any>, dispatch: (tr: Transaction<any>) => void) => boolean;
export declare const closeDatePicker: () => Command;
export declare const openDatePicker: () => Command;
