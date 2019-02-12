import {
  RequestServiceOptions,
  utils,
  ServiceConfig,
} from '@atlaskit/util-service-support';

export interface InvitationsCapabilitiesProvider {
  getCapabilities: InvitationsCapabilitiesRequest;
}

export type InvitationsCapabilitiesRequest = () => Promise<
  InvitationsCapabilitiesResponse
>;

export type InvitationsCapabilitiesResponse = {
  directInvite: DirectInviteCapabilities;
  invitePendingApproval: RequestAccessCapabilities;
};

type DirectInviteCapabilities = {
  mode: 'NONE' | 'ANYONE' | 'DOMAIN_RESTRICTED';
  domains?: string[];
  permittedResources: string[];
};

type RequestAccessCapabilities = {
  mode: 'NONE' | 'ANYONE';
  permittedResources: string[];
};

export const DEFAULT_INVITATIONS_CAPABILITIES_PATH = 'invitations/capabilities';
export const DEFAULT_ID_PUBLIC_FACADE_URL = '/gateway/api';

export class InvitationsCapabilitiesResource
  implements InvitationsCapabilitiesProvider {
  private cloudId: string;
  private serviceConfig: ServiceConfig;

  constructor(cloudId: string, serviceConfig?: ServiceConfig) {
    this.cloudId = cloudId;
    this.serviceConfig = serviceConfig || {
      url: DEFAULT_ID_PUBLIC_FACADE_URL,
    };
  }

  public getCapabilities(): Promise<InvitationsCapabilitiesResponse> {
    const cloudId = this.cloudId;
    const ari = `ari:cloud:platform::site/${cloudId}`;
    const options: RequestServiceOptions = {
      path: DEFAULT_INVITATIONS_CAPABILITIES_PATH,
      queryParams: {
        resource: ari,
      },
    };

    return utils.requestService(this.serviceConfig, options);
  }
}
