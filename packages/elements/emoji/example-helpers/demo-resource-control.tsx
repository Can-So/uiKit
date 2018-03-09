import * as React from 'react';
import { PureComponent, ReactElement } from 'react';

import EmojiResource, {
  EmojiResourceConfig,
  EmojiProvider,
} from '../src/api/EmojiResource';
import UploadingEmojiResource from '../src/api/EmojiResource';

export function getEmojiConfig() {
  let emojiConfig;
  try {
    // tslint:disable-next-line import/no-unresolved, no-var-requires
    emojiConfig = require('../local-config')['default'];
  } catch (e) {
    // tslint:disable-next-line import/no-unresolved, no-var-requires
    emojiConfig = require('../local-config-example')['default'];
  }

  emojiConfig.allowUpload = true;
  return emojiConfig;
}

export function getRealEmojiResource() {
  const resource = new UploadingEmojiResource(getEmojiConfig());
  return Promise.resolve(resource);
}

// FIXME FAB-1732 - extract or replace with third-party implementation
const toJavascriptString = (obj: any): string => {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      let arrString = '[\n';
      for (let i = 0; i < obj.length; i++) {
        arrString += `  ${toJavascriptString(obj[i])},\n`;
      }
      arrString += ']';
      return arrString;
    }
    let objString = '{\n';
    Object.keys(obj).forEach(key => {
      objString += `  ${key}: ${toJavascriptString(obj[key])},\n`;
    });
    objString += '}';
    return objString;
  } else if (typeof obj === 'string') {
    return `'${obj}'`;
  }
  return obj.toString();
};

export interface Props {
  children: ReactElement<any>;
  emojiConfig: EmojiResourceConfig;
  customEmojiProvider?: Promise<EmojiProvider>;
  customPadding?: number;
}

export interface State {
  emojiProvider: Promise<EmojiProvider>;
}

export default class ResourcedEmojiControl extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      emojiProvider:
        this.props.customEmojiProvider ||
        Promise.resolve(new EmojiResource(this.props.emojiConfig)),
    };
  }

  componentWillReceiveProps(nextProps) {
    // Make a weak attempt to reduce the duplication in EmojiResource creation when a storybook is mounted
    if (
      JSON.stringify(nextProps.emojiConfig) !==
      JSON.stringify(this.props.emojiConfig)
    ) {
      this.refreshEmoji(nextProps.emojiConfig);
    }
  }

  refreshEmoji(emojiConfig: EmojiResourceConfig) {
    this.setState({
      emojiProvider: Promise.resolve(new EmojiResource(this.props.emojiConfig)),
    });
  }

  emojiConfigChange = event => {
    // tslint:disable-next-line:no-eval
    const config = eval(`( () => (${event.target.value}) )()`);
    this.refreshEmoji(config);
  };

  render() {
    const { customPadding } = this.props;
    const { emojiProvider } = this.state;
    const paddingBottom = customPadding ? `${customPadding}px` : '30px';

    return (
      <div style={{ padding: '10px' }}>
        <div style={{ paddingBottom }}>
          {React.cloneElement(this.props.children, { emojiProvider })}
        </div>
        <div>
          <p>
            <label htmlFor="emoji-urls">EmojiLoader config</label>
          </p>
          <p>
            <textarea
              id="emoji-urls"
              rows={15}
              style={{ height: '280px', width: '500px' }}
              onChange={this.emojiConfigChange}
              defaultValue={toJavascriptString(this.props.emojiConfig)}
            />
          </p>
        </div>
      </div>
    );
  }
}
