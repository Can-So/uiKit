export type OriginTracingWithIdGenerated = {
  originIdGenerated: string;
  originProduct: string;
};

export type OriginTracingForSubSequentEvents = {
  originId: string;
  originProduct: string;
};

export type OriginTracing = {
  id: string;
  addToUrl: (link: string) => string;
  toAnalyticsAttributes: (
    { hasGeneratedId: boolean },
  ) => OriginTracingWithIdGenerated | OriginTracingForSubSequentEvents;
};

export type OriginTracingFactory = () => OriginTracing;
