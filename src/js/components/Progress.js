import Player from './Player';

class Progress {
  constructor() {
    this._progress = document.getElementById('progress');
    this._trigger = document.getElementById('progress-trigger');
    this._progressLine = document.getElementById('progress-line');
    this._progressLineTrigger = document.getElementById('progress-line-trigger');
    this._offset = 1382;
    this._r = 220;
  }

  init() {


    this._trigger.addEventListener('click', (e) => {
      const x1 = window.innerWidth / 2;
      const y1 = window.innerHeight / 2;
      const PI = Math.PI;

      let y2 = e.pageX;
      let x2 = e.pageY;
      let angle = 180 - (Math.atan2(y2 - x1, x2 - y1) * (180 / PI));
      let progress = (angle * 100) / 360;

      this.update(progress);
      Player.gotoTime(progress);
    });

    this._progressLineTrigger.addEventListener('click', (e) => {
      const { left } = e.target.getBoundingClientRect();
      const x = e.pageX;
      const progress = (x - left) * 100/ e.target.clientWidth;

      this.update(progress);
      Player.gotoTime(progress);
    });
  }

  update(percent) {
    this._progress.style.strokeDasharray = this._offset + (this._offset * percent / 100);
    this._updateLine(percent);
  }

  _updateLine(percent) {
    this._progressLine.style.transform = `translate3d(-${100 - percent}%,0,0)`;
  }

  reset() {
    this._progressLine.style.transform = 'translate3d(-100%,0,0)';
    this._progress.style.strokeDasharray = this._offset;
  }
}

export default new Progress();
