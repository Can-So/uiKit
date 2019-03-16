import { Provider } from './provider';
import { default as ServiceProvider } from './service-provider';
export { Provider, ServiceProvider };
export interface ProviderProps {
    provider?: Provider;
    url?: string;
}
export declare const getProvider: ({ provider, url }: ProviderProps) => Provider;
