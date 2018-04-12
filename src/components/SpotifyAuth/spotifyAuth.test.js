import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyAuth from './spotifyAuth';

chai.use(sinonChai);

describe('<SpotifyAuth />', () => {
  let spotifyWrapper = {};
  let wrapper;
  const onAuthenticated = sinon.spy();

  beforeEach(() => {
    spotifyWrapper = {
      authorize: () => Promise.resolve()
    }

    wrapper = shallow(<SpotifyAuth wrapper={spotifyWrapper} onAuthenticated={onAuthenticated}/>);
  });

  it('renders component', () => {
    expect(wrapper.find('.spotify-auth__button')).to.have.length(1);
  });
});