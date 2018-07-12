import { waitUntil } from '@atlaskit/util-common-test';
import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { MentionDescription } from '../../../types';
import { HttpError } from '../../../api/MentionResource';
import { mention, MockMentionResource } from '@atlaskit/util-data-test';
import MentionPicker, {
  OnClose,
  OnOpen,
  Props,
  State,
} from '../../../components/MentionPicker';
import MentionList from '../../../components/MentionList';
import MentionListError from '../../../components/MentionListError';
import MentionItem from '../../../components/MentionItem';
import { isMentionItemSelected, getMentionItemById } from '../_test-helpers';

const mentions = mention.mentionData.mentionResult;
const MAX_NOTIFIED_ITEMS = 20;

function setupPicker(props?: Props): ReactWrapper<Props, State> {
  const resourceProvider = new MockMentionResource({
    minWait: 0,
    maxWait: 0,
  });
  return mount(
    <MentionPicker resourceProvider={resourceProvider} query="" {...props} />,
  ) as ReactWrapper<Props, State>;
}

const leftClick = {
  button: 0,
};

function createDefaultMentionItemsShowTest(
  mentionsComponent: ReactWrapper<Props, State>,
) {
  return () =>
    mentionsComponent.update() &&
    mentionsComponent.find(MentionItem).length === MAX_NOTIFIED_ITEMS;
}

function createNoMentionItemsShownTest(
  mentionsComponent: ReactWrapper<Props, State>,
) {
  return () =>
    mentionsComponent.update() &&
    mentionsComponent.find(MentionItem).length === 0;
}

function createMentionErrorShownTest(
  mentionsComponent: ReactWrapper<Props, State>,
) {
  return () =>
    mentionsComponent.update() &&
    mentionsComponent.find(MentionListError).length > 0;
}

