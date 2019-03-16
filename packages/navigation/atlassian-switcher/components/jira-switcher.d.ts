/// <reference types="react" />
import { Messages } from 'react-intl';
import { FeatureFlagProps } from '../types';
declare type JiraSwitcherProps = {
    cloudId: string;
    messages: Messages;
    triggerXFlow: (productKey: string, sourceComponent: string) => void;
} & FeatureFlagProps;
declare const _default: (props: JiraSwitcherProps) => JSX.Element;
export default _default;
