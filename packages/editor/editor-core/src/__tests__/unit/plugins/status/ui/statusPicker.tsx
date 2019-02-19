import * as React from 'react';
import { mountWithIntl } from '@atlaskit/editor-test-helpers';
import { StatusPickerWithoutAnalytcs as StatusPicker } from '../../../../../plugins/status/ui/statusPicker';
import { FABRIC_CHANNEL } from '../../../../../plugins/status/analytics';

describe('StatusPicker', () => {
  const closeStatusPicker = jest.fn();
  const createAnalyticsEvent = jest.fn();
  const onSelect = jest.fn();
  const onTextChanged = jest.fn();
  const onEnter = jest.fn();
  const fireEvent = jest.fn();

  beforeEach(() => {
    createAnalyticsEvent.mockReturnValue({
      fire: fireEvent,
    });
    document.body.innerHTML = "<div id='first'></div><div id='second'></div>";
  });

  afterEach(() => {
    createAnalyticsEvent.mockReset();
    fireEvent.mockReset();
  });

  const mountStatusPicker = () =>
    mountWithIntl(
      <StatusPicker
        target={document.getElementById('first')}
        closeStatusPicker={closeStatusPicker}
        onSelect={onSelect}
        onTextChanged={onTextChanged}
        onEnter={onEnter}
        isNew={true}
        createAnalyticsEvent={createAnalyticsEvent}
        defaultColor="purple"
        defaultText="Hello"
        defaultLocalId="12345"
      />,
    );

  const createPayloadPopupOpened = (
    action,
    localId,
    selectedColor,
    textLength,
    state,
  ) => ({
    action,
    actionSubject: 'statusPopup',
    attributes: expect.objectContaining({
      componentName: 'status',
      localId,
      packageName: '@atlaskit/editor-core',
      packageVersion: expect.any(String),
      selectedColor,
      textLength,
      state,
    }),
  });

  const createPayloadPopupClosed = (
    action,
    localId,
    selectedColor,
    textLength,
    state,
  ) => ({
    action,
    actionSubject: 'statusPopup',
    attributes: expect.objectContaining({
      componentName: 'status',
      duration: expect.any(Number),
      inputMethod: 'blur',
      localId,
      packageName: '@atlaskit/editor-core',
      packageVersion: expect.any(String),
      selectedColor,
      state,
      textLength,
    }),
  });

  const assertAnalyticsPayload = payload => {
    expect(createAnalyticsEvent).toBeCalledWith(
      expect.objectContaining(payload),
    );
    expect(fireEvent).toBeCalledWith(FABRIC_CHANNEL);
  };

  it('should fire statusPopup.opened analytics when StatusPicker is mounted', () => {
    const wrapper = mountStatusPicker();
    wrapper.unmount();
    assertAnalyticsPayload(
      createPayloadPopupOpened('opened', '12345', 'purple', 5, 'new'),
    );
    assertAnalyticsPayload(
      createPayloadPopupClosed('closed', '12345', 'purple', 5, 'new'),
    );
  });

  it('should fire statusPopup.closed for previous Status instance and statusPopup.opened for the new Status', () => {
    const wrapper = mountStatusPicker();
    wrapper.setProps({
      defaultColor: 'red',
      defaultText: 'Boo',
      defaultLocalId: '45678',
      isNew: false,
      target: document.getElementById('second'),
    });
    wrapper.unmount();

    assertAnalyticsPayload(
      createPayloadPopupOpened('opened', '12345', 'purple', 5, 'new'),
    );
    assertAnalyticsPayload(
      createPayloadPopupClosed('closed', '12345', 'purple', 5, 'new'),
    );
    assertAnalyticsPayload(
      createPayloadPopupOpened('opened', '45678', 'red', 3, 'update'),
    );
    assertAnalyticsPayload(
      createPayloadPopupClosed('closed', '45678', 'red', 3, 'update'),
    );
  });
});
