import * as React from 'react';
import { AppCardView } from '@atlaskit/media-card';
import { ApplicationCardAttributes as Attributes } from '@atlaskit/editor-common';
import { EventHandlers } from '@atlaskit/editor-common';

export interface AppCardViewProps extends Attributes {
  eventHandlers?: EventHandlers;
  useNewApplicationCard?: boolean;
}

export default class ApplicationCard extends React.Component<
  AppCardViewProps,
  any
> {
  private onClick = () => {
    const { eventHandlers, link } = this.props;

    if (
      eventHandlers &&
      eventHandlers.applicationCard &&
      eventHandlers.applicationCard.onClick
    ) {
      eventHandlers.applicationCard.onClick(
        link && link.url ? link.url : undefined,
      );
    }
  };

  render() {
    const { eventHandlers, useNewApplicationCard = false } = this.props;

    return (
      <div className="ApplicationCard">
        <AppCardView
          newDesign={useNewApplicationCard}
          onClick={this.onClick}
          model={this.props}
          onActionClick={
            eventHandlers &&
            eventHandlers.applicationCard &&
            eventHandlers.applicationCard.onActionClick
          }
        />
      </div>
    );
  }
}
