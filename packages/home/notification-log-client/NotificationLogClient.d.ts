import { RequestServiceOptions } from '@findable/util-service-support';
import { NotificationLogProvider, NotificationCountResponse } from './types';
export declare const DEFAULT_SOURCE = "atlaskitNotificationLogClient";
export default class NotificationLogClient implements NotificationLogProvider {
    private serviceConfig;
    private cloudId;
    private source;
    constructor(baseUrl: string, cloudId: string, source?: string);
    countUnseenNotifications(options?: RequestServiceOptions): Promise<NotificationCountResponse>;
}
