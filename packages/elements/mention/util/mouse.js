export function mouseLocation(event) {
    return {
        x: event.clientX,
        y: event.clientY,
    };
}
// Used to prevent invalid mouse move detection on scroll
// lastPosition is object (x, y)
export function actualMouseMove(oldPosition, newPosition) {
    if (!oldPosition ||
        oldPosition.x !== newPosition.x ||
        oldPosition.y !== newPosition.y) {
        return true;
    }
    return false;
}
export function leftClick(event) {
    return (event.button === 0 &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey);
}
//# sourceMappingURL=mouse.js.map