describe('MentionPicker', () => {
  it('should accept all mention names by default', () => {
    const component = setupPicker();
    const hasExpectedItems = () =>
      component.update() &&
      component.find(MentionItem).length === MAX_NOTIFIED_ITEMS;

    return waitUntil(hasExpectedItems);
  });

  it('should accept limit result to starting with s', () => {
    const component = setupPicker({
      query: 's',
    } as Props);
    const hasExpectedItems = () =>
      component.update() && component.find(MentionItem).length === 5;
    return waitUntil(hasExpectedItems);
  });

  it('should accept limit result to starting with shae', () => {
    const component = setupPicker({
      query: 'shae',
    } as Props);
    const hasExpectedItems = () =>
      component.update() && component.find(MentionItem).length === 1;
    return waitUntil(hasExpectedItems);
  });

  it('should report error when service fails', () => {
    const component = setupPicker();

    return waitUntil(createDefaultMentionItemsShowTest(component))
      .then(() => {
        component.setProps({ query: 'nothing' });
        return waitUntil(createNoMentionItemsShownTest(component));
      })
      .then(() => {
        component.setProps({ query: 'error' });
        return waitUntil(createMentionErrorShownTest(component));
      });
  });

  it('should display particular message for 401 HTTP response', () => {
    const component = setupPicker();

    return waitUntil(createDefaultMentionItemsShowTest(component))
      .then(() => {
        component.setProps({ query: 'nothing' });
        return waitUntil(createNoMentionItemsShownTest(component));
      })
      .then(() => {
        component.setProps({ query: '401' });
        return waitUntil(createMentionErrorShownTest(component)).then(() => {
          let errorMention = component.find(MentionListError);
          let err = errorMention.prop('error') as HttpError;
          expect(err.statusCode).toEqual(401);
          expect(errorMention.text()).toContain('logging out');
        });
      });
  });

  it('should display particular message for 403 HTTP response', () => {
    const component = setupPicker();

    return waitUntil(createDefaultMentionItemsShowTest(component))
      .then(() => {
        component.setProps({ query: 'nothing' });
        return waitUntil(createNoMentionItemsShownTest(component));
      })
      .then(() => {
        component.setProps({ query: '403' });
        return waitUntil(createMentionErrorShownTest(component)).then(() => {
          let errorMention = component.find(MentionListError);
          let err = errorMention.prop('error') as HttpError;
          expect(err.statusCode).toEqual(403);
          expect(errorMention.text()).toContain('different text');
        });
      });
  });

  it('should display previous mention if error straight after', () => {
    const component = setupPicker();
    const defaultMentionItemsShowTest = createDefaultMentionItemsShowTest(
      component,
    );
    const mentionErrorProcessed = () => {
      component.update();
      const mentionList = component.find(MentionList);
      return mentionList.prop('resourceError');
    };

    return waitUntil(defaultMentionItemsShowTest)
      .then(() => {
        component.setProps({ query: 'error' });
        return waitUntil(mentionErrorProcessed);
      })
      .then(() => waitUntil(defaultMentionItemsShowTest));
  });

  it('should change selection when navigating next', () => {
    const component = setupPicker();
    const secondItemSelected = () =>
      isMentionItemSelected(component, mentions[1].id);

    return waitUntil(createDefaultMentionItemsShowTest(component)).then(() => {
      const mentionPicker = component.instance() as MentionPicker;
      mentionPicker.selectNext();
      component.update();
      return waitUntil(secondItemSelected);
    });
  });

  it('should change selection when selectIndex called', () => {
    const component = setupPicker();
    const thirdItemSelected = () =>
      isMentionItemSelected(component, mentions[2].id);

    return waitUntil(createDefaultMentionItemsShowTest(component)).then(() => {
      const mentionPicker = component.instance() as MentionPicker;
      mentionPicker.selectIndex(2);
      component.update();
      return waitUntil(thirdItemSelected);
    });
  });

  it('should change selection when selectId called', () => {
    const component = setupPicker();
    const thirdItemSelected = () =>
      isMentionItemSelected(component, mentions[2].id);

    return waitUntil(createDefaultMentionItemsShowTest(component)).then(() => {
      const mentionPicker = component.instance() as MentionPicker;
      mentionPicker.selectId(mentions[2].id);
      component.update();
      return waitUntil(thirdItemSelected);
    });
  });

  it('should change selection when navigating previous', () => {
    const component = setupPicker();
    const lastItemSelected = () =>
      isMentionItemSelected(component, mentions[MAX_NOTIFIED_ITEMS - 1].id);

    return waitUntil(createDefaultMentionItemsShowTest(component)).then(() => {
      const mentionPicker = component.instance() as MentionPicker;
      mentionPicker.selectPrevious();
      component.update();
      return waitUntil(lastItemSelected);
    });
  });

  it('should choose current selection when chooseCurrentSelection called', () => {
    let chosenMention: MentionDescription;

    const component = setupPicker({
      onSelection: mention => {
        chosenMention = mention;
      },
    } as Props);
    const secondItemSelected = () =>
      isMentionItemSelected(component, mentions[1].id);
    const chooseSecondItem = () =>
      chosenMention && chosenMention.id === mentions[1].id;

    return waitUntil(createDefaultMentionItemsShowTest(component))
      .then(() => {
        const mentionPicker = component.instance() as MentionPicker;
        mentionPicker.selectNext();
        component.update();
        return waitUntil(secondItemSelected);
      })
      .then(() => {
        const mentionPicker = component.instance() as MentionPicker;
        mentionPicker.chooseCurrentSelection();
        component.update();
        return waitUntil(chooseSecondItem);
      });
  });

  it('should choose clicked selection when item clicked', () => {
    let chosenMention: MentionDescription;

    const component = setupPicker({
      onSelection: mention => {
        chosenMention = mention;
      },
    } as Props);
    const chooseThirdItem = () =>
      chosenMention && chosenMention.id === mentions[2].id;

    return waitUntil(createDefaultMentionItemsShowTest(component)).then(() => {
      const item = getMentionItemById(component, mentions[2].id);
      item.simulate('mousedown', leftClick);
      return waitUntil(chooseThirdItem);
    });
  });

  it('should fire onOpen when first result shown', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    const component = setupPicker({
      onOpen: onOpen as OnOpen,
      onClose: onClose as OnClose,
    } as Props);

    return waitUntil(createDefaultMentionItemsShowTest(component)).then(() => {
      expect(onOpen).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(0);
    });
  });

  it('should fire onClose when no matches', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    const component = setupPicker({
      onOpen: onOpen as OnOpen,
      onClose: onClose as OnClose,
    } as Props);
    const noMentionItemsShown = () =>
      component.update() && component.find(MentionItem).length === 0;

    return waitUntil(createDefaultMentionItemsShowTest(component))
      .then(() => {
        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(0);
        component.setProps({ query: 'nothing' });
        return waitUntil(noMentionItemsShown);
      })
      .then(() => {
        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(1);
      });
  });

  it('should fire onOpen when error to display', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    const component = setupPicker({
      query: 'error',
      onOpen: onOpen as OnOpen,
      onClose: onClose as OnClose,
    } as Props);

    return waitUntil(createMentionErrorShownTest(component)).then(() => {
      expect(onOpen).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(0);
    });
  });

  it('mentionsCount returns the number of mentions in the list', () => {
    const component = setupPicker();

    return waitUntil(createDefaultMentionItemsShowTest(component)).then(() => {
      const mentionPicker = component.instance() as MentionPicker;
      expect(mentionPicker.mentionsCount()).toEqual(MAX_NOTIFIED_ITEMS);
    });
  });
});
