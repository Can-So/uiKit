import memoizeOne from 'memoize-one';
import { ClearIndicator } from './ClearIndicator';
import { MultiValue } from './MultiValue';
import { MultiValueContainer } from './MultiValueContainer';
import { Option } from './Option';
import { SingleValue } from './SingleValue';
import { Input } from './Input';
import { SingleValueContainer } from './SingleValueContainer';

/**
 * Memoize getComponents to avoid rerenders.
 */
export const getComponents = memoizeOne(
  (multi?: boolean, anchor?: React.ComponentType<any>) => {
    if (anchor) {
      return {
        Control: anchor,
        Option,
      };
    } else {
      return {
        MultiValue,
        DropdownIndicator: null,
        SingleValue,
        ClearIndicator: multi ? null : ClearIndicator,
        Option,
        ValueContainer: multi ? MultiValueContainer : SingleValueContainer,
        Input,
      };
    }
  },
);
