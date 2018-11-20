/**
 * Once copy is finalised, these message objects should be wrapped in a call to react-intl::defineMessages()
 * This makes them visible to the i18n pipeline where they'll receive translations from Transifex.
 */

export const commonMessages = {
  deactivateAccount: {
    id: 'focused-task-close-account.deactivate-account',
    defaultMessage: 'Deactivate account',
    description:
      'Text that appears in a button, link or heading for the action of deactivating an account',
  },

  deleteAccount: {
    id: 'focused-task-close-account.delete-account',
    defaultMessage: 'Delete account',
    description:
      'Text that appears in a button, link or heading for the action of deleting an account',
  },

  learnMore: {
    id: 'focused-task-close-account.learnMore',
    defaultMessage: 'Learn more',
    description:
      'Text for a link to a page where a user can learn more about a particular topic',
  },

  cancel: {
    id: 'focused-task-close-account.cancel',
    defaultMessage: 'Cancel',
    description:
      'Text for a button for a user to cancel the current task/process',
  },

  next: {
    id: 'focused-task-close-account.next',
    defaultMessage: 'Next',
    description:
      'Text for a button for a user to proceed to the next step of a process',
  },

  previous: {
    id: 'focused-task-close-account.previous',
    defaultMessage: 'Previous',
    description:
      'Text for a button for a user to go back to the previous step of a process',
  },
};

