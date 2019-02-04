/*
 * wrapper on top of webdriver-io apis to give a feel of puppeeteer api
 */

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

  $eval(selector, pageFunction, param) {
    return this.browser
      .execute(
        `return (${pageFunction}(document.querySelector("${selector}"), ${JSON.stringify(
          param,
        )}))`,
      )
      .then(obj => obj.value);
  }

  count(selector) {
    return this.$$(selector).then(function(result) {
      return result.value.length;
    });
  }

  async type(selector, text) {
    if (Array.isArray(text)) {
      for (let t of text) {
        await this.browser.addValue(selector, t);
      }
    } else {
      await this.browser.addValue(selector, text);
    }
  }

  setValue(selector, text) {
    return this.browser.setValue(selector, text);
  }

  // TODO: remove it
  clear(selector) {
    return this.browser.clearElement(selector);
  }

  click(selector) {
    return this.browser.click(selector);
  }

  keys(value) {
    return this.browser.keys(value);
  }

  debug() {
    return this.browser.debug();
  }

  // Get
  getProperty(selector, cssProperty) {
    return this.browser.getCssProperty(selector, cssProperty);
  }

  getLocation(selector, property) {
    return this.browser.getLocation(selector, property);
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
  checkConsoleErrors() {
    // Console errors can only be checked in Chrome
    if (this.isBrowser('chrome') && this.browser.log('browser').value) {
      this.browser.logs('browser').value.forEach(val => {
        assert.notEqual(
          val.level,
          'SEVERE',
          `Those console errors :${val.message} are displayed`,
        );
      });
    }
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

  getBrowserName() {
    return this.browser.desiredCapabilities.browserName;
  }

  isBrowser(browserName) {
    return this.getBrowserName() === browserName;
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

  hasFocus(selector) {
    return this.browser.hasFocus(selector);
  }

  log(type) {
    return this.browser.log(type);
  }

  paste(selector) {
    let keys;
    if (this.browser.desiredCapabilities.os === 'Windows') {
      keys = ['Control', 'v'];
    } else if (this.isBrowser('chrome')) {
      // Workaround for https://bugs.chromium.org/p/chromedriver/issues/detail?id=30
      keys = ['Shift', 'Insert'];
    } else {
      keys = ['Command', 'v'];
    }
    return this.browser.addValue(selector, keys);
  }

  copy(selector) {
    let keys;
    if (this.browser.desiredCapabilities.os === 'Windows') {
      keys = ['Control', 'c'];
    } else if (this.isBrowser('chrome')) {
      // Workaround for https://bugs.chromium.org/p/chromedriver/issues/detail?id=30
      keys = ['Control', 'Insert'];
    } else {
      keys = ['Command', 'c'];
    }
    return this.browser.addValue(selector, keys);
  }

  // Wait
  waitForSelector(selector, options = {}) {
    return this.browser.waitForExist(selector, options.timeout || WAIT_TIMEOUT);
  }

  waitForVisible(selector, options = {}) {
    return this.browser.waitForVisible(
      selector,
      options.timeout || WAIT_TIMEOUT,
    );
  }

  waitFor(selector, ms, reverse) {
    return this.browser.waitForVisible(selector, ms, reverse);
  }

  waitUntil(predicate) {
    return this.browser.waitUntil(predicate, WAIT_TIMEOUT);
  }

  // Window
  setViewPort(size, type) {
    return this.browser.setViewPort(size, type);
  }

  chooseFile(selector, localPath) {
    return this.browser.chooseFile(selector, localPath);
  }

  mockDate(timestamp, timezoneOffset) {
    return this.browser.execute(
      (t, tz) => {
        const _Date = Date;
        const realDate = params => new _Date(params);
        const mockedDate = new _Date(t);

        if (tz) {
          const localDateOffset = new _Date().getTimezoneOffset() / 60;
          const dateWithTimezoneOffset = new _Date(
            t + (tz + localDateOffset) * 3600000,
          );
          const localDateMethods = [
            'getFullYear',
            'getYear',
            'getMonth',
            'getDate',
            'getDay',
            'getHours',
            'getMinutes',
          ];
          localDateMethods.forEach(dateMethod => {
            mockedDate[dateMethod] = () => dateWithTimezoneOffset[dateMethod]();
          });
        }

        Date = function(...params) {
          if (params.length > 0) {
            return realDate(...params);
          }
          return mockedDate;
        };
        Object.getOwnPropertyNames(_Date).forEach(property => {
          Date[property] = _Date[property];
        });
        Date.now = () => t;
      },
      timestamp,
      timezoneOffset,
    );
  }
}
//TODO: Maybe wrapping all functions?
async function wrapper(fn) {
  return fn;
}
