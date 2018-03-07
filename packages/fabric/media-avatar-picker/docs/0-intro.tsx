import * as React from 'react';
import { md, Example, Props } from '@atlaskit/docs';

export default md`
  # @atlaskit/media-avatar-picker

  Provides a component to select, drag and resize image avatars. It also provides a default list of predefined avatars.

  ## Installation

  ~~~sh
  yarn add @atlaskit/media-avatar-picker
  ~~~

  ## Using the component

  ### Local Image Upload and Cropping

  The \`AvatarPickerDialog\` allows the user to upload or drop a local image, then pan and zoom to a desired cropped view.

  The default zoom level should fit the image within the crop area. Images smaller than the crop area are scaled up.

  The component constrains the panning and scaling of the image to ensure that only valid regions are selectable by the user.

  ### Pre-defined Avatars

  The component also allows the user to select from pre-defined avatar images. These can be provided to the component via it's \`avatars\` property.

  Pre-defined avatars are hidden when an image is chosen by the user.

  ### Client-side only

  The component is currently designed to pass back a selected image or avatar. It does not use any specific APIs for storage or upload, that is currently the responsibility of the consumer. In other words you will need a solution to store the selected image or avatar.

  ### Limitations

  The component currently only accepts \`image/gif\`, \`image/jpeg\`, and \`image/png\` mime types. SVG is not currently not supported.

  The component only accepts images up to 10Mib.

  ### Error Handling

  The component will handle the following errors on the client:

  * Bad format - if the user uploads an image with a bad format, or drops an invalid mime type, an error will be shown
  * Image size > 10Mib - if the user uploads or drops an image greater than 10Mib in size, an error message will be shown

  See the \`errorMessage\` property below to set your own custom error message if required.

  ## API

  \`onImagePicked: Function\`

  This property is raised when the user clicks the **Save** button and there is a selected image. Two arguments are passed, the \`selectedImage:File\` which is a blob which can be uploaded or converted to a dataURI, and the crop settings which is an object containing \`x:number\`,\`y:number\`, and \`size:number\` values, which are all relative to the coordinates of the selected image.

  **Note** Due to limitations on Safari <= 10.0 and IE11, a \`Blob\` object will be returned instead of a \`File\`. This still allows access to the image byte data to facilitate uploads, essentially minus the filename and date attributes.

  The \`x\` and \`y\` represent the origin of the crop area. The \`size\` value is a single value which represents the width and height of the crop area. To get the crop area from the selected image, simply take the clipped rect of (\`x\`, \`y\`, \`size\`, \`size\`) from the given image.

  \`onAvatarPicked: Function\`

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

  ### Usage Example

  ~~~
  import {AvatarPickerDialog, Avatar} from '@atlaskit/media-avatar-picker';

  const avatars: Array<Avatar> = [{ dataURI:'some-data-uri' }];

  <AvatarPickerDialog
    avatars={avatars}
    onImagePicked={(selectedImage, crop) => {
      console.log(selectedImage.size, crop.x, crop.y, crop.size);
    }}
    onAvatarPicked={selectedAvatar =>
      console.log(selectedAvatar.dataURI)
    }
    onCancel={() => /* we need to close the dialog... */}
  />
  ~~~
`;
