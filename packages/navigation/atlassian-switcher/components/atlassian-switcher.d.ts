/// <reference types="react" />
import { TriggerXFlowCallback, FeatureFlagProps } from '../types';
declare type AtlassianSwitcherProps = {
    product: string;
    cloudId: string;
    triggerXFlow: TriggerXFlowCallback;
} & Partial<FeatureFlagProps>;
declare const AtlassianSwitcher: (props: AtlassianSwitcherProps) => JSX.Element;
export default AtlassianSwitcher;
