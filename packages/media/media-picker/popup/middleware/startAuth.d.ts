import { Store, Dispatch } from 'redux';
import { StartAuthAction } from '../actions';
import { State } from '../domain';
import { Fetcher } from '../tools/fetcher/fetcher';
import { CloudService } from '../services/cloud-service';
export declare const startCloudAccountOAuthFlow: (fetcher: Fetcher, cloudService: CloudService) => (store: Store<State>) => (next: Dispatch<State>) => (action: StartAuthAction) => StartAuthAction;
