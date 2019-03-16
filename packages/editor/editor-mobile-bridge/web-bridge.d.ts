export default abstract class WebBridge {
    abstract getRootElement(): HTMLElement | null;
    setPadding(top?: number, right?: number, bottom?: number, left?: number): void;
}
