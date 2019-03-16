export declare type UserWithId = {
    type: 'user' | 'group' | 'team';
    id: string;
};
export declare type UserWithEmail = {
    type: 'user';
    email: string;
};
export declare type User = UserWithId | UserWithEmail;
