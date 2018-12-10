import * as React from 'react';
import { md, code, Example, Props } from '@atlaskit/docs';

export default md`
  This component provides a way to do image annotations.

  ## Usage

  ${code`
  import { MediaEditor } from '@atlaskit/media-editor';
  import { tallImage as imageDataUri } from '@atlaskit/media-test-helpers';

  const App = () => (
    <MediaEditor
      imageUrl={imageDataUri}
      tool={'arrow'}
    />
  );
  `}
  
    ${(
      <Example
        Component={require('../examples/0-fixed-size').default}
        title="Fixed Sized"
        source={require('!!raw-loader!../examples/0-fixed-size')}
      />
    )}
  
  ${(
    <Props
      heading="Media Editor Props"
      props={require('!!extract-react-types-loader!../src/react/mediaEditor')}
    />
  )}

  ${(
    <Props
      heading="Toolbar Props"
      props={require('!!extract-react-types-loader!../src/react/toolbar')}
    />
  )}
`;
