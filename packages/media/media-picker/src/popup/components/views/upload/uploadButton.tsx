import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Button from '@atlaskit/button';
import { startFileBrowser } from '../../../actions/startFileBrowser';
import { Browser } from '../../../../components/browser';
import { State } from '../../../domain';

export interface LocalBrowserButtonProps {
  mpBrowser: Browser;
}

export interface LocalBrowserButtonDispatchProps {
  onClick: () => void;
}

export type Props = LocalBrowserButtonProps & LocalBrowserButtonDispatchProps;

export class LocalBrowserButton extends React.Component<Props> {
  private onUploadClick = (): void => {
    const { mpBrowser, onClick } = this.props;

    onClick();
    if (mpBrowser) {
      mpBrowser.browse();
    }
  };

  render() {
    const { mpBrowser } = this.props;

    return (
      <Button
        className="e2e-upload-button"
        appearance="default"
        onClick={this.onUploadClick}
        isDisabled={!mpBrowser}
      >
        Upload a file
      </Button>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<State>,
): LocalBrowserButtonDispatchProps => ({
  onClick: () => dispatch(startFileBrowser()),
});

export default connect<
  {},
  LocalBrowserButtonDispatchProps,
  LocalBrowserButtonProps
>(null, mapDispatchToProps)(LocalBrowserButton);
