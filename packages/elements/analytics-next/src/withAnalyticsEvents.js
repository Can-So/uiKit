// @flow

import React, { Component, type ComponentType } from 'react';
import PropTypes from 'prop-types';

import UIAnalyticsEvent from './UIAnalyticsEvent';
import type { AnalyticsEventPayload, ObjectType } from './types';

export type CreateUIAnalyticsEventSignature = (
  payload?: AnalyticsEventPayload,
) => UIAnalyticsEvent;

export type WithAnalyticsEventsProps = {
  createAnalyticsEvent: CreateUIAnalyticsEventSignature,
};

type WithAnalyticsEventsPropsDiff = {
  createAnalyticsEvent: CreateUIAnalyticsEventSignature | void,
};

type EventMap<ProvidedProps> = {
  [string]:
    | ObjectType
    | ((
        create: CreateUIAnalyticsEventSignature,
        props: ProvidedProps,
      ) => UIAnalyticsEvent | void),
};

export default function withAnalyticsEvents<ProvidedProps: ObjectType>(
  createEventMap: EventMap<
    $Diff<ProvidedProps, WithAnalyticsEventsPropsDiff>,
  > = {},
): (
  WrappedComponent: ComponentType<ProvidedProps>,
) => ComponentType<$Diff<ProvidedProps, WithAnalyticsEventsPropsDiff>> {
  return (
    WrappedComponent: ComponentType<ProvidedProps>,
  ): ComponentType<$Diff<ProvidedProps, WithAnalyticsEventsPropsDiff>> =>
    class WithAnalyticsEvents extends Component<
      $Diff<ProvidedProps, WithAnalyticsEventsPropsDiff>,
    > {
      static contextTypes = {
        getAtlaskitAnalyticsEventHandlers: PropTypes.func,
        getAtlaskitAnalyticsContext: PropTypes.func,
      };

      propsWithEvents: ObjectType;

      constructor(props: ProvidedProps) {
        super(props);
        this.propsWithEvents = this.mapCreateEventsToProps();
      }

      createAnalyticsEvent = (payload?: ObjectType = {}): UIAnalyticsEvent => {
        const {
          getAtlaskitAnalyticsEventHandlers,
          getAtlaskitAnalyticsContext,
        } = this.context;
        const context =
          (typeof getAtlaskitAnalyticsContext === 'function' &&
            getAtlaskitAnalyticsContext()) ||
          [];
        const handlers =
          (typeof getAtlaskitAnalyticsEventHandlers === 'function' &&
            getAtlaskitAnalyticsEventHandlers()) ||
          [];
        return new UIAnalyticsEvent({ context, handlers, payload });
      };

      mapCreateEventsToProps = () =>
        Object.keys(createEventMap).reduce((modified, propCallbackName) => {
          const eventCreator = createEventMap[propCallbackName];
          const providedCallback = this.props[propCallbackName];
          if (!['object', 'function'].includes(typeof eventCreator)) {
            return modified;
          }
          const modifiedCallback = (...args) => {
            const analyticsEvent =
              typeof eventCreator === 'function'
                ? eventCreator(this.createAnalyticsEvent, this.props)
                : this.createAnalyticsEvent(eventCreator);

            if (providedCallback) {
              providedCallback(...args, analyticsEvent);
            }
          };
          return {
            ...modified,
            [propCallbackName]: modifiedCallback,
          };
        }, {});

      render() {
        const props = { ...this.props, ...this.propsWithEvents };
        return (
          <WrappedComponent
            {...props}
            createAnalyticsEvent={this.createAnalyticsEvent}
          />
        );
      }
    };
}
