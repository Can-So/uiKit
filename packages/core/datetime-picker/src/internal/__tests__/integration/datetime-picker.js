// @flow
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

const urlDateTimePicker = getExampleUrl('core', 'datetime-picker', 'basic');
/* Css used for the test */
const datepickerDefault = 'label[for="react-select-datepicker-1--input"] + div';
const datepickerMenu = '[aria-label="calendar"]';
const date =
  '[aria-label="calendar"] > table > tbody > tr:nth-child(5) > td:nth-child(6)';
const datepickerInput = 'input#react-select-datepicker-1-input';
const dateValue = `${datepickerDefault} > div > div > div:first-child > div:first-child`;

const timepickerDefault = 'label[for="react-select-timepicker-4--input"] + div';
const timePickerMenu = '.timepicker-select__menu-list';
const timeInput = 'input#react-select-timepicker-4-input';
const timeValue = `${timepickerDefault} > div > div > div > div:first-child`;
const timeOption = '[role="option"]';

const dateTime = 'label[for="react-select-datetimepicker-1--input"]';
const dateTimePicker = `${dateTime} + div > div`;
const dateTimePickerDateInput = 'input#react-select-datetimepicker-1-input';
const dateTimeValues = `${dateTimePicker} > div > div > div`;

BrowserTestCase(
  'When the user enters a partial date and hits enter, the value should be selected from the calendar',
  {},
  async client => {
    const dateTimePickerTest = new Page(client);

    await dateTimePickerTest.goto(urlDateTimePicker);
    await dateTimePickerTest.click(datepickerDefault);
    await dateTimePickerTest.type(datepickerInput, ['2016', 'Enter']);
    await dateTimePickerTest.waitForSelector(dateTimeValues);

    const nextDate = await dateTimePickerTest.getText(dateValue);

    expect(nextDate).toBe(`2016/01/01`);

    await dateTimePickerTest.checkConsoleErrors();
  },
);

BrowserTestCase(
  'When the user enters an invalid date and hits enter, the value should be selected from the calendar',
  {},
  async client => {
    const dateTimePickerTest = new Page(client);

    await dateTimePickerTest.goto(urlDateTimePicker);
    await dateTimePickerTest.click(datepickerDefault);
    await dateTimePickerTest.waitForSelector(datepickerMenu);
    await dateTimePickerTest.type(datepickerInput, ['2016', '/abcd']);
    await dateTimePickerTest.type(datepickerInput, ['Enter']);

    await dateTimePickerTest.waitForSelector(dateTimeValues);

    const nextDate = await dateTimePickerTest.getText(dateValue);

    expect(nextDate).toEqual(`2016/01/01`);

    await dateTimePickerTest.checkConsoleErrors();
  },
);

BrowserTestCase(
  'When DatePicker is focused & backspace pressed, the input should be cleared',
  {},
  async client => {
    const dateTimePickerTest = new Page(client);

    await dateTimePickerTest.goto(urlDateTimePicker);
    await dateTimePickerTest.click(datepickerDefault);
    await dateTimePickerTest.waitForSelector(datepickerMenu);
    await dateTimePickerTest.click(date);
    await dateTimePickerTest.waitForSelector(dateTimeValues);

    // await dateTimePickerTest.waitForSelector(datepickerMenu, { timeout: 12330});
    const previousDate = await dateTimePickerTest.getText(dateValue);

    if (dateTimePickerTest.isBrowser('firefox')) {
      // Focus on the input - `type` will do it for you
      await dateTimePickerTest.type(datepickerInput, [
        'Backspace',
        'Backspace',
      ]);
    } else {
      await dateTimePickerTest.keys(['Backspace']);
    }

    const nextDate = await dateTimePickerTest.getText(dateValue);

    expect(nextDate).not.toBe(previousDate);

    await dateTimePickerTest.checkConsoleErrors();
  },
);

BrowserTestCase(
  'When choosing another day in a Datetime picker focused, the date should be updated to the new value',
  {},
  async client => {
    const dateTimePickerTest = new Page(client);

    await dateTimePickerTest.goto(urlDateTimePicker);
    await dateTimePickerTest.click(datepickerDefault);
    await dateTimePickerTest.waitForSelector(datepickerMenu);
    await dateTimePickerTest.click(date);

    const previousDate = await dateTimePickerTest.getText(dateValue);

    await dateTimePickerTest.click(datepickerDefault);

    if (dateTimePickerTest.isBrowser('firefox')) {
      // Focus on the input - `type` will do it for you
      await dateTimePickerTest.type(datepickerInput, [
        'ArrowLeft',
        'ArrowLeft',
        'ArrowLeft',
      ]);
      await dateTimePickerTest.type(datepickerInput, ['Enter']);
    } else {
      await dateTimePickerTest.keys(['ArrowLeft']);
      await dateTimePickerTest.keys(['ArrowLeft']);
      await dateTimePickerTest.keys(['Enter']);
    }
    expect(await dateTimePickerTest.getText(dateValue)).not.toBe(previousDate);
    await dateTimePickerTest.checkConsoleErrors();
  },
);

