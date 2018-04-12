import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Playlist from './playlist';

chai.use(sinonChai);

describe('<Playlist />', () => {
  let wrapper;
  const initObj = {
    images: [{
      height: 300,
      url: 'https://i.scdn.co/image/7bd33c65ebd1e45975bbcbbf513bafe272f033c7',
      width: 300
    }],
    name: 'Monday Morning Mood',
    external_urls: {
      spotify: 'http://open.spotify.com/user/spotify/playlist/6ftJBzU2LLQcaKefMi7ee7'
    }
  };

  beforeEach(() => {
    const { name, images, external_urls } = initObj;
    wrapper = shallow(<Playlist name={name} images={images} external_urls={external_urls} />);
  });

  it('renders component', () => {
    expect(wrapper.find('.list-group__item')).to.have.length(1);
  });

  it('renders text with name', () => {
    expect(wrapper.find('.list-group__item-text').text()).to.equal(initObj.name);
  });
});