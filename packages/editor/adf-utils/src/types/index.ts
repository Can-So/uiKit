export interface EntityMark {
  type: string;
  attrs?: { [name: string]: any };
}

export interface Entity {
  type: string;
  attrs?: { [name: string]: any };
  content?: Array<Entity>;
  marks?: Array<EntityMark>;
  text?: string;
  [key: string]: any;
}
