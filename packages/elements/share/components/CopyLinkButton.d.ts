/// <reference types="styled-components" />
import * as React from 'react';
export declare const MessageContainer: import("styled-components").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
declare type InputProps = {
    ref?: React.RefObject<HTMLInputElement>;
    text: string;
};
export declare const HiddenInput: React.ComponentType<InputProps>;
export declare type Props = {
    onLinkCopy?: (link: string) => void;
    link: string;
};
export declare type State = {
    shouldShowCopiedMessage: boolean;
};
export declare const NoPaddingButton: import("styled-components").StyledComponentClass<Pick<Pick<Partial<Pick<import("@atlaskit/button/types").ButtonProps, "appearance" | "isDisabled" | "isLoading" | "isSelected" | "spacing" | "type" | "shouldFitContainer" | "autoFocus">> & Pick<import("@atlaskit/button/types").ButtonProps, "form" | "onClick" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "className" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "onBlur" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onFocus" | "tabIndex" | "target" | "theme"> & {
    appearance?: "link" | "default" | "danger" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
}, "appearance" | "isDisabled" | "isLoading" | "isSelected" | "spacing" | "type" | "shouldFitContainer" | "autoFocus" | "form" | "onClick" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "className" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "onBlur" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onFocus" | "tabIndex" | "target" | "theme">, "appearance" | "isDisabled" | "isLoading" | "isSelected" | "spacing" | "type" | "shouldFitContainer" | "autoFocus" | "form" | "onClick" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "className" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "onBlur" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onFocus" | "tabIndex" | "target" | "theme">, any, Pick<Pick<Pick<Partial<Pick<import("@atlaskit/button/types").ButtonProps, "appearance" | "isDisabled" | "isLoading" | "isSelected" | "spacing" | "type" | "shouldFitContainer" | "autoFocus">> & Pick<import("@atlaskit/button/types").ButtonProps, "form" | "onClick" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "className" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "onBlur" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onFocus" | "tabIndex" | "target" | "theme"> & {
    appearance?: "link" | "default" | "danger" | "primary" | "subtle" | "subtle-link" | "warning" | "help" | undefined;
}, "appearance" | "isDisabled" | "isLoading" | "isSelected" | "spacing" | "type" | "shouldFitContainer" | "autoFocus" | "form" | "onClick" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "className" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "onBlur" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onFocus" | "tabIndex" | "target" | "theme">, "appearance" | "isDisabled" | "isLoading" | "isSelected" | "spacing" | "type" | "shouldFitContainer" | "autoFocus" | "form" | "onClick" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "className" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "onBlur" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onFocus" | "tabIndex" | "target" | "theme">, "appearance" | "isDisabled" | "isLoading" | "isSelected" | "spacing" | "type" | "shouldFitContainer" | "autoFocus" | "form" | "onClick" | "ariaControls" | "ariaExpanded" | "ariaLabel" | "ariaHaspopup" | "className" | "component" | "href" | "iconAfter" | "iconBefore" | "innerRef" | "id" | "onBlur" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onFocus" | "tabIndex" | "target"> & {
    theme?: any;
}>;
export declare class CopyLinkButton extends React.Component<Props, State> {
    private inputRef;
    state: {
        shouldShowCopiedMessage: boolean;
    };
    private handleClick;
    private handleDismissCopiedMessage;
    render(): JSX.Element;
}
export {};
