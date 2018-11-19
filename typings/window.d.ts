declare interface Window {
  unmountApp?: () => void;
  location: { pathname: string };
}
