declare module '@findable/webdriver-runner/utils/example' {
  function getExampleUrl(
    group: string,
    packageName: string,
    exampleName?: string,
  ): string;
}

declare module '@findable/webdriver-runner/runner' {
  type Browser = 'Chrome' | 'chrome' | 'edge' | 'ie' | 'safari' | 'firefox';

  type BrowserTestCaseOptions = {
    readonly skip: Browser[];
  };

  type Tester = (client: any) => void;

  function BrowserTestCase(
    testCase: string,
    options: BrowserTestCaseOptions,
    tester: Tester,
  );
}
