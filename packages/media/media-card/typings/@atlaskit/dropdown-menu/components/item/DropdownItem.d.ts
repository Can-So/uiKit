import { ComponentType } from 'react';
import Item, {
  ItemProps,
  WithItemClickProps,
  WithItemFocusProps,
} from '@findable/item';

declare const DropdownItem: ComponentType<
  ItemProps & WithItemClickProps & WithItemFocusProps
>;

export default DropdownItem;
