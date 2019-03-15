import { EditorCardProvider, CardAppearance } from '@atlaskit/smart-card';
import { createPromise } from '../cross-platform-promise';

export class EditorMobileCardProvider extends EditorCardProvider {
  async resolve(url: string, appearance: CardAppearance): Promise<any> {
    const getLinkResolve = await createPromise(
      'getLinkResolve',
      JSON.stringify({ url, appearance }),
    ).submit();

    if (typeof getLinkResolve === 'object') {
      return getLinkResolve;
    } else {
      return super.resolve(url, appearance);
    }
  }
}

export const cardProvider = new EditorMobileCardProvider();
