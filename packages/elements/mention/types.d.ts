import { SyntheticEvent } from 'react';
export interface HighlightDetail {
    start: number;
    end: number;
}
export interface Highlight {
    name: HighlightDetail[];
    mentionName: HighlightDetail[];
    nickname: HighlightDetail[];
}
export interface Presence {
    time?: string;
    status?: string;
}
export interface MentionDescription {
    id: string;
    avatarUrl?: string;
    name?: string;
    mentionName?: string;
    nickname?: string;
    highlight?: Highlight;
    lozenge?: string;
    presence?: Presence;
    accessLevel?: string;
    inContext?: boolean;
    userType?: string;
    context?: MentionDescContext;
}
export interface MentionDescContext {
    members: TeamMember[];
}
export interface MentionsResult {
    mentions: MentionDescription[];
    query: string;
}
export interface TeamMember {
    id: string;
    name: string;
}
export interface Team {
    id: string;
    smallAvatarImageUrl: string;
    displayName: string;
    members: TeamMember[];
    highlight?: Highlight;
}
export declare type MentionEventHandler = (mentionId: string, text: string, event?: SyntheticEvent<HTMLSpanElement>) => void;
export interface OnMentionEvent {
    (mention: MentionDescription, event?: SyntheticEvent<any>): void;
}
export declare enum MentionType {
    SELF = 0,
    RESTRICTED = 1,
    DEFAULT = 2
}
export declare enum UserAccessLevel {
    NONE = 0,
    SITE = 1,
    APPLICATION = 2,
    CONTAINER = 3
}
export declare enum UserType {
    DEFAULT = 0,
    SPECIAL = 1,
    APP = 2,
    TEAM = 3,
    SYSTEM = 4
}
export declare function isRestricted(accessLevel?: string): boolean;
export declare function isSpecialMention(mention: MentionDescription): boolean;
export declare function isAppMention(mention: MentionDescription): boolean | "" | undefined;
export declare function isTeamMention(mention: MentionDescription): boolean | "" | undefined;
export declare function isSpecialMentionText(mentionText: string): boolean | "";
