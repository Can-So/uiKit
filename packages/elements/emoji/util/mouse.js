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
export function leftClick(reactEvent) {
    return (reactEvent.button === 0 &&
        !reactEvent.altKey &&
        !reactEvent.ctrlKey &&
        !reactEvent.metaKey &&
        !reactEvent.shiftKey);
}
//# sourceMappingURL=mouse.js.map