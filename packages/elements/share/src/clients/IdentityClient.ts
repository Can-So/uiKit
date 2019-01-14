import {
  RequestServiceOptions,
  utils,
  ServiceConfig,
} from '@atlaskit/util-service-support';

export interface IdentityClient {
  getInvitationsCapabilities: () => Promise<InvitationsCapabilities>;
}

type InvitationsCapabilities = {
  directInvite?: DirectInviteCapabilities;
  invitePendingApproval?: RequestAccessCapabilities;
};

type DirectInviteCapabilities = {
  mode: 'NONE' | 'ANYONE' | 'DOMAIN_RESTRICTED';
  domains: string[];
  permittedResources: string[];
};

type RequestAccessCapabilities = {
  mode: 'NONE' | 'ANYONE';
  permittedResources: string[];
};

export const INVITATIONS_CAPABILITIES_PATH = 'invitations/capabilities';
export const ID_PUBLIC_FACADE_URL = '/gateway/api';

export class IdentityClientImpl implements IdentityClient {
  private cloudId: string;
  private serviceConfig: ServiceConfig;

  constructor(cloudId: string) {
    this.cloudId = cloudId;
    this.serviceConfig = {
      url: ID_PUBLIC_FACADE_URL,
    };
  }

  public async getInvitationsCapabilities() {
    const cloudId = this.cloudId;
    // we might need an ARI resolver in the future
    const ari = `ari:cloud:platform::site/${cloudId}`;
    const options: RequestServiceOptions = {
      path: INVITATIONS_CAPABILITIES_PATH,
      queryParams: {
        resource: ari,
      },
    };

    try {
      return await utils.requestService<InvitationsCapabilities>(
        this.serviceConfig,
        options,
      );
    } catch (err) {
      return err;
    }
  }
}
