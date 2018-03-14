export default interface NativeToWebBridge {
  onBoldClicked();
  onItalicClicked();
  onUnderlineClicked();
  onCodeClicked();
  onStrikeClicked();
  onSuperClicked();
  onSubClicked();
  onMentionSelect(id: string, displayName: string);
  onMentionPickerResult(result: string);
  setContent(content: string);
  getContent(): string;
};
