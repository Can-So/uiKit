export default abstract class WebBridge {
  abstract getRootElement(): HTMLElement | null;

  setPadding(
    top: number = 0,
    right: number = 0,
    bottom: number = 0,
    left: number = 0,
  ) {
    let root = this.getRootElement();
    if (root) {
      root.style.padding = `${top}px ${right}px ${bottom}px ${left}px`;
    }
  }
}
