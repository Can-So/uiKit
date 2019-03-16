/// <reference types="react" />
import { Fragment, Mark, Node, Schema } from 'prosemirror-model';
import { Serializer } from '../';
import { RendererAppearance } from '../ui/Renderer';
import { TextWrapper } from './nodes';
import { ProviderFactory, EventHandlers, ExtensionHandlers } from '@atlaskit/editor-common';
export interface RendererContext {
    objectAri?: string;
    containerAri?: string;
    adDoc?: any;
    schema?: Schema;
}
export interface ConstructorParams {
    providers?: ProviderFactory;
    eventHandlers?: EventHandlers;
    extensionHandlers?: ExtensionHandlers;
    portal?: HTMLElement;
    objectContext?: RendererContext;
    appearance?: RendererAppearance;
    disableHeadingIDs?: boolean;
    allowDynamicTextSizing?: boolean;
}
export default class ReactSerializer implements Serializer<JSX.Element> {
    private providers?;
    private eventHandlers?;
    private extensionHandlers?;
    private portal?;
    private rendererContext?;
    private appearance?;
    private disableHeadingIDs?;
    private headingIds;
    private allowDynamicTextSizing?;
    constructor({ providers, eventHandlers, extensionHandlers, portal, objectContext, appearance, disableHeadingIDs, allowDynamicTextSizing, }: ConstructorParams);
    private resetState;
    serializeFragment(fragment: Fragment, props?: any, target?: any, key?: string, parentInfo?: {
        parentIsIncompleteTask: boolean;
    }): JSX.Element | null;
    private serializeTextWrapper;
    private serializeMark;
    private renderNode;
    private renderMark;
    private getTableProps;
    private getDateProps;
    private getProps;
    private getHeadingProps;
    private getHeadingId;
    private getUniqueHeadingId;
    private getMarkProps;
    static getChildNodes(fragment: Fragment): (Node | TextWrapper)[];
    static getMarks(node: Node): Mark[];
    static buildMarkStructure(content: Node[]): Mark<any>[];
    static fromSchema(schema: Schema, { providers, eventHandlers, extensionHandlers, appearance, disableHeadingIDs, allowDynamicTextSizing, }: ConstructorParams): ReactSerializer;
}
