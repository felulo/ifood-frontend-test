import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ name, id, values, value, onChanged }) => (
  <div className="input-container">
    <label
      className="input-container__label"
      htmlFor={id}>
      {name}
    </label>
    <select
      id={id}
      className="input-container__select"
      tabIndex="0"
      value={value}
      onChange={onChanged}>
      { values.map((item, index) => <option key={index} value={item.value}>{item.name}</option>) }
    </select>
  </div>
);

const { string, array, func } = PropTypes;

Select.propTypes = {
  name: string.isRequired,
  id: string.isRequired,
  values: array,
  value: string,
  onChanged: func.isRequired
};

export default Select;