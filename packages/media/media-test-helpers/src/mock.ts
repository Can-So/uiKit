/*
  // at earliest point, import original and pass to mockModule()

  import * as originalModule from 'module-to-mock';
  const mockedModule = mockModule('module-to-mock', originalModule);

  // now anything that imports from there is mocked, but is immutable

  import { Symbol1, Symbol2 } from 'module-to-mock';
  mockedModule.Symbol1 = jest.fn();
 */
export function mockModule(name: string, mod: any) {
  const obj: any = {};
  Object.keys(mod).forEach(key => {
    obj[key] = mod[key];
  });
  jest.mock(name, () => obj);
  return obj;
}
