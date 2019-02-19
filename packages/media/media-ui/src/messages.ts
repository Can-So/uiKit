import { defineMessages, FormattedMessage } from 'react-intl';

export type MessageKey =
  | 'retry'
  | 'failed_to_load'
  | 'recent_uploads'
  | 'upload_file'
  | 'drag_and_drop_your_files'
  | 'drop_your_files'
  | 'upload'
  | 'cancel'
  | 'search_all_gifs'
  | 'cant_retrieve_gifs'
  | 'check_your_network'
  | 'try_again'
  | 'no_gifs_found'
  | 'no_gifs_found_suggestion'
  | 'load_more_gifs'
  | 'add_account'
  | 'unlink_account'
  | 'upload_file_from'
  | 'connect_to'
  | 'connect_account_description'
  | 'upload_an_avatar'
  | 'save'
  | 'or'
  | 'upload_photo'
  | 'default_avatars'
  | 'drag_and_drop_images_here'
  | 'upload_image'
  | 'image_url_invalid_error'
  | 'image_format_invalid_error'
  | 'image_size_too_large_error'
  | 'something_went_wrong'
  | 'might_be_a_hiccup'
  | 'couldnt_generate_preview'
  | 'cant_preview_file_type'
  | 'item_not_found_in_list'
  | 'no_pdf_artifacts'
  | 'give_feedback'
  | 'try_downloading_file'
  | 'webgl_warning_description'
  | 'unable_to_annotate_image'
  | 'learn_more'
  | 'accounts'
  | 'actions'
  | 'error_hint_retry'
  | 'error_hint_critical'
  | 'close'
  | 'could_not_load_editor'
  | 'could_not_save_image'
  | 'annotate'
  | 'drop_your_files_here'
  | 'share_files_instantly'
  | 'insert_files'
  | 'zoom_out'
  | 'zoom_in'
  | 'remove_image'
  | 'play'
  | 'pause'
  | 'disable_fullscreen'
  | 'enable_fullscreen'
  | 'error_loading_file'
  | 'error_generating_preview'
  | 'download'
  | 'unknown'
  | 'document'
  | 'audio'
  | 'video'
  | 'image';

type Messages = { [K in MessageKey]: FormattedMessage.MessageDescriptor };

