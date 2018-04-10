//TODO :move this to a new npm-pkg
const webdriverio = require('webdriverio');
const WAIT_TIMEOUT = 5000;

const TODO = () => {
  throw new Error('To be implemented!');
};

export class JSHandle {
  constructor(client, selector) {
    this.browser = client;
    this.selector = selector;
  }

  asElement() {
    return new ElementHandle(this.browser, this.selector);
  }

  getProperty(propertyName) {
    return this.browser.getAttribute(this.selector, propertyName);
  }

  dispose = TODO;
  executionContext = TODO;
  getProperties = TODO;
  jsonValue = TODO;
}

export class ElementHandle extends JSHandle {
  $ = TODO;
  $$ = TODO;
  $x = TODO;
  asElement = TODO;
  boundingBox = TODO;
  click = TODO;
  dispose = TODO;
  executionContext = TODO;
  focus = TODO;
  getProperties = TODO;
  hover = TODO;
  jsonValue = TODO;
  press = TODO;
  screenshot = TODO;
  tap = TODO;
  toString = TODO;
  type = TODO;
  uploadFile = TODO;
}

export default class Page {
  constructor(client) {
    this.browser = client;
  }

  // Navigation
  goto(url) {
    return this.browser.url(url);
  }

  title() {
    return this.browser.getTitle();
  }

  $(selector) {
    return new ElementHandle(this.browser, selector);
  }

  $$(selector) {
    return this.browser.elements(selector);
  }

  $eval(selector, pageFunction) {
    return this.browser
      .execute(
        `return (${pageFunction}(document.querySelector("${selector}")))`,
      )
      .then(obj => obj.value);
  }

  type(selector, text) {
    return this.browser.addValue(selector, text);
  }

  click(selector) {
    return this.browser.click(selector);
  }

  keys(value) {
    return this.browser.keys(value);
  }

  // Get
  getProperty(selector, cssProperty) {
    return this.browser.getCssProperty(selector, cssProperty);
  }

  url() {
    return this.browser.getUrl();
  }

  // Protocol
  goBack() {
    return this.browser.back();
  }

  close() {
    return this.browser.close();
  }

  backspace(selector) {
    this.browser.execute(selector => {
      return document
        .querySelector(selector)
        .trigger({ type: 'keydown', which: 8 });
    });
  }

  // To be replaced by those puppeeter functions
  //  keyboard.down('KeyA');
  //  keyboard.press('KeyA');
  //  keyboard.up('Shift');

  //will need to have wrapper for these once moved to puppeteer
  getText(selector) {
    // replace with await page.evaluate(() => document.querySelector('p').textContent)
    // for puppteer
    return this.browser.getText(selector);
  }

  getCssProperty(selector, cssProperty) {
    return this.browser.getCssProperty(selector, cssProperty);
  }

  getElementSize(selector) {
    return this.browser.getElementSize(selector);
  }

  getHTML(selector) {
    return this.browser.getHTML(selector);
  }
  isEnabled(selector) {
    return this.browser.isEnabled(selector);
  }
  isExisting(selector) {
    return this.browser.isExisting(selector);
  }

  isVisible(selector) {
    return this.browser.isVisible(selector);
  }

  log(type) {
    return this.browser.log(type);
  }

  paste(selector) {
    let keys;
    if (this.browser.desiredCapabilities.os === 'Windows') {
      keys = ['Control', 'v'];
    } else if (this.browser.desiredCapabilities.browserName === 'chrome') {
      // Workaround for https://bugs.chromium.org/p/chromedriver/issues/detail?id=30
      keys = ['Shift', 'Insert'];
    } else {
      keys = ['Command', 'v'];
    }
    return this.browser.addValue(selector, keys);
  }

  // Wait
  waitForSelector(selector) {
    return this.browser.waitForExist(selector, WAIT_TIMEOUT);
  }

  waitFor(selector, ms, reverse) {
    return this.browser.waitForVisible(selector, ms, reverse);
  }

  // Window
  setViewPort(size, type) {
    return this.browser.setViewPort(size, type);
  }
}
//TODO: Maybe wrapping all functions?
async function wrapper(fn) {
  return fn;
}
