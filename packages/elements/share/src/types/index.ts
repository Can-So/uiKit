export {
  ConfigResponse,
  ConfigResponseMode,
  ShareClient,
  ShareRequest,
  ShareResponse,
} from '../clients/ShareServiceClient';
export * from './form';
export * from './OriginTracing';
export * from './ShareButton';
export {
  DialogContentState,
  ShareContentState,
  ShareError,
} from './ShareContentState';
export { Comment, Content, MetaData } from './ShareEntities';
export { User, UserWithEmail, UserWithId } from './User';

export type KeysOfType<T, TProp> = {
  [P in keyof T]: T[P] extends TProp ? P : never
}[keyof T];