export const messages = defineMessages<Messages>({
  retry: {
    id: 'fabric.media.retry',
    defaultMessage: 'Retry',
    description: 'Allows user to perform an action again',
  },
  failed_to_load: {
    id: 'fabric.media.failed_to_load',
    defaultMessage: 'Failed to load',
    description: 'We show this message when we have an error loading a file',
  },
  recent_uploads: {
    id: 'fabric.media.recent_uploads',
    defaultMessage: 'Recent uploads',
    description:
      'Title of a section where we show the user recent uploaded files',
  },
  upload_file: {
    id: 'fabric.media.upload_file',
    defaultMessage: 'Upload a file',
    description: 'Call to action that initiates the upload of a file',
  },
  drag_and_drop_your_files: {
    id: 'fabric.media.drag_and_drop_your_files',
    defaultMessage: 'Drag and drop your files anywhere or',
    description:
      'Used to describe the area where the user can drag and drop files to upload',
  },
  drop_your_files: {
    id: 'fabric.media.drop_your_files',
    defaultMessage: 'Drop your files to upload',
    description:
      'Indicates that the files will be uploaded when the user drops them in the drag and drop area',
  },
  upload: {
    id: 'fabric.media.upload',
    defaultMessage: 'Upload',
    description: 'upload',
  },
  cancel: {
    id: 'fabric.media.cancel',
    defaultMessage: 'Cancel',
    description: 'cancel',
  },
  search_all_gifs: {
    id: 'fabric.media.search_all_gifs',
    defaultMessage: 'Search all the GIFs!',
    description:
      'Used as input placeholder to let the user know that he can search for GIF image files',
  },
  cant_retrieve_gifs: {
    id: 'fabric.media.cant_retrieve_gifs',
    defaultMessage: 'Ouch! We could not retrieve any GIFs',
    description:
      'Error message when we can not find any GIF images for that text',
  },
  check_your_network: {
    id: 'fabric.media.check_your_network',
    defaultMessage: 'Check your network connection',
    description: 'Error message when network does not work',
  },
  try_again: {
    id: 'fabric.media.try_again',
    defaultMessage: 'Try again',
    description: 'Allow the user to try an action again',
  },
  no_gifs_found: {
    id: 'fabric.media.no_gifs_found',
    defaultMessage: "Hello? Was it me you're looking for?",
    description:
      'Not expected error that happens when searching for GIF images',
  },
  no_gifs_found_suggestion: {
    id: 'fabric.media.no_gifs_found_suggestion',
    defaultMessage: 'We couldn\'t find anything for "{query}"',
    description: 'There are no results for GIFs matching that query',
  },
  load_more_gifs: {
    id: 'fabric.media.load_more_gifs',
    defaultMessage: 'Load more GIFs',
    description: 'Used to load next page of GIF images',
  },
  add_account: {
    id: 'fabric.media.add_account',
    defaultMessage: 'Add account',
    description: 'Allows to add a new account',
  },
  unlink_account: {
    id: 'fabric.media.unlink_account',
    defaultMessage: 'Unlink Account',
    description: 'Allows to remove a connected account from the user',
  },
  upload_file_from: {
    id: 'fabric.media.upload_file_from',
    defaultMessage: 'Upload a file from {name}',
    description: 'Allows to upload a file from different sources',
  },
  connect_to: {
    id: 'fabric.media.connect_to',
    defaultMessage: 'Connect to {name}',
    description:
      'Allows the user to connect with different types of external services',
  },
  connect_account_description: {
    id: 'fabric.media.connect_account_description',
    defaultMessage:
      "We'll open a new page to help you connect your {name} account",
    description:
      'Explains what will happen when the users connects to a new account',
  },
  upload_an_avatar: {
    id: 'fabric.media.upload_an_avatar',
    defaultMessage: 'Upload an avatar',
    description: 'Indicates that the user can upload a new avatar',
  },
  save: {
    id: 'fabric.media.save',
    defaultMessage: 'Save',
    description: 'Just the "save" word',
  },
  or: {
    id: 'fabric.media.or',
    defaultMessage: 'or',
    description: 'Just the "or" word',
  },
  upload_photo: {
    id: 'fabric.media.upload_photo',
    defaultMessage: 'Upload a photo',
    description: 'Call to action for the user to upload a new photo',
  },
  default_avatars: {
    id: 'fabric.media.default_avatars',
    defaultMessage: 'Default avatars',
    description: 'Showed above the default avatar list',
  },
  drag_and_drop_images_here: {
    id: 'fabric.media.drag_and_drop_images_here',
    defaultMessage: 'Drag and drop your images here',
    description:
      'Indicates that the user can drag and drop images in that area',
  },
  upload_image: {
    id: 'fabric.media.upload_image',
    defaultMessage: 'Upload image',
    description: 'Call to action for the user to upload a new image',
  },
  image_url_invalid_error: {
    id: 'fabric.media.image_url_invalid_error',
    defaultMessage: 'Could not load image, the url is invalid.',
    description: 'There was an error parsing the image url',
  },
  image_format_invalid_error: {
    id: 'fabric.media.image_format_invalid_error',
    defaultMessage: 'Could not load image, the format is invalid.',
    description: 'The provided image format is not valid',
  },
  image_size_too_large_error: {
    id: 'fabric.media.image_size_too_large_error',
    defaultMessage:
      'Image is too large, must be no larger than {MAX_SIZE_MB}Mb',
    description: 'The provided image size is too big',
  },
  something_went_wrong: {
    id: 'fabric.media.something_went_wrong',
    defaultMessage: 'Something went wrong.',
    description:
      'Showed when an error happen but we dont have more info about it',
  },
  might_be_a_hiccup: {
    id: 'fabric.media.might_be_a_hiccup',
    defaultMessage: 'It might just be a hiccup.',
    description:
      'Used when an unknow error happens, just in a funny way of saying that we dont have more info about it',
  },
  couldnt_generate_preview: {
    id: 'fabric.media.couldnt_generate_preview',
    defaultMessage: "We couldn't generate a preview for this file.",
    description:
      'Error case for when the backend cant generate a preview for that file',
  },
  cant_preview_file_type: {
    id: 'fabric.media.cant_preview_file_type',
    defaultMessage: "We can't preview this file type.",
    description:
      'Error case for when we have no available preview for that file',
  },
  item_not_found_in_list: {
    id: 'fabric.media.item_not_found_in_list',
    defaultMessage: 'The selected item was not found on the list.',
    description:
      'Error case for when a provided item is not found within the list of items',
  },
  no_pdf_artifacts: {
    id: 'fabric.media.no_pdf_artifacts',
    defaultMessage: 'No PDF artifacts found for this file.',
    description: 'Error case for when we cant preview a PDF file',
  },
  give_feedback: {
    id: 'fabric.media.give_feedback',
    defaultMessage: 'Give feedback',
    description:
      'Call to action that opens a popup to get feedback from the users',
  },
  try_downloading_file: {
    id: 'fabric.media.try_downloading_file',
    defaultMessage: 'Try downloading the file to view it.',
    description: 'We show this message to allow users to download a file',
  },
  webgl_warning_description: {
    id: 'fabric.media.webgl_warning_description',
    defaultMessage:
      'Your browser does not support WebGL. Use a WebGL enabled browser to annotate images.',
    description:
      'We show this error message when the browser doesnt support this feature',
  },
  unable_to_annotate_image: {
    id: 'fabric.media.unable_to_annotate_image',
    defaultMessage: "You're unable to annotate this image",
    description:
      'If there is an error trying to annotate an image we show this',
  },
  learn_more: {
    id: 'fabric.media.learn_more',
    defaultMessage: 'Learn More',
    description: '',
  },
  accounts: {
    id: 'fabric.media.accounts',
    defaultMessage: 'Accounts',
    description: '',
  },
  actions: {
    id: 'fabric.media.actions',
    defaultMessage: 'Actions',
    description: '',
  },
  error_hint_retry: {
    id: 'fabric.media.error_hint_retry',
    defaultMessage: "Try again and we'll give it another shot.",
    description: 'Generic message that we show if an action failed',
  },
  error_hint_critical: {
    id: 'fabric.media.error_hint_critical',
    defaultMessage: 'If the problem keeps happening contact support.',
    description:
      'We show this error message if we cant recover from the action',
  },
  close: {
    id: 'fabric.media.close',
    defaultMessage: 'Close',
    description: '',
  },
  could_not_load_editor: {
    id: 'fabric.media.could_not_load_editor',
    defaultMessage: 'Ouch! We could not load the editor',
    description: 'Error message to communicate that we cant load the editor',
  },
  could_not_save_image: {
    id: 'fabric.media.could_not_save_image',
    defaultMessage: 'Ouch! We could not save the image',
    description: 'Error message to communicate that we cant save an image',
  },
  annotate: {
    id: 'fabric.media.annotate',
    defaultMessage: 'Annotate',
    description: '',
  },
  drop_your_files_here: {
    id: 'fabric.media.drop_your_files_here',
    defaultMessage: 'Drop your files here',
    description:
      'Info message that we show to indicate that the user can drag and drop files',
  },
  share_files_instantly: {
    id: 'fabric.media.share_files_instantly',
    defaultMessage: "We'll share them instantly",
    description:
      'It means that we will upload the files you drag and drop automatically',
  },
  insert_files: {
    id: 'fabric.media.insert_files',
    defaultMessage: 'Insert {0, plural, one {a file} other {{0} files}}',
    description: 'Showed when the user selects 1 or more files to insert',
  },
  zoom_out: {
    id: 'fabric.media.zoom_out',
    defaultMessage: 'zoom out',
    description: 'Indicates the user can zoom out a file',
  },
  zoom_in: {
    id: 'fabric.media.zoom_in',
    defaultMessage: 'zoom in',
    description: 'Indicates the user can zoom in a file',
  },
  remove_image: {
    id: 'fabric.media.remove_image',
    defaultMessage: 'Remove image',
    description: 'Allows the user to remove a file',
  },
  play: {
    id: 'fabric.media.play',
    defaultMessage: 'play',
    description: '',
  },
  pause: {
    id: 'fabric.media.pause',
    defaultMessage: 'pause',
    description: '',
  },
  disable_fullscreen: {
    id: 'fabric.media.disable_fullscreen',
    defaultMessage: 'disable fullscreen',
    description: 'Hint to let the user know he can disable the fullscreen mode',
  },
  enable_fullscreen: {
    id: 'fabric.media.enable_fullscreen',
    defaultMessage: 'enable fullscreen',
    description: 'Hint to let the user know he can enable the fullscreen mode',
  },
  error_loading_file: {
    id: 'fabric.media.error_loading_file',
    defaultMessage: 'Error loading file',
    description: 'Message showed when we had an error trying to load the file',
  },
  error_generating_preview: {
    id: 'fabric.media.error_generating_preview',
    defaultMessage: 'Error generating preview',
    description:
      'Message showed when we had an error trying generate a preview for a file',
  },
  download: {
    id: 'fabric.media.download',
    defaultMessage: 'Download',
    description: '',
  },
  unknown: {
    id: 'fabric.media.unknown',
    defaultMessage: 'unknown',
    description: '',
  },
  document: {
    id: 'fabric.media.document',
    defaultMessage: 'document',
    description: '',
  },
  audio: {
    id: 'fabric.media.audio',
    defaultMessage: 'audio',
    description: '',
  },
  video: {
    id: 'fabric.media.video',
    defaultMessage: 'video',
    description: '',
  },
  image: {
    id: 'fabric.media.image',
    defaultMessage: 'image',
    description: '',
  },
});
