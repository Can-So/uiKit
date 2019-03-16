import { Node as PMNode, Schema } from 'prosemirror-model';
import { Step, StepResult, Mappable } from 'prosemirror-transform';
/**
 * For more context on what this is about:
 * @see https://discuss.prosemirror.net/t/preventing-image-placeholder-replacement-from-being-undone/1394
 */
export declare class SetAttrsStep extends Step {
    pos: number;
    attrs: object;
    constructor(pos: number, attrs: object);
    apply(doc: PMNode): StepResult<any>;
    invert(doc: PMNode): SetAttrsStep;
    map(mapping: Mappable): SetAttrsStep | null;
    toJSON(): {
        stepType: string;
        pos: number;
        attrs: object;
    };
    static fromJSON(_schema: Schema, json: {
        pos?: number;
        attrs: object;
    }): SetAttrsStep;
}
