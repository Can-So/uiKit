// @flow

export type SkeletonContainerViewProps = {
  /** A map of data attributes applied to the skeleton container element. */
  dataset?: { [name: string]: string | typeof undefined },
  /** The type of skeleton to render. */
  type?: 'product' | 'container',
};
