import * as React from 'react';
import { md } from '@atlaskit/docs';

export default md`
Please find below additional information related to the API.

## API

### Properties

\`onImagePicked?: (file: File, crop: CropProperties) => void\`

This property is raised when the user clicks the **Save** button and there is a selected image. Two arguments are passed, the \`file:File\` which is a blob, and the crop settings which is an object containing \`x:number\`,\`y:number\`, and \`size:number\` values, which are all relative to the coordinates of the selected image.

**Note** Due to limitations on Safari <= 10.0 and IE11, a \`Blob\` object will be returned instead of a \`File\`. This still allows access to the image byte data to facilitate uploads, essentially minus the filename and date attributes.

The \`x\` and \`y\` represent the origin of the crop area. The \`size\` value is a single value which represents the width and height of the crop area. To get the crop area from the selected image, simply take the clipped rect of (\`x\`, \`y\`, \`size\`, \`size\`) from the given image.

\`onImagePickedDataURI?: (dataURI: string) => void\`

This property is raised when the user clicks the **Save** button and there is a selected image. The selected image is provided as a dataURI string.

\`onAvatarPicked: (avatar: Avatar) => void\`

This property is raised when the user clicks the **Save** button and there is a pre-defined avatar selected, and no image selected. An \`Avatar\` object with a \`dataURI\` property is passed.

\`onCancel: Function\`

This property is raised when the user clicks **Cancel** button.

**Note** this does not close the dialog. It is up to the consumer to re-render and remove the dialog from the UI.

\`imageSource?: string\`

_(optional)_ This property is used to set the selected image so that the component opens up with it visible already.

The value should be a valid dataURI string. If an invalid dataURI is given, the bad format error state will be triggered and a message shown.

\`avatars: Array<Avatar>\`

This property is used to provide an array of pre-defined avatars. The \`Avatar\` object is a simple type with a single \`dataURI: string\` property. For convenience, this type is exported from the \`@atlassian/media-avatar-picker\` module along with the \`AvatarPickerDialog\` component.

\`defaultSelectedAvatar?: Avatar\`

_(optional)_ This property is used along with the \`avatar\` property. It allows you to set the currently selected pre-defined avatar. By default, there is no pre-defined avatar selected, even if the \`avatars\` property is set.

\`title?: string\`

_(optional)_ The title text for the dialog. The default is _Upload an avatar_.

\`primaryButtonText?: string\`

_(optional)_ The primary button text. The default is _Save_.

\`errorMessage?: string\`

_(optional)_ This property allows the consumer to display an error message. This may occur from a call to a service. The string is clipped if greater than 125 charaters (approximately 3 lines within the dialog).
`;
