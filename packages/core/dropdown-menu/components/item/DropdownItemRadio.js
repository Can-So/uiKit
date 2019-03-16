import RadioIcon from '@findable/icon/glyph/radio';
import Item, { withItemFocus } from '@findable/item';
import withToggleInteraction from '../hoc/withToggleInteraction';
import supportsVoiceover from '../../util/supportsVoiceover';
export default withToggleInteraction(withItemFocus(Item), RadioIcon, function () {
  return supportsVoiceover() ? 'radio' : 'menuitemradio';
});