const SPOTIFY_BASE_URI_AUTHORIZE = 'https://accounts.spotify.com/authorize';
const SPOTIFY_BASE_URI_API = 'https://api.spotify.com/v1';
const SPOTIFY_CLIENT_ID = '35bc4bdcd8ad4e2ea82ee9846fccdc6f';
const SPOTIFY_RESPONSE_TYPE = 'token';
const SPOTIFY_REDIRECT_URI = 'http://localhost:3000/callback';

const WIDTH_POPUP = 700;
const HEIGHT_POPUP = 550;

const OAUTH_INTERVAL = 500;

class SpotifyService {
  constructor() {
    this.isClientAuthorized = false;
    this.expireTime = 0;
    this.oAuth = {};
  }

  parseFilters(filtersObj) {
    let filtersText = '';

    if (filtersObj) {
      const keys = Object.keys(filtersObj);

      filtersText = keys.reduce((prev, curr, index) => {
        if (filtersObj[curr]) {
          return `${prev}${index > 0 ? '&': ''}${curr}=${filtersObj[curr]}`;
        }

        return prev;
      }, '?');
    }

    return filtersText;
  }

  getParamsAuth(url) {
    const params = url.split('&');

    if (params) {
      return params.reduce((prev, next) => {
        let newObj = {...prev};

        newObj[next.split('=')[0]] = next.split('=')[1];

        return newObj;
      }, {})
    }

    return;
  }

  checkPopupHasOpened() {
    const isClosed = this.oAuthPopup.closed;

    if (isClosed) {
      window.clearInterval(this.oAuthInterval);
    }

    return isClosed;
  }

  getURLPopupOAuth() {
    let changeURLPopup = false;

    try {
      changeURLPopup = this.oAuthPopup.location.href.indexOf(SPOTIFY_REDIRECT_URI) > -1;
    } catch (exception) {}

    if (changeURLPopup) {
      window.clearInterval(this.oAuthInterval);
      this.oAuthPopup.close();

      return this.oAuthPopup.location.search ? 
        this.oAuthPopup.location.search.substr(1) :
        this.oAuthPopup.location.hash.substr(1);
    }

    return '';
  }

  authorize() {
    return new Promise((resolve, reject) => {
      const spotifyAuthorizeURI = `${SPOTIFY_BASE_URI_AUTHORIZE}?client_id=${SPOTIFY_CLIENT_ID}&response_type=${SPOTIFY_RESPONSE_TYPE}&redirect_uri=${SPOTIFY_REDIRECT_URI}`;
      const windowName = 'Spotify Authorize';
      const leftPopup = (window.screen.width / 2) - (WIDTH_POPUP / 2);
      const topPopup = (window.screen.height / 2) - (HEIGHT_POPUP / 2);

      const windowOptions = `
        toolbar=no,
        location=no,
        directories=no,
        status=no,
        menubar=no,
        scrollbars=no,
        resizable=no,
        copyhistory=no,
        width=${WIDTH_POPUP},
        height=${HEIGHT_POPUP},
        top=${topPopup},
        left=${leftPopup}
      `;

      if (!this.isAuthorized()) {
        this.oAuthPopup = window.open(spotifyAuthorizeURI, windowName, windowOptions);

        this.oAuthInterval = window.setInterval(() => {
          if (this.checkPopupHasOpened()) {
            reject({
              error: 'closed_popup'
            });
          }

          const paramsURL = this.getURLPopupOAuth();

          if (paramsURL !== '') {
            const paramsObj = this.getParamsAuth(paramsURL);

            if (paramsObj['access_token']) {
              this.oAuth = paramsObj;
              this.isClientAuthorized = true;

              resolve();
            } else {
              reject(paramsObj);
            }
          }
        }, OAUTH_INTERVAL);
      } else {
        resolve();
      }
    });
  }

  isAuthorized() {
    return this.isClientAuthorized && (Date.now() < this.oAuth.expires_in);
  }

  getListFeaturedPlaylist(filters) {
    const filtersText = this.parseFilters(filters);
    const url = `${SPOTIFY_BASE_URI_API}/browse/featured-playlists${filtersText}`;

    return window.fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.oAuth.access_token}`
      }
    }).then((res) => {
      return res.json();
    });
  }
}

export default SpotifyService;