import { User } from './User';
import { Comment } from './ShareEntities';

export type ShareContentState = {
  users: User[];
  comment?: Comment;
};

export type ShareError = {
  message: string;
} | null;
