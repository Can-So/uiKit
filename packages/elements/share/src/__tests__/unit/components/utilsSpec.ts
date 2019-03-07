import { OptionData } from '@atlaskit/user-picker';
import {
  isValidEmailUsingConfig,
  showInviteWarning,
} from '../../../components/utils';
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
      allowComment: true,
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

  describe('isValidEmailUsingConfig', () => {
    const defaultBehavior = [
      ['INVALID', ''],
      ['INVALID', ' '],
      ['INVALID', 'abc'],
      ['INVALID', '123'],
      ['POTENTIAL', 'someEmail@'],
      ['POTENTIAL', 'someEmail@atlassian'],
      ['VALID', 'someEmail@atlassian.com'],
    ];

    const onlyDomainBasedBehavior = [
      ['INVALID', ''],
      ['INVALID', ' '],
      ['INVALID', 'abc'],
      ['INVALID', '123'],
      ['POTENTIAL', 'someEmail@'],
      ['POTENTIAL', 'someEmail@atlassian'],
      ['POTENTIAL', 'someEmail@trello.com'],
      ['VALID', 'someEmail@atlassian.com'],
    ];
    describe.each`
      mode                          | domains              | behavior
      ${undefined}                  | ${undefined}         | ${defaultBehavior}
      ${'EXISTING_USERS_ONLY'}      | ${undefined}         | ${defaultBehavior}
      ${'INVITE_NEEDS_APPROVAL'}    | ${undefined}         | ${defaultBehavior}
      ${'ONLY_DOMAIN_BASED_INVITE'} | ${['atlassian.com']} | ${onlyDomainBasedBehavior}
      ${'DOMAIN_BASED_INVITE'}      | ${['atlassian.com']} | ${defaultBehavior}
      ${'ANYONE'}                   | ${undefined}         | ${defaultBehavior}
    `('$mode', ({ mode, domains, behavior }) => {
      const isValidEmail = isValidEmailUsingConfig({
        mode,
        allowedDomains: domains,
        allowComment: true, // doesn't change anything
      });
      test.each(behavior)(
        'should return "%s" for "%s" input text',
        (expectation, inputText) => {
          expect(isValidEmail(inputText)).toEqual(expectation);
        },
      );
    });
  });
});
