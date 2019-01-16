import * as React from 'react';
import {
  CardLinkView,
  BlockCardResolvingView,
  BlockCardErroredView,
  BlockCardUnauthorisedView,
  BlockCardForbiddenView,
  BlockCardResolvedView,
  InlineCardResolvedView,
  InlineCardResolvingView,
  InlineCardErroredView,
  InlineCardForbiddenView,
  InlineCardUnauthorizedView,
} from '@atlaskit/media-ui';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
import { ObjectState, Client } from '../Client';
import { extractBlockPropsFromJSONLD } from '../extractBlockPropsFromJSONLD';
import { extractInlinePropsFromJSONLD } from '../extractInlinePropsFromJSONLD';
import { DefinedState } from '../Client/types';
import { CardAppearance } from './types';
import { WithObject } from '../WithObject';
import {
  connectFailedEvent,
  connectSucceededEvent,
  trackAppAccountConnected,
} from '../analytics';

const getCollapsedIcon = (state: DefinedState): string | undefined => {
  const { data } = state;
  return (
    data && data.generator && data.generator.icon && data.generator.icon.url
  );
};

const renderBlockCard = (
  url: string,
  state: ObjectState,
  handleAuthorise: (() => void) | undefined,
  handleErrorRetry: () => void,
  handleFrameClick: () => void,
  isSelected?: boolean,
) => {
  switch (state.status) {
    case 'pending':
      return <CardLinkView text={url}>{url}</CardLinkView>;

    case 'resolving':
      return (
        <BlockCardResolvingView
          isSelected={isSelected}
          onClick={handleFrameClick}
        />
      );

    case 'resolved':
      return (
        <BlockCardResolvedView
          {...extractBlockPropsFromJSONLD(state.data || {})}
          isSelected={isSelected}
          onClick={handleFrameClick}
        />
      );

    case 'unauthorized':
      return (
        <BlockCardUnauthorisedView
          icon={getCollapsedIcon(state)}
          isSelected={isSelected}
          url={url}
          onClick={handleFrameClick}
          onAuthorise={handleAuthorise}
        />
      );

    case 'forbidden':
      return (
        <BlockCardForbiddenView
          url={url}
          isSelected={isSelected}
          onClick={handleFrameClick}
          onAuthorise={handleAuthorise}
        />
      );

    case 'not-found':
      return (
        <BlockCardErroredView
          url={url}
          isSelected={isSelected}
          message="We couldn't find this link"
          onClick={handleFrameClick}
        />
      );

    case 'errored':
      return (
        <BlockCardErroredView
          url={url}
          isSelected={isSelected}
          message="We couldn't load this link"
          onClick={handleFrameClick}
          onRetry={handleErrorRetry}
        />
      );
  }
};

const renderInlineCard = (
  url: string,
  state: ObjectState,
  handleAuthorise: (() => void) | undefined,
  handleFrameClick: () => void,
  isSelected?: boolean,
): React.ReactNode => {
  switch (state.status) {
    case 'pending':
      return <CardLinkView text={url}>{url}</CardLinkView>;

    case 'resolving':
      return (
        <InlineCardResolvingView
          url={url}
          isSelected={isSelected}
          onClick={handleFrameClick}
        />
      );

    case 'resolved':
      return (
        <InlineCardResolvedView
          {...extractInlinePropsFromJSONLD(state.data || {})}
          isSelected={isSelected}
          onClick={handleFrameClick}
        />
      );

    case 'unauthorized':
      return (
        <InlineCardUnauthorizedView
          icon={getCollapsedIcon(state)}
          url={url}
          isSelected={isSelected}
          onClick={handleFrameClick}
          onAuthorise={handleAuthorise}
        />
      );

    case 'forbidden':
      return (
        <InlineCardForbiddenView
          url={url}
          isSelected={isSelected}
          onClick={handleFrameClick}
          onAuthorise={handleAuthorise}
        />
      );

    case 'not-found':
      return (
        <InlineCardErroredView
          url={url}
          isSelected={isSelected}
          message="We couldn't find this link"
          onClick={handleFrameClick}
        />
      );

    case 'errored':
      return <CardLinkView text={url}>{url}</CardLinkView>;
  }
};

export type CardWithUrlContentProps = {
  client: Client;
  url: string;
  appearance: CardAppearance;
  onClick?: () => void;
  isSelected?: boolean;
  authFn: (startUrl: string) => Promise<void>;
} & WithAnalyticsEventProps;

export function CardWithUrlContent(props: CardWithUrlContentProps) {
  const {
    url,
    isSelected,
    onClick,
    client,
    appearance,
    createAnalyticsEvent,
    authFn,
  } = props;
  return (
    <WithObject
      client={client}
      url={url}
      isSelected={isSelected}
      appearance={appearance}
      createAnalyticsEvent={createAnalyticsEvent}
    >
      {({ state, reload }) => {
        // TODO: support multiple auth services
        const firstAuthService =
          (state as DefinedState).services &&
          (state as DefinedState).services[0];

        const handleAuthorise = () => {
          authFn(firstAuthService.startAuthUrl).then(
            () => {
              if (createAnalyticsEvent) {
                createAnalyticsEvent(
                  trackAppAccountConnected((state as any).definitionId),
                ).fire('media');
                createAnalyticsEvent(connectSucceededEvent(url, state)).fire(
                  'media',
                );
              }
              reload();
            },
            () => {
              if (createAnalyticsEvent) {
                createAnalyticsEvent(
                  // The outbound-auth-flow-client lib, when
                  // outbound-auth:failure happens rejects with
                  // a data.message.
                  // But I am not sure if I can use this message here
                  // as it might contain sensitive data.
                  connectFailedEvent('unknown', url, state),
                ).fire('media');
              }
              reload();
            },
          );
        };

        if (appearance === 'inline') {
          return renderInlineCard(
            url,
            state,
            firstAuthService ? handleAuthorise : undefined,
            () => (onClick ? onClick() : window.open(url)),
            isSelected,
          );
        }

        return renderBlockCard(
          url,
          state,
          firstAuthService ? handleAuthorise : undefined,
          reload,
          () => (onClick ? onClick() : window.open(url)),
          isSelected,
        );
      }}
    </WithObject>
  );
}
