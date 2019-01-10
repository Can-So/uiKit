import {
  RequestServiceOptions,
  utils,
  ServiceConfig,
} from '@atlaskit/util-service-support';

export interface IdentityClient {
  getInvitationsCapabilities: () => Promise<InvitationsCapabilities>;
}

export type InvitationsCapabilities = {
  directInvite?: DirectInviteCapabilities;
  invitePendingApproval?: RequestAccessCapabilities;
};

export type DirectInviteCapabilities = {
  mode: 'NONE' | 'ANYONE' | 'DOMAIN_RESTRICTED';
  domains: string[];
  permittedResources: string[];
};

export type RequestAccessCapabilities = {
  mode: 'NONE' | 'ANYONE';
  permittedResources: string[];
};

const INVITATIONS_CAPABILITIES_PATH = 'invitations/capabilities';

export class IdentityClientImpl implements IdentityClient {
  private cloudId: string;
  private serviceConfig: ServiceConfig;

  constructor(cloudId: string) {
    this.cloudId = cloudId;
    this.serviceConfig = {
      url: '/gateway/api',
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
