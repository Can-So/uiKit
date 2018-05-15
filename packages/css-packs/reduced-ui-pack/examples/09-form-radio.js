// @flow
import React from 'react';
// eslint-disable-next-line
import reducedStyles from '!!raw-loader!../src/bundle.css';

export default () => (
  <form onSubmit={e => e.preventDefault()}>
    <style>{reducedStyles}</style>
    <h2>Settings</h2>
    <fieldset className="ak-field-group">
      <legend>
        <span>Time display options</span>
      </legend>
      <div className="ak-field-radio">
        <input
          type="radio"
          name="option"
          id="option1"
          value="option1"
          defaultChecked
        />
        <label htmlFor="option1">Use relative times (eg. 2 minutes ago)</label>
      </div>
      <div className="ak-field-radio">
        <input type="radio" name="option" id="option2" value="option2" />
        <label htmlFor="option2">Use your time zone</label>
      </div>
      <div className="ak-field-radio">
        <input
          type="radio"
          name="option"
          id="option3"
          value="option3"
          disabled
        />
        <label htmlFor="option3">Use the server time</label>
      </div>
    </fieldset>
    <div className="ak-field-group">
      <button className="ak-button ak-button__appearance-primary">Save</button>
    </div>
  </form>
);
