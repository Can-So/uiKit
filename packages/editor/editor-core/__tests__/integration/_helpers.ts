/**
 * This function will in browser context. Make sure you call `toJSON` otherwise you will get:
 * unknown error: Maximum call stack size exceeded
 * And, don't get too fancy with it ;)
 */
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
export const getDocFromElement = el => el.pmViewDesc.node.toJSON();
export const editable = '.ProseMirror';

export const editors = [
  {
    name: 'comment',
    path: getExampleUrl('editor', 'editor-core', 'comment'),
    placeholder: '[placeholder="What do you want to say?"]',
  },
  {
    name: 'fullpage',
    path: getExampleUrl('editor', 'editor-core', 'full-page'),
    placeholder: 'p',
  },
];

export const clipboardHelper = getExampleUrl(
  'editor',
  'editor-core',
  'clipboard-helper',
);
