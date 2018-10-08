/* tslint:disable variable-name */
import * as React from 'react';
import { Component } from 'react';
import {
  Identifier,
  Card,
  CardAction,
  CardOnClickCallback,
  CardEvent,
  OnSelectChangeFunc,
  OnLoadingChangeFunc,
  isUrlPreviewIdentifier,
} from '@atlaskit/media-card';
import { Context } from '@atlaskit/media-core';
import { FilmstripView } from './filmstripView';

export interface FilmstripItem {
  readonly identifier: Identifier;
  readonly actions?: Array<CardAction>;
  readonly selectable?: boolean;
  readonly selected?: boolean;
  readonly onClick?: CardOnClickCallback;
  readonly onMouseEnter?: (result: CardEvent) => void;
  readonly onSelectChange?: OnSelectChangeFunc;
  readonly onLoadingChange?: OnLoadingChangeFunc;
}

export interface FilmstripProps {
  items: FilmstripItem[];
  context: Context;
}

export interface FilmstripState {
  animate: boolean;
  offset: number;
}

export class Filmstrip extends Component<FilmstripProps, FilmstripState> {
  identifiersMap: Map<Promise<string>, string>;
  lastKey: number;

  constructor(props: FilmstripProps) {
    super(props);

    this.identifiersMap = new Map();
    this.lastKey = 1;
    this.state = {
      animate: false,
      offset: 0,
    };
  }

  private handleSize = ({ offset }) => this.setState({ offset });
  private handleScroll = ({ animate, offset }) =>
    this.setState({ animate, offset });

  private renderCards() {
    const { items, context } = this.props;
    const cards = items.map((item, index) => {
      const key = this.getIdentifierKey(item.identifier);

      return <Card key={key} context={context} {...item} />;
    });

    return cards;
  }

  getIdentifierKey = (identifier: Identifier): string => {
    switch (identifier.mediaItemType) {
      case 'external-image':
        return identifier.dataURI;
      case 'link':
        if (isUrlPreviewIdentifier(identifier)) {
          return identifier.url;
        } else {
          return identifier.id;
        }
      case 'file':
        if (typeof identifier.id === 'string') {
          return identifier.id;
        } else {
          const currentKey = this.identifiersMap.get(identifier.id);
          if (currentKey) {
            return currentKey;
          }
          // We want to increment the key before using it
          this.lastKey++;
          const newKey = `${this.lastKey}`;
          this.identifiersMap.set(identifier.id, newKey);
          return newKey;
        }
    }
  };

  render() {
    const { animate, offset } = this.state;

    return (
      <FilmstripView
        animate={animate}
        offset={offset}
        onSize={this.handleSize}
        onScroll={this.handleScroll}
      >
        {this.renderCards()}
      </FilmstripView>
    );
  }
}
