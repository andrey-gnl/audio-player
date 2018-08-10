import Controls from './Controls';
import Progress from './Progress';
import Playlist from './Playlist';
import { secondsToMS } from '../utils';

class Player {
  constructor() {
    this._player = document.getElementById('player');
    this._time = document.getElementById('progress-time');
    this._name = document.getElementById('song-name');
    this._author = document.getElementById('song-author');
    this._isPaused = true;
    this._isPlayingNow = false;
    this.currentIndex = 0;
    this.audio = null;
  }

  async init() {
    const audioList = await fetch('/data/player.json');
    this._list = await audioList.json();

    Controls.init();
    Progress.init();
    Playlist.init(this._list);
    this.updateSong(0);
  }

  playPause() {
    this._isPaused
      ? this.play()
      : this.pause();
  }

  play() {
    this.audio.play();
    this._isPaused = false;
    this._isPlayingNow = true;

    this._animationFrame = requestAnimationFrame(this.updateProgress.bind(this));
  }

  pause() {
    this.audio.pause();
    this._isPaused = true;
    this._isPlayingNow = false;

    cancelAnimationFrame(this._animationFrame);
  }

  prev() {
    this._action(this.updateSong.bind(this, --this.currentIndex));
  }

  next() {
    this._action(this.updateSong.bind(this, ++this.currentIndex));
  }

  updateProgress() {
    let percent = (this.audio.currentTime / this.audio.duration * 100);

    this._time.innerHTML = secondsToMS(this.audio.currentTime);
    Progress.update(percent);
    this._animationFrame = requestAnimationFrame(this.updateProgress.bind(this));
  }

  gotoTime(progress) {
    this._action(() => {
      this.audio.currentTime = (this.audio.duration * progress / 100);
      this._time.innerHTML = secondsToMS(this.audio.currentTime);
    });
  }

  gotoSong(id) {
    const index = this._list.findIndex((el) => el.id === parseInt(id));
    this.pause();
    this.updateSong(index);
    this.play();
  }

  updateSong(index = 0) {

    if (index > this._list.length -1 ) {
      index = 0;
    }

    if(index < 0) {
      index = this._list.length - 1;
    }

    this.audio && this.pause();
    this.audio = new Audio(this._list[index].audio);
    this._name.innerText = this._list[index].name;
    this._author.innerText = this._list[index].author;
    this._player.style.backgroundImage = `url(${this._list[index].cover})`;
    this._time.innerHTML = '00:00';
    Progress.reset();
    Playlist.setActive(index);
    this.currentIndex = index;

    this.audio.addEventListener('ended', this._ended.bind(this), false);
  }

  _ended() {
    this.next();
  }

  _action(fn) {
    if (this._isPlayingNow) {
      this.pause();
      fn();
      this.play();
    } else {
      fn();
    }
  }

}

export default new Player();
