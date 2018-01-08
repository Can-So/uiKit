import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import AkButton from '@atlaskit/button';
import DropboxIcon from '@atlaskit/icon/glyph/dropbox';
import GoogledriveIcon from '@atlaskit/icon/glyph/googledrive';

import { startAuth } from '../../../../actions';
import { ServiceAccountLink, ServiceName, State } from '../../../../domain';
import {
  ButtonWrapper,
  ConnectWrapper,
  IconWrapper,
  TextDescription,
  Title,
} from './styled';

const serviceDetails: {
  [serviceName: string]: { name: string; icon: JSX.Element };
} = {
  dropbox: {
    name: 'Dropbox',
    icon: <DropboxIcon label="dropbox" size="xlarge" />,
  },
  google: {
    name: 'Google Drive',
    icon: <GoogledriveIcon label="drive" size="xlarge" />,
  },
};

export interface AuthStateProps {
  readonly service: ServiceAccountLink;
}

export interface AuthDispatchProps {
  readonly onStartAuth: (serviceName: ServiceName) => void;
}

export type AuthProps = AuthStateProps & AuthDispatchProps;

/**
 * Routing class that displays view depending on situation.
 */
export class StatelessAuth extends Component<AuthProps> {
  render() {
    const { service } = this.props;
    if (service.name === 'upload') {
      return null;
    }

    const { name, icon } = serviceDetails[service.name];
    const btnLabel = `Connect to ${name}`;

    return (
      <ConnectWrapper>
        <Title>Upload a file from {name}</Title>
        <IconWrapper>{icon}</IconWrapper>
        <ButtonWrapper>
          <AkButton
            appearance="primary"
            className="connectBtn"
            onClick={this.onClick}
          >
            {btnLabel}
          </AkButton>
        </ButtonWrapper>
        <TextDescription>
          We'll open a new page to help you<br /> connect your {name} account
        </TextDescription>
      </ConnectWrapper>
    );
  }

  private onClick = () => this.props.onStartAuth(this.props.service.name);
}

export default connect<AuthStateProps, AuthDispatchProps, {}>(
  (state: State) => ({
    service: state.view.service,
  }),
  dispatch => ({
    onStartAuth: (serviceName: ServiceName) => dispatch(startAuth(serviceName)),
  }),
)(StatelessAuth);
