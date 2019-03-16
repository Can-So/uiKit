import { OptionData } from '@atlaskit/user-picker';
import { Comment } from './ShareEntities';
import { User } from './User';
export declare type ShareContentState = {
    users: User[];
    comment?: Comment;
};
export declare type ShareError = {
    message: string;
} | null;
export declare type DialogContentState = {
    users: OptionData[];
    comment?: Comment;
};
