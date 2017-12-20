// @flow
import React from 'react';
// eslint-disable-next-line
import reducedStyles from '!!raw-loader!../src/bundle.css';

export default () => (
  <form onSubmit={e => e.preventDefault()}>
    <style>{reducedStyles}</style>
    <h2>Favourite things</h2>
    <div className="ak-field-group">
      <label htmlFor="fav-fruit">Favourite fruit</label>
      <select
        className="ak-field-select"
        id="fav-fruit"
        name="fav-fruit"
        defaultValue="Cherry"
      >
        <optgroup label="Standard">
          <option>Apple</option>
          <option>Banana</option>
          <option>Cherry</option>
          <option>Orange</option>
          <option>Pear</option>
          <option>Strawberry</option>
          <option>Watermelon</option>
        </optgroup>
        <optgroup label="Exotic">
          <option>Durian</option>
          <option>Longan</option>
          <option>Lychee</option>
          <option>Paw paw</option>
          <option>Persimmon</option>
        </optgroup>
      </select>
    </div>
    <div className="ak-field-group">
      <label htmlFor="fav-fruit-multiple">Favourite fruit (multi select)</label>
      <select
        className="ak-field-select"
        multiple
        defaultValue={['Cherry', 'Apple', 'Paw paw']}
        id="fav-fruit-multiple"
        name="fav-fruit-multiple"
      >
        <optgroup label="Standard">
          <option>Apple</option>
          <option>Banana</option>
          <option>Cherry</option>
          <option>Orange</option>
          <option>Pear</option>
          <option>Strawberry</option>
          <option>Watermelon</option>
        </optgroup>
        <optgroup label="Exotic">
          <option>Durian</option>
          <option>Longan</option>
          <option>Lychee</option>
          <option>Paw paw</option>
          <option>Persimmon</option>
        </optgroup>
      </select>
    </div>
    <div className="ak-field-group">
      <button className="ak-button ak-button__appearance-primary">Save</button>
    </div>
  </form>
);
