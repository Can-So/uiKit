export function isDroppedFile(e: DragEvent): boolean {
  if (!e.dataTransfer) {
    return false;
  }

  return (
    Array.prototype.slice.call(e.dataTransfer.types).indexOf('Files') !== -1
  );
}
