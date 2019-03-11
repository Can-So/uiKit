// @flow

/* Currently, this test will check if the form and its component renders into different browsers.
Some actual functional tests need to be added:
- Interaction with all fields
- Submit the form
Those tests should be added before the release candidate*/
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

/* Url to test the example */
const urlFormCreateRepo = getExampleUrl('core', 'form', 'create-repository');
const urlSubmitForm = getExampleUrl('core', 'form', 'submit-form');

/* Css selectors used for the repository form test */
const createForm = 'form[name="create-repo"]';
const owner = 'div#owner-select';
const project = 'div#project-select';
const repoName = 'input[name="repo-name"]';
const accessLevel = 'input[type="checkbox"][name="access-level"]';
const includeReadme = 'div#include-readme-select';
const createRepoBtn = 'button[type="submit"]#create-repo-button';
const cancelBtn = 'button[type="button"]#create-repo-cancel';

/** Css selectors used for the submit form test */
const submitForm = 'form[name="submit-form"]';
const submitFormTextarea = 'textarea[name="description"]';
const submitFormTextfield = 'input[name="name"]';
const submitFormSubmitted = 'div#submitted';

BrowserTestCase(
  'Create repository form should render without errors',
  { skip: [] },
  async client => {
    const formTest = new Page(client);
    await formTest.goto(urlFormCreateRepo);
    await formTest.waitForSelector(createForm);
    const ownerIsVisible = await formTest.isVisible(owner);
    const projectIsVisible = await formTest.isVisible(project);
    const repoNameIsVisible = await formTest.isVisible(repoName);
    const accessLevelIsVisible = await formTest.isExisting(accessLevel);
    const includeReadmeIsVisible = await formTest.isVisible(includeReadme);
    const createRepoBtnIsVisible = await formTest.isVisible(createRepoBtn);
    const cancelBtnIsVisible = await formTest.isVisible(cancelBtn);
    expect(ownerIsVisible).toBe(true);
    expect(projectIsVisible).toBe(true);
    expect(repoNameIsVisible).toBe(true);
    expect(accessLevelIsVisible).toBe(true);
    expect(includeReadmeIsVisible).toBe(true);
    expect(createRepoBtnIsVisible).toBe(true);
    expect(cancelBtnIsVisible).toBe(true);
    await formTest.checkConsoleErrors();
  },
);

BrowserTestCase(
  'Pressing ctrl + enter in the text area should put focus on invalid field',
  { skip: ['ie'] },
  async client => {
    const formTest = new Page(client);
    await formTest.goto(urlSubmitForm);
    await formTest.waitForSelector(submitForm);
    await formTest.click(submitFormTextarea);
    await formTest.keys(['Control', 'Enter', 'NULL']);
    expect(await formTest.hasFocus(submitFormTextfield)).toBe(true);
    await formTest.checkConsoleErrors();
  },
);

BrowserTestCase(
  'Pressing ctrl + enter in the text area after entering input should submit the form',
  { skip: ['ie', 'safari'] },
  async client => {
    const formTest = new Page(client);
    await formTest.goto(urlSubmitForm);
    await formTest.waitForSelector(submitForm);
    await formTest.type(submitFormTextfield, 'Jane Chan');
    await formTest.click(submitFormTextarea);
    await formTest.keys(['Control', 'Enter', 'NULL']);
    await formTest.waitForSelector(submitFormSubmitted);
    expect(await formTest.getText(submitFormSubmitted)).toBe(
      'You have successfully submitted!',
    );
    await formTest.checkConsoleErrors();
  },
);
