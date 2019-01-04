import { userPickerData } from '@atlaskit/util-data-test';
import { OptionData } from '../src/types';

export const exampleOptions = userPickerData as OptionData[];

export const unassigned = { id: 'unassign', name: 'Unassigned' };
export const assignToMe = { id: 'assign-me', name: 'Assign to me' };

export const filterUsers = (searchText: string): OptionData[] =>
  exampleOptions.filter(
    user => user.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
  );