BrowserTestCase(
  'When entering a new time in Timepicker Editable, the time should be updated to the new value',
  { skip: ['ie'] }, // IE has an issue AK-5570, AK-5492
  async client => {
    const timePicker = new Page(client);

    await timePicker.goto(urlDateTimePicker);
    await timePicker.waitForSelector(timepickerDefault);
    await timePicker.click(timepickerDefault);
    await timePicker.waitForSelector(timePickerMenu);

    const previousTime = await timePicker.getText(timeValue);

    await timePicker.type(timeInput, ['12:45pm']);
    await timePicker.waitForSelector(timeOption);
    await timePicker.type(timeInput, ['Enter']);
    await timePicker.waitForSelector(timeValue);

    const currentTime = await timePicker.getText(timeValue);

    expect(currentTime).not.toBe(previousTime);
    expect(currentTime).toEqual('12:45pm');

    await timePicker.checkConsoleErrors();
  },
);

BrowserTestCase(
  'Invalid times in TimePicker should be cleared',
  { skip: ['ie'] }, // IE has an issue AK-5570, AK-5492
  async client => {
    const timePicker = new Page(client);

    await timePicker.goto(urlDateTimePicker);
    await timePicker.waitForSelector(timepickerDefault);
    await timePicker.click(timepickerDefault);
    await timePicker.waitForSelector(timePickerMenu);
    await timePicker.type(timeInput, ['a', 's', 'd']);

    if (timePicker.isBrowser('firefox')) {
      // Focus on the input - `type` will do it for you
      await timePicker.type(timeInput, ['Enter']);
    } else {
      // There is small issue there about the Key ENTER pressed too fast
      timePicker.keys(['Enter']);
    }

    await timePicker.waitForSelector(timeValue);

    expect(await timePicker.getText(timeValue)).toEqual('');
    await timePicker.checkConsoleErrors();
  },
);

BrowserTestCase(
  'When DateTimePicker is focused & backspace pressed, the date value should be cleared but the time value should not be affected',
  { skip: ['safari', 'ie'] }, // Safari and IE drivers have issues - AK-5570, AK-5492
  async client => {
    const dateTimePickerTest = new Page(client);

    await dateTimePickerTest.goto(urlDateTimePicker);
    await dateTimePickerTest.click(dateTimePicker);
    await dateTimePickerTest.waitForSelector(datepickerMenu);
    await dateTimePickerTest.click(date);
    await dateTimePickerTest.waitForSelector(dateTimeValues);

    const [previousDate, previousTime] = await dateTimePickerTest.getText(
      dateTimeValues,
    );

    await dateTimePickerTest.type(dateTimePickerDateInput, ['Backspace']);
    await dateTimePickerTest.waitForSelector(dateTimeValues);

    const [afterDate, afterTime] = await dateTimePickerTest.getText(
      dateTimeValues,
    );

    expect(afterDate).not.toBe(previousDate);
    expect(previousTime).toBe(afterTime);

    await dateTimePickerTest.checkConsoleErrors();
  },
);

BrowserTestCase(
  'When a user types a year into the date input in DatetimePicker and subsequently hits enter, the value is correctly updated',
  { skip: ['safari', 'ie'] }, // Safari and IE drivers have issues - AK-5570, AK-5492
  async client => {
    const dateTimePickerTest = new Page(client);

    await dateTimePickerTest.goto(urlDateTimePicker);
    await dateTimePickerTest.click(dateTimePicker);
    await dateTimePickerTest.type(dateTimePickerDateInput, [
      '2',
      '0',
      '1',
      '6',
    ]);
    await dateTimePickerTest.type(dateTimePickerDateInput, ['Enter']);
    await dateTimePickerTest.waitForSelector(dateTimeValues);

    const [newDate] = await dateTimePickerTest.getText(dateTimeValues);

    expect(newDate.trim()).toBe('2016/01/01');
    await dateTimePickerTest.checkConsoleErrors();
  },
);
