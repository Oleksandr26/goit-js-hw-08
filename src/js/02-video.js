import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const currentTime = localStorage.getItem('videoplayer-current-time');

const onPlay = function (data) {
    console.log(data);
    localStorage.setItem('videoplayer-current-time', data.seconds);
} 

player.on('timeupdate', throttle(onPlay, 1000));

if (currentTime) {
    player.setCurrentTime(currentTime);
}
