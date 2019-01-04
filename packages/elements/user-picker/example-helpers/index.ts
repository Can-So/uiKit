import { userPickerData } from '@atlaskit/util-data-test';
import { User } from '../src/types';

export const exampleUsers = userPickerData as User[];

export const unassigned = { id: 'unassign', name: 'Unassigned' };
export const assignToMe = { id: 'assign-me', name: 'Assign to me' };

export const filterUsers = (searchText: string): User[] =>
  exampleUsers.filter(
    user => user.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
  );
