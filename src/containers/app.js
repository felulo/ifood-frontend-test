import React, { Component } from 'react';
import _ from 'lodash';

import SpotifyService from '../services/spotify.service';

import getFilterService from '../services/filter.service';

import SpotifyAuth from '../components/SpotifyAuth';
import ListPlaylist from '../components/ListPlaylist';
import Filter from '../components/Filter';
import Message from '../components/Message';

const CHECK_API_TIME = 30000;
const DEBOUNCE_TIME = 500;

const ERRORS = {
  'empty': 'Não foi encontrado playlists',
  'not filter': 'Não contem filtros',
  'access_denied': 'Ocorreu um erro ao tentar autenticar na API do Spotify. Tente Novamente',
  'Invalid timestamp': 'Data e horário no formato correto. Ex: 04/21/2018 03:04:00 PM',
  'Invalid country code': 'País inválido',
  'Invalid limit': 'Quantidade inválida'
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isAuthorized: false,
      errorAPI: {},
      filters: [],
      filtersValues: {},
      playlists: []
    };

    this.spotify = new SpotifyService();
  }

  checkFiltersChanged() {
    this.filtersAPIInterval = window.setInterval(() => {
      this.getFilters();
    }, CHECK_API_TIME);
  }
  
  checkFeaturedPlaylistsChanged() {
    this.featuredPlaylistAPIInterval = window.setInterval(() => {
      this.getFeaturedPlaylists();
    }, CHECK_API_TIME);
  }

  errorRequest = (message) => {
    this.setState({
      errorAPI: {
        show: true,
        message: ERRORS[message]
      }
    });
  }

  successAuthenticated = () => {
    this.setState({
      isAuthorized: true,
      errorAPI: {
        show: false
      }
    });

    this.getFilters();
    this.getFeaturedPlaylists();

    this.checkFiltersChanged();
    this.checkFeaturedPlaylistsChanged();
  }

  changedFilter = _.debounce(({ id, value }) => {
    let filtersValues = _.set(this.state.filtersValues, `${id}`, value);

    this.setState({ filtersValues }, this.getFeaturedPlaylists);
  }, DEBOUNCE_TIME)

  handleChangedFilter = (e) => {
    this.changedFilter(e.target);
  }

  closeMessage = () => {
    this.setState({
      errorAPI: {
        show: false
      }
    });
  }

  errorFeaturedPlaylists = (response) => {
    response
      .json()
      .then(({ error }) => this.errorRequest(error.message));
  }

  successFeaturedPlaylists = ({ playlists }) => {
    if (playlists) {
      let objState = {}
      if (playlists.items.length > 0) {
        objState = {
          playlists: playlists.items,
          errorAPI: {
            show: false
          }
        };
      } else {
        objState = {
          playlists: []
        };
        this.errorRequest('empty');
      }

      this.setState(objState);
    }
  }

  errorFilters = () => {
    this.errorRequest('not filter')
  }

  successFilters = ({ filters }) => {
    this.setState({
      filters,
      errorAPI: {
        show: false
      }
    });
  }

  getFilters = () => {
    return getFilterService()
      .then(this.successFilters)
      .catch(this.errorFilters);
  }

  getFeaturedPlaylists = () => {
    return this.spotify
      .getListFeaturedPlaylist(this.state.filtersValues)
      .then(this.successFeaturedPlaylists)
      .catch(this.errorFeaturedPlaylists);
  }

  render() {
    let elements;

    if (this.state.isAuthorized) {
      elements = (
        <div>
          <form className="form-filter">
            { 
              this.state.filters.map((item, index) => 
                <Filter key={index}
                  value={this.state[item.id]}
                  onChanged={this.handleChangedFilter}
                  {...item}/>
              )
            }
          </form>

          <p className="total-playlists" tabIndex="0">
            Playlists sendo exibidas: {this.state.playlists.length}
          </p>
          
          <ListPlaylist items={this.state.playlists}/>
        </div>
      );
    } else {
      elements = (
        <SpotifyAuth
          wrapper={this.spotify}
          onSuccessAuthenticated={this.successAuthenticated}
          onErrorAuthenticated={this.errorRequest}/>
      );
    }

    return (
      <div className="app">
        <h1 className="title-app" tabIndex="0">
          Spotifood
        </h1>
        {elements}
        {this.state.errorAPI.show && <Message message={this.state.errorAPI.message} onClose={this.closeMessage} />}
      </div>
    );
  }
}

export default App;