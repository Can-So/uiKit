export interface Link {
    readonly originalLinkText: string;
    readonly linkBody: string | null;
    readonly notLinkBody: string;
    readonly linkTitle: string | null;
}
export declare function parseLink(linkText: string): Link;
export interface ContentLink extends Link {
    readonly spaceKey: string | null;
    readonly destinationTitle: string;
    readonly anchor: string | null;
    readonly shortcutName: string | null;
    readonly shortcutValue: string | null;
    readonly attachmentName: string | null;
    readonly contentId: number;
}
export declare function parseContentLink(link: Link | string): ContentLink;
