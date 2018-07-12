// This file should never be checked in and is only used for local testing

const botUsername = process.env.BITBUCKET_USERNAME;
const botPassword = process.env.BITBUCKET_PASSWORD;
const prodBaseUrl =
  'https://atlaskit-atlaskid.us-west-1.staging.public.atl-paas.net';
const devBaseUrl =
  'https://atlaskit-atlaskid.ap-southeast-2.dev.public.atl-paas.net';
const repoOwner = 'atlassian';
const repoName = 'atlaskit-mk-2';
// Sorting these lists into teams to make this easier to maintain
const atlaskitTeam = [
  'luke_batchelor',
  'treshugart',
  'mathurajay',
  'charles_tm',
  'bconolly',
  'raja07',
  'thejameskyle',
  'mblaszczyk-atlassian',
  'jmackison',
  'scurtis',
  'jaredcroweatlassian',
  'jedw',
  'alexreardon',
  'pete_gleeson',
  'mgardiner_atlas',
  'padmaia',
  'isriharsha', // Navteam
];
const editorTeam = [
  'imsysoev',
  'jyotiatl',
  'atlasmarco',
  'ed919',
  'scottsidwell',
  'rifat_nabi',
  'ckrishnakumar',
  'ttjandra',
  'owallhult',
  'dsorin',
  'jmack2',
  'supertong',
  'pcurren',
  'agnes',
  'vsutrave',
  'ahixon_atlassian',
  'wangjerome',
  'nathanflew',
];
const elementsTeam = [
  'sguillope',
  'eduardo_soares',
  'Craig_Petchell',
  'jhoarau',
  'ttjandra',
  'pcurren',
  'lgpereira',
];
// Jono is a special case atm, and his team doesn't have a name
const jono = ['jonathan_yeo'];
const mediaTeam = [
  'hzarcogarcia',
  'sattard',
  'mjames91',
  'alichamas',
  'jluong',
  'amotsjonov',
  'jamesnewell',
  'abodera',
  'vvvlasov',
  'dklinnert',
  'iloire-atlassian',
  'ivandemchenko',
];
const searchAndSmartsTeam = [
  'drichard',
  'pteen',
  'ashwini_rattihalli',
  'fo2ad',
];
const kitkatTeam = [
  'kamil-kaczmarczyk',
  'mszerszynski',
  'kziajka123',
  'pmurawski_atlassian',
  'vpetrychuk',
  'bgryta',
];
const usersAllowedToApprove = [].concat(
  atlaskitTeam,
  editorTeam,
  elementsTeam,
  jono,
  mediaTeam,
  searchAndSmartsTeam,
  kitkatTeam,
);

module.exports = {
  host: 'bitbucket',
  ci: 'bitbucket-pipelines',
  baseUrl: prodBaseUrl,
  port: 8080,
  hostConfig: {
    botUsername: botUsername,
    botPassword: botPassword,
    repoOwner: repoOwner,
    repoName: repoName,
    repoUuid: '{6380b4e9-6ac5-4dd4-a8e0-65f09cabe4c8}',
  },
  ciConfig: {
    botUsername: botUsername,
    botPassword: botPassword,
    repoOwner: repoOwner,
    repoName: repoName,
  },
  prSettings: {
    requiredApprovals: 1,
    canApproveOwnPullRequest: false,
    requireClosedTasks: true,
    requireGreenBuild: true,
    allowLandWhenAble: true,
    usersAllowedToApprove: usersAllowedToApprove,
  },
};
