import { Email, isEmail, OptionData, Value } from '@atlaskit/user-picker';
import { InvitationsCapabilitiesResponse, User } from '../types';
import { UserWithEmail } from '../types/User';

const cannotInvite = (
  capabilities: InvitationsCapabilitiesResponse,
  userDomains: Set<string>,
): boolean => {
  if (capabilities.directInvite.domains) {
    const allowedDomains = capabilities.directInvite.domains;
    for (const domain of userDomains) {
      if (allowedDomains.indexOf(domain) === -1) {
        return true;
      }
    }
  }
  return false;
};

const extractDomain = (user: Email) => user.id.replace(/^[^@]+@(.+)$/, '$1');

const removeDuplicates = (values: Set<string>, nextValue: string) =>
  values.add(nextValue);

const checkDomains = (
  capabilities: InvitationsCapabilitiesResponse,
  selectedUsers: Email[],
): boolean => {
  const usersDomain = selectedUsers
    .map(extractDomain)
    .reduce(removeDuplicates, new Set<string>());
  return cannotInvite(capabilities, usersDomain);
};

/**
 * Decides if the warn message should be shown in the share form.
 *
 * @param capabilities capabilities meta data
 * @param selectedUsers selected users in the user picker
 */
export const showInviteWarning = (
  capabilities: InvitationsCapabilitiesResponse | undefined,
  selectedUsers: Value,
): boolean => {
  if (capabilities && selectedUsers) {
    const { mode } = capabilities.directInvite;
    const selectedEmails: Email[] = Array.isArray(selectedUsers)
      ? selectedUsers.filter(isEmail)
      : [selectedUsers].filter(isEmail);
    return (
      selectedEmails.length > 0 &&
      (mode === 'NONE' ||
        (mode === 'DOMAIN_RESTRICTED' &&
          checkDomains(capabilities, selectedEmails)))
    );
  }
  return false;
};

export const optionDataToUsers = (optionDataArray: OptionData[]): User[] =>
  optionDataArray.map((optionData: OptionData) => {
    switch (optionData.type) {
      case 'email':
        const user: UserWithEmail = {
          type: 'user',
          email: optionData.id,
        };
        return user;
      default:
        return {
          type: optionData.type || 'user',
          id: optionData.id,
        };
    }
  });
