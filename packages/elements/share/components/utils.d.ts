import { EmailValidationResponse, OptionData, Value } from '@findable/user-picker';
import { ConfigResponse, User } from '../types';
/**
 * Decides if the warn message should be shown in the share form.
 *
 * @param config share configuration object
 * @param selectedUsers selected users in the user picker
 */
export declare const showInviteWarning: (config: ConfigResponse | undefined, selectedUsers: Value) => boolean;
export declare const optionDataToUsers: (optionDataArray: OptionData[]) => User[];
export declare const allowEmails: (config?: ConfigResponse | undefined) => boolean | undefined;
export declare const isValidEmailUsingConfig: (config: ConfigResponse | undefined) => (inputText: string) => EmailValidationResponse;
