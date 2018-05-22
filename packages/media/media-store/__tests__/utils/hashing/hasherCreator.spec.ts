jest.mock('../../../src/utils/hashing/simpleHasher');
jest.mock('../../../src/utils/hashing/workerHasher');

import { SimpleHasher } from '../../../src/utils/hashing/simpleHasher';
import { WorkerHasher } from '../../../src/utils/hashing/workerHasher';
import {
  createHasher,
  destroyHasher,
} from '../../../src/utils/hashing/hasherCreator';

describe('createHasher', () => {
  const SimpleHasherStub: jest.Mock<SimpleHasher> = SimpleHasher as any;
  const WorkerHasherStub: jest.Mock<WorkerHasher> = WorkerHasher as any;

  beforeEach(() => {
    destroyHasher();
    SimpleHasherStub.mockReset();
    WorkerHasherStub.mockReset();
  });

  it('should create WorkerHasher by default', () => {
    const hasher = createHasher();
    expect(hasher).toEqual(WorkerHasherStub.mock.instances[0]);
  });

  it('should create SimpleHasher if WorkerHasher throws an exception', () => {
    WorkerHasherStub.mockImplementation(() => {
      throw new Error('some-error');
    });

    const hasher = createHasher();
    expect(hasher).toEqual(SimpleHasherStub.mock.instances[0]);
  });
});
