import {
  userPickerUserData,
  userPickerTeamData,
} from '@atlaskit/util-data-test';
import { User, Team } from '../src/types';

const exampleUsers = userPickerUserData as User[];
const exampleTeams = userPickerTeamData as Team[];

export const exampleOptions = exampleUsers.concat(exampleTeams);

export const unassigned = { id: 'unassign', name: 'Unassigned' };
export const assignToMe = { id: 'assign-me', name: 'Assign to me' };

export const filterUsers = (searchText: string): User[] =>
  exampleUsers.filter(
    user => user.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
  );
