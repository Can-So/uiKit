declare var require: {
  <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
export const userPickerUserData = require('../json-data/user-picker-user-data.json') as any; // User from @atlaskit/user-picker
export const userPickerTeamData = require('../json-data/user-picker-team-data.json') as any; // Team from @atlaskit/user-picker
