// @flow
import React from 'react';

// because icons are imported from absolute paths, this path is
// not how you will consume it.
// The path for you is `@atlaskit/icon-file-type/glyph/audio/16`
import AudioIcon16 from '../glyph/audio/16';
import AudioIcon24 from '../glyph/audio/24';
import AudioIcon48 from '../glyph/audio/48';

export default () => (
  <div>
    <AudioIcon48 />
    <AudioIcon24 />
    <AudioIcon16 />
  </div>
);
