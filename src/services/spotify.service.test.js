import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import SpotifyService from './spotify.service';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Spotify Service', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = new SpotifyService();
  });

  it('parse filters correctly', () => {
    const filters = {
      locale: 'pt_BR',
      limit: 10
    };
    const result = '?locale=pt_BR&limit=10';

    expect(wrapper.parseFilters(filters)).to.equal(result)
  });

  it('parse parameters oauth correctly', () => {
    const params = 'access_token=oaanvcs234901_sa23ncns22D_ma821&expires_in=35600';
    const result = {
      access_token: 'oaanvcs234901_sa23ncns22D_ma821',
      expires_in: '35600'
    };

    expect(wrapper.getParamsAuth(params)).to.deep.equal(result);
  });

  it('check closed popup oauth', () => {
    wrapper.oAuthPopup = {
      closed: true
    };

    expect(wrapper.checkPopupHasClosed()).to.equal(true);
    expect(wrapper.oAuthInterval).to.be.undefined;
  });

  it('check url popup oauth', () => {
    wrapper.oAuthPopup = {
      close: () => {},
      location: {
        href: 'http://localhost:3000/callback',
        hash: '#access_token=oaanvcs234901_sa23ncns22D_ma821&expires_in=35600'
      }
    };

    expect(wrapper.getURLPopupOAuth()).to.equal('access_token=oaanvcs234901_sa23ncns22D_ma821&expires_in=35600');
    expect(wrapper.oAuthInterval).to.be.undefined;
  });

  it('authorizing wrapper with success', () => {
    const result = {
      access_token: 'oaanvcs234901_sa23ncns22D_ma821',
      expires_in: '35600'
    };

    wrapper.getURLPopupOAuth = () => '#access_token=oaanvcs234901_sa23ncns22D_ma821&expires_in=35600';
    
    expect(wrapper.authorize()).to.eventually.deep.equal(result);
  });

  it('authorizing wrapper error close popup', () => {
    const result = {
      error: 'closed_popup'
    };

    wrapper.checkPopupHasClosed = () => true;
    
    expect(wrapper.authorize()).to.eventually.deep.equal(result);
  });
});