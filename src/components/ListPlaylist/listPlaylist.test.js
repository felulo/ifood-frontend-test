import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Playlist from '../Playlist/playlist';
import ListPlaylist from './listPlaylist';

chai.use(sinonChai);

describe('<ListPlaylist />', () => {
  let wrapper;
  const initObj = [{
    images: [{
      height: 300,
      url: 'https://i.scdn.co/image/7bd33c65ebd1e45975bbcbbf513bafe272f033c7',
      width: 300
    }],
    name: 'Monday Morning Mood',
    external_urls: {
      spotify: 'http://open.spotify.com/user/spotify/playlist/6ftJBzU2LLQcaKefMi7ee7'
    }
  }, {
    images: [{
      height: 300,
      url: 'https://i.scdn.co/image/24aa1d1b491dd529b9c03392f350740ed73438d8',
      width: 300
    }],
    name: 'Upp och hoppa!',
    external_urls: {
      spotify: 'http://open.spotify.com/user/spotify__sverige/playlist/4uOEx4OUrkoGNZoIlWMUbO'
    }
  }];

  beforeEach(() => {
    wrapper = shallow(<ListPlaylist items={initObj} />);
  });

  it('renders component', () => {
    expect(wrapper.find('.list-group')).to.have.length(1);
  });

  it('renders a full list playlists', () => {
    expect(wrapper.find(Playlist)).to.have.length(2);
  });
});