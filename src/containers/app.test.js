import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import App from './app';
import SpotifyAuth from '../components/SpotifyAuth/spotifyAuth';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('<App />', () => {
  let wrapper;

  const featuredPlaylists = {
    playlists: {
      items: [{
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
      }]
    }
  };

  const filtersObj = {
    filters: [{
      id: 'timestamp',
      name: 'Data e Horário',
      validation: {
        primitiveType: 'STRING',
        entityType: 'DATE_TIME',
        pattern: 'yyyy-MM-ddTHH:mm:ss'
      }
    }, {
      id: 'limit',
      name: 'Quantidade',
      validation: {
        primitiveType: 'INTEGER',
        min: 1,
        max: 50
      }
    }, {
      id: 'offset',
      name: 'Página',
      validation: {
        primitiveType: 'INTEGER'
      }
    }]
  };

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

  it('set message when request error', () => {
    wrapper.errorRequest('access_denied');

    expect(wrapper.state.errorAPI.show).to.be.true;
    expect(wrapper.state.errorAPI.message).to.be.equal('Ocorreu um erro ao tentar autenticar na API do Spotify. Tente Novamente');
  });

  it('close message', () => {
    wrapper.closeMessage();

    expect(wrapper.state.errorAPI.show).to.be.false;
  });

  it('success request featured playlists', () => {
    wrapper.successFeaturedPlaylists(featuredPlaylists);

    expect(wrapper.state.playlists).to.be.deep.equal(featuredPlaylists.playlists.items);
  });
  
  it('error request filters', () => {
    wrapper.errorFilters();

    expect(wrapper.state.errorAPI.show).to.be.true;
    expect(wrapper.state.errorAPI.message).to.be.equal('Não contem filtros');
  });

  it('success request filters', () => {
    wrapper.successFilters(filtersObj);

    expect(wrapper.state.filters).to.be.deep.equal(filtersObj.filters);
  });

  it('authorized wrapper spotify', () => {
    wrapper.successAuthenticated();

    expect(wrapper.state.isAuthorized).to.be.true;
  });

  it('renders spotifyAuth', () => {
    const renderComponent = shallow(<App />)

    expect(renderComponent.find(SpotifyAuth)).to.have.length(1);
  });

  it('renders filters and listPlaylist', () => {
    const renderComponent = shallow(<App />)

    renderComponent.setState({
      isAuthorized: true
    });

    expect(renderComponent.find('.form-filter')).to.have.length(1);
  });
});