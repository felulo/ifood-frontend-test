import React from 'react';
import PropTypes from 'prop-types';

const Playlist = ({ name, images, external_urls }) => (
  <li className="list-group__item">
    <a
      className="list-group__item-anchor"
      target="_blank"
      tabIndex="0"
      title={name}
      href={external_urls.spotify}>
      <img 
        className="list-group__item-image"
        alt={name}
        src={images[0].url} />
      <span className="list-group__item-text">{ name }</span>
    </a>
  </li>
);

const { string, array, object } = PropTypes;

Playlist.propTypes = {
  name: string.isRequired,
  images: array,
  external_urls: object
};

export default Playlist;