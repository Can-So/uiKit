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
];
const editorTeam = [
  'imsysoev',
  'jyotiatl',
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
];
const elementsTeam = [
  'sguillope',
  'eduardo_soares',
  'Craig_Petchell',
  'jhoarau',
  'ttjandra',
  'pcurren',
];
// Jono is a special case atm, and his team doesn't have a name
const jono = ['jonathan_yeo'];
const mediaTeam = [
  'sattard',
  'mjames91',
  'alichamas',
  'jluong',
  'amotsjonov',
  'hzarcogarcia',
  'jamesnewell',
  'abodera',
  'vvvlasov',
];
const searchAndSmartsTeam = ['drichard', 'pteen', 'ashwini_rattihalli'];
const usersAllowedToApprove = [].concat(
  atlaskitTeam,
  editorTeam,
  elementsTeam,
  jono,
  mediaTeam,
  searchAndSmartsTeam,
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
    usersAllowedToApprove: usersAllowedToApprove,
  },
  ciConfig: {
    botUsername: botUsername,
    botPassword: botPassword,
    repoOwner: repoOwner,
    repoName: repoName,
  },
};
