import SchemaNode from './schema-node';
import SchemaNodeWithValidators, {
  Indexed,
} from './schema-node-with-validators';

export interface ArrayValidators extends Indexed {
  minItems?: number; // 6.12
  maxItems?: number; // 6.11
}

export default class ArraySchemaNode extends SchemaNodeWithValidators<
  ArrayValidators
> {
  items: Array<SchemaNode>; // 6.9 -> SchemaNode | Array<SchemaNode>;

  constructor(
    items: SchemaNode | Array<SchemaNode> = [],
    validators: ArrayValidators = {},
  ) {
    super('array', validators);
    this.items = Array.isArray(items) ? items : [items];
  }

  push(items: SchemaNode | Array<SchemaNode> | undefined) {
    if (items) {
      this.items = this.items.concat(items);
    }
  }

  toJSON(): object {
    const items = this.items.map(item => item.toJSON());
    const obj: any = { type: 'array' };

    if (items.length) {
      obj.items = items.length === 1 ? items[0] : items;
    }

    return this.mergeValidationInfo(['minItems', 'maxItems'], obj);
  }
}
