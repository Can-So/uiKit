import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MockEmojiResourceConfig } from '../../../src/support/support-types';
import {
  getEmojiResourcePromise,
  newEmojiRepository,
} from '../../../src/support/test-data';
import EmojiPicker, { Props } from '../../../src/components/picker/EmojiPicker';
import EmojiPickerComponent from '../../../src/components/picker/EmojiPickerComponent';
import { waitUntil } from '@atlaskit/util-common-test';
import AkButton from '@atlaskit/button';
import * as commonStyles from '../../../src/components/common/styles';

import EmojiPickerEmojiRow from '../../../src/components/picker/EmojiPickerEmojiRow';
import CategorySelector from '../../../src/components/picker/CategorySelector';
import Emoji from '../../../src/components/common/Emoji';
import EmojiPickerCategoryHeading from '../../../src/components/picker/EmojiPickerCategoryHeading';
import EmojiPickerList from '../../../src/components/picker/EmojiPickerList';
import EmojiPickerListSearch from '../../../src/components/picker/EmojiPickerListSearch';
import { hasSelector } from '../../_emoji-selectors';
import { EmojiDescription } from '../../../src/types';
import { customCategory } from '../../../src/constants';

export function setupPickerWithoutToneSelector(): Promise<
  ReactWrapper<any, any>
> {
  return setupPicker({
    emojiProvider: getEmojiResourcePromise(),
    hideToneSelector: true,
  });
}

export function setupPicker(
  props?: Props,
  config?: MockEmojiResourceConfig,
): Promise<ReactWrapper<any, any>> {
  const pickerProps: Props = {
    ...props,
  } as Props;

  if (!props || !props.emojiProvider) {
    pickerProps.emojiProvider = getEmojiResourcePromise(config);
  }

  const picker = mount(<EmojiPicker {...pickerProps} />);

  return waitUntil(() => hasSelector(picker, EmojiPickerComponent)).then(
    () => picker,
  );
}

export const leftClick = {
  button: 0,
};

export const allEmojis = newEmojiRepository().all().emojis;

export const findEmoji = list => list.find(Emoji);
/**
 * @param picker mounted EmojiPicker component
 * @param list child EmojiPickerList
 */
export const emojisVisible = (picker, list) => hasSelector(picker, Emoji, list);

const nodeIsCategory = (category: string, n) =>
  n.is(EmojiPickerCategoryHeading) &&
  n.prop('title').toLocaleLowerCase() === category.toLocaleLowerCase();

export const findCategoryHeading = (category: string, component) =>
  component
    .find(EmojiPickerCategoryHeading)
    .filterWhere(n => nodeIsCategory(category, n));

const findAllVirtualRows = component =>
  component.update() &&
  component.findWhere(
    n =>
      n.is(EmojiPickerListSearch) ||
      n.is(EmojiPickerCategoryHeading) ||
      n.is(EmojiPickerEmojiRow),
    // ignore spinner
  );

export const emojiRowsVisibleInCategory = (category: string, component) => {
  component.update();
  const rows = findAllVirtualRows(component);
  let foundStart = false;
  let foundEnd = false;
  return rows.filterWhere(n => {
    if (foundEnd) {
      return false;
    }

    if (foundStart) {
      if (!n.is(EmojiPickerEmojiRow)) {
        foundEnd = true;
        return false;
      }
      return true;
    }

    if (nodeIsCategory(category, n)) {
      foundStart = true;
    }

    return false;
  });
};

const getCategoryButton = (category: string, picker) => {
  const categorySelector = picker.find(CategorySelector);
  return categorySelector.findWhere(
    n =>
      n.name() === 'button' &&
      n.prop('title').toLocaleLowerCase() === category.toLocaleLowerCase(),
  );
};

export const categoryVisible = (category: string, component) =>
  findCategoryHeading(category, component).length > 0;

export const showCategory = (category: string, component): Promise<any> => {
  const categoryButton = getCategoryButton(category, component);
  expect(categoryButton).toHaveLength(1);

  const list = component.find(EmojiPickerList);
  return waitUntil(() => emojisVisible(component, list)).then(() => {
    categoryButton.simulate('click', leftClick);
    return waitUntil(
      () =>
        component.update() &&
        categoryVisible(category, component.find(EmojiPickerList)),
    );
  });
};

export const findEmojiInCategory = (
  emojis,
  categoryId: string,
): EmojiDescription | undefined => {
  categoryId = categoryId.toLocaleUpperCase();
  for (let i = 0; i < emojis.length; i++) {
    const emoji = emojis.at(i).prop('emoji');
    if (emoji.category === categoryId) {
      return emoji;
    }
  }
  return undefined;
};

export const findHandEmoji = (emojis): number => {
  let offset = -1;
  emojis.forEach((emoji, index) => {
    if (emoji.prop('emoji').shortName.indexOf(':raised_hand:') !== -1) {
      offset = index;
      return;
    }
  });
  return offset;
};

export const findSearchInput = component =>
  component.update() &&
  component
    .find(EmojiPickerListSearch)
    .findWhere(component => component.name() === 'input');

export const searchInputVisible = component =>
  findSearchInput(component).length > 0;

const findCustomSection = component =>
  component.findWhere(
    wrapper =>
      wrapper.type() === EmojiPickerCategoryHeading &&
      wrapper.prop('title') === customCategory,
  );

export const customSectionVisible = (component): boolean =>
  component.update() && component.findWhere(findCustomSection).length > 0;

export const findEmojiNameInput = component =>
  component.update() &&
  component.find(`.${commonStyles.uploadChooseFileEmojiName} input`);

export const emojiNameInputVisible = (component): boolean =>
  findEmojiNameInput(component).length > 0;

export const emojiNameInputHasAValue = (component): boolean =>
  emojiNameInputVisible(component) &&
  findEmojiNameInput(component).prop('value');

export const uploadAddRowSelector = `.${commonStyles.uploadAddRow}`;

export const findAddEmojiButton = component =>
  component.update() &&
  component
    .find(uploadAddRowSelector)
    .find(AkButton)
    .at(0);

export const addEmojiButtonVisible = component =>
  component.update() && findAddEmojiButton(component).length > 0;

export const findCancelLink = component =>
  component.update() &&
  component
    .find(uploadAddRowSelector)
    .find(AkButton)
    .at(1);

export const findUploadPreview = component =>
  component.update() && component.find(`.${commonStyles.uploadPreview}`);

export const findEmojiWithId = (component, id) =>
  component.update() &&
  component
    .find(EmojiPickerList)
    .find(Emoji)
    .filterWhere(emoji => emoji.prop('emoji').id === id);

export const emojiWithIdVisible = (component, id) =>
  findEmojiWithId(component, id).length > 0;

export const findUploadError = component =>
  component.update() && component.find(`.${commonStyles.uploadError}`);

export const uploadErrorVisible = component =>
  findUploadError(component).length > 0;
