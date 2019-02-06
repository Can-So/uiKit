import { InvitationsCapabilitiesRequest } from '../api/InvitationsCapabilitiesResource';
import { ShareRequest } from '../clients/ShareServiceClient';

export interface Client {
  getCapabilities: InvitationsCapabilitiesRequest;
  share: ShareRequest;
}
