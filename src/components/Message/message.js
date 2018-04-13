import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, onClose }) => (
  <p className="message" tabIndex="0">
    <button 
      type="button"
      className="message__button"
      tabIndex="0"
      onClick={onClose}>
      &times;
    </button>
    <span className="message__text">{message}</span>
  </p>
);

const { string, func } = PropTypes;

Message.propTypes = {
  message: string.isRequired,
  onClose: func.isRequired
}

export default Message;