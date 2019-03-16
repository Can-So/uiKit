/// <reference types="react" />
import { Messages } from 'react-intl';
import { Product, FeatureFlagProps } from '../types';
declare type GenericSwitcherProps = {
    cloudId: string;
    messages: Messages;
    triggerXFlow: (productKey: string, sourceComponent: string) => void;
    product: Exclude<Product, Product.JIRA | Product.CONFLUENCE>;
} & FeatureFlagProps;
declare const _default: (props: GenericSwitcherProps) => JSX.Element;
export default _default;
