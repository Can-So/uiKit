import { storyMediaProviderFactory } from '@atlaskit/editor-test-helpers';
import { exampleDocument } from '../example-helpers/grid-document';
import CommentExample from './2-comment';

const mediaProvider = storyMediaProviderFactory({
  includeUserAuthProvider: true,
});

export default function Example() {
  return CommentExample({
    replacementDoc: exampleDocument,

    editorProps: {
      defaultValue: exampleDocument,
      UNSAFE_mediaSingle_grid: true,
      media: {
        provider: mediaProvider,
        allowMediaSingle: true,
        UNSAFE_allowMediaSingleResizing: true,
      },

      allowLayouts: true,
    },
  });
}
