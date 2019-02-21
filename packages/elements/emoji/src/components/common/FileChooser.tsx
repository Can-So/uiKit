import * as React from 'react';
import { ChangeEventHandler, PureComponent } from 'react';

import AkButton from '@atlaskit/button';

export interface Props {
  label: string;
  ariaLabel?: string;
  onChange?: ChangeEventHandler<any>;
  accept?: string;
  isDisabled?: boolean;
}

export default class FileChooser extends PureComponent<Props, {}> {
  onChooseFile = () => {
    const chooseFile = this.refs['chooseFile'] as HTMLInputElement;
    if (chooseFile) {
      chooseFile.click();
    }
  };

  render() {
    const { accept, ariaLabel, isDisabled, label, onChange } = this.props;
    return (
      <span>
        <AkButton
          onClick={this.onChooseFile}
          isDisabled={isDisabled}
          ariaLabel={ariaLabel || label}
        >
          {label}
        </AkButton>
        <input
          className="emojiUploadFileInput"
          ref="chooseFile"
          onChange={onChange}
          type="file"
          accept={accept}
          style={{ display: 'none' }}
        />
      </span>
    );
  }
}
