import { mockStore, mockFetcher, mockAuthService } from '../../mocks';
import getPreviewMiddleware, { getPreview } from '../getPreview';
import { sendUploadEvent } from '../../actions/sendUploadEvent';
import { GetPreviewAction } from '../../actions/getPreview';

describe('getPreviewMiddleware', () => {
  const auth = {
    clientId: 'some-client-id',
    token: 'some-token',
  };
  const file = {
    id: 'some-file-id',
    name: 'some-file-name',
    type: 'some-file-type',
    creationDate: Date.now(),
    size: 12345,
  };
  const collection = 'some-collection';
  const uploadId = 'some-upload-id';
  const preview = {
    src: 'some-preview-src',
  };
  const setup = () => {
    const authService = mockAuthService();
    authService.getUserAuth.mockImplementation(() => Promise.resolve(auth));

    const fetcher = mockFetcher();
    fetcher.getPreview.mockImplementation(() => Promise.resolve(preview));

    return {
      fetcher,
      store: mockStore(),
      authService,
      next: jest.fn(),
      action: {
        type: 'GET_PREVIEW',
        file,
        collection,
        uploadId,
      } as GetPreviewAction,
    };
  };

  it('should do nothing given unknown action', () => {
    const { fetcher, store, authService, next } = setup();
    const action = {
      type: 'UNKNOWN',
    };

    getPreviewMiddleware(fetcher, authService)(store)(next)(action);

    expect(store.dispatch).not.toBeCalled();
    expect(next).toBeCalledWith(action);
  });

  it('should dispatch send upload event action with upload-preview-update event', () => {
    const { fetcher, store, authService, action } = setup();
    return getPreview(fetcher, authService, store, action).then(action => {
      expect(store.dispatch).toBeCalledWith(
        sendUploadEvent({
          event: {
            name: 'upload-preview-update',
            data: {
              file,
              preview,
            },
          },
          uploadId,
        }),
      );
    });
  });

  it('should get preview from fetcher', () => {
    const { fetcher, store, authService, action } = setup();
    const { apiUrl } = store.getState();

    return getPreview(fetcher, authService, store, action).then(action => {
      expect(fetcher.getPreview).toBeCalledWith(
        apiUrl,
        auth,
        file.id,
        collection,
      );
    });
  });
});
