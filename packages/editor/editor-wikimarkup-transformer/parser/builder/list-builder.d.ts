import { Node as PMNode, Schema } from 'prosemirror-model';
import { AddArgs, ListType } from '../../interfaces';
/**
 * Return the type of a list from the bullets
 */
export declare function getType(bullets: string): ListType;
export declare class ListBuilder {
    private schema;
    private root;
    private lastDepth;
    private lastList;
    constructor(schema: Schema, bullets: string);
    /**
     * Return the type of the base list
     * @returns {ListType}
     */
    readonly type: ListType;
    /**
     * Add a list item to the builder
     * @param {AddArgs[]} items
     */
    add(items: AddArgs[]): void;
    /**
     * Compile a prosemirror node from the root list
     * @returns {PMNode[]}
     */
    buildPMNode(): PMNode[];
    /**
     * Build prosemirror bulletList or orderedList node
     * @param {List} list
     * @returns {PMNode}
     */
    private parseList;
    /**
     * Build prosemirror listItem node
     * This function would possibly return non listItem nodes
     * which we need to break out later
     * @param {ListItem} item
     */
    private parseListItem;
    private isParagraphEmptyTextNode;
    private createListItem;
    /**
     * Add an item at the same level as the current list item
     * @param {ListType} type
     * @param {PMNode} content
     * @returns {PMNode}
     */
    private addListItem;
    /**
     * Append the past content to the last accessed list node (multiline entries)
     * @param {PMNode[]} content
     */
    private appendToLastItem;
    /**
     * Created a nested list structure of N depth under the current node
     * @param {number} depth
     * @param {ListType} type
     */
    private createNest;
    /**
     * Find the Nth list ancestor of the current list
     * @param {number} depth
     */
    private findAncestor;
}
