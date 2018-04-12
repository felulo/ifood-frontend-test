import React, { Component } from 'react';
import PropType from 'prop-types';

class SpotifyAuth extends Component {
  authenticate = () => {
    const { wrapper, onAuthenticated } = this.props;

    wrapper.authorize()
      .then(onAuthenticated)
      .catch((res) => { });
  }

  render() {
    return (
      <div className="spotify-auth">
        <button
          type="button"
          className="spotify-auth__button"
          tabIndex="0"
          onClick={this.authenticate}>
          Login Spotify
        </button>
      </div>
    );
  }
}

const { object, func } = PropType;

SpotifyAuth.propType = {
  wrapper: object,
  onAuthenticated: func
}

export default SpotifyAuth;