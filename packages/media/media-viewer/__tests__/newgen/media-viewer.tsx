import * as React from 'react';
import { mount } from 'enzyme';
import { Subject } from 'rxjs/Subject';
import { MediaItem, MediaItemType } from '@atlaskit/media-core';
import { Stubs } from '../_stubs';
import { Content } from '../../src/newgen/content';
import { MediaViewer } from '../../src/newgen/media-viewer';
import { ErrorMessage, CloseButtonWrapper } from '../../src/newgen/styled';
import Header from '../../src/newgen/header';
import { KeyboardEventWithKeyCode } from './shortcut.spec';
import { ItemSource } from '../../src/newgen/domain';

function createContext(subject) {
  const token = 'some-token';
  const clientId = 'some-client-id';
  const serviceHost = 'some-service-host';
  const authProvider = jest.fn(() => Promise.resolve({ token, clientId }));
  const contextConfig = {
    serviceHost,
    authProvider,
  };
  return Stubs.context(
    contextConfig,
    undefined,
    subject && Stubs.mediaItemProvider(subject),
  ) as any;
}

function createFixture(items, identifier) {
  const subject = new Subject<MediaItem>();
  const context = createContext(subject);
  const onClose = jest.fn();
  const itemSource: ItemSource = {
    kind: 'ARRAY',
    items,
  };
  const el = mount(
    <MediaViewer
      selectedItem={identifier}
      itemSource={itemSource}
      context={context}
      onClose={onClose}
    />,
  );
  return { subject, el, onClose };
}

describe('<MediaViewer />', () => {
  const identifier = {
    id: 'some-id',
    occurrenceKey: 'some-custom-occurrence-key',
    type: 'file' as MediaItemType,
  };

  it('should display an error if data source is not supported', () => {
    const { el } = createFixture([], identifier);
    expect(el.find(ErrorMessage)).toHaveLength(1);
  });

  it('should close Media Viewer on click', () => {
    const { el, onClose } = createFixture([identifier], identifier);
    el.find(Content).simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should close Media Viewer on ESC shortcut', () => {
    const { onClose } = createFixture([identifier], identifier);
    const e = new KeyboardEventWithKeyCode('keydown', {
      bubbles: true,
      cancelable: true,
      keyCode: 27,
    });
    document.dispatchEvent(e);
    expect(onClose).toHaveBeenCalled();
  });

  it('should not close Media Viewer when clicking on the Header', () => {
    const { el, onClose } = createFixture([identifier], identifier);
    el.find(Header).simulate('click');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('the error view show close on click', () => {
    const selectedItem = {
      id: 'some-id-2',
      occurrenceKey: 'some-custom-occurrence-key',
      type: 'file' as MediaItemType,
    };
    const { el, onClose } = createFixture([], selectedItem);
    expect(el.find(ErrorMessage)).toHaveLength(1);
    el.find(Content).simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should always render the close button', () => {
    const { el, onClose } = createFixture([identifier], identifier);

    expect(el.find(CloseButtonWrapper)).toHaveLength(1);
    el
      .find(CloseButtonWrapper)
      .find('Button')
      .simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
