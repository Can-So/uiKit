import { HTMLAttributes, ComponentClass } from 'react';
export interface MentionItemStyleProps {
    selected?: boolean;
}
export interface AvatarSectionStyleProps {
    restricted?: boolean;
}
export interface NameSectionStyleProps {
    restricted?: boolean;
}
export interface InfoSectionStyleProps {
    restricted?: boolean;
}
export declare const RowStyle: ComponentClass<HTMLAttributes<{}>>;
export declare const AvatarStyle: ComponentClass<HTMLAttributes<{}> & AvatarSectionStyleProps>;
export declare const NameSectionStyle: ComponentClass<HTMLAttributes<{}> & NameSectionStyleProps>;
export declare const FullNameStyle: ComponentClass<HTMLAttributes<{}>>;
export declare const NicknameStyle: ComponentClass<HTMLAttributes<{}>>;
export declare const InfoSectionStyle: ComponentClass<HTMLAttributes<{}> & InfoSectionStyleProps>;
export declare const TimeStyle: ComponentClass<HTMLAttributes<{}>>;
export declare const MentionItemStyle: ComponentClass<HTMLAttributes<{}> & MentionItemStyleProps>;
export declare const AccessSectionStyle: ComponentClass<HTMLAttributes<{}>>;
