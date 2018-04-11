import React from 'react';
import PropTypes from 'prop-types';

const InputNumber = ({ name, id, min, max, value, onChanged }) => (
  <div className="input-container">
    <label
      className="input-container__label"
      htmlFor={id}>
      {name}
    </label>
    <input
      id={id}
      type="number"
      className="input-container__input"
      min={min}
      max={max}
      tabIndex="0"
      value={value}
      onChange={onChanged}/>
  </div>
);

const { string, number, func } = PropTypes;

InputNumber.propTypes = {
  name: string.isRequired,
  id: string.isRequired,
  min: number,
  max: number,
  value: string,
  onChanged: func.isRequired
};

export default InputNumber;