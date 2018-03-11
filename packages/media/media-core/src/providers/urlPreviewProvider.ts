import { UrlPreview, MediaApiConfig } from '../';
import {
  UrlPreviewService,
  MediaUrlPreviewService,
} from '../services/urlPreviewService';
import { Observable } from 'rxjs/Observable';

export interface UrlPreviewProvider {
  observable(): Observable<UrlPreview>;
}

export class UrlPreviewProvider {
  public static fromMediaApi(
    config: MediaApiConfig,
    url: string,
  ): UrlPreviewProvider {
    return UrlPreviewProvider.fromUrlPreviewService(
      new MediaUrlPreviewService(config),
      url,
    );
  }

  public static fromUrlPreviewService(
    urlPreviewService: UrlPreviewService,
    url: string,
  ): UrlPreviewProvider {
    return {
      observable() {
        return new Observable<UrlPreview>(observer => {
          urlPreviewService.getUrlPreview(url).then(
            linkPreview => {
              observer.next(linkPreview);
              observer.complete();
            },
            error => {
              observer.error(error);
            },
          );
          return () => {};
        });
      },
    };
  }
}
