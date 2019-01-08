import * as React from 'react';
import { ComponentClass } from 'react';
import * as styles from './styles';

import LoadingEmojiComponent, {
  Props as LoadingProps,
  State as LoadingState,
} from '../common/LoadingEmojiComponent';
import {
  UploadRefHandler,
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
  onUploaderRef?: UploadRefHandler;
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
    const handleUploadRef = (ref: any) => {
      if (this.props.onUploaderRef) {
        this.props.onUploaderRef(ref);
      }
    };
    return (
      <div className={styles.emojiUploadWidget} ref={handleUploadRef}>
        {item.renderItem()}
      </div>
    );
  }

  renderLoaded(
    loadedEmojiProvider: EmojiProvider,
    EmojiUploaderComponent: ComponentClass<ComponentProps>,
  ) {
    const { emojiProvider, ...otherProps } = this.props;
    return (
      <EmojiUploaderComponent
        emojiProvider={loadedEmojiProvider}
        {...otherProps}
      />
    );
  }
}

const EmojiUploader = withAnalytics<typeof EmojiUploaderInternal>(
  EmojiUploaderInternal,
  {},
  {},
);
type EmojiUploader = EmojiUploaderInternal;

export default EmojiUploader;
