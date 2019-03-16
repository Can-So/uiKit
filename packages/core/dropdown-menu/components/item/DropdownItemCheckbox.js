import CheckboxIcon from '@findable/icon/glyph/checkbox';
import Item, { withItemFocus } from '@findable/item';
import withToggleInteraction from '../hoc/withToggleInteraction';
import supportsVoiceover from '../../util/supportsVoiceover';
export default withToggleInteraction(withItemFocus(Item), CheckboxIcon, function () {
  return supportsVoiceover() ? 'checkbox' : 'menuitemcheckbox';
});