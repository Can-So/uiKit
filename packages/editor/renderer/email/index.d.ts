import { Fragment, Schema } from 'prosemirror-model';
import { Serializer } from '../serializer';
export declare const commonStyle: {
    'font-family': any;
    'font-size': any;
    'font-weight': number;
    'line-height': string;
};
export default class EmailSerializer implements Serializer<string> {
    serializeFragment(fragment: Fragment): string;
    static fromSchema(schema: Schema): EmailSerializer;
}
