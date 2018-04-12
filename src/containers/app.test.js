import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import App from './app';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />).instance();
  });

  it('check api filter interval', () => {
    wrapper.checkFiltersChanged();

    expect(wrapper.filtersAPIInterval).to.not.be.undefined;
  });

  it('check api featured playlist interval', () => {
    wrapper.checkFeaturedPlaylistsChanged();

    expect(wrapper.featuredPlaylistAPIInterval).to.not.be.undefined;
  });

  it('authorized wrapper spotify', () => {
    wrapper.handleAuthenticated();

    expect(wrapper.state.isAuthorized).to.be.true;
  });
});