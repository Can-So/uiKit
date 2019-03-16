import { Slice, Schema } from 'prosemirror-model';
import { MacroProvider } from '../macro';
import { Command } from '../../types';
export declare const updateExtensionLayout: (layout: string) => Command;
export declare const editExtension: (macroProvider: MacroProvider | null) => Command;
export declare const removeExtension: () => Command;
/**
 * Lift content out of "open" top-level bodiedExtensions.
 * Will not work if bodiedExtensions are nested, or when bodiedExtensions are not in the top level
 */
export declare const transformSliceToRemoveOpenBodiedExtension: (slice: Slice<any>, schema: Schema<any, any>) => Slice<any>;
