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


  constructor(private router: ActivatedRoute, private audioService: AudioService) { }

  loading() {
    this.load = true;
    this.p++;
    this.audioService.getAudios(this.p).subscribe((data:any) => {
      this.load = false;
      this.__tracks = this.__tracks.concat(data.data)
    });
  }

  selectedSong: Song;
  onSelect(song: Song): void {
    this.selectedSong = song;
    console.log(song); 
  }

  __playTrack() {
    this.__audio.play();
    this.__playing = true;
    this.__setTime();
  }

  __pauseTrack() {
    this.__audio.pause();
    this.__playing = false;
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
    if(this.__trackIndex < 0) {
      this.__trackIndex = this.__tracks.length - 1;
    }
    this.__currentTrack = this.__tracks[this.__trackIndex];
    this.__audio.src = this.__currentTrack.link;
    this.__audio.load();
    this.__playTrack();
  }

  __setTrack(track: Song){
    this.__stopTrack();
    this.__trackIndex = track.id;
    console.log(this.__trackIndex);
    this.__currentTrack = this.__tracks[track.id - 1];
    this.__audio.src = this.__currentTrack.link;
    this.__audio.load();
    this.__playTrack;
  }

  __setVolume(vol) {
    this.__audio.volume = vol;
  }
  __setProgress(prog) {
    this.__audio.currentTime = prog;
  }

  __setTime() {
    var minutes = Math.floor(this.__audio.duration/60);
    var seconds = Math.floor(this.__audio.duration % 60);
    this.__duration = minutes + ':' + seconds;
  }

  ngOnInit() {
    var self = this;
    $(window).on("scroll", function() {
      var scrollHeight = $(document).height();
      var scrollPosition = $(window).height() + $(window).scrollTop();
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

  ngOnDestroy() {
    if (this.__audio) {
      this.__audio.pause();
      this.__audio = null;
    }
  }

}
