import { GasPayload } from '@findable/analytics-gas-types';
import { Identifier } from '@findable/media-core';
import { PackageAttributes } from './index';
import { NavigationDirection, NavigationSource } from '../navigation';
export interface NavigationAttributes {
    fileId: string;
    input: string;
}
export interface NavigationGasPayload extends GasPayload {
    attributes: NavigationAttributes & PackageAttributes;
}
export declare function createNavigationEvent(direction: NavigationDirection, source: NavigationSource, newItem: Identifier): NavigationGasPayload;
