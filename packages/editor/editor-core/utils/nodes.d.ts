import { Transaction } from 'prosemirror-state';
import { Node as PMNode } from 'prosemirror-model';
/**
 * Finds all top level nodes affected by the transaction
 * Uses from/to positions in transaction's steps to work out which nodes will
 * be changed by the transaction
 */
export declare const findChangedNodesFromTransaction: (tr: Transaction<any>) => PMNode<any>[];
/** Validates prosemirror nodes, and returns true only if all nodes are valid */
export declare const validateNodes: (nodes: PMNode<any>[]) => boolean;
