import {
  Email,
  EmailValidationResponse,
  isEmail,
  isValidEmail,
  OptionData,
  Value,
} from '@atlaskit/user-picker';
import memoizeOne from 'memoize-one';
import {
  ConfigResponse,
  ConfigResponseMode,
  User,
  UserWithEmail,
} from '../types';

const matchAllowedDomains = memoizeOne(
  (domain: string, config: ConfigResponse | undefined) => {
    return (
      config &&
      config.allowedDomains &&
      config.allowedDomains.indexOf(domain) !== -1
    );
  },
);

const cannotInvite = (
  config: ConfigResponse,
  userDomains: Set<string>,
): boolean => {
  for (const domain of userDomains) {
    if (!matchAllowedDomains(domain, config)) {
      return true;
    }
  }
  return false;
};

const extractDomain = (email: string) => email.replace(/^[^@]+@(.+)$/, '$1');

const removeDuplicates = (values: Set<string>, nextValue: string) =>
  values.add(nextValue);

const checkDomains = (
  config: ConfigResponse,
  selectedUsers: Email[],
): boolean => {
  const usersDomain = selectedUsers.reduce(
    (set, email) => removeDuplicates(set, extractDomain(email.id)),
    new Set<string>(),
  );
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

export const allowEmails = (config?: ConfigResponse) =>
  config && config.mode !== 'EXISTING_USERS_ONLY';

const needToCheckDomain = (config?: ConfigResponse) =>
  config && config.mode === 'ONLY_DOMAIN_BASED_INVITE';

export const isValidEmailUsingConfig = memoizeOne(
  (config: ConfigResponse | undefined) => {
    const checkDomain = needToCheckDomain(config);
    return (inputText: string): EmailValidationResponse => {
      const result = isValidEmail(inputText);
      if (
        result === 'VALID' &&
        checkDomain &&
        !matchAllowedDomains(extractDomain(inputText), config)
      ) {
        return 'POTENTIAL';
      }
      return result;
    };
  },
);
