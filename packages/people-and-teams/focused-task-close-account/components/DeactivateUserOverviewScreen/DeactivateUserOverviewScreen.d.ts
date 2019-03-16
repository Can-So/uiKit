import * as React from 'react';
import { DeactivateUserOverviewScreenProps } from './types';
export declare class DeactivateUserOverviewScreen extends React.Component<DeactivateUserOverviewScreenProps> {
    static defaultProps: Partial<DeactivateUserOverviewScreenProps>;
    selectAdminOrSelfCopy: (adminCopy: any, selfCopy: any) => any;
    renderLoseAccessListElement: () => JSX.Element;
    renderPersonalDataListElement: () => JSX.Element;
    renderBillingListElement: () => JSX.Element;
    render(): JSX.Element;
}
export default DeactivateUserOverviewScreen;
