import {
  RequestServiceOptions,
  utils,
  ServiceConfig,
} from '@atlaskit/util-service-support';

export interface InvitationCapabilitiesProvider {
  getCapabilities: () => Promise<InvitationsCapabilitiesResponse>;
}

type InvitationsCapabilitiesResponse = {
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
  implements InvitationCapabilitiesProvider {
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
    // we might need an ARI resolver in the future
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
