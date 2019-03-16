import { RequestServiceOptions } from '@findable/util-service-support';

export interface NotificationCountResponse {
  count: number;
}

export interface NotificationLogProvider {
  countUnseenNotifications(
    options?: RequestServiceOptions,
  ): Promise<NotificationCountResponse>;
}
