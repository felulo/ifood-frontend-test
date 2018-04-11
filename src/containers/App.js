import React, { Component } from 'react';
import _ from 'lodash';

import SpotifyService from '../services/spotify.service';

import getFilterService from '../services/filter.service';

import SpotifyAuth from '../components/SpotifyAuth';
import ListPlaylist from '../components/ListPlaylist';
import Filter from '../components/Filter';

const CHECK_API_TIME = 30000;
const DEBOUNCE_TIME = 500;

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isAuthorized: false,
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
    let filtersValues = Object.assign({}, this.state.filtersValues);
    filtersValues[id] = value;

    this.setState({ filtersValues });
    this.getFeaturedPlaylists();
  }, DEBOUNCE_TIME)

  handleChangedFilter = (e) => {
    this.changedFilter(e.target);
  }

  getFilters = () => {
    getFilterService()
      .then(({ filters }) => this.setState({ filters }));
  }

  getFeaturedPlaylists = () => {
    this.spotify
      .getListFeaturedPlaylist(this.state.filtersValues)
      .then(({ playlists }) => playlists.items)
      .then(playlists => this.setState({ playlists }));
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
        <h1 className="title-app">Spotifood</h1>
        {elements}
      </div>
    );
  }
}

export default App;