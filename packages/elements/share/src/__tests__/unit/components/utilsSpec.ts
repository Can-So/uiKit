import { OptionData } from '@atlaskit/user-picker';
import { showInviteWarning } from '../../../components/utils';
import { ConfigResponse, ConfigResponseMode } from '../../../types';

describe('utils functions', () => {
  describe('showInviteWarning', () => {
    const noUsersSelected: OptionData[] = [];
    const emailUsersSelected: OptionData[] = [
      {
        type: 'email',
        id: 'chandra@atlassian.com',
        name: 'chandra@atlassian.com',
      },
    ];
    const selectedUsersWithoutEmail: OptionData[] = [
      {
        type: 'user',
        id: 'abc-123',
        name: 'Nissa',
      },
    ];
    const createConfig = (
      mode: ConfigResponseMode,
      domains?: string[],
    ): ConfigResponse => ({
      mode,
      allowedDomains: domains,
    });

    /**
     * `EXISTING_USERS_ONLY` - Emails not allowed.
     * `INVITE_NEEDS_APPROVAL` - Always show warning message if email options.
     * `ONLY_DOMAIN_BASED_INVITE` - Only allow emails within the allowed domains. Check allowedDomains property.
     * `DOMAIN_BASED_INVITE` - Show warning message when it doesn't match allowed domains. Check allowedDomains property.
     * `ANYONE` - Never show warning message.
     */
    describe.each`
      mode                          | no Users | no Emails | match Domain | do Not Match Domain
      ${undefined}                  | ${false} | ${false}  | ${false}     | ${false}
      ${'EXISTING_USERS_ONLY'}      | ${false} | ${false}  | ${true}      | ${true}
      ${'INVITE_NEEDS_APPROVAL'}    | ${false} | ${false}  | ${true}      | ${true}
      ${'ONLY_DOMAIN_BASED_INVITE'} | ${false} | ${false}  | ${false}     | ${true}
      ${'DOMAIN_BASED_INVITE'}      | ${false} | ${false}  | ${false}     | ${true}
      ${'ANYONE'}                   | ${false} | ${false}  | ${false}     | ${false}
    `('$mode', ({ mode, noUsers, noEmails, matchDomain, doNotMatchDomain }) => {
      it.each`
        options                      | domains              | expected
        ${noUsersSelected}           | ${[]}                | ${noUsers}
        ${selectedUsersWithoutEmail} | ${[]}                | ${noEmails}
        ${emailUsersSelected}        | ${['atlassian.com']} | ${matchDomain}
        ${emailUsersSelected}        | ${['trello.com']}    | ${doNotMatchDomain}
      `(
        `should return $expected for ${mode}, $domains and $options`,
        ({ options, domains, expected }) => {
          expect(
            showInviteWarning(createConfig(mode, domains), options),
          ).toEqual(expected);
        },
      );
    });
  });
});
