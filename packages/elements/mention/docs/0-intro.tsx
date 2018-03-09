import { md } from '@atlaskit/docs';

export default md`
  # Mention

  The main purpose of the mention component is to provide a mention picker for choosing users to mention within a text field or editor.

  It includes support for rest based searching and custom search implementations.

  ## Try it out

  Interact with a [live demo of the @atlaskit/mention component](https://atlaskit.atlassian.com/packages/elements/mention).

  ## Installation

  ~~~js
  npm install @atlaskit/mention
  # or
  yarn add  @atlaskit/mention
  ~~~

  ## Using the component

  Import the component in your React app as follows:

  ~~~js
  import MentionPicker, { MentionResource } from '@atlaskit/mention';
  const mentionProvider = new MentionResource({
    url: 'http://example-mention-server/service',
    securityProvider: () => {
      return {
          headers: {
              Authorization: getSecurityTokenForService(...)
          }
      };
    },
    refreshSecurityProvider: () => {
      // Optional, but allows for a retry if a 401 is returned by trying a new token
      // useful if a token is not guaranteed to be valid. e.g. stored in a cache, but
      // may be revoked to expire early in some circumstances
      return new Promise((resolve) => {
        ...
        getSecurityTokenForService(...).then((token) => {
          resolve(token);
        })
      })
    },
  });

  ReactDOM.render(
    <MentionPicker
      resourceProvider={mentionProvider}
      query="John"
      onSelection={(mention) => { /* do something */ }}
    />, container);
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
