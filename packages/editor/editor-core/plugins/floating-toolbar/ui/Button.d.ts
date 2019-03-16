import * as React from 'react';
import { ReactElement, MouseEvent } from 'react';
export declare type ButtonAppearance = 'subtle' | 'danger';
export interface Props {
    title?: string;
    icon?: ReactElement<any>;
    iconAfter?: ReactElement<any>;
    onClick: React.MouseEventHandler;
    onMouseEnter?: <T>(event: MouseEvent<T>) => void;
    onMouseLeave?: <T>(event: MouseEvent<T>) => void;
    selected?: boolean;
    disabled?: boolean;
    appearance?: ButtonAppearance;
    href?: string;
    target?: string;
    children?: React.ReactNode;
}
declare const _default: ({ title, icon, iconAfter, onClick, onMouseEnter, onMouseLeave, selected, disabled, href, target, appearance, children, }: Props) => JSX.Element;
export default _default;
