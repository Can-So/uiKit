import memoizeOne from 'memoize-one';
import { components } from '@atlaskit/select';
import { ClearIndicator } from './ClearIndicator';
import { MultiValue } from './MultiValue';
import { Option } from './Option';
import { SingleValue } from './SingleValue';
import { MultiValueContainer } from './MultiValueContainer';
import { SingleValueContainer } from './SingleValueContainer';
import { Input } from './Input';

/**
 * Memoize getComponents to avoid rerenders.
 */
export const getComponents = memoizeOne(
  (
    multi?: boolean,
    showPrompt?: boolean,
    anchor?: React.ComponentType<any>,
  ) => {
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
        Input: multi && showPrompt ? Input : components.Input,
      };
    }
  },
);
