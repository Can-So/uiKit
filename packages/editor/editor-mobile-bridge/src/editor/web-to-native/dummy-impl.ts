// tslint:disable:no-console
import NativeBridge from './bridge';
import { Color as StatusColor } from '@atlaskit/status';

export default class DummyBridge implements NativeBridge {
  log = (...args) => {
    console.log(...args);
  };

  showMentions(query: String) {
    this.log(`showMentions(query=${query})`);
  }
  dismissMentions() {
    this.log('dismissMentions');
  }
  updateTextFormat(markStates: string) {
    this.log(`updateTextFormat(markStates=${markStates})`);
  }
  updateText(content: string) {
    this.log(`updateText(content=${content})`);
  }
  submitPromise(name: string, uuid: string, args: string) {
    this.log(`submitPromise(name=${name}, uuid=${uuid}, args=${args})`);
  }
  updateBlockState(currentBlockType: string) {
    this.log(`updateBlockState(currentBlockType=${currentBlockType})`);
  }
  updateListState(listState: string) {
    this.log(`updateListState(listState=${listState})`);
  }
  showStatusPicker(text: string, color: StatusColor, uuid: string) {
    this.log(`showStatusPicker(text=${text}, color=${color}, uuid=${uuid})`);
  }
  dismissStatusPicker() {
    this.log('dismissStatusPicker');
  }
}
