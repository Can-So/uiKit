import { OptionData } from '@atlaskit/user-picker';
import { showInviteWarning } from '../../../components/utils';
import { InvitationsCapabilitiesResponse } from '../../../types';

describe('utils functions', () => {
  describe('showInviteWarning', () => {
    const emailJace: OptionData = {
      type: 'email',
      id: 'jace@wotc.com',
      name: 'jace@wotc.com',
    };
    const nissa: OptionData = {
      type: 'user',
      id: 'abc-123',
      name: 'Nissa',
    };
    const noUsersSelected: OptionData[] = [];
    const emailUsersSelected: OptionData[] = [emailJace];
    const selectedUsersWithoutEmail: OptionData[] = [nissa];
    const createCapabilities = (
      mode: 'NONE' | 'ANYONE' | 'DOMAIN_RESTRICTED',
      domains?: string[],
    ) => ({
      directInvite: {
        mode,
        domains,
        permittedResources: [],
      },
      invitePendingApproval: {
        mode: 'NONE',
        permittedResources: [],
      },
    });

    test.each([
      [false, undefined, noUsersSelected],
      [false, undefined, emailUsersSelected],
      [true, createCapabilities('NONE'), emailUsersSelected],
      [false, createCapabilities('NONE'), selectedUsersWithoutEmail],
      [false, createCapabilities('NONE'), noUsersSelected],
      [false, createCapabilities('ANYONE'), emailUsersSelected],
      [false, createCapabilities('ANYONE'), selectedUsersWithoutEmail],
      [false, createCapabilities('ANYONE'), noUsersSelected],
      [
        false,
        createCapabilities('DOMAIN_RESTRICTED', ['wotc.com']),
        emailUsersSelected,
      ],
      [
        true,
        createCapabilities('DOMAIN_RESTRICTED', ['atlassian.com']),
        emailUsersSelected,
      ],
      [
        false,
        createCapabilities('DOMAIN_RESTRICTED', ['atlassian.com']),
        selectedUsersWithoutEmail,
      ],
      [
        false,
        createCapabilities('DOMAIN_RESTRICTED', ['atlassian.com']),
        noUsersSelected,
      ],
    ])(
      'should return %p when called with (%p, %p)',
      (
        expected: boolean,
        capabilities: InvitationsCapabilitiesResponse | undefined,
        selectedUsers: OptionData[],
      ) => {
        expect(showInviteWarning(capabilities, selectedUsers)).toBe(expected);
      },
    );
  });
});
