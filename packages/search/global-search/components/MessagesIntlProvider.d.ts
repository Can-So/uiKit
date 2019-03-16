import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
export interface Props {
    children: React.ReactChild;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
