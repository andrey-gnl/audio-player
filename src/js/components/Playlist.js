import Player from './Player';

class Playlist {
  constructor() {
    this._playlist = document.getElementById('playlist');
    this._playlistList = document.getElementById('playlist-list');
    this._closeBtn = document.getElementById('playlist-close');
    this._playerMain = document.getElementById('player-main');
  }

  init(list = []) {
    const html = list.reduce((current, el, i) => {

      return current +=`
          <a href="#" data-id="${el.id}" class="${i === 0 ? 'is-active' : ''}">
              <strong>${el.name}</strong>
              ${el.author}
          </a>`;
    },'');

    this._playlistList.insertAdjacentHTML('afterBegin', html);

    this._bindEvents();
  }

  _bindEvents() {
    this._closeBtn.addEventListener('click', () => this.hide());
    this.links = Array.from(this._playlistList.querySelectorAll('a'));

    this.links.forEach(el => {
      el.addEventListener('click', (e) => {
        const target = e.currentTarget;
        const ID = target.dataset.id;

        if (!target.classList.contains('is-active')) {
          this._playlistList.querySelector('a.is-active').classList.remove('is-active');
          target.classList.add('is-active');
          Player.gotoSong(ID);
        } else {
          Player.playPause();
        }

        e.preventDefault();
      });
    });

  }

  show() {
    this._playerMain.classList.add('playlist-open');
  }

  hide() {
    this._playerMain.classList.remove('playlist-open');
  }

  setActive(index) {
    this._playlistList.querySelector('a.is-active').classList.remove('is-active');
    this._playlistList.querySelector(`a:nth-child(${index + 1})`).classList.add('is-active');
  }

}

export default new Playlist();
