export default async function sleep(time: number) {
  return new Promise(resolve => window.setTimeout(resolve, time));
}
