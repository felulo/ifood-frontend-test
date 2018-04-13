import React, { Component } from 'react';
import PropType from 'prop-types';

const ERROR_ACCESS_DENIED = 'access_denied';

class SpotifyAuth extends Component {
  authenticate = () => {
    const { wrapper, onSuccessAuthenticated, onErrorAuthenticated } = this.props;

    wrapper.authorize()
      .then(onSuccessAuthenticated)
      .catch(() => onErrorAuthenticated(ERROR_ACCESS_DENIED));
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
  wrapper: object.isRequired,
  onSuccessAuthenticated: func.isRequired,
  onErrorAuthenticated: func.isRequired
}

export default SpotifyAuth;