export const overviewMessages = {
  heading: {
    id: 'focused-task-close-account.delete-account.overview.heading',
    defaultMessage: 'Delete account',
    description:
      "Heading for the screen that explains what happens when a user's account is deleted",
  },

  firstLineSelf: {
    id: 'focused-task-close-account.delete-account.overview.first.line.self',
    defaultMessage: "You're about to delete your account:",
    description:
      'First line for the screen when the admin is about to delete another user',
  },

  firstLineAdmin: {
    id: 'focused-task-close-account.delete-account.overview.first.line.admin',
    defaultMessage: "You're about to delete the account of:",
    description:
      'First line for the screen when the user is about to delete their own account',
  },

  warningSectionBody: {
    id:
      'focused-task-close-account.delete-account.overview.warning-section.body',
    defaultMessage:
      "You can't undo deleting the account after 14 days. If you think you’ll need the account later, deactivate it instead.",
    description:
      'A warning message shown to users when they try to delete their account.',
  },

  paragraphAboutToDeleteAdmin: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.about-to-delete.admin',
    defaultMessage: 'When you delete the account:',
    description:
      'A paragraph explaining that the admin is about to delete another user',
  },
  paragraphAboutToDeleteSelf: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.about-to-delete.self',
    defaultMessage: 'When you delete your account:',
    description:
      'A paragraph explaining that user is about to delete their own account',
  },

  paragraphLoseAccessAdmin: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.loseAccess.admin',
    defaultMessage:
      '{fullName} will <b>immediately lose access</b> to all Atlassian services, including sites and products. They currently have access to these services:',
    description:
      'A paragraph explaining that upon deletion the user will lose access to certain services. The second sentence is to begin a list of services the user-to-be-deleted can currently access. {fullName} is filled in by the web app.',
  },
  paragraphLoseAccessSelf: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.loseAccess.self',
    defaultMessage:
      "You'll <b>immediately lose access</b> to all Atlassian services, including sites and products. You currently have access to:",
    description:
      'A paragraph explaining that upon deletion the user will lose access to certain services. The second sentence is to begin a list of services the user-to-be-deleted can currently access.',
  },

  paragraphLoseAccessAdminNoSites: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.loseAccess.admin.noSites',
    defaultMessage:
      '{fullName} will <b>immediately lose access</b> to all Atlassian services, including sites and products. Currently, they don’t have access to any, except <a href="https://confluence.atlassian.com/display/Cloud/Organization+administration">services</a> ' +
      'like Community and Marketplace. ',
    description:
      'A paragraph explaining that upon deletion the user will lose access to certain services. The second sentence is to begin a list of services the user-to-be-deleted can currently access. {fullName} is filled in by the web app.',
  },
  paragraphLoseAccessSelfNoSites: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.loseAccess.self.noSites',
    defaultMessage:
      "You'll <b>immediately lose access</b> to all Atlassian services, including sites and products.",
    description:
      'A paragraph explaining that upon deletion the user will lose access to certain services. The second sentence is to begin a list of services the user-to-be-deleted can currently access.',
  },

  paragraphLoseAccessFootnote: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.loseAccess.footnote',
    defaultMessage:
      'Other Atlassian services, such as Atlassian Community and Marketplace. ',
    description:
      "A paragraph explaining that upon deletion the user may also lose access to services that weren't listed prior.",
  },

  paragraphContentCreatedAdmin: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.content-created.admin',
    defaultMessage:
      "The content they've created will remain in Atlassian services.",
    description:
      "A paragraph explaining that although the user's details will be deleted, content they have created will remain.",
  },
  paragraphContentCreatedSelf: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.content-created.self',
    defaultMessage:
      "The content you've created will remain in Atlassian services.",
    description:
      "A paragraph explaining that although the user's details will be deleted, content they have created will remain.",
  },

  inlineDialogContentCreatedAdmin: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.content-created.admin',
    defaultMessage:
      "For example, pages, issues, and comments they've created in products.",
    description:
      'Examples of what constitutes as created content. Appears when the user hovers over the info icon',
  },
  inlineDialogContentCreatedSelf: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.content-created.self',
    defaultMessage:
      "For example, pages, issues, and comments you've created in products.",
    description:
      'Examples of what constitutes as created content. Appears when the user hovers over the info icon',
  },

  paragraphPersonalDataWillBeDeletedAdmin: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.personal-data-will-be-deleted.admin',
    defaultMessage:
      "We'll <b>delete their personal data</b>, such as their full name and email address, from Atlassian services within 30 days, " +
      'except in a few cases where required for legitimate business or legal purposes.',
    description:
      "A paragraph explaining what parts of the user's personal data will be deleted",
  },
  paragraphPersonalDataWillBeDeletedSelf: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.personal-data-will-be-deleted.self',
    defaultMessage:
      "We'll <b>delete your personal data</b>, such as your full name and email address, from Atlassian services within 30 days, " +
      'except in a few cases where required for legitimate business or legal purposes.',
    description:
      "A paragraph explaining what parts of the user's personal data will be deleted",
  },

  paragraphListOfAppsWithPersonalDataAdmin: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.list-of-apps-with-personal-data.admin',
    defaultMessage:
      'We’ll email you a list of apps that may have stored their personal data.',
    description: 'A note explaining that about apps storing personal data',
  },

  paragraphListOfAppsWithPersonalDataSelf: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.list-of-apps-with-personal-data.self',
    defaultMessage:
      'We’ll email you a list of apps that may have stored your personal data.',
    description: 'A note explaining that about apps storing personal data',
  },

  paragraphGracePeriodAdmin: {
    id:
      'focused-task-close-account.delete-account.overview.paragraph.grace-period.admin',
    defaultMessage:
      'After a 14-day grace period, you won’t be able to cancel the deletion of the account.',
    description: 'A note explaining about the grace period',
  },

  inlineDialogDataWillBeDeletedP1Admin: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.personal-data-will-be-deleted.p1.admin',
    defaultMessage:
      'We keep personal data for limited periods when we have legitimate business or legal purposes. Some examples include:',
    description:
      'Text elaborating on the note that some personal data is required to be saved from deletion for legal purposes.',
  },
  inlineDialogDataWillBeDeletedP1Self: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.personal-data-will-be-deleted.p1.self',
    defaultMessage:
      'We keep personal data for limited periods when we have legitimate business or legal purposes. Some examples include:',
    description:
      'Text elaborating on the note that some personal data is required to be saved from deletion for legal purposes.',
  },

  inlineDialogDataWillBeDeletedLi1Admin: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.personal-data-will-be-deleted.li1.admin',
    defaultMessage:
      "Information related to purchases, which we're required to keep for financial reporting.",
    description:
      'Text elaborating on the note that some personal data is required to be saved from deletion for legal purposes.',
  },

  inlineDialogDataWillBeDeletedLi1Self: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.personal-data-will-be-deleted.li1.self',
    defaultMessage:
      "Information related to purchases, which we're required to keep for financial reporting.",
    description:
      'Text elaborating on the note that some personal data is required to be saved from deletion for legal purposes.',
  },

  inlineDialogDataWillBeDeletedLi2Admin: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.personal-data-will-be-deleted.li2.admin',
    defaultMessage:
      "Records showing that we deleted someone's account, which we may need to provide to regulators.",
    description:
      'Text elaborating on the note that some personal data is required to be saved from deletion for legal purposes.',
  },

  inlineDialogDataWillBeDeletedLi2Self: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.personal-data-will-be-deleted.li2.self',
    defaultMessage:
      "Records showing that we deleted someone's account, which we may need to provide to regulators.",
    description:
      'Text elaborating on the note that some personal data is required to be saved from deletion for legal purposes.',
  },

  inlineDialogDataWillBeDeletedLi3Admin: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.personal-data-will-be-deleted.li3.admin',
    defaultMessage:
      "Data that's part of an active lawsuit, which we're required to keep by law.",
    description:
      'Text elaborating on the note that some personal data is required to be saved from deletion for legal purposes.',
  },

  inlineDialogDataWillBeDeletedLi3Self: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.personal-data-will-be-deleted.li3.self',
    defaultMessage:
      "Data that's part of an active lawsuit, which we're required to keep by law.",
    description:
      'Text elaborating on the note that some personal data is required to be saved from deletion for legal purposes.',
  },

  inlineDialogDataWillBeDeletedP2Admin: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.personal-data-will-be-deleted.p2.admin',
    defaultMessage:
      'We don’t delete any personal data from content created by users, such as names or email addresses they typed in a page or issue. The product admins need to delete that data manually.',
    description:
      'Text elaborating on the note that some personal data is required to be saved from deletion for legal purposes.',
  },

  inlineDialogDataWillBeDeletedP2Self: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.personal-data-will-be-deleted.p2.self',
    defaultMessage:
      "We don't delete any personal data from content created by you or other people, such as names or email addresses typed into a page or issue. Your product admins need to delete that data manually.",
    description:
      'Text elaborating on the note that some personal data is required to be saved from deletion for legal purposes.',
  },

  inlineDialogDataWillBeDeletedP3Admin: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.personal-data-will-be-deleted.p3.admin',
    defaultMessage:
      'Users have the right to submit complaints to the supervisory authority in their country.',
    description:
      'Text elaborating on the note that some personal data is required to be saved from deletion for legal purposes.',
  },

  inlineDialogDataWillBeDeletedP3Self: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.personal-data-will-be-deleted.p3.self',
    defaultMessage:
      'Users have the right to submit complaints to the supervisory authority in their country.',
    description:
      'Text elaborating on the note that some personal data is required to be saved from deletion for legal purposes.',
  },

  inlineDialogDataAppsAdmin: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.data-apps.admin',
    defaultMessage:
      'You or other users may have installed apps that add features to Atlassian products. These apps may have stored the user’s profile information.',
    description:
      'Text elaborating on the note about apps storing personal data',
  },
  inlineDialogDataAppsSelf: {
    id:
      'focused-task-close-account.delete-account.overview.inline-dialog.data-apps.self',
    defaultMessage:
      'You or other users may have installed apps that add features to Atlassian products. These apps may have stored the user’s profile information.',
    description:
      'Text elaborating on the note about apps storing personal data',
  },
};

export const contentPreviewMessages = {
  heading: {
    id: 'focused-task-close-account.delete-account.content-preview.heading',
    defaultMessage: 'How users will see this account',
    description:
      'Heading for the screen that explains what other users will see when viewing the deleted/deactivated user',
  },
};

export const dropDownListMessages = {
  expandButton: {
    id: 'focused-task-close-account.delete-account.drop-down-expand-button',
    defaultMessage: '{num} more',
    description:
      'Button text displaying number of available sites greater than 3 on expand',
  },

  collapseButton: {
    id: 'focused-task-close-account.delete-account.drop-down-collapse-button',
    defaultMessage: 'Show less',
    description: 'Button text displaying text on collapse',
  },
};
