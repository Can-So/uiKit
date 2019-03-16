import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
export interface Props {
    mountTo?: HTMLElement;
    boundariesElement?: HTMLElement;
    scrollableElement?: HTMLElement;
    isOpen?: boolean;
    onOpenChange?: (attrs: any) => void;
    onItemActivated?: (attrs: any) => void;
    onMouseEnter?: (attrs: any) => void;
    onMouseLeave?: (attrs: any) => void;
    fitWidth?: number;
    fitHeight?: number;
    offset?: Array<number>;
    zIndex?: number;
    items: Array<{
        items: MenuItem[];
    }>;
}
export interface MenuItem {
    key?: string;
    content: string | ReactElement<any>;
    elemBefore?: React.ReactNode;
    elemAfter?: React.ReactNode;
    tooltipDescription?: string;
    tooltipPosition?: string;
    isActive: boolean;
    isDisabled?: boolean;
}
export interface State {
    target?: HTMLElement;
    popupPlacement: [string, string];
}
/**
 * Wrapper around @atlaskit/droplist which uses Popup and Portal to render
 * dropdown-menu outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
export default class DropdownMenuWrapper extends PureComponent<Props, State> {
    state: State;
    private handleRef;
    private updatePopupPlacement;
    private handleClose;
    private renderItem;
    private renderDropdownMenu;
    render(): JSX.Element;
}
