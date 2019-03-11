export interface TriggerXFlowCallback {
  (productKey: string, sourceComponent: string): void;
}

export interface WithCloudId {
  cloudId: string;
}

export interface RecentContainer {
  name: string;
  url: string;
  objectId: string;
  iconUrl: string;
  type: string;
}

export interface CustomLink {
  key: string;
  label: string;
  link: string;
}

export enum Permissions {
  MANAGE = 'manage',
  CAN_INVITE_USERS = 'invite-users',
  ADD_PRODUCTS = 'add-products',
}

export type CustomLinksResponse = [Array<CustomLink>, string];

export interface LicenseInformationResponse {
  hostname: string;
  products: {
    [key: string]: {
      state: string;
    };
  };
}

export interface XFlowSettingsResponse {
  'product-suggestions-enabled'?: boolean;
}

export interface UserPermissionResponse {
  permitted: boolean;
}

export interface RecentContainersResponse {
  data: Array<RecentContainer>;
}

// window.requestIdleCallback types
type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};

declare global {
  interface Window {
    requestIdleCallback: ((
      callback: ((deadline: RequestIdleCallbackDeadline) => void),
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle);
    cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
  }
}
