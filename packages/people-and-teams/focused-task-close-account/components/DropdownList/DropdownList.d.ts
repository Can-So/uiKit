import * as React from 'react';
import { DropDownListProps } from './types';
declare type State = {
    isExpanded: boolean;
};
export declare class DropdownList extends React.Component<DropDownListProps, State> {
    state: {
        isExpanded: boolean;
    };
    showDropdownList: () => void;
    hideDropdownList: () => void;
    getVisibleSites: () => string[];
    render(): JSX.Element;
}
export default DropdownList;
