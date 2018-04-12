import React from 'react';

const Message = ({ message }) => (
  <p className="message" tabIndex="0">
    {message}
  </p>
);

export default Message;