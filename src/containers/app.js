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
    }

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

  handleAuthenticated = () => {
    this.setState({
      isAuthorized: true
    })

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

  getFilters = () => {
    const errorAPI = {
      show: false
    };

    getFilterService()
      .then(({ filters }) => this.setState({ filters }))
      .catch((res) => { 
        this.setState({
          errorAPI: {
            show: true,
            message: ERRORS['not filter']
          }
        }) 
      });
  }

  getFeaturedPlaylists = () => {
    const errorAPI = {
      show: false
    };

    this.spotify
      .getListFeaturedPlaylist(this.state.filtersValues)
      .then(({ playlists }) => playlists ? playlists.items : [])
      .then(playlists => this.setState({ playlists }))
      .catch(res => {
        res.json().then(({ error }) => {
          this.setState({ 
            errorAPI: {
              show: true,
              message: ERRORS[error.message]
            }
          })
        });
      });

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
          onAuthenticated={this.handleAuthenticated}/>
      );
    }

    return (
      <div className="app">
        <h1 className="title-app" tabIndex="0">
          Spotifood
        </h1>
        {elements}
        {this.state.errorAPI.show && <Message message={this.state.errorAPI.message} />}
      </div>
    );
  }
}

export default App;