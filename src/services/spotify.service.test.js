import { expect } from 'chai';
import SpotifyWrapper from './spotify.wrapper';

describe('Spotify Wrapper', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = new SpotifyWrapper();
  });

  describe('Authorize user', () => {
    it('should authorize with success', () => {
      expect(true).to.true;
    });
  });
});