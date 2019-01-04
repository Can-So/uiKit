import { Client } from '../Client';

export type CardAppearance = 'inline' | 'block';

type BaseCardProps = {
  appearance: CardAppearance;
  isSelected?: boolean;
  onClick?: () => void;
};

export type CardWithData = BaseCardProps & {
  data: any;
  importer?: (target: any) => void;
};

export type CardWithUrl = BaseCardProps & {
  url: string;
  client?: Client;
  importer?: (target: any) => void;
};

export type CardProps = CardWithData | CardWithUrl;
