import * as React from 'react';
import { ComponentClass } from 'react';
import * as styles from './styles';

import LoadingEmojiComponent, {
  Props as LoadingProps,
  State as LoadingState,
} from '../common/LoadingEmojiComponent';
import {
  PickerRefHandler,
  Props as ComponentProps,
} from './EmojiUploadComponent';
import { LoadingItem } from '../picker/EmojiPickerVirtualItems';
import { EmojiProvider } from '../../api/EmojiResource';
import { FireAnalyticsEvent, withAnalytics } from '@atlaskit/analytics';

const emojiUploadModuleLoader = () =>
  import(/* webpackChunkName:"@atlaskit-internal_emojiUploadComponent" */ './EmojiUploadComponent');

const emojiUploadLoader: () => Promise<ComponentClass<ComponentProps>> = () =>
  emojiUploadModuleLoader().then(module => module.default);

export interface Props extends LoadingProps {
  onPickerRef?: PickerRefHandler;
  firePrivateAnalyticsEvent?: FireAnalyticsEvent;
}

export class EmojiUploaderInternal extends LoadingEmojiComponent<
  Props,
  LoadingState
> {
  // state initialised with static component to prevent
  // rerender when the module has already been loaded
  static AsyncLoadedComponent?: ComponentClass<ComponentProps>;
  state = {
    asyncLoadedComponent: EmojiUploaderInternal.AsyncLoadedComponent,
  };

  constructor(props) {
    super(props, {});
  }

  asyncLoadComponent() {
    emojiUploadLoader().then(component => {
      EmojiUploaderInternal.AsyncLoadedComponent = component;
      this.setAsyncState(component);
    });
  }

  renderLoading(): JSX.Element | null {
    const item = new LoadingItem();
    const handlePickerRef = (ref: any) => {
      if (this.props.onPickerRef) {
        this.props.onPickerRef(ref);
      }
    };
    return (
      <div className={styles.emojiUploadWidget} ref={handlePickerRef}>
        {item.renderItem()}
      </div>
    );
  }

  renderLoaded(
    loadedEmojiProvider: EmojiProvider,
    EmojiPickerComponent: ComponentClass<ComponentProps>,
  ) {
    const { emojiProvider, ...otherProps } = this.props;
    return (
      <EmojiPickerComponent
        emojiProvider={loadedEmojiProvider}
        {...otherProps}
      />
    );
  }
}

// tslint:disable-next-line:variable-name
const EmojiUploader = withAnalytics<typeof EmojiUploaderInternal>(
  EmojiUploaderInternal,
  {},
  {},
);
type EmojiUploader = EmojiUploaderInternal;

export default EmojiUploader;
