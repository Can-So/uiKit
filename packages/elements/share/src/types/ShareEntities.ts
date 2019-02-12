export type Content = {
  ari: string;
  link: string;
  title: string;
};

export type Comment = {
  format: 'plain_text' | 'adf';
  value: string;
};

// In Draft and TBC
// This pair of metadata is required for every invite call
// AtlOrigin is used to track the life of a share action
// A share action is divided into 2 types, i.e. Atlassian Account holder and New users,
// with corresponding expected follow up actions, i.e. Login and Sign up.
// for more info, visit:
// https://hello.atlassian.net/wiki/spaces/~804672962/pages/379043535/Draft+Origin+Tracing+in+Common+Share+Component
export type MetaData = {
  productId: string;
  tracking: {
    toAtlassianAccountHolders: {
      atlOriginId: string;
    };
    toNewUsers: {
      atlOriginId: string;
    };
  };
};
