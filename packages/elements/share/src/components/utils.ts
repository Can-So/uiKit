import { Email, isEmail, OptionData, Value } from '@atlaskit/user-picker';
import {
  ConfigResponse,
  ConfigResponseMode,
  User,
  UserWithEmail,
} from '../types';

const cannotInvite = (
  config: ConfigResponse,
  userDomains: Set<string>,
): boolean => {
  const { allowedDomains } = config;
  if (allowedDomains) {
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
  config: ConfigResponse,
  selectedUsers: Email[],
): boolean => {
  const usersDomain = selectedUsers
    .map(extractDomain)
    .reduce(removeDuplicates, new Set<string>());
  return cannotInvite(config, usersDomain);
};

/**
 * Decides if the warn message should be shown in the share form.
 *
 * @param config share configuration object
 * @param selectedUsers selected users in the user picker
 */
export const showInviteWarning = (
  config: ConfigResponse | undefined,
  selectedUsers: Value,
): boolean => {
  if (config && selectedUsers) {
    const mode: ConfigResponseMode = config.mode;
    const selectedEmails: Email[] = Array.isArray(selectedUsers)
      ? selectedUsers.filter(isEmail)
      : [selectedUsers].filter(isEmail);
    return (
      selectedEmails.length > 0 &&
      (mode === 'EXISTING_USERS_ONLY' ||
        mode === 'INVITE_NEEDS_APPROVAL' ||
        ((mode === 'ONLY_DOMAIN_BASED_INVITE' ||
          mode === 'DOMAIN_BASED_INVITE') &&
          checkDomains(config, selectedEmails)))
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
