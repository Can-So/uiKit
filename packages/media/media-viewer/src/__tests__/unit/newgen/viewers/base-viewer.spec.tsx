import * as React from 'react';
import { mount } from 'enzyme';
import Button from '@atlaskit/button';
import { ProcessedFileState } from '@atlaskit/media-core';
import { BaseProps, BaseViewer } from '../../../../newgen/viewers/base-viewer';
import { createContext } from '../../_stubs';
import { Outcome } from '../../../../newgen/domain';
import {
  createError,
  ErrorMessage,
  MediaViewerError,
} from '../../../../newgen/error';
import { Spinner } from '../../../../newgen/loading';

function createItem(): ProcessedFileState {
  return {
    id: 'some-id',
    status: 'processed',
    name: 'my image',
    size: 11222,
    mediaType: 'image',
    mimeType: 'jpeg',
    artifacts: {},
  };
}

function createProps(): BaseProps {
  const item = createItem();
  const context = createContext();
  const collectionName = 'test-collection';
  return { item, context, collectionName };
}

function createInitialState() {
  return {
    content: Outcome.pending<string, MediaViewerError>(),
  };
}

function createTestViewer(props: BaseProps) {
  const initSpy = jest.fn();
  const releaseSpy = jest.fn();
  const renderSuccessfulSpy = jest.fn((content: string) => (
    <div>{content}</div>
  ));
  class TestViewer extends BaseViewer<string, BaseProps> {
    protected get initialState() {
      return createInitialState();
    }
    protected init = initSpy;
    protected release = releaseSpy;
    protected renderSuccessful = renderSuccessfulSpy;
  }
  const el = mount(<TestViewer {...props} />);
  return { el, initSpy, releaseSpy, renderSuccessfulSpy };
}

describe('BaseViewer', () => {
  it('calls init() when component is mounted', () => {
    const { initSpy } = createTestViewer(createProps());
    expect(initSpy).toHaveBeenCalledTimes(1);
  });

  it('calls release() when component is unmounted', () => {
    const { el, releaseSpy } = createTestViewer(createProps());
    el.unmount();
    expect(releaseSpy).toHaveBeenCalledTimes(1);
  });

  it('calls release(), then init() when item was updated', () => {
    const { el, initSpy, releaseSpy } = createTestViewer(createProps());
    const newItem = { ...createItem(), id: 'new-id' };
    el.setProps({ item: newItem });
    expect(releaseSpy).toHaveBeenCalledTimes(1);
    expect(initSpy).toHaveBeenCalledTimes(2);
  });

  it('calls release(), then init() when context was updated', () => {
    const { el, initSpy, releaseSpy } = createTestViewer(createProps());
    el.setProps({ context: createContext() });
    expect(releaseSpy).toHaveBeenCalledTimes(1);
    expect(initSpy).toHaveBeenCalledTimes(2);
  });

  it('calls release(), then init() when collectionName was updated', () => {
    const { el, initSpy, releaseSpy } = createTestViewer(createProps());
    el.setProps({ collectionName: 'another-collection-name' });
    expect(releaseSpy).toHaveBeenCalledTimes(1);
    expect(initSpy).toHaveBeenCalledTimes(2);
  });

  it('sets the initialState when component is mounted', () => {
    const { el } = createTestViewer(createProps());
    expect(el.state()).toMatchObject(createInitialState());
  });

  it('resets the component to the initialState when properties were updated', () => {
    const { el } = createTestViewer(createProps());
    el.setState({ content: Outcome.successful('test') });
    el.setProps({ context: createContext() });
    expect(el.state()).toMatchObject(createInitialState());
  });

  it('renders a spinner while the content is pending', () => {
    const { el } = createTestViewer(createProps());
    expect(el.find(Spinner)).toHaveLength(1);
  });

  it('invokes renderSuccessful() when the content loading was successful', () => {
    const { el, renderSuccessfulSpy } = createTestViewer(createProps());
    const content = Outcome.successful('test');
    el.setState({ content });
    expect(el.text()).toEqual('test');
    expect(renderSuccessfulSpy).toHaveBeenCalled();
  });

  it('renders an error message when the content loading has failed', () => {
    const { el } = createTestViewer(createProps());
    const content = Outcome.failed(createError('previewFailed'));
    el.setState({ content });
    const errorMessage = el.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain(
      "We couldn't generate a preview for this file",
    );

    // download button
    expect(errorMessage.text()).toContain(
      'Try downloading the file to view it',
    );
    expect(errorMessage.find(Button)).toHaveLength(1);
  });
});
