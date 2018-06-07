import Logger from './helpers/logger';

export type AnalyticsWebClient = {
  sendUIEvent: (event: any) => void;
  sendOperationalEvent: (event: any) => void;
  sendTrackEvent: (event: any) => void;
  sendScreenEvent: (event: any) => void;
};

export type ListenerProps = {
  children?: React.ReactNode;
  client: Promise<AnalyticsWebClient>;
  logger: Logger;
};

export type EventNextType = {
  payload: {
    action: string;
    [key: string]: any;
  };
  context: Array<{}>;
};

export type ListenerFunction = (event: EventNextType) => void;
