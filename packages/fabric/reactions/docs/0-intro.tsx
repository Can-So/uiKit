import { md } from '@atlaskit/docs';

export default md`
  # Reactions

  The main purpose of the Reactions component is to provide users the ability to react to pieces of content.

  ## Installation

  ~~~js
  npm install @atlaskit/reactions
  # or
  yarn add  @atlaskit/reactions
  ~~~

  ## Using the component

  Import the component in your React app as follows:

  ~~~js
  import { Reactions } from '@atlaskit/reactions';
  import { ReactionsResource } from '@atlaskit/reactions-resource';
  import { EmojiResource } from '@atlaskit/emoji';

  const emojiProvider = new EmojiResource({
    providers: [
      {
        url: 'https://emoji-example/emoji/standard',
      },
      {
        url: 'https://emoji-example/emoji/site-id/site',
        securityProvider: () => ({
          headers: {
            Authorization: 'Bearer token',
          },
        }),
      },
    ],
  });

  const reactionsProvider = new ReactionsResource({
    baseUrl: 'https://reactions-service',
  });

  const demoAri = 'ari:cloud:owner:demo-cloud-id:item/1';
  const containerAri = 'ari:cloud:owner:demo-cloud-id:container/1';

  ReactDOM.render(
    <Reactions
      containerAri={containerAri}
      ari={demoAri}
      emojiProvider={Promise.resolve(emojiProvider)}
      reactionsProvider={reactionsProvider}
      onReactionClick={emojiId => {
        /* do something */
      }}
    />,
    container,
  );
  ~~~

  ### Note:

  Don't forget to add these polyfills to your product build if you want to target older browsers:

  * Promise ([polyfill](https://www.npmjs.com/package/es6-promise), [browser support](http://caniuse.com/#feat=promises))
  * Fetch API ([polyfill](https://www.npmjs.com/package/whatwg-fetch), [browser support](http://caniuse.com/#feat=fetch))

  If a \`target\` property is provided with a \`position\` property, then the
  Picker will automatically be positioned floating above that element. The \`target\`
  is a id of an element on the page. \`position\` may be one of \`above\`,
  \`below\` or \`auto\`.

  If these are omitted, the picker will be rendered
  directly inline, and any positioning will need to be managed by the consumer.
  An optional \`zIndex\` may be provided, if required to ensure that MentionPicker
  appears above other elements on the page. The MentionPicker will be rendered
  at the bottom of the DOM.

  Key navigation can be bound to \`selectNext\` (e.g. down arrow),
  \`selectPrevious\` (e.g. up arrow), and \`chooseCurrentSelection\`
  (e.g. enter and tab).
`;
