import * as fs from 'fs';
import { validate } from '../../../validator';

// @ts-ignore
const BASE_DIR = `${__dirname}/../../../../../editor-common/src/__tests__/unit/json-schema/v1-reference`;

const readFilesSync = (path: string) =>
  fs.readdirSync(path).reduce(
    (acc, name) => {
      if (name.match(/\.json$/)) {
        acc.push({
          name,
          data: JSON.parse(fs.readFileSync(`${path}/${name}`, 'utf-8')),
        });
      }
      return acc;
    },
    [] as { name: string; data: any }[],
  );

describe('validate', () => {
  const valid = readFilesSync(`${BASE_DIR}/valid`);
  valid.forEach(file => {
    // Don't test Application Card
    if (file.name.indexOf('applicationCard') === 0) {
      return;
    }
    it(`validates '${file.name}`, () => {
      const run = () => {
        validate(file.data);
      };
      expect(run).not.toThrowError();
    });
  });

  const invalid = readFilesSync(`${BASE_DIR}/invalid`);
  invalid.forEach(file => {
    it(`does not validate '${file.name}`, () => {
      const run = () => {
        validate(file.data);
      };
      expect(run).toThrowError();
    });
  });
});
