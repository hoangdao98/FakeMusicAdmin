var myTrack = document.getElementById('track');
var iconPlay = document.getElementById('iconPlay');
var iconPause = document.getElementById('iconPause');
var playButton = document.getElementById('play-btn');
var totalTime = document.getElementById('total-time');
var currentTime = document.getElementById('current-time');

var barSize = 100;
var bar = document.getElementsByClassName('slider')[0];
var progressBar = document.getElementsByClassName('progress')[0];

setTimeout(()=>{
 var minutes = parseInt(myTrack.duration/60)
 var seconds = parseInt(myTrack.duration%60)
 totalTime.innerHTML = minutes + ':' + seconds
}, 3000)﻿;


playButton.addEventListener('click', PlayorPause, true);

function PlayorPause(){
  if(!myTrack.paused && !myTrack.ended) {
    myTrack.pause();
    iconPlay.classList.remove('hidden');
    iconPause.classList.add("hidden");
    window.clearInterval(updateTime);
  }else{
    myTrack.play();
    iconPlay.classList.add('hidden');
    iconPause.classList.remove("hidden");
    var updateTime = setInterval(update, 500);
  }
}

function update(){
  if(!myTrack.ended){
    var playerMinutes = parseInt(myTrack.currentTime/60);
    var playerSeconds = parseInt(myTrack.currentTime%60);
    currentTime.innerHTML = playerMinutes + ":" + playerSeconds;

    var size = parseInt(myTrack.currentTime*barSize/myTrack.duration);
    console.log(size);
    progressBar.style.width = size + "%";

  }else{
    currentTime = 0.00;
    iconPlay.classList.remove('hidden');
    iconPause.classList.add("hidden");

    progressBar.style.width = "0";
    window.clearInterval(updateTime);
  }
}
