import React from 'react';
import PropTypes from 'prop-types';

const InputDate = ({ name, id, pattern, value, onChanged }) => (
  <div className="input-container">
    <label
      htmlFor={id}
      className="input-container__label">
      {name}
    </label>
    <input
      id={id}
      className="input-container__input"
      type="datetime-local"
      tabIndex="0"
      step="1"
      pattern={pattern}
      value={value}
      onChange={onChanged}/>
  </div>
);

const { string, func } = PropTypes;

InputDate.propTypes = {
  name: string.isRequired,
  id: string.isRequired,
  pattern: string.isRequired,
  value: string,
  onChanged: func.isRequired
};

export default InputDate;