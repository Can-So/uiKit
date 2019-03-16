import { createAndFireEvent } from '@findable/analytics-next';
import { CreateAndFireEventFunction } from '@findable/analytics-next-types';

export const fabricElementsChannel = 'fabric-elements';

export const createAndFireEventInElementsChannel: CreateAndFireEventFunction = createAndFireEvent(
  fabricElementsChannel,
);
