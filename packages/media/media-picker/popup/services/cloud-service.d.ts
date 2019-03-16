import { AuthProvider } from '@findable/media-core';
import { ServiceName } from '../domain';
export declare class CloudService {
    private readonly userAuthProvider;
    constructor(userAuthProvider: AuthProvider);
    startAuth(redirectUrl: string, serviceName: ServiceName): Promise<void>;
}
