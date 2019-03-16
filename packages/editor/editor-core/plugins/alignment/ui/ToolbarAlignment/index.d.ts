import * as React from 'react';
export declare const iconMap: {
    start: JSX.Element;
    end: JSX.Element;
    center: JSX.Element;
};
import { AlignmentPluginState, AlignmentState } from '../../pm-plugins/main';
export declare const messages: {
    alignment: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export interface State {
    isOpen: boolean;
}
export interface Props {
    pluginState: AlignmentPluginState;
    changeAlignment: (align: AlignmentState) => void;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    isReducedSpacing?: boolean;
    disabled?: boolean;
}
declare class AlignmentToolbar extends React.Component<Props, State> {
    state: State;
    render(): JSX.Element;
    private changeAlignment;
    private toggleOpen;
    private handleOpenChange;
}
export default AlignmentToolbar;
