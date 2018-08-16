import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../audio.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Song } from '../../models/song';
import * as $ from 'jquery';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  load = true;
  p = 1;
  private buffer: any[] = [];
  private tracksList: any[] = [];

  // Tracks
  private __audio: any = null;
  private __playing = false;
  private __tracks: any[] = [];
  private __currentTrack: Song;
  private __trackIndex = 0;
  private __duration: string;
  private __step;
  private __update: any;
  private __barSize: any;
  private __barValue: any;


  constructor(private router: ActivatedRoute, private audioService: AudioService) { }

  loading() {
    this.load = true;
    this.p++;
    this.audioService.getAudios(this.p).subscribe((data: any) => {
      this.load = false;
      this.__tracks = this.__tracks.concat(data.data);
    });
  }

  // tslint:disable-next-line:member-ordering
  selectedSong: Song;
  onSelect(song: Song): void {
    this.selectedSong = song;
    console.log(song);
  }

  __playTrack() {
    this.__audio.play();
    this.__playing = true;
    setTimeout(() => {
      this.__setTime();
    }, 100);
    this.__update = setInterval(() => {
      this.__setUpdate();
    }, 500);
  }

  __pauseTrack() {
    this.__audio.pause();
    this.__playing = false;
    clearInterval(this.__update);
  }

  __stopTrack() {
    this.__audio.pause();
    this.__playing = false;
    this.__audio.currentTime = 0;
  }

  __nextTrack() {
    this.__stopTrack();
    this.__trackIndex++;
    if (this.__trackIndex > this.__tracks.length) {
      this.__trackIndex = 0;
    }
    this.__currentTrack = this.__tracks[this.__trackIndex - 1];
    this.__audio.src = this.__currentTrack.link;
    this.__audio.load();
    this.__playTrack();
  }

  __previousTrack() {
    this.__stopTrack();
    this.__trackIndex--;
    if (this.__trackIndex < 0) {
      this.__trackIndex = this.__tracks.length - 1;
    }
    this.__currentTrack = this.__tracks[this.__trackIndex];
    this.__audio.src = this.__currentTrack.link;
    this.__audio.load();
    this.__playTrack();
  }

  __setTrack(track: Song) {
    this.__stopTrack();
    this.__trackIndex = track.id;
    console.log(this.__trackIndex);
    this.__currentTrack = this.__tracks[track.id - 1];
    this.__audio.src = this.__currentTrack.link;
    this.__audio.load();
    // tslint:disable-next-line:no-unused-expression
    this.__playTrack;
  }

  __setVolume(vol) {
    this.__audio.volume = vol;
  }
  __setProgress(prog) {
    this.__audio.currentTime = prog;
  }

  __setTime() {
      const totalTime = document.getElementById('total-time');
      const minutes = Math.floor(this.__audio.duration / 60);
      const seconds = Math.floor(this.__audio.duration % 60);
      totalTime.innerHTML = minutes + ':' + seconds;
  }

  __setUpdate() {
      const currentTime = document.getElementById('current-time');
      const playerMinutes = Math.floor(this.__audio.currentTime / 60);
      const playerSeconds = Math.floor(this.__audio.currentTime % 60);
      currentTime.innerHTML = playerMinutes + ':' + playerSeconds;

      // const sizeBar = Math.floor(this.__audio.currentTime * this.__barSize / this.__audio.duration);
      // console.log(sizeBar);
      this.__barValue = this.__audio.currentTime;
      this.__barSize = Math.floor(this.__audio.currentTime * this.__audio.duration / this.__audio.duration);
      this.__step = this.__barSize;
  }

  ngOnInit() {
    const self = this;
    $(window).on(' scroll ', function() {
      const scrollHeight = $(document).height();
      const scrollPosition = $(window).height() + $(window).scrollTop();
      // console.log(scrollPosition);
      if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
        self.loading();
      }
    });

    this.audioService.getAudios(this.p).subscribe((data: any) => {
      this.load = true;
      this.__tracks = this.__tracks.concat(data.data);
    });

    this.__audio = new Audio();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    if (this.__audio) {
      this.__audio.pause();
      this.__audio = null;
    }
  }

}
