/// <reference types="react" />
import { Messages } from 'react-intl';
import { FeatureFlagProps } from '../types';
declare type ConfluenceSwitcherProps = {
    cloudId: string;
    messages: Messages;
    triggerXFlow: (productKey: string, sourceComponent: string) => void;
} & FeatureFlagProps;
declare const _default: (props: ConfluenceSwitcherProps) => JSX.Element;
export default _default;
