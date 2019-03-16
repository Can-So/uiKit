import { PanelType } from '@atlaskit/adf-schema';
import { Command } from '../../types';
export declare type DomAtPos = (pos: number) => {
    node: HTMLElement;
    offset: number;
};
export declare const removePanel: () => Command;
export declare const changePanelType: (panelType: PanelType) => Command;
