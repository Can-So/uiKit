import * as React from 'react';
import { User } from '../types';
export declare type UserOptionProps = {
    user: User;
    status?: string;
    isSelected: boolean;
};
export declare class UserOption extends React.PureComponent<UserOptionProps> {
    getPrimaryText: () => JSX.Element[];
    renderSecondaryText: () => JSX.Element | undefined;
    private renderAvatar;
    render(): JSX.Element;
}
