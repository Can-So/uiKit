import * as React from 'react';
import { shallow } from 'enzyme';
import { BlockCard } from '@atlaskit/media-ui';
import { LinkCardGenericView } from '../..';

describe('LinkCardGenericView', () => {
  const site = 'Hello world';
  const linkUrl = 'http://localhost:9001/';
  const thumbnailUrl = 'http://localhost:9001/some/thumbnail';
  const errorMessage = 'Some random error occured';

  it('should render the error view when there is an error message', () => {
    const element = shallow(
      <LinkCardGenericView errorMessage={errorMessage} />,
    );
    expect(element.find(BlockCard.ErroredView)).toHaveLength(1);
    expect(element.find(BlockCard.ResolvingView)).toHaveLength(0);
    expect(element.find(BlockCard.ResolvedView)).toHaveLength(0);
  });

  it('should render the error view when the card is loading and there is an error message', () => {
    const element = shallow(
      <LinkCardGenericView isLoading={true} errorMessage={errorMessage} />,
    );
    expect(element.find(BlockCard.ErroredView)).toHaveLength(1);
    expect(element.find(BlockCard.ResolvingView)).toHaveLength(0);
    expect(element.find(BlockCard.ResolvedView)).toHaveLength(0);
  });

  it('should render the loading view when the card is loading', () => {
    const element = shallow(<LinkCardGenericView isLoading={true} />);
    expect(element.find(BlockCard.ErroredView)).toHaveLength(0);
    expect(element.find(BlockCard.ResolvingView)).toHaveLength(1);
    expect(element.find(BlockCard.ResolvedView)).toHaveLength(0);
  });

  it('should render the loaded view when the card is loaded and there is no error message', () => {
    const element = shallow(<LinkCardGenericView />);
    expect(element.find(BlockCard.ErroredView)).toHaveLength(0);
    expect(element.find(BlockCard.ResolvingView)).toHaveLength(0);
    expect(element.find(BlockCard.ResolvedView)).toHaveLength(1);
  });

  it('should render the context text when I have a site and url', () => {
    const element = shallow(
      <LinkCardGenericView site={site} linkUrl={linkUrl} />,
    );
    expect(element.find(BlockCard.ResolvedView).prop('context')).toEqual(
      expect.objectContaining({ text: site }),
    );
  });

  it('should render the context text when I have a url', () => {
    const element = shallow(<LinkCardGenericView linkUrl={linkUrl} />);
    expect(element.find(BlockCard.ResolvedView).prop('context')).toEqual(
      expect.objectContaining({ text: linkUrl }),
    );
  });

  it('should render empty context text', () => {
    const element = shallow(<LinkCardGenericView />);
    expect(element.find(BlockCard.ResolvedView).prop('context')).toEqual(
      expect.objectContaining({ text: '' }),
    );
  });

  it('should render a title when there is a title', () => {
    const element = shallow(<LinkCardGenericView title="foobar" />);
    expect(element.find(BlockCard.ResolvedView).prop('title')).toEqual({
      text: 'foobar',
    });
  });

  it('should not render a title when there is no title', () => {
    const element = shallow(<LinkCardGenericView />);
    expect(element.find(BlockCard.ResolvedView).prop('title')).toBeUndefined();
  });

  it('should render a description when there is a description', () => {
    const element = shallow(<LinkCardGenericView description="foobar" />);
    expect(element.find(BlockCard.ResolvedView).prop('description')).toEqual({
      text: 'foobar',
    });
  });

  it('should not render a description when there is no description', () => {
    const element = shallow(<LinkCardGenericView />);
    expect(
      element.find(BlockCard.ResolvedView).prop('description'),
    ).toBeUndefined();
  });

  it('should render a preview when the card is square and we have a thumbnailUrl', () => {
    const element = shallow(
      <LinkCardGenericView appearance="square" thumbnailUrl={thumbnailUrl} />,
    );
    expect(element.find(BlockCard.ResolvedView).prop('preview')).toEqual(
      thumbnailUrl,
    );
    expect(
      element.find(BlockCard.ResolvedView).prop('thumbnail'),
    ).toBeUndefined();
  });

  it('should render a thumbnail when the card is horizontal and we have a thumbnailUrl', () => {
    const element = shallow(
      <LinkCardGenericView
        appearance="horizontal"
        thumbnailUrl={thumbnailUrl}
      />,
    );
    expect(
      element.find(BlockCard.ResolvedView).prop('preview'),
    ).toBeUndefined();
    expect(element.find(BlockCard.ResolvedView).prop('thumbnail')).toEqual(
      thumbnailUrl,
    );
  });
});
