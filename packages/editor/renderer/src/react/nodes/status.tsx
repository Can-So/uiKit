import * as React from 'react';
import { PureComponent } from 'react';
import { Status as AkStatus, Color } from '@atlaskit/status';
import { FabricElementsAnalyticsContext } from '@atlaskit/analytics-namespaced-context';

export interface Props {
  text: string;
  color: Color;
  localId?: string;
  selected?: boolean;
  onClick?: (event: React.SyntheticEvent<any>) => void;
}

export default class Status extends PureComponent<Props, {}> {
  render() {
    const { text, color, localId, onClick, selected } = this.props;
    return (
      <FabricElementsAnalyticsContext
        data={{
          userContext: 'document',
        }}
      >
        <AkStatus
          text={text}
          color={color}
          localId={localId}
          onClick={onClick}
          selected={selected}
        />
      </FabricElementsAnalyticsContext>
    );
  }
}
