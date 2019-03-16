import { AkProfileClient } from '@findable/profilecard';

export interface ProfileCardAction {
  callback: () => void;
  label: string;
}

export interface ProfilecardProvider {
  cloudId: string;
  resourceClient: AkProfileClient;
  getActions: (
    id: string,
    text: string,
    accessLevel?: string,
  ) => ProfileCardAction[];
}
