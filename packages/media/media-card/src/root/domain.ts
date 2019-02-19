export type Identifier = FileIdentifier | ExternalImageIdentifier;

export interface FileIdentifier {
  readonly mediaItemType: 'file';
  readonly id: string | Promise<string>;
  readonly occurrenceKey?: string;
  readonly collectionName?: string; // files can exist outside of a collection
}

export interface ExternalImageIdentifier {
  readonly mediaItemType: 'external-image';
  readonly dataURI: string;
  readonly name?: string;
}
