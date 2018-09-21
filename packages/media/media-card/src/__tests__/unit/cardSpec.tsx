jest.mock('../../../src/utils/getDataURIFromFileState');
import { Observable } from 'rxjs';
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { fakeContext, nextTick } from '@atlaskit/media-test-helpers';
import { Context, UrlPreview } from '@atlaskit/media-core';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';
import {
  CardProps,
  UrlPreviewIdentifier,
  FileIdentifier,
  LinkIdentifier,
  CardDimensions,
} from '../../../src';

import { CardView } from '../../../src/root/cardView';

import { Card } from '../../../src/root/card';

import { LazyContent } from '../../../src/utils/lazyContent';
import { getDataURIFromFileState } from '../../../src/utils/getDataURIFromFileState';

describe('Card', () => {
  const urlIdentifier: UrlPreviewIdentifier = {
    mediaItemType: 'link',
    url: 'some-url',
  };
  const linkIdentifier: LinkIdentifier = {
    id: 'some-random-id',
    mediaItemType: 'link',
    collectionName: 'some-collection-name',
  };
  const fileIdentifier: FileIdentifier = {
    id: 'some-random-id',
    mediaItemType: 'file',
    collectionName: 'some-collection-name',
  };
  const linkUrlPreview: UrlPreview = {
    type: 'link',
    url: 'some-url',
    title: 'some-title',
  };
  const setup = (
    context: Context = fakeContext(),
    props?: Partial<CardProps>,
  ) => {
    (getDataURIFromFileState as any).mockReset();
    (getDataURIFromFileState as any).mockReturnValue('some-data-uri');
    const component = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        isLazy={false}
        {...props}
      />,
    );

    return {
      component,
      context,
    };
  };
  const createContextWithGetFile = () => {
    const getImage = jest.fn();
    const context = {
      getFile: () =>
        Observable.of({
          id: '123',
          mediaType: 'image',
          status: 'processed',
        }),
      getImage,
    } as any;

    return context;
  };

  it('should render card with UrlPreviewProvider when passed a UrlPreviewIdentifier', () => {
    const dummyUrl = 'http://some.url.com';
    const mediaItemType = 'link';
    const identifier: UrlPreviewIdentifier = {
      url: dummyUrl,
      mediaItemType,
    };
    const dummyProvider = { observable: 'dummy provider ftw!' };
    const context = fakeContext({
      getUrlPreviewProvider: dummyProvider,
    }) as any;
    const { component } = setup(context, { identifier });

    expect(context.getUrlPreviewProvider).toHaveBeenCalledTimes(1);
    expect(context.getUrlPreviewProvider).toBeCalledWith(dummyUrl);
    expect(component.find(CardView)).toHaveLength(1);
    expect(component.find(CardView).prop('mediaItemType')).toEqual('link');
  });

  it('should render a CardView with the right metadata when using a LinkIdentifier', async () => {
    const context = fakeContext({
      getMediaItemProvider: {
        observable: () =>
          Observable.of({
            details: linkUrlPreview,
          }),
      },
    });
    const { component } = setup(context, { identifier: linkIdentifier });

    // we need to wait for 2 promises: fetch metadata + fetch preview
    await nextTick();
    await nextTick();
    component.update();

    expect(component.find(CardView)).toHaveLength(1);
    expect(component.find(CardView).prop('status')).toEqual('complete');
    expect(component.find(CardView).prop('metadata')).toEqual({
      type: 'link',
      title: 'some-title',
      url: 'some-url',
    });
  });

  it('should render a CardView with the right metadata when using a UrlPreviewIdentifier', async () => {
    const context = fakeContext({
      getUrlPreviewProvider: {
        observable: () => Observable.of(linkUrlPreview),
      },
    });
    const { component } = setup(context, { identifier: urlIdentifier });
    // we need to wait for 2 promises: fetch metadata + fetch preview
    await nextTick();
    await nextTick();
    component.update();

    expect(component.find(CardView)).toHaveLength(1);
    expect(component.find(CardView).prop('status')).toEqual('complete');
    expect(component.find(CardView).prop('metadata')).toEqual({
      type: 'link',
      title: 'some-title',
      url: 'some-url',
    });
  });

  it('should use the new context to create the subscription when context prop changes', async () => {
    const firstContext = fakeContext({});
    const secondContext = fakeContext({}) as any;
    const { component } = setup(firstContext);
    component.setProps({ context: secondContext, fileIdentifier });

    const { id, collectionName } = fileIdentifier;
    await nextTick();
    expect(secondContext.getFile).toHaveBeenCalledTimes(1);
    expect(secondContext.getFile).toBeCalledWith(id, { collectionName });
    expect(component.find(CardView)).toHaveLength(1);
  });

  it('should create a new subscription when the identifier changes', async () => {
    const firstIdentifier: FileIdentifier = fileIdentifier;
    const secondIdentifier: LinkIdentifier = linkIdentifier;
    const dummyProvider = { observable: 'dummy provider ftw!' };
    const context = fakeContext({
      getMediaItemProvider: dummyProvider,
    }) as any;
    const { component } = setup(context, { identifier: firstIdentifier });
    component.setProps({ context, identifier: secondIdentifier });

    const { id, mediaItemType, collectionName } = secondIdentifier;
    await nextTick();
    expect(context.getFile).toHaveBeenCalledTimes(1);
    expect(context.getMediaItemProvider).toHaveBeenCalledTimes(1);
    expect(context.getMediaItemProvider).toBeCalledWith(
      id,
      mediaItemType,
      collectionName,
    );

    expect(component.find(CardView)).toHaveLength(1);
  });

  it('should refetch the image when width changes to a higher value', async () => {
    const initialDimensions: CardDimensions = {
      width: 100,
      height: 200,
    };
    const newDimensions: CardDimensions = {
      ...initialDimensions,
      width: 1000,
    };
    const context = createContextWithGetFile();
    const { component } = setup(context, {
      identifier: fileIdentifier,
      dimensions: initialDimensions,
    });
    component.setProps({ context, dimensions: newDimensions });

    await nextTick();
    expect(context.getImage).toHaveBeenCalledTimes(2);
    expect(context.getImage).toHaveBeenLastCalledWith('some-random-id', {
      allowAnimated: true,
      collection: 'some-collection-name',
      mode: 'crop',
      width: 1000,
      height: 200,
    });
  });

  it('should refetch the image when height changes to a higher value', async () => {
    const initialDimensions: CardDimensions = {
      width: 100,
      height: 200,
    };
    const newDimensions: CardDimensions = {
      ...initialDimensions,
      height: 2000,
    };
    const context = createContextWithGetFile();
    const { component } = setup(context, {
      identifier: fileIdentifier,
      dimensions: initialDimensions,
    });
    component.setProps({ context, dimensions: newDimensions });

    await nextTick();
    expect(context.getImage).toHaveBeenCalledTimes(2);
    expect(context.getImage).toHaveBeenLastCalledWith('some-random-id', {
      allowAnimated: true,
      collection: 'some-collection-name',
      mode: 'crop',
      width: 100,
      height: 2000,
    });
  });

  it('should not refetch the image when width changes to a smaller value', async () => {
    const initialDimensions: CardDimensions = {
      width: 100,
      height: 200,
    };
    const newDimensions: CardDimensions = {
      ...initialDimensions,
      width: 10,
    };
    const context = createContextWithGetFile();
    const { component } = setup(context, {
      identifier: fileIdentifier,
      dimensions: initialDimensions,
    });
    component.setProps({ context, dimensions: newDimensions });

    await nextTick();
    expect(context.getImage).toHaveBeenCalledTimes(1);
  });

  it('should not refetch the image when height changes to a smaller value', async () => {
    const initialDimensions: CardDimensions = {
      width: 100,
      height: 200,
    };
    const newDimensions: CardDimensions = {
      ...initialDimensions,
      height: 20,
    };
    const context = createContextWithGetFile();
    const { component } = setup(context, {
      identifier: fileIdentifier,
      dimensions: initialDimensions,
    });
    component.setProps({ context, dimensions: newDimensions });

    await nextTick();
    expect(context.getImage).toHaveBeenCalledTimes(1);
  });

  it('should fire onClick when passed in as a prop and CardView fires onClick', () => {
    const context = fakeContext() as any;
    const clickHandler = jest.fn();
    const card = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        onClick={clickHandler}
      />,
    );
    const cardViewOnClick = card.find(CardView).props().onClick;

    if (!cardViewOnClick) {
      throw new Error('CardView onClick was undefined');
    }

    expect(clickHandler).not.toHaveBeenCalled();
    cardViewOnClick({} as any, {} as any);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('should pass onMouseEnter to CardView', () => {
    const context = fakeContext() as any;
    const hoverHandler = () => {};
    const card = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        onMouseEnter={hoverHandler}
      />,
    );

    expect(card.find(CardView).props().onMouseEnter).toEqual(hoverHandler);
  });

  it('should use lazy load by default', () => {
    const context = fakeContext() as any;
    const hoverHandler = () => {};
    const card = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        onMouseEnter={hoverHandler}
      />,
    );
    expect(card.find(LazyContent)).toHaveLength(1);
  });

  it('should not use lazy load when "isLazy" is false', () => {
    const context = fakeContext() as any;
    const hoverHandler = () => {};
    const card = shallow(
      <Card
        isLazy={false}
        context={context}
        identifier={fileIdentifier}
        onMouseEnter={hoverHandler}
      />,
    );

    expect(card.find(LazyContent)).toHaveLength(0);
  });

  it('should pass properties down to CardView', () => {
    const context = fakeContext() as any;
    const card = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        appearance="small"
        dimensions={{ width: 100, height: 50 }}
      />,
    );

    expect(card.find(CardView).props().appearance).toBe('small');
    expect(card.find(CardView).props().dimensions).toEqual({
      width: 100,
      height: 50,
    });
  });

  it('should create a card placeholder with the right props', () => {
    const context = fakeContext() as any;
    const fileCard = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        appearance="small"
        dimensions={{ width: 100, height: 50 }}
      />,
    );
    const linkCard = shallow(
      <Card context={context} identifier={linkIdentifier} />,
    );
    const filePlaceholder = fileCard.find(CardView);
    const linkPlaceholder = linkCard.find(CardView);
    const {
      status,
      appearance,
      mediaItemType,
      dimensions,
    } = filePlaceholder.props();

    expect(status).toBe('loading');
    expect(appearance).toBe('small');
    expect(mediaItemType).toBe('file');
    expect(dimensions).toEqual({ width: 100, height: 50 });
    expect(linkPlaceholder.prop('mediaItemType')).toBe('link');
  });

  it('should use "crop" as default resizeMode', () => {
    const context = fakeContext();
    const card = mount(
      <Card context={context} identifier={fileIdentifier} isLazy={false} />,
    );

    expect(card.find(CardView).prop('resizeMode')).toBe('crop');
  });

  it('should pass right resizeMode down', () => {
    const context = fakeContext();
    const card = mount(
      <Card
        context={context}
        identifier={fileIdentifier}
        isLazy={false}
        resizeMode="full-fit"
      />,
    );

    expect(card.find(CardView).prop('resizeMode')).toBe('full-fit');
  });

  it('should contain analytics context with identifier info', () => {
    const analyticsEventHandler = jest.fn();
    const fetchImageDataUriSpy = jest.fn(() => Promise.resolve());
    const context = fakeContext({
      getDataUriService: {
        fetchImageDataUri: fetchImageDataUriSpy,
      },
    });
    const card = mount(
      <AnalyticsListener channel="media" onEvent={analyticsEventHandler}>
        <Card
          context={context}
          identifier={fileIdentifier}
          isLazy={false}
          resizeMode="full-fit"
        />
      </AnalyticsListener>,
    );

    card.simulate('click');

    expect(analyticsEventHandler).toHaveBeenCalledTimes(1);
    const actualFiredEvent: UIAnalyticsEventInterface =
      analyticsEventHandler.mock.calls[0][0];
    expect(actualFiredEvent.context[0]).toEqual(
      expect.objectContaining({
        actionSubject: 'MediaCard',
        actionSubjectId: 'some-random-id',
        componentName: 'Card',
        packageName: '@atlaskit/media-card',
      }),
    );
  });

  it('should pass "disableOverlay" to CardView', () => {
    const context = fakeContext();
    const card = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        isLazy={false}
        resizeMode="full-fit"
        disableOverlay={true}
      />,
      { disableLifecycleMethods: true },
    );

    expect(card.find(CardView).prop('disableOverlay')).toBe(true);
  });

  it('should use context.getFile to fetch file data', async () => {
    const { context } = setup();
    await nextTick();
    expect(context.getFile).toHaveBeenCalledTimes(1);
    expect(context.getFile).toBeCalledWith('some-random-id', {
      collectionName: 'some-collection-name',
    });
  });

  it('should work with async identifier', async () => {
    const identifier: FileIdentifier = {
      id: Promise.resolve('file-id'),
      mediaItemType: 'file',
      collectionName: 'collection',
    };
    const { context } = setup(undefined, { identifier });
    await nextTick();
    expect(context.getFile).toHaveBeenCalledTimes(1);
    expect(context.getFile).toBeCalledWith('file-id', {
      collectionName: 'collection',
    });
  });

  it('should set dataURI only if its not present', async () => {
    const { component } = setup();
    await nextTick();
    expect(getDataURIFromFileState).toHaveBeenCalledTimes(1);
    expect(component.state('dataURI')).toEqual('some-data-uri');
  });

  it('should set right state when file is uploading', async () => {
    const context = fakeContext({
      getFile: Observable.of({
        id: '123',
        status: 'uploading',
        progress: 0.2,
        mediaType: 'image',
        size: 10,
        name: 'me.png',
      }),
    });
    const { component } = setup(context);

    await nextTick();
    expect(component.state()).toEqual({
      status: 'uploading',
      dataURI: 'some-data-uri',
      isCardVisible: true,
      progress: 0.2,
      metadata: {
        id: '123',
        mediaType: 'image',
        name: 'me.png',
        size: 10,
      },
    });
  });

  it('should set right state when file is processing', async () => {
    const context = fakeContext({
      getFile: Observable.of({
        id: '123',
        status: 'uploading',
        mediaType: 'image',
        size: 10,
        name: 'me.png',
      }),
    });
    const { component } = setup(context);

    await nextTick();
    expect(component.state()).toEqual({
      status: 'uploading',
      dataURI: 'some-data-uri',
      progress: undefined,
      isCardVisible: true,
      metadata: {
        id: '123',
        mediaType: 'image',
        name: 'me.png',
        size: 10,
      },
    });
  });

  it('should set right state when file is processed', async () => {
    const getImage = jest.fn();
    const context = {
      getFile: () =>
        Observable.of({
          id: '123',
          status: 'processed',
          mediaType: 'image',
          size: 10,
          name: 'me.png',
        }),
      getImage,
    } as any;
    const { component } = setup(context);

    // we need to wait for 2 promises: fetch metadata + fetch preview
    await nextTick();
    await nextTick();

    expect(component.state()).toEqual({
      status: 'complete',
      dataURI: 'mock result of URL.createObjectURL()',
      progress: undefined,
      isCardVisible: true,
      metadata: {
        id: '123',
        mediaType: 'image',
        name: 'me.png',
        size: 10,
      },
    });
  });

  it('should render error card when getFile resolves with status=error', async () => {
    const context = fakeContext({
      getFile: Observable.of({ status: 'error' }),
    });
    const { component } = setup(context);

    await nextTick();
    component.update();
    expect(component.find(CardView).prop('status')).toEqual('error');
  });

  it('should render error card when getFile fails', async () => {
    const getFile = new Observable(subscriber => {
      subscriber.error('some-error');
    });
    const context = fakeContext({
      getFile,
    });
    const { component } = setup(context);

    await nextTick();
    expect(component.state('error')).toEqual('some-error');
    component.update();
    expect(component.find(CardView).prop('status')).toEqual('error');
  });

  it('should fetch remote preview when file is processed', async () => {
    const context = createContextWithGetFile();
    setup(context);

    // we need to wait for 2 promises: fetch metadata + fetch preview
    await nextTick();
    await nextTick();

    expect(context.getImage).toHaveBeenCalledTimes(1);
    expect(context.getImage).toBeCalledWith('some-random-id', {
      collection: 'some-collection-name',
      height: 125,
      width: 156,
      allowAnimated: true,
      mode: 'crop',
    });
  });

  it('should use allowAnimated=false for small cards', async () => {
    const context = createContextWithGetFile();
    setup(context, {
      appearance: 'small',
    });

    // we need to wait for 2 promises: fetch metadata + fetch preview
    await nextTick();
    await nextTick();

    expect(context.getImage).toBeCalledWith('some-random-id', {
      collection: 'some-collection-name',
      height: 32,
      width: 32,
      allowAnimated: false,
      mode: 'crop',
    });
  });

  it('should pass resize mode down to getImage call', async () => {
    const context = createContextWithGetFile();
    setup(context, {
      resizeMode: 'full-fit',
    });

    // we need to wait for 2 promises: fetch metadata + fetch preview
    await nextTick();
    await nextTick();

    expect(context.getImage).toBeCalledWith(
      'some-random-id',
      expect.objectContaining({
        mode: 'full-fit',
      }),
    );
  });

  it('should render CardView with expected props', async () => {
    const getImage = jest.fn();
    const context = {
      getFile: () =>
        Observable.of({
          id: '123',
          status: 'processed',
          mediaType: 'image',
          mimeType: 'image/png',
          name: 'file-name',
          size: 10,
        }),
      getImage,
    } as any;

    const { component } = setup(context, {
      dimensions: { width: 10, height: 20 },
      selectable: true,
      selected: true,
      resizeMode: 'fit',
      disableOverlay: true,
    });

    // we need to wait for 2 promises: fetch metadata + fetch preview
    await nextTick();
    await nextTick();
    component.update();

    expect(component.find(CardView).props()).toEqual(
      expect.objectContaining({
        appearance: 'auto',
        dataURI: 'mock result of URL.createObjectURL()',
        dimensions: { width: 10, height: 20 },
        disableOverlay: true,
        mediaItemType: 'file',
        progress: undefined,
        resizeMode: 'fit',
        selectable: true,
        selected: true,
        status: 'complete',
      }),
    );

    expect(component.find(CardView).prop('metadata')).toEqual({
      id: '123',
      mediaType: 'image',
      name: 'file-name',
      mimeType: 'image/png',
      size: 10,
    });
  });

  it('should cleanup resources when unmounting', () => {
    const unsubscribe = jest.fn();
    const releaseDataURI = jest.fn();
    const { component } = setup();
    const instance = component.instance() as Card;

    instance.unsubscribe = unsubscribe;
    instance.releaseDataURI = releaseDataURI;

    component.unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(releaseDataURI).toHaveBeenCalledTimes(1);
  });

  it('should pass status=processing if file size is 0', async () => {
    const getImage = jest.fn();
    const context = {
      getFile: () =>
        Observable.of({
          id: '123',
          status: 'processed',
          mediaType: 'image',
          mimeType: 'image/png',
          name: 'file-name',
          size: 0,
        }),
      getImage,
    } as any;
    const { component } = setup(context);

    await nextTick();
    component.update();

    expect(component.find(CardView).prop('status')).toEqual('processing');
  });

  describe('Retry', () => {
    it('should pass down "onRetry" prop when an error occurs', async () => {
      const { component, context } = setup();
      const cardViewOnError = component.find(CardView).prop('onRetry')!;
      await nextTick();
      expect(context.getFile).toHaveBeenCalledTimes(1);
      cardViewOnError();
      await nextTick();
      expect(context.getFile).toHaveBeenCalledTimes(2);
    });
  });
});
