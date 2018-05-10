import * as React from 'react';
import { mount } from 'enzyme';
import { Subject } from 'rxjs/Subject';
import { MediaItem, MediaItemType } from '@atlaskit/media-core';
import { Stubs } from '../_stubs';
import { List } from '../../src/newgen/list';
import { ErrorMessage } from '../../src/newgen/styled';
import ArrowRightCircleIcon from '@atlaskit/icon/glyph/chevron-right-circle';

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
  const el = mount(
    <List selectedItem={identifier} items={items} context={context} />,
  );
  return el;
}

describe('<List />', () => {
  const identifier = {
    id: 'some-id',
    occurrenceKey: 'some-custom-occurrence-key',
    type: 'file' as MediaItemType,
  };

  it('should update navigation', () => {
    const identifier2 = {
      id: 'some-id-2',
      occurrenceKey: 'some-custom-occurrence-key',
      type: 'file' as MediaItemType,
    };
    const el = createFixture([identifier, identifier2], identifier);
    expect(el.state().selectedItem).toMatchObject({ id: 'some-id' });
    el.find(ArrowRightCircleIcon).simulate('click');
    expect(el.state().selectedItem).toMatchObject({ id: 'some-id-2' });
  });

  it('should show an error if selected item is not found in the list', () => {
    const list = [
      {
        id: 'some-id',
        occurrenceKey: 'some-custom-occurrence-key',
        type: 'file' as MediaItemType,
      },
    ];
    const selectedItem = {
      id: 'some-id-2',
      occurrenceKey: 'some-custom-occurrence-key',
      type: 'file' as MediaItemType,
    };
    const el = createFixture(list, selectedItem);
    expect(el.find(ErrorMessage)).toHaveLength(1);
  });
});
