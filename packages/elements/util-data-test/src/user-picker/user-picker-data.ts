declare var require: {
  <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
const userPickerUserData = require('../json-data/user-picker-user-data.json') as any; // User from @atlaskit/user-picker
const userPickerTeamData = require('../json-data/user-picker-team-data.json') as any; // Team from @atlaskit/user-picker

const userPickerData = userPickerUserData.concat(userPickerTeamData);

export default userPickerData;
