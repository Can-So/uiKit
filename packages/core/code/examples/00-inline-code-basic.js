// @flow
import React, { Fragment } from 'react';
import { AkCode } from '../src';

const jsCode = `const map = new Map({ key: 'value' })`;

const javaCode = `public class HelloWorld
{
	public static void main(String[] args) {
		System.out.println("Hello World!");
	}
}`;

const pyCode = `def transform_data(data_frame, rolling_value):
rolling_df = pd.DataFrame(data_frame)
return rolling_df.rolling(rolling_value, min_periods=1, center=True).mean()`;

const cppCode = `struct Person
{
    char name[50];
    int age;
    float salary;
};`;

const theme = { mode: 'dark' };

export default function Component() {
  return (
    <Fragment>
      <span>
        This is inline javascript code:{' '}
        <AkCode language="javascript" text={jsCode} />, check it out.
      </span>
      <br />
      <br />
      <span>
        This is inline java code with lines:{' '}
        <AkCode language="java" showLineNumbers text={javaCode} />, check it
        out.
      </span>
      <br />
      <br />
      <span>
        This is inline python code with lines and custom code style:{' '}
        <AkCode
          language="python"
          showLineNumbers
          codeStyle={{ style: 'bold' }}
          text={pyCode}
        />
      </span>
      <br />
      <br />
      <span>
        This is inline c++ code with theme:{' '}
        <AkCode language="c++" showLineNumbers text={cppCode} theme={theme} />,
        check it out.
      </span>
    </Fragment>
  );
}
