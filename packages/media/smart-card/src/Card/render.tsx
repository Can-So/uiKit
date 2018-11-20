import * as React from 'react';
import LazyRender from 'react-lazily-render';
import { CardProps, CardWithData, CardWithUrl } from './types';
import { CardWithUrlContent as CardWithUrlContentType } from './renderCardWithUrl';
import { CardWithDataContent as CardWithDataContentType } from './renderCardWithData';

export const isCardWithData = (props: CardProps): props is CardWithData =>
  !!(props as CardWithData).data;

export class CardWithURLRenderer extends React.Component<CardWithUrl> {
  static CardContent: typeof CardWithUrlContentType | null = null;

  static moduleImporter(target: any) {
    import(/* webpackChunkName:"@atlaskit-internal-smartcard-urlcardcontent" */ './renderCardWithUrl').then(
      module => {
        CardWithURLRenderer.CardContent = module.CardWithUrlContent;
        target.forceUpdate();
      },
    );
  }

  componentDidMount() {
    if (CardWithURLRenderer.CardContent === null) {
      (this.props.importer || CardWithURLRenderer.moduleImporter)(this);
    }
  }

  render() {
    const { url, client, appearance, isSelected, onClick } = this.props;

    if (!url) {
      throw new Error('@atlaskit/smart-card: you are ');
    }

    return (
      <LazyRender
        offset={100}
        component={appearance === 'inline' ? 'span' : 'div'}
        placeholder={<a href={url}>{url}</a>}
        content={
          CardWithURLRenderer.CardContent !== null ? (
            <CardWithURLRenderer.CardContent
              url={url}
              client={client!}
              appearance={appearance}
              onClick={onClick}
              isSelected={isSelected}
            />
          ) : (
            <a href={url}>{url}</a>
          )
        }
      />
    );
  }
}

export class CardWithDataRenderer extends React.Component<CardWithData> {
  static CardContent: typeof CardWithDataContentType | null = null;

  static moduleImporter(target: any) {
    import(/* webpackChunkName:"@atlaskit-internal-smartcard-datacardcontent" */ './renderCardWithData').then(
      module => {
        CardWithDataRenderer.CardContent = module.CardWithDataContent;
        target.forceUpdate();
      },
    );
  }

  componentDidMount() {
    if (CardWithDataRenderer.CardContent === null) {
      (this.props.importer || CardWithDataRenderer.moduleImporter)(this);
    }
  }

  render() {
    const { appearance, data, isSelected, onClick } = this.props;
    if (!data) {
      throw new Error(
        '@atlaskit/smart-cards: you are trying to render a card with data, but does not provide any',
      );
    }
    if (CardWithDataRenderer.CardContent) {
      return (
        <CardWithDataRenderer.CardContent
          appearance={appearance}
          data={data}
          isSelected={isSelected}
          onClick={onClick}
        />
      );
    }
    return null;
  }
}
