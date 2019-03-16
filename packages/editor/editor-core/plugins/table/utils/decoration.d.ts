import { Decoration, DecorationSet } from 'prosemirror-view';
import { Cell } from '../types';
export declare const createControlsHoverDecoration: (cells: Cell[], danger?: boolean | undefined) => Decoration[];
export declare const findControlsHoverDecoration: (decorationSet: DecorationSet<any>) => Decoration[];
