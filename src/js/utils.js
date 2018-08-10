export function secondsToMS(seconds) {
  let time = parseInt(seconds);

  let minutes = Math.floor(time % 3600 / 60);
  let sec = Math.floor(time % 3600 % 60);

  let mDisplay = pad(minutes, 2);
  let sDisplay = pad(sec, 2);

  return `${mDisplay}:${sDisplay}`;
};

export function pad(num, size) {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}
