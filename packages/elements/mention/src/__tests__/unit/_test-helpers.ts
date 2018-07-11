import { ReactWrapper } from 'enzyme';
import MentionItem from '../../components/MentionItem';
import MentionResource from '../../api/MentionResource';
/* Component structure:
  ak-mention-picker
   > ak-popup (optional)
     > ak-resourced-mention-list
       > ak-mention-list
         > ak-scrollable
           > ak-mention-item (0..n)
 */

export const mockMentionData = {
  id: 'ABCD-ABCD-ABCD',
  text: '@Oscar Wallhult',
};

const mentionResource = new MentionResource({
  url: 'dummyurl',

  shouldHighlightMention(mention) {
    return mention.id === 'oscar';
  },
});
export const mockMentionProvider = Promise.resolve(mentionResource);

export function getMentionItemById(
  component: ReactWrapper<any, any>,
  itemId: string,
) {
  return component.findWhere(
    n => !!n.length && n.is(MentionItem) && n.prop('mention').id === itemId,
  );
}

export function getSelectedMentionItem(component: ReactWrapper<any, any>) {
  return component.findWhere(
    n => !!n.length && n.is(MentionItem) && n.prop('selected'),
  );
}

export function isMentionItemSelected(
  component: ReactWrapper<any, any>,
  itemId: string,
) {
  const selectedItem = getSelectedMentionItem(component);
  return selectedItem.length && selectedItem.prop('mention').id === itemId;
}
