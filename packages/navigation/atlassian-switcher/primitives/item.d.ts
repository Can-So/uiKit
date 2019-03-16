import * as React from 'react';
declare type SwitcherItemProps = {
    children: React.ReactNode;
    icon: React.ReactNode;
    description?: React.ReactNode;
    onClick?: Function;
    href?: string;
    isDisabled?: boolean;
};
declare const SwitcherItemWithEvents: React.ComponentClass<Pick<SwitcherItemProps, "children" | "icon" | "description" | "onClick" | "href" | "isDisabled">, any>;
export default SwitcherItemWithEvents;
