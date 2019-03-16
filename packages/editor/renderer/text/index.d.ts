import { Fragment, Schema } from 'prosemirror-model';
import { Serializer } from '../serializer';
export default class TextSerializer implements Serializer<string> {
    private schema;
    constructor(schema: Schema);
    serializeFragment(fragment: Fragment): string;
    static fromSchema(schema?: Schema): TextSerializer;
}
