// @flow
import React from 'react';
// eslint-disable-next-line
import reducedStyles from '!!raw-loader!../src/bundle.css';

export default () => (
  <form onSubmit={e => e.preventDefault()}>
    <style>{reducedStyles}</style>
    <h2>Log in form</h2>
    <div className="ak-field-group">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        className="ak-field-text ak-field__size-medium"
        id="username"
        name="username"
        placeholder="eg. you@yourcompany.com"
      />
    </div>
    <div className="ak-field-group">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="ak-field-password ak-field__size-medium"
        id="password"
        name="password"
      />
    </div>
    <div className="ak-field-group">
      <button className="ak-button ak-button__appearance-primary">
        Log in
      </button>
    </div>
  </form>
);
