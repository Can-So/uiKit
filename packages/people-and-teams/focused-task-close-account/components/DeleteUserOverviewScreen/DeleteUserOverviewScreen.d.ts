import * as React from 'react';
import { DeleteUserOverviewScreenProps } from './types';
export declare class DeleteUserOverviewScreen extends React.Component<DeleteUserOverviewScreenProps> {
    static defaultProps: Partial<DeleteUserOverviewScreenProps>;
    selectAdminOrSelfCopy: (adminCopy: any, selfCopy: any) => any;
    displayFirstListElement: () => JSX.Element | null;
    displaySecondListElement: () => JSX.Element;
    displayThirdListElement: () => JSX.Element;
    displayFourthListElement: () => JSX.Element;
    render(): JSX.Element;
}
export default DeleteUserOverviewScreen;
