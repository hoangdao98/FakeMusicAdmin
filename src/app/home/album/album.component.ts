import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AlbumService } from '../../album.service';
import { Album } from '../../models/album';
import * as $ from 'jquery';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  private tracks;
  private albums;
  p = 1;
  private buffer: any[] = [];
  load = true;

  results = [];
  input: string = null;
  newsData = [];

  constructor(private router: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit() {
    // let id = this.router.snapshot.paramMap.get('id');
    // this.albumService.getTracks(id).subscribe(
    // 	data => this.tracks = data
    // );
    // this.albumService.getAlbum(id).subscribe(
    // 	(data:any) => {
    //     this.album = data.data
    //   }
    // );
    const self = this;
    $(window).on('scroll', function() {
      const scrollHeight = $(document).height();
      const scrollPosition = $(window).height() + $(window).scrollTop();
      // console.log(scrollPosition);
      if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
        self.loading();
      }
    });

    this.albumService.getAlbums(this.p).subscribe((data: any) => {
      this.load = true;
      this.buffer = this.buffer.concat(data.data);
    });
  }

  loading() {
    this.load = true;
    this.p++;
    this.albumService.getAlbums(this.p).subscribe((data: any) => {
      this.load = false;
      this.buffer = this.buffer.concat(data.data);
    });
  }

  // tslint:disable-next-line:member-ordering
  selectedAlbum: Album;
  onSelect(album: Album): void {
    this.selectedAlbum = album;
  }

  delete(albumId: number): void {
    this.albumService.deleteAlbum(albumId).subscribe(_ => {
       this.buffer = this.buffer.filter(eachAlbum => eachAlbum.id !== albumId);
    });
  }

  getAlbumSearch(event) {
    if (event.target.value == null || event.target.value === '') {
      this.results = [];
      return;
    }
    console.log(this.buffer);
    let value = event.target.value;
    let searchRegex = new RegExp('\\b^' + value, 'gi');
    let matched = this.buffer.filter((data: any) =>
       data.name.match(searchRegex));
    console.log(matched)
  }

  updateAlbum() {

  }

}
