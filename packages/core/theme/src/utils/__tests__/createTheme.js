// @flow

import { mount } from 'enzyme';
import React from 'react';
import { createTheme } from '../createTheme';

test('is a function', () => {
  expect(typeof createTheme).toBe('function');
});

test('returns component', () => {
  expect(typeof createTheme(() => ({}))).toBe('function');
});

test('component as a consumer', done => {
  const Theme = createTheme(() => ({ test: true }));
  mount(
    <Theme.Consumer>
      {theme => {
        expect(theme.test).toBe(true);
        done();
      }}
    </Theme.Consumer>,
  );
});

test('component as a provider (uses composition)', done => {
  const Theme = createTheme(() => ({ test1: true, test2: false }));
  mount(
    <Theme.Provider theme={parent => ({ ...parent, test2: true })}>
      <Theme.Consumer>
        {theme => {
          expect(theme.test1).toBe(true);
          expect(theme.test2).toBe(true);
          done();
        }}
      </Theme.Consumer>
    </Theme.Provider>,
  );
});

test('cascade order', done => {
  let calledDefault = false;
  let calledContext = false;
  let calledSupplied = false;
  const expectedProps = { test: true };
  const Theme = createTheme(props => {
    expect(calledDefault).toBe(false);
    expect(props).toEqual(expectedProps);
    calledDefault = true;
    return { default: true };
  });
  const context = (themeDefault, props) => {
    expect(calledDefault).toBe(true);
    expect(calledContext).toBe(false);
    expect(props).toEqual(expectedProps);
    expect(themeDefault).toEqual({ default: true });
    calledContext = true;
    return { context: true };
  };
  const supplied = (themeContext, props) => {
    expect(calledDefault).toBe(true);
    expect(calledContext).toBe(true);
    expect(calledSupplied).toBe(false);
    expect(props).toEqual(expectedProps);
    expect(themeContext).toEqual({ default: undefined, context: true });
    calledSupplied = true;
    return { supplied: true };
  };
  mount(
    <Theme.Provider theme={context}>
      <Theme.Consumer props={{ test: true }} theme={supplied}>
        {theme => {
          expect(theme).toEqual({
            default: undefined,
            context: undefined,
            supplied: true,
          });
          done();
        }}
      </Theme.Consumer>
    </Theme.Provider>,
  );
});
