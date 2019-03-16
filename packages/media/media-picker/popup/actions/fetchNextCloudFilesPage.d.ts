import { Action } from 'redux';
import { ServiceName, Path } from '../domain';
export interface FetchNextCloudFilesPageAction extends Action {
    readonly type: 'FETCH_NEXT_CLOUD_FILES_PAGE';
    readonly serviceName: ServiceName;
    readonly accountId: string;
    readonly path: Path;
    readonly nextCursor: string;
}
export declare function fetchNextCloudFilesPage(serviceName: ServiceName, accountId: string, path: Path, nextCursor: string): FetchNextCloudFilesPageAction;
export declare function isFetchNextCloudFilesPageAction(action: Action): action is FetchNextCloudFilesPageAction;
