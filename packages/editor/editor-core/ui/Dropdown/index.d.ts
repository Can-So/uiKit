import * as React from 'react';
import { PureComponent } from 'react';
export interface Props {
    mountTo?: HTMLElement;
    boundariesElement?: HTMLElement;
    scrollableElement?: HTMLElement;
    trigger: React.ReactElement<any>;
    isOpen?: boolean;
    onOpenChange?: (attrs: any) => void;
    fitWidth?: number;
    fitHeight?: number;
    zIndex?: number;
}
export interface State {
    target?: HTMLElement;
    popupPlacement: [string, string];
}
/**
 * Wrapper around @atlaskit/droplist which uses Popup and Portal to render
 * droplist outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
export default class Dropdown extends PureComponent<Props, State> {
    constructor(props: Props);
    private handleRef;
    private updatePopupPlacement;
    private renderDropdown;
    render(): JSX.Element;
}
