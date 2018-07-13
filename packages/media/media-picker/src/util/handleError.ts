export const handleError = function(alias: string, description?: string): void {
  const stackTrace = Error().stack || '';
  const descr = description || '';
  const errorMessage = `${alias}: ${descr} \n ${stackTrace}`;

  // tslint:disable-next-line:no-console
  console.error(errorMessage);
};
