# XRegexp Unicode Tokenizer

Currently xregexp library is big in bundles and the idea is to use it at compilation time rather than runtime.
Basically the idea is to transpile the regex scripts to full unicode character ranges using the xregexp library at compilation time.

## Transformer

The custom transformer code was inspired by:

https://github.com/josephfrazier/babel-plugin-transform-xregexp

Unfortunately I was not able to run the xregexp/Babel 6 and that plugin.
The babel plugin worked fine with Babel 7 but we are using Babel 6 in AK repo still.

## Dependencies

1. ttypescript

By default the typescript compiler (tsc) does not support custom transformer via configuration so the solution was to use ttypescript wrapper to be able to configure the transformer in tsconfig.json.

That wrapper will use the typescript compiler that is installed.

https://github.com/cevek/ttypescript

2. xregexp

Note that it is required to use version 4.x.

3. typescript

Typescript 2.7.x+ is required by ttypescript.

## Installation

```
npm install
```

## Run examples

```
npm run dist:delete
npm run sample
```
Check the output for the generated regex unicode in dist/sample.js.

## Customize the regex

Replace the regex in src/sample.ts with your own and run it to get compiled into unicode charsets and then replace it back in your component.

