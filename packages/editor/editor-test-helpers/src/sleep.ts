export default async function sleep(time) {
  return new Promise(resolve => window.setTimeout(resolve, time));
}
