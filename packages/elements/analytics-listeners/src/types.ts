export type AnalyticsWebClient = {
  sendUIEvent: (event: any) => void;
  sendOperationalEvent: (event: any) => void;
  sendTrackEvent: (event: any) => void;
  sendScreenEvent: (event: any) => void;
};
