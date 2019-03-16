import { ComponentClass, HTMLAttributes } from 'react';
import { MentionType } from '../../types';
export interface MentionStyleProps {
    mentionType: MentionType;
}
export declare const MentionStyle: ComponentClass<HTMLAttributes<{}> & MentionStyleProps>;
