import * as React from 'react';
interface Props {
    children: React.ReactNode;
    content: React.ReactNode;
    placement?: string;
}
interface State {
    isOpen: boolean;
}
export declare class StatefulInlineDialog extends React.Component<Props, State> {
    state: {
        isOpen: boolean;
    };
    openDialog: () => void;
    closeDialog: () => void;
    handleMouseOver: () => void;
    handleMouseOut: () => void;
    render(): JSX.Element;
}
export default StatefulInlineDialog;
