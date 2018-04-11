import React from 'react';
import PropTypes from 'prop-types';

import Playlist from '../Playlist';

const ListPlaylist = ({ items }) => (
  <div className="list-container">
    <ul className="list-group">
      { items.map((item, index) => <Playlist key={index} {...item} />) }
    </ul>
  </div>
);

const { array } = PropTypes;

ListPlaylist.propTypes = {
  items: array
}

export default ListPlaylist;