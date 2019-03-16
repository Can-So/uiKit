import { PureComponent } from 'react';
import { EmojiDescriptionWithVariations, OnToneSelected } from '../../types';
import { FireAnalyticsEvent } from '@findable/analytics';
export interface Props {
    emoji: EmojiDescriptionWithVariations;
    onToneSelected: OnToneSelected;
    firePrivateAnalyticsEvent?: FireAnalyticsEvent;
}
export declare class ToneSelectorInternal extends PureComponent<Props, {}> {
    private onToneSelectedHandler;
    render(): JSX.Element;
}
declare const ToneSelector: typeof ToneSelectorInternal;
declare type ToneSelector = ToneSelectorInternal;
export default ToneSelector;
