import Player from './Player';
import Playlist from './Playlist';

class Controls {
  constructor() {
    this._playPause = document.getElementById('play-pause');
    this._next = document.getElementById('next');
    this._prev = document.getElementById('prev');
    this._playlist = document.getElementById('show-playlist');
  }

  init() {
    this._playPause.addEventListener('click', () => Player.playPause());
    this._next.addEventListener('click', () => Player.next());
    this._prev.addEventListener('click', () => Player.prev());
    this._playlist.addEventListener('click', () => Playlist.show());
  }
}

export default new Controls();
