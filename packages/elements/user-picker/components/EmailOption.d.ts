import * as React from 'react';
import { Email } from '../types';
export declare type EmailOptionProps = {
    email: Email;
    isSelected: boolean;
    label?: string;
};
export declare class EmailOption extends React.PureComponent<EmailOptionProps> {
    private renderOption;
    render(): JSX.Element;
